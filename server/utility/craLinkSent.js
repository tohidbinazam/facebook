import Token from "../models/Token.js";
import createJWT from "./createJWT.js";
import securityCode from "./securityCode.js";
import sentMail from "./mail/sentMail.js";
import mailTemplate from "./mail/mail-template/mailTemplate.js";

const craLinkSent = async (user, subject, jwt_exp) => {

    const { _id, email, fs_name, sur_name } = user
    const name = `${fs_name} ${sur_name}`

    // Convert Subject to Reason
    const reason = subject.toLowerCase().split(' ').join('-')

    const code = securityCode(6)
    
    // Previous token remove
    await Token.findOneAndRemove({ userId: _id, reason })
    
    // Create token
    const token = createJWT({ _id, reason }, jwt_exp)
    
    // Sent token
    await Token.create({ userId: _id, reason, code, token })

    const verify_link = `${process.env.APP_URL}/${reason}/${token}`

    const mail_template = mailTemplate(name, email, verify_link, code, reason)

    // Sent verify mail
    sentMail(email, subject, mail_template)

    return { token, reason }

}

export default craLinkSent