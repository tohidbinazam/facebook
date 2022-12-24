const allMsg = (name, code, reason) => {
    switch (reason) {
        case 'verify-account':
            return `Hi ${name}, Your Facebook verification code is ${code}. This OTP expires in 1 day.`

        case 'forgot-password':
            return `Hi ${name}, Your Facebook reset password code is ${code}. This OTP expires in 10 minutes.`
            
    }

}

export default allMsg