import { ApiError } from "../utils/ApiError.js";
import  jwt from 'jsonwebtoken';


const authenticationToken=(req,res,next)=>{

  
    const token=req.headers["authorization"].split(' ')[1];

    if(token==null){
        throw new ApiError (401,"Authentication token required");
    }
    jwt.verify(token,process.env.ACCESS_SECRET_KEY,(err,user)=>{
        if(err){
            throw new ApiError(401,err)
    }
        
        req.user=user;
        next();
    });
}
export {
    authenticationToken,
}