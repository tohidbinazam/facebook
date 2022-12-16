import axios from 'axios'

const sentSMS = (number, msg) => {
    try {
        const url = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${number}&senderid=${process.env.SENDER_ID}&message=${msg}`
        axios.get(url)
    } catch (error) {
        console.log(error.response);
    }
}

export default sentSMS