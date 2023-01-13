import connectDb from "../../db/connectDb"
import userSchema from '../../models/users'

import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'

export default async function handler(req, res) {
    try {
        await connectDb(process.env.mongo_uri)
        if(req.method == 'POST'){
            const {userPass,userEmail} = req.body
            // const hashedPassword = await bcrypt.hash(userPass, 10)
            const user = await userSchema.find({userEmail})
            console.log('login user',user)
            if(user.length == 1){
                console.log("user.userPass",user[0].userPass)
                const varified = await bcrypt.compare(userPass, user[0].userPass);
                console.log("result",varified)
                if(varified){
                    const token = jwt.sign({ id: user[0]._id }, process.env.JWT_SECRET)
                    res.json({message:'success',token,data:{userId:user[0]._id,userName:user[0].userName,userEmail:user[0].userEmail}})
                }else{
                    res.json({"message":"invalid credentials"})
                }
            }else{
                res.json({"message":"invalid credentials"})
            }

        }else{
            res.json({message:'method shouuld be post'})
        }
       
    } catch (error) {
        console.log('err', error)
        res.json({message:error})

    }
}
