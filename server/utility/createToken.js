import Token from "../models/Token.js";
import createJWT from "./createJWT.js";

const createToken = async (_id, reason, jwt_exp = '600s') => {
    // Create token
    const token = createJWT({ _id, reason }, jwt_exp)
    
    // Sent token
    await Token.create({ userId: _id, reason, token })

    return token
}

export default createToken