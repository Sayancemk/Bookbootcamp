import jwt from 'jsonwebtoken';
import {User} from '../models/user.model.js';
import {Books} from '../models/books.model.js';
import {ApiError} from '../utils/ApiError.js';
import {ApiResponce} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/Asynchandler.js';


const createBooks=asyncHandler(async(req,resp)=>{
    const{id}=req.headers;
    if(!id){
        throw new ApiError(400, " id is required");
    }
    const user=User.findById(id);
    if(!user){
        throw new ApiError(400, "You cannot exists here")
    }
    if(user.role!=="admin"){
        throw new ApiError(400, "You are not having access to perfom admin work");
    };
    const newBook=new Books({
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language,
    });
    const book=await newBook.save();
    if(!book){
        throw new ApiError(400,"problems generated for create in books");
    }
    // return response
    return resp
    .status(201)
    .json(new ApiResponce(201,book,"Books created successfully"));
})


const updateBooks=asyncHandler(async (req,resp)=>{
    const {bookid}=req.headers;
    if(!bookid){
        throw new ApiError(400,"Bookid is required to update books");
    }
    const updateBook=await Books.findByIdAndUpdate(bookid,{
        url:req.body.url,
        title:req.body.title,
        author:req.body.author,
        price:req.body.price,
        desc:req.body.desc,
        language:req.body.language,
    })
    if(!updateBook){
        throw new ApiError(400,"something went wrong while updating the book");
    }
    
    return resp
    .status(201)
    .json(new ApiResponce(201,updateBook,"Book Updated Successfully"))
})






export{
    createBooks,
    updateBooks,
}