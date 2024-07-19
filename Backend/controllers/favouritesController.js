import {User} from '../models/user.model.js';
import {ApiError} from "../utils/ApiError.js";
import {ApiResponce} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/Asynchandler.js';


const addBookToFavourites=asyncHandler(async(req,resp)=>{
    const {bookid,id}=req.headers;
    if(!id){
        throw new ApiError (400," id is required ")
    }
    if(!bookid){
        throw new ApiError(400,"booid is required")
    }
    const userData=await User.findById(id);
    if(!userData){
        throw new ApiError (400,'user is not exist here');
    }
    const isBookFavourites=userData.favourites.includes(bookid);
    if(isBookFavourites){
        throw new ApiError (400,"this book is already is in favourites")
    }
    const addedBookInFavourites=await User.findByIdAndUpdate(id,{$push:{favourites:bookid}},{new:true})
    if(!addedBookInFavourites){
        throw new ApiError(500,"Something went wrong while added book into favourites")
    }
    return resp
    .status(200)
    .json(new ApiResponce(200,addedBookInFavourites,"Book added successfully in favourites"))

})

const removeBokFromFavourites=asyncHandler(async(req,resp)=>{
    const {bookid,id}=req.headers;
    if(!bookid){
        throw new ApiError(400,"bookid is required to remove from the favourites")
    }
    if(!id){
        throw new ApiError (400,"id is required to handle the remove the request")
    }
    const userData= await User.findById(id);
    if(!userData){
        throw new ApiError (400, 'user is not exists here')
    }
    const isBookFavourites= userData.favourites.includes(bookid);
    if(!isBookFavourites){

        throw new ApiError(400,'book is not present in favourites')
    }
   const deleteFromFavourites= await User.findByIdAndUpdate(id,{$pull:{favourites:bookid}},{new:true})

    if(!deleteFromFavourites){
        throw new ApiError (500,"something went wrong for remove from favourites")
    }
        return resp
        .status(200)
        .json(new ApiResponce(200,{},"Book removed successfully in favourites"))
    })


const getfavouriteBook=asyncHandler(async(req,resp)=>{
    const {id}=req.headers;
    if(!id){
        throw new ApiError(400,"id is required to get favourites book")
    }
    const userData= await User.findById(id);
    const favouriteBooks=userData.favourites;
    
    return resp
    .status(200)
    .json(new ApiResponce(200,favouriteBooks,"This is your all of your favourites books"))

})


export{
    addBookToFavourites,
    removeBokFromFavourites,
    getfavouriteBook,
}
