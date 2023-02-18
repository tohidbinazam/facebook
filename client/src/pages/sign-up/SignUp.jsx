import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import cross_btn from '../../assets/icons/cross.png';
import { register } from '../../redux/auth/action';
import toaster from '../../utility/toaster';
import { useNavigate } from 'react-router-dom';
import { AiOutlineEye } from 'react-icons/ai';
import './SignUp.css';

const SignUp = ({ setShow }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [input, setInput] = useState({});

  const birthYears = () => {
    let currentYear = new Date().getFullYear();
    let years = [];

    for (let i = 0; i < 80; i++) {
      years.push(currentYear - i);
    }

    return years;
  };

  // All days in a month
  const days = () => {
    let days = [];

    for (let i = 1; i <= 31; i++) {
      days.push(i);
    }

    return days;
  };

  // All months
  const months = [
    'Jan',
    'Feb',
    'Mar',
    'Apr',
    'May',
    'Jun',
    'Jul',
    'Aug',
    'Sep',
    'Oct',
    'Nov',
    'Dec',
  ];

  // handle Input
  const handleInput = (e) => {
    setInput((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // handle Input Error
  const handleError = (e) => {
    const target = e.target;
    if (!target.value) {
      target.classList.add('error-border');
      target.nextElementSibling.classList.remove('active');
    } else {
      target.nextElementSibling.classList.remove('active');
    }
  };

  // handle Input Error Message
  const handleErrorMsg = (e) => {
    const target = e.target;
    if (target.classList.contains('error-border')) {
      target.classList.remove('error-border');
      target.nextElementSibling.classList.add('active');
    }
  };

  // Form submit
  const handleSubmit = (e) => {
    e.preventDefault();

    if (
      !input.fs_name ||
      !input.sur_name ||
      !input.auth ||
      !input.pass ||
      !input.day ||
      !input.month ||
      !input.year ||
      !input.gender
    ) {
      return toaster('Please fill all the fields');
    }
    dispatch(register(input, setShow, navigate));
  };

  // Password view and hide
  const [type, setType] = useState(true);
  const togglePassword = () => {
    setType(!type);
  };

  return (
    <div className='SignUp'>
      <div className='blur-box'>
        <div className='sign-up-card'>
          <div className='sign-up-header'>
            <div className='sign-up-content'>
              <span>Sign Up</span>
              <span>It's quick and easy.</span>
            </div>
            <button onClick={() => setShow(false)}>
              <img src={cross_btn} alt='' />
            </button>
          </div>
          <div className='sign-up-body'>
            <form onSubmit={handleSubmit}>
              <div className='reg-form reg-form-inline'>
                <div className='main-input'>
                  <input
                    onChange={handleInput}
                    onBlur={handleError}
                    onFocus={handleErrorMsg}
                    name='fs_name'
                    type='text'
                    placeholder='First Name'
                  />
                  <div className='error-msg'>
                    <p>What's your name?</p>
                    <div className='arrow'></div>
                  </div>
                </div>
                <div className='main-input'>
                  <input
                    onChange={handleInput}
                    onBlur={handleError}
                    onFocus={handleErrorMsg}
                    name='sur_name'
                    type='text'
                    placeholder='Surname'
                  />
                  <div className='error-msg surname'>
                    <p>What's your name?</p>
                    <div className='arrow'></div>
                  </div>
                </div>
              </div>
              <div className='reg-form'>
                <input
                  onChange={handleInput}
                  onBlur={handleError}
                  onFocus={handleErrorMsg}
                  name='auth'
                  type='text'
                  placeholder='Mobile number or email address'
                />
                <div className='error-msg long'>
                  <p>
                    You'll use this when you login and if you even need to reset
                    your password
                  </p>
                  <div className='arrow'></div>
                </div>
              </div>
              <div className='reg-form'>
                <input
                  onChange={handleInput}
                  onBlur={handleError}
                  onFocus={handleErrorMsg}
                  name='pass'
                  type={type ? 'password' : 'text'}
                  placeholder='New password'
                />
                <div className='error-msg long'>
                  <p>
                    Enter a combination of at least six numbers, letters and
                    punctuation marks (such as ! and &).
                  </p>
                  <div className='arrow'></div>
                </div>
                <AiOutlineEye onClick={togglePassword} />
              </div>
              <div className='reg-form'>
                <span>Date of birth</span>
                <div className='reg-form-select'>
                  <select name='day' id='' onChange={handleInput}>
                    {days().map((day, index) => (
                      <option key={index} value={day}>
                        {day}
                      </option>
                    ))}
                  </select>
                  <select name='month' id='' onChange={handleInput}>
                    {months.map((month, index) => (
                      <option key={index} value={month}>
                        {month}
                      </option>
                    ))}
                  </select>
                  <select name='year' id='' onChange={handleInput}>
                    {birthYears().map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              <div className='reg-form'>
                <span>Gender</span>
                <div className='reg-form-select'>
                  <label>
                    Male
                    <input
                      type='radio'
                      name='gender'
                      value='Female'
                      onChange={handleInput}
                    />
                  </label>
                  <label>
                    Female
                    <input
                      type='radio'
                      name='gender'
                      value='Female'
                      onChange={handleInput}
                    />
                  </label>
                  <label>
                    Custom
                    <input
                      type='radio'
                      name='gender'
                      value='Custom'
                      onChange={handleInput}
                    />
                  </label>
                </div>
              </div>

              <div className='reg-form'>
                <p>
                  People who use our service may have uploaded your contact
                  information to Facebook. <a href='http'>Learn more.</a>
                </p>
              </div>
              <div className='reg-form'>
                <p>
                  By clicking Sign Up, you agree to our <a href='http'>Terms</a>
                  ,<a href='http'>Privacy Policy</a> and
                  <a href='http'>Cookies Policy</a>. You may receive SMS
                  notifications from us and can opt out at any time.
                </p>
              </div>

              <div className='reg-form'>
                <button type='submit'>Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
