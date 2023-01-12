import mongoose from "mongoose";
mongoose.set('strictQuery', false)

const connectDb = (uri)=>{
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })
}

export default connectDb