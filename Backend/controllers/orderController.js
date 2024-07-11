import {ApiError} from '../utils/ApiError.js';
import {ApiResponce} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/Asynchandler.js';
import {Books} from '../models/books.model.js';
import {Orders} from '../models/order.model.js';

const placeOrder=asyncHandler(async(req,resp)=>{
    const {id}=req.headers;
})