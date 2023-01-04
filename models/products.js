import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName :{
        type : String,
        required : true
    },
    productImgs:{
        type : Array,
        required : false
    },
    productPrice :{
        type : String,
        required: true,
    },
    productDesc:{
        type : String,
    },
    productQty:{
        type : String,
        required:true
    },
    productCat:{
        type:String,
        required:true
    },
    productCompany:{
        type:String,
        required:true
    }
})
    const mmodel = mongoose.models.product || mongoose.model('product', productSchema)
    export default mmodel
