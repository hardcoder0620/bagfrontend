import connectDb from "../../db/connectDb"
import userSchema from '../../models/users'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    try {
        await connectDb(process.env.mongo_uri)
        if(req.method == 'POST'){
            const {userName,userPass,userEmail} = req.body
            const hashedPassword = await bcrypt.hash(userPass, 10)
            const user = await userSchema.create({userName,userPass:hashedPassword,userEmail})
            const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET)
            res.json({message:'success',token,data:{userId:user._id,userName:user.userName,userEmail:user.userEmail}})

        }else{
            res.json({message:'failed'})
        }
       
    } catch (error) {
        console.log('err', error)
        res.json({message:'failed'})

    }
}
