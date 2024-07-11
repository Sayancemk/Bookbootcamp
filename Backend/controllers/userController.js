import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponce} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/Asynchandler.js';
import {
    DEFAULT_MALE_AVATAR,
    DEFAULT_FEMALE_AVATAR,
    DEFAULT_OTHER_AVATAR} 
    from '../constants.js'
import { isFloat32Array } from 'util/types';


//function for validation username
function isValidUsername(inputString) {
    // Check if the string starts or ends with "-"
    if (inputString.startsWith('-') || inputString.endsWith('-')) {
        return "Username cannot start or end with '-'";
    }
    // Check if the string contains spaces, special characters (except "-"), or capital letters
    if (/[\sA-Z!@#$%^&*()_+={}[\]:;<>,.?~\\\/]/.test(inputString)) {
        return "Username can only contain lowercase letters, numbers, and hyphens";
    }
    // Check if the string starts with a number
    if (/^\d/.test(inputString)) {
        return "Username cannot start with a number";
    }
    // If all conditions are met, return true
    return true;
}
// function for validation email
function validateEmail(email) {
    // Regular expression for a basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    // Test the email against the regular expression
    return emailRegex.test(email);
}
function generateAvatar(gender){
    let avatarPath;
   switch(gender){
    case "M":
        avatarPath:DEFAULT_MALE_AVATAR;
                    break;
    case "F":
        avatarPath:DEFAULT_FEMALE_AVATAR;
                    break;
    case "O":
        avatarPath:DEFAULT_OTHER_AVATAR;
                    break;
   }
   return avatarPath;
}
// function for strong password
function isStrongPassword(password) {
    // Check if password length is at least 8 characters
    if (password.length < 8) {
        return "Password must be at least 8 characters long";
    }
      // Regular expressions to check if password contains required characters
      const lowerCaseRegex = /[a-z]/;
      const upperCaseRegex = /[A-Z]/;
      const digitRegex = /[0-9]/;
      const specialCharRegex = /[!@#$%^&*]/;
  
      // Check if password contains at least one lowercase letter
      if (!lowerCaseRegex.test(password)) {
          return "Password must contain at least one lowercase letter";
      }
  
      // Check if password contains at least one uppercase letter
      if (!upperCaseRegex.test(password)) {
          return "Password must contain at least one uppercase letter";
      }
      // Check if password contains at least one digit
    if (!digitRegex.test(password)) {
        return "Password must contain at least one digit";
    }

    // Check if password contains at least one special character
    if (!specialCharRegex.test(password)) {
        return "Password must contain at least one special character";
    }

    // If all conditions pass, password is strong
    return true;
}


//Sign-Up
const signUp=asyncHandler(async(req,resp)=>{
    const {username,email,password,address,gender}=req.body;
    //check username,email,password and address present in body
    if(!username || !email || !password || !address || !gender){
        throw new ApiError(400,"All fields are required");
    }
    // check password is not strong or strong
    const passwordError=isStrongPassword(password);
    if(passwordError!==true){
        throw new ApiError(400,passwordError)
    
    }
// check email validate 
if(!validateEmail(email)){
    throw new ApiError(400,"email is validate")
}
    const isvalidName=isValidUsername(username);
    if(!isvalidName){
        throw new ApiError(400,"Username is not valid");
    }
    //check username is already exists
    const existingUser=await User.findOne({username:username});
    if(existingUser){
        throw new ApiError (400,"user is alreadsy exists");
    }
    // check email is already exists
    const existingEmail=await User.findOne({email:email});
    if(existingEmail){
        throw new ApiError(400, " email is alraedy exists");
    }
//hashing password
const hashPassword=await bcrypt.hash(password,10);
const avatarPath=generateAvatar(gender);
// create new User
const newUser= new User({
    username:username,
    email:email,
    password:hashPassword,
    address:address,
    avatar:avatarPath,
});
const user=await newUser.save();
if(!user){
    throw new ApiError(500," problems for creating user");
}
//return response
    return resp
    .status(201)
    .json(new ApiResponce(201,user,"username created successfully"));

})
// sign-in
    const signIn=asyncHandler(async(req,resp)=>{
       //get email or username and password
       const {email,password}=req.body;
    //check password ,identifier put on body
    if(!email || !password){
        throw new ApiError(400, " Email or Username and password is required to login");
    }
    // find user by email or username
    const existingUser = await User.findOne( { email:email } );
    // if user not found
    if (!existingUser) {
        throw new ApiError(404, "Invalid Credentials");
    }
    const id=existingUser._id;
    const role=existingUser.role;

    let generateRefreshToken;

    bcrypt.compare(password,existingUser.password,(err,data)=>{
            if(data){
                let authclamis= {
                        id:existingUser._id
                    }
                
                // generate refreshtoken 
                generateRefreshToken=jwt.sign(authclamis,process.env.ACCESS_SECRET_KEY,{
                    expiresIn:"30d"
                });

                
                // return response
                return resp
                .status(200)
                .json(new ApiResponce(200,
                    {
                    id:id,
                    role:role,
                    token:generateRefreshToken
                    },
                "user login successfully"));
            }
            else{
                throw new ApiError(400,"Invalid credentials");
            }
        })

    })

//  get user information
    const getUserInformation=asyncHandler(async(req,resp)=>{
        const {id}=req.headers;
        if(!id){
            throw new ApiError(400,"user id is required to get user information")
        }
        const data= await User.findById(id).select("-password");
        if(!data){
            throw new ApiError(400,"This user information cannot present in database");
        }
        return resp
        .status(201)
        .json(new ApiResponce(201,data,"This is informations"));
        
    })

//  update user address

const updateUserAddress=asyncHandler(async(req,resp)=>{
    const {id}=req.headers;
    if(!id){
        throw new ApiError(400,"id is required to update the address field");
    }
    const {updateAddress}=req.body;
    if(!updateAddress){
        throw new ApiError (400, "new address is required to update the address field");
    }
    const user=User.findById (id);
    if(!user){
        throw new ApiError(400,"User is not exists");
    }
    const updatedUserAddress= await user.updateOne({address:updateAddress});
    if(!updateUserAddress){
        throw new ApiError (400, "some problems are created while update user address");
    }
    // return response
    return resp.
    status(200)
    .json(new ApiResponce(200,updatedUserAddress,"address is updated successfully"));

})






export {
    signUp,
    signIn,
    getUserInformation,
    updateUserAddress,
}