const allMsg = (name, code, reason) => {
    switch (reason) {
        case 'verify-account':
            return `Hi ${name}, Your verification code is ${code}.`

        case 'forgot-password':
            return `Hi ${name}, Your reset password code is ${code}.`
            
    }

}

export default allMsg