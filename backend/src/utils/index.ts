import bcrypt from 'bcrypt'
import  jwt  from 'jsonwebtoken'
import { Types } from 'mongoose'

//PASSWORD
export const hashPassword = async(password: string)=> {
return await bcrypt.hash(password, 10)
}

export const checkPassword = async (enteredPassword: string, hashedPassword: string) => {
return await bcrypt.compare(enteredPassword, hashedPassword)
}

//JWT

export const generateJWT = (id : Types.ObjectId)=> {
    const payload = {
        id
    }
    const token = jwt.sign( payload, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
    return token
}
