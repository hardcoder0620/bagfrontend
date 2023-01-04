import mongoose from "mongoose";

const connectDb = (uri)=>{
    return mongoose.connect(uri,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
       })
}

export default connectDb