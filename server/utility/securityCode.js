
const securityCode = (length) => {
    return Math.floor(Math.random() * 10 ** length)
}

export default securityCode