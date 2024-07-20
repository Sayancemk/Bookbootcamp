import {ApiError} from '../utils/ApiError.js';
import {ApiResponce} from '../utils/ApiResponse.js';
import {asyncHandler} from '../utils/Asynchandler.js';
import {Books} from '../models/books.model.js';
import {Order} from '../models/order.model.js';
import {User} from '../models/user.model.js';

const placeOrder=asyncHandler(async(req,resp)=>{
    const {id}=req.headers;
    const {orders}=req.body;
    for(const orderedData of orders){
        const newOrder=new Order({user:id,book:orderedData._id});
        const orderData=await newOrder.save();
        if(!orderData){
            throw new ApiError(500,"Internal server error");
        }
    const updateOrder= await User.findByIdAndUpdate(id,{
        $push:{orderHistory:orderData._id}
    },{new:true})
    if(!updateOrder){
        throw new ApiError(500,"Someting went wrong to update the orders details ");
    }
    const updateCart=await User.findByIdAndUpdate(id,{
            $pull:{cart:orderedData._id}
 }, {new:true})
    if(!updateCart){
    throw new ApiError(500,"Someting went wrong to update the orders details ");
}
}
    return resp
    .status(201)
    .json(new ApiResponce(201,{updateOrder,updateCart},"Order placed successfully"))
})

const getOrderHistory=asyncHandler(async(req,resp)=>{
    const {id}=req.headers;
    if(!id){
        throw new ApiError(400,"user id is required");
    }
    const userData=await User.findById(id).populate({
        path:"orderHistory",
        populate:{path:Books},
    })
    if(!userData){
        throw new ApiError(500,"Something went wrong")
    }
    const userdata=userData.orderHistory.reverse();
    return resp
    .status(201)
    .json(new ApiResponce(201,{userdata},"All of your ordersHistory"))

})

const getAllOrders=asyncHandler(async(req,resp)=>{
    const userData=await Order.find().
    populate({
        path:"book",
    })
    .populate({
        path:"user"
    })
    .sort({createdAt:-1})

    if(!userData){
        throw new ApiError(500,"Something went wrong")
    }
        return resp
        .status(201)
        .json(new ApiResponce(201,{userData},"All the orders"))
})

const updateStatusOfOrder=asyncHandler(async(req,resp)=>{
    const {orderId,id}=req.headers;
    if(!id){
        throw new ApiError(400,"user id is required");
    }
    if(!orderId){
        throw new ApiError(400,"Order id is required");
    }
    const userData=await User.findById(id);
    if(!userData){
        throw new ApiError(400,"User is not find")
    }
    const order=await Order.findById(orderId);
    if(!order){
        throw new ApiError(400,"Orders is not find")
    }
    const findUserRole=userData.role;
    if(findUserRole!=="admin"){
        throw new ApiError(400,"You are not authorised")
    }else{
        updateOrders=await Order.findByIdAndUpdate(orderId,{
            status:req.body.status
        },{new:true})
        if(!updateOrders){
            throw new ApiError(500,"Something went wrong")
        }
    }
    return resp
    .status(201)
    .json(new ApiResponce(201,{updateOrders},"Status updated successfully"))
    
})
export {
    placeOrder,
    getOrderHistory,
    getAllOrders,
    updateStatusOfOrder,
}
