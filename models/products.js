import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    productName: {
        type: String,
        required: true
    },
    productImgs: {
        type: Array,
        required: false
    },
    productPrice: {
        type: String,
        required: true,
    },
    productDesc: {
        type: String,
    },
    productQty: {
        type: String,
        required: true
    },
    productCat: {
        type: String,
        required: true
    },
    productSubCat: {
        type: String,
        required: true,
    },
    productChildCat: {
        type: String,
        required: true
    },
    productColor: {
        type: String,
        required: true
    },
    varients:{
        type: Array,
        required:false,
        default:[]
    }
})
 
export default mongoose.models.product || mongoose.model('product', productSchema)
