import connectDb from "../../db/connectDb"
import productScema from '../../models/products'
import data from "../../data"

export default async function handler(req, res) {
    try {
        await connectDb(process.env.mongo_uri)
        console.log(req.query, 'req.query')
        let queryObj = {}
        const sortObj = {}
        const { cat } = req.query
        const { subCat } = req.query
        const { childCat } = req.query
        const { com } = req.query
        const { sort } = req.query
        const { price } = req.query
        if (cat) {
            queryObj.productCat = cat
        }
        if (subCat) {
            queryObj.productSubCat = subCat
        }
        if (childCat) {
            queryObj.productChildCat = childCat
        }
      
        if (price) {
            queryObj.productPrice = { "$lt": price}
        }
        if (sort) {
            console.log(sort)
            queryObj={}
            if (sort == 'lowToHigh') {
                sortObj.productPrice = 1
            } else {
                sortObj.productPrice = -1
            }
        }
        // await productScema.create(data)
        // await productScema.deleteMany({},()=>{console.log('deleted')})
        const productsArr = await productScema.find(queryObj).sort(sortObj)
        res.status(200).json({ "data": productsArr })

    } catch (error) {
        console.log('err', error)
    }
}
