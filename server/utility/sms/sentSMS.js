import axios from 'axios'

const sentSMS = async (number, msg) => {
    try {
        const url = `https://bulksmsbd.net/api/smsapi?api_key=${process.env.SMS_API_KEY}&type=text&number=${number}&senderid=${process.env.SENDER_ID}&message=${msg}`
        await axios.get(url)
    } catch (error) {
        console.log(error.response);
    }
}

export default sentSMS