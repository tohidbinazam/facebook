import Token from "../models/Token.js";
import createJWT from "./createJWT.js";
import securityCode from "./securityCode.js";
import sentMail from "./mail/sentMail.js";
import mailTemplate from "./mail/mail-template/mailTemplate.js";
import sentSMS from "./sms/sentSMS.js";
import allMsg from "./sms/allMsg.js";

const craLinkSent = async (user, reason, jwt_exp) => {

    const { _id, email, mobile, fs_name, sur_name } = user
    const name = `${fs_name} ${sur_name}`

    const code = securityCode(6)
    
    // Previous token remove
    await Token.findOneAndRemove({ userId: _id, reason })
    
    // Create token
    const token = createJWT({ _id, reason }, jwt_exp)
    
    // Sent token
    await Token.create({ userId: _id, reason, code, token })

    // Mail subject

    if (email) {
        
        // covert reason string to capitalize and replace dash with space
        // Convert reason to Subject
        const subject = reason.replace(/-/g, ' ').replace(/\w\S*/g, (w) => (w.replace(/^\w/, (c) => c.toUpperCase())))
    
        // covert reason string to lowercase and replace space with dash
        // Convert Subject to Reason
        // const subject = reason.toLowerCase().split(' ').join('-')
    
        const verify_link = `${process.env.APP_URL}/${reason}/${token}`
    
        const mail_template = mailTemplate(name, email, verify_link, code, reason)
    
        // Sent verify mail
        sentMail(email, subject, mail_template)
    }

    if (mobile) {

        const msg = allMsg(name, code, reason)
        
        // Sent SMS
        sentSMS(mobile, msg)
    }

    return { token, reason }

}

export default craLinkSent