import {AsyncHandler} from '../utils/AsyncHandler.js'
import {ApiError} from '../utils/ApiError.js'
import {ApiResponse} from '../utils/ApiResponce.js'
import { UploadOnCloudinary } from '../utils/Cloudinary.js'
import { User } from '../models/User.model.js'



const GenreateAccessRefreshToken = async(userId)=>{
    try {
        const user =  await User.findById(userId)
        const AccessToken = await user.GenerateAccessToken()
        const RefereshToken = await user.GenerateRefreshToken()
        user.RefereshToken = RefereshToken
        await user.save({validateBeforeSave:false})
        return {AccessToken,RefereshToken}
    } catch (error) {
        throw new ApiError(500,"access or refresh token failure!!")
    }
}


const creatingUser = AsyncHandler(async(req,res)=>{
    
    const {username,email,password} = req.body

    if([username,email,password].some(field => !field?.trim()))
    {
        throw new ApiError(400,"Fields Are Empty!!")
    }

    const ExsistingUser = await User.findOne({
        $or:[{username},{email}]
    })

    if(ExsistingUser)
    {
        throw new ApiError(400,"user already Exsists!!")
    }

    const UserObj = {
        username,
        email,
        password
    }

    const NewUser =  await User.create(UserObj)
    const Createduser = await User.findById(NewUser?._id).select("-password")

    if(!Createduser)
    {
        throw new ApiError(400,"no User created!!")
    }

    return res
    .status(200)
    .json(new ApiResponse(200,Createduser,"user created"))
})


const LoginUser = AsyncHandler(async(req,res)=>{

    const {username,email,password} = req.body

    const Finduser = await User.findOne({
        $or:[{username:username},{email:email}]
    })

    if(!Finduser)
    {
        throw new ApiError(200,"cannot find the username or email!!")
    }

    const PassCheck = await Finduser.isPasswordCorrect(password)
    if(!PassCheck)
    {
        throw new ApiError(400,"Wrong Password!!")
    }

    const {AccessToken,RefereshToken} = await GenreateAccessRefreshToken(Finduser._id)

    const FinalUser = await User.findById(Finduser?._id).select("-password -email")

    const option = {
        httpOnly:true,
        sameSite:"lax"
    }

    return res.status(200)
    .cookie("refreshtoken",RefereshToken,option)
    .cookie("accesstoken",AccessToken,option)
    .json(new ApiResponse(200,FinalUser,"logged in succesfully!!"))
})

const HistoryHandle = AsyncHandler(async(req,res)=>{
    const filePath = req.file?.path
    console.log(req.user)
    const userCurrent = req.user._id
    const loadingCloudinary = await UploadOnCloudinary(filePath)
    if(!loadingCloudinary)
    {
        throw new ApiError(400,"file Loading error!!")
    }

    const FindUser = await User.findById(userCurrent)
    if(!FindUser)
    {
        throw new ApiError(400,"User not found !!")
    }

    FindUser.history.push({...loadingCloudinary})
    await FindUser.save()

    return res.status(200)
    .json(new ApiResponse(200,"file saved in History!!"))

})


const FetchUserId = AsyncHandler(async(req,res)=>{
    const userid = req.user._id
    console.log(userid)

    if(!userid)
    {
        throw new ApiError(400,"error fetching id");
    }

    const userCred = await User.findById(userid)
    if(!userCred)
    {
        throw new ApiError(400,"Not found in the database!!")
    }
    const UserObj = {
        userid,
    }

    res.status(200)
    .json(new ApiResponse(200,UserObj,"userid fetched"))
})

export {creatingUser,LoginUser,HistoryHandle,FetchUserId}