import mongoose from 'mongoose'
import { Schema } from 'mongoose'
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'


const UserSchema = new Schema({
    username:
    {
        type:String,
        required:true,
        trim:true,
        lowercase:true,
        unique:true
    },
    password:
    {
        type:String,
        required:true,
        trim:true,
        unique:true,
    },
    email:
    {
        type:String,
        required:true,
    },
    history:[
        {
            fileName: { type: String, required: true },
            filePath: { type: String, required: true },
            vectorPath: { type: String, required: true }
        }
    ],
  
},{timestamps:true})

UserSchema.pre("save",async function(next){
    if(!this.isModified("password")) return next()
    this.password = await bcrypt.hash(this.password,10)
    next()
})

UserSchema.methods.isPasswordCorrect = async function(enteredPasword) {
    return bcrypt.compare(enteredPasword,this.password)
}


UserSchema.methods.GenerateAccessToken = function()
{
    return jwt.sign(
        {
           id:this._id,
           email:this.email,
           username:this.username
        },
        process.env.ACCESS_SECRET,
        {expiresIn:process.env.ACCESS_EXP}
    )
}

UserSchema.methods.GenerateRefreshToken = function()
{
    return jwt.sign(
        {
            id:this._id
        },
        process.env.REFRESH_SECRET,
        {expiresIn:process.env.REFRESH_EXP}
    )
}

export const User = mongoose.model("User",UserSchema)


