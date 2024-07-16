import {Router} from 'express';

import {
    placeOrder,
    getOrderHistory,
    getAllOrders,
    updateStatusOfOrder,

} from "../controllers/orderController.js";

import { authenticationToken } from '../middlewares/userAuth.js';

const router=Router();

router.route('/place-order').post(authenticationToken,placeOrder);

router.route('/get-order-history').get(authenticationToken,getOrderHistory);

router.route('/get-all-orders').get(authenticationToken,getAllOrders);

router.route('/update-status/:id').put(authenticationToken,updateStatusOfOrder);

export default router;