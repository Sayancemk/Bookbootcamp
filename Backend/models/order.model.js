import mongoose from "mongoose";

const orderSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
    },
    book:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Books',
    },
    status:{
        type:String,
        default:'Order Placed',
        enum:['Ordered Placed','Out of Delivery','Delivered','Cancelled']
    },
},
    {
        timestamps:true
    }

)

const Order=mongoose.model('order',orderSchema);

export {
    Order
}