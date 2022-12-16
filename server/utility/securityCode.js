
const securityCode = (length) => {
    // return Math.floor(Math.random() * 10 ** length)
    return Math.floor(100000 + Math.random() * 900000);
}

export default securityCode