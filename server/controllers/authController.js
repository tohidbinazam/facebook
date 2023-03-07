import User from '../models/userModel.js';
import bcryptjs from 'bcryptjs';
import jwt from 'jsonwebtoken';
import Token from '../models/Token.js';
import craLinkSent from '../utility/craLinkSent.js';
import sentMail from '../utility/mail/sentMail.js';
import createError from '../utility/error/createError.js';
import passwordHash from '../utility/passwordHash.js';
import createToken from '../utility/createToken.js';

/**
 * @access private
 * @route /api/v1/user/register/:auth
 * @method POST
 */
export const register = async (req, res, next) => {
  const key = req.params.auth;
  const { auth, pass } = req.body;

  try {
    const check = await User.findOne({ [key]: auth });

    if (check) {
      return next(createError(406, 'Already exist this User'));
    }

    // Password hashing
    const password = await passwordHash(pass);

    // Create new user
    const user = await User.create({ ...req.body, [key]: auth, password });

    const { token, reason } = await craLinkSent(user, 'verify-account', '1d');

    res
      .cookie('fbstk', token, { expires: new Date(Date.now() + 86400000) })
      .status(200)
      .json({ user, reason });
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route /api/v1/user/resend/:auth
 * @method POST
 */
export const resendCode = async (req, res, next) => {
  const key = req.params.auth;
  const { auth, reason } = req.body;

  try {
    const user = await User.findOne({ [key]: auth });

    const { token } = await craLinkSent(user, reason);

    res
      .cookie('fbstk', token, { expires: new Date(Date.now() + 600000) })
      .status(200)
      .json(`Code send in ${key}`);
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route /api/v1/user/verify-code
 * @method POST
 */
export const verifyCode = async (req, res, next) => {
  try {
    const { _id, code } = req.body;
    const check = await Token.findOne().and([{ code }, { userId: _id }]);

    if (!check) {
      return next(createError(406, 'Invalid Code'));
    }
    // Delete token
    await Token.findOneAndDelete({ userId: _id, reason: check.reason });

    if (check.reason == 'verify-account') {
      // Update user
      const user = await User.findByIdAndUpdate(
        _id,
        { isVerified: true },
        { new: true }
      );

      // Create Login token
      const { token, reason } = await createToken(user._id, 'login', '120d');
      res
        .cookie('fbstk', token, { expires: new Date(Date.now() + 10368000000) })
        .status(200)
        .json(reason);
    }

    if (check.reason == 'forgot-password') {
      const { token, reason } = await createToken(_id, 'reset-password');
      res
        .cookie('fbstk', token, { expires: new Date(Date.now() + 600000) })
        .status(200)
        .json(reason);
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route  /api/v1/user/me
 * @method GET
 */
export const isLoggedIn = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    const data = await Token.findOne({ token });
    if (!data) {
      return next(createError(401, 'Unauthorized'));
    }

    // Token verify
    const verify = jwt.verify(token, process.env.SECRET_KEY);
    if (!verify) {
      await Token.findOneAndRemove({ token });
      return next(createError(401, 'Unauthorized'));
    }
    const { _id, reason } = verify;

    // Get logged in user
    const user = await User.findById(_id).select('-password');
    res.status(200).json({ user, reason });
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route /api/v1/user/login
 * @method POST
 */
export const login = async (req, res, next) => {
  const { auth, password } = req.body;

  try {
    const user = await User.findOne()
      .or([{ email: auth }, { mobile: auth }])
      .select('-password');
    if (!user) {
      return next(createError(404, 'Wrong Email or Number'));
    }

    if (!user.isVerified) {
      return res.status(200).json({ user });
    }

    const login = await bcryptjs.compare(password, user.password);
    if (!login) {
      return next(createError(401, 'Wrong password'));
    }

    const { token } = await createToken(user._id, 'login', '120d');
    res
      .cookie('fbstk', token, { expires: new Date(Date.now() + 10368000000) })
      .status(200)
      .json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route /api/v1/user/find-user
 * @method POST
 */
export const findUser = async (req, res, next) => {
  const { data } = req.body;

  try {
    const user = await User.findOne().or([{ email: data }, { mobile: data }]);
    if (!user) {
      return next(createError(404, 'Wrong Email or Number'));
    }

    res.status(200).json({ user });
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route /api/v1/user/reset-password
 * @method PATCH
 */
export const resetPassword = async (req, res, next) => {
  const { _id, pass, reason } = req.body;

  try {
    await Token.findOneAndRemove().and([{ userId: _id }, { reason }]);

    // Password hashing and update
    const password = await passwordHash(pass);
    await User.findByIdAndUpdate(_id, { password });

    // Login Token
    const auth = await createToken(_id, 'login', '120d');
    res
      .cookie('fbstk', auth.token, {
        expires: new Date(Date.now() + 10368000000),
      })
      .status(200)
      .json(auth.reason);
  } catch (error) {
    next(error);
  }
};

/**
 * @access private
 * @route  /api/v1/auth/logout
 * @method DELETE
 */
export const userLogout = async (req, res, next) => {
  const token = req.headers.authorization;

  try {
    await Token.findOneAndDelete({ token });
    res.clearCookie('fbstk').status(200).json('Successfully logged out');
  } catch (error) {
    next(error);
  }
};

/**
 * @access Public
 * @route /api/user
 * @method GET
 */

export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    next(error);
  }
};

/**
 * @access Public
 * @route /api/user/:username
 * @method GET
 */

export const getSingleUser = async (req, res, next) => {
  // Get username
  const username = req.params.username;

  try {
    let user = await User.findOne({ username });
    user
      ? res.status(200).json(user)
      : next(createError(404, 'user not found'));
  } catch (error) {
    next(error);
  }
};

export const userRegNumber = async (req, res, next) => {
  try {
    const { email, username } = req.body;

    const check = await User.find().or([{ email }, { username }]);

    if (check.length) {
      // fs.unlinkSync(`server/public/images/products/photos/${main_photo}`)
      return next(createError(406, 'Already exist this User'));
    }

    // Password hashing
    const password = await bcryptjs.hash(req.body.password, 12);

    // const callId = randomCode(20)
    // Create new user
    const user = await User.create({ ...req.body, password });

    const verify_link = await craLinkSent(user._id, 'verify-account', '30d');

    // Sent mail by Gmail
    sentMail(
      user.email,
      'Verify Account',
      `Please verify Your account by click this <a href=${verify_link}>LINK</a>`
    );

    res.status(200).json(user);
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/verify
 * @method POST
 */
export const verifyAccount = async (req, res, next) => {
  // Get token with object
  const { token, user_id } = req.body;

  try {
    await Token.findOneAndRemove({ token });

    // User verified status data update
    await User.findByIdAndUpdate(
      user_id,
      {
        isVerified: true,
      },
      { new: true }
    );

    res.status(200).json('Your account verify successfully');
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/resent-verify
 * @method POST
 */
export const resentVerify = async (req, res, next) => {
  const { email } = req.body;

  try {
    const user = await User.findOne({ email });

    if (user && !user.isVerified) {
      const verify_link = await craLinkSent(user._id, 'verify-account', '30d');

      // Sent mail by Gmail
      sentMail(
        user.email,
        'Verify Account',
        `Please verify Your account by click this <a href=${verify_link}>LINK</a>`
      );

      // Sent mail by SendGrid
      // sentMail(user.email, 'Verify Account', `Please verify Your account by click this <a href=${verify_link}>LINK</a>`)

      res.status(200).json(user);
    } else {
      next(createError(404, 'Invalid or Already verified user'));
    }
  } catch (error) {
    next(error);
  }
};

/**
 * @access public
 * @route /api/user/forgot-password
 * @method POST
 */
export const forgotPassword = async (req, res, next) => {
  const { email } = req.body;
  try {
    const user = await User.findOne({ email });

    if (user) {
      const reset_pass_link = await craLinkSent(user._id, 'reset-password');

      // Sent mail by Gmail
      sentMail(
        user.email,
        'Reset Password',
        `Reset Your Password by click this <a href=${reset_pass_link}>LINK</a>. Expire in 10min`
      );

      // Sent mail by SendGrid
      // sentMail(user.email, 'Reset Password', `Reset Your Password by click this <a href=${reset_pass_link}>LINK</a>`)
      res.status(200).json('Link sent successfully ');
    } else {
      return next(createError(404, 'User not found'));
    }
  } catch (error) {
    next(error);
  }
};
