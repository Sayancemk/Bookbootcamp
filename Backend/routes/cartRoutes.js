import {Router} from 'express';

import{
    addToCart,
    removeFromCart,
    getAllCart,

} from '../controllers/cartController.js';

import { authenticationToken } from '../middlewares/userAuth.js';

const router=Router();

router.route('/add-to-cart').put(authenticationToken,addToCart);

router.route('/remove-from-cart/:bookid').put(authenticationToken,removeFromCart);

router.route('/get-all-cart').get(authenticationToken,getAllCart);

export default router;
