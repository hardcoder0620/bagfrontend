import connectDb from "../../db/connectDb"
import productScema from '../../models/products'


export default async function handler(req, res) {
    try {
        await connectDb(process.env.mongo_uri)
        const {productId} = req.query
        const singleProduct = await productScema.find({_id:productId})
        res.status(200).json({
            data: singleProduct
        })

    } catch (error) {
        console.log('err', error)
    }
}
