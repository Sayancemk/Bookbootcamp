import { ApiError } from "../utils/ApiError.js";
import  jwt from 'jsonwebtoken';


const authenticationToken=(req,res,next)=>{

    const authHeader=req.headers("authorization");
    const token=authHeader && authHeader.split(' ')[1];

    if(token==null){
        throw new ApiError (401,"Authentication token required");
    }
    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(err,user)=>{
        if(err){
            throw new ApiError(403,"Token is expired ,please sign in again");
        }
        req.user=user;
        next();
    });
}
export {
    authenticationToken,
}