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

    const code = securityCode(8)
    
    // Previous token remove
    const ans = await Token.findOneAndRemove({ userId: _id, reason })
    
    // Create token    ?? Check it after
    const token = createJWT({ _id }, jwt_exp)
    
    // Sent token
    await Token.create({ userId: _id, reason, code })

    const verify_link = `${process.env.APP_URL}/${reason}/${token}`

    const mail_template = mailTemplate(name, email, verify_link, code, reason)

    // Sent verify mail
    sentMail(email, subject, mail_template)

}

export default craLinkSent