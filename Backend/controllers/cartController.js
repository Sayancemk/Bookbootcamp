import {User} from '../models/user.model.js';
import {ApiError} from "../utils/ApiError.js";
import {ApiResponce} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/Asynchandler.js';


const  addToCart=asyncHandler(async(req,resp)=>{
    const {bookid,id}=req.headers;
    if(!id){
        throw new ApiError (400," id is required ")
    }
    if(!bookid){
        throw new ApiError(400,"bookid is required")
    }
    const userData=await User.findById(id);
    if(!userData){
        throw new ApiError (400, "user is not exist here");
    }
    const isAddedCart=userData.cart.includes(bookid);
    if(isAddedCart){
        throw new ApiError(400,"This book item is already present in cart")
    }
const addedToCart=await User.findByIdAndUpdate(id,{$push:{cart:bookid}},{new:true});
    if(!addedToCart){
        throw new ApiError (500,"Something went wrong to add book into cart")
    }
    return resp
    .status(200)
    .json(new ApiResponce(200,addedToCart,'Book added to cart successfully'))
})

const removeFromCart=asyncHandler(async(req,resp)=>{
    const {id}=req.headers;
    const {bookid}=req.params;
    if(!id){
        throw new ApiError (400," id is required ")
    }
    if(!bookid){
        throw new ApiError(400,"booid is required")
    }
    const userData=await User.findById(id);
    if(!userData){
        throw new ApiError (400, "user is not exist here");
    }
    const isRemoveCart=userData.cart.includes(bookid);
    if(!isRemoveCart){
        throw new ApiError(400,"This book item is  not present in cart")
    }
    const removeFromCart=await User.findByIdAndUpdate(id,{$pull:{cart:bookid}});
    if(!removeFromCart){
        throw new ApiError (500,"Something went wrong to remove book from cart")
    }
    return resp
    .status(200)
    .json(new ApiResponce(200,{},'Book remove from cart successfully'))

})

const getAllCart=asyncHandler(async(req,resp)=>{
    const {id} = req.headers;
    if(!id){
        throw new ApiError(400,"id is required to access");
    }
    const userData= await User.findById(id);
    const cart=userData.cart.reverse();
     return resp
     .status(200)
     .json(new ApiResponce(200,cart,`This is ${userData.username} 's all cart details`))
})



export{
    addToCart,
    removeFromCart,
    getAllCart,
}