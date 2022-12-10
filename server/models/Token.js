import mongoose from "mongoose";


const tokenModel = mongoose.Schema({
    userId : {
        type : mongoose.Schema.Types.ObjectId,
        ref : 'User',
        required : true
    },
    reason :{
        type : String,
        require : true,
    },
    code: {
        type : Number,
        default : null
    },
    token:{
        type : String,
        required : true
    }
},{ timestamps : true })


export default mongoose.model('Token', tokenModel)