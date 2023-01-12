import mongoose from "mongoose"

const userSchema = new mongoose.Schema({
    userName:{
        type: String,
        required: true
    },
    userEmail:{
        type : String,
        required: true,
        unique:true
    },
    userPass:{
        type: String,
        required:true
    }
})

export default mongoose.models.user || mongoose.model('user',userSchema)