import { Router } from "express";
import{
    signUp,
    signIn,
    getUserInformation,
    updateUserAddress,
} from '../controllers/userController.js';
import {authenticationToken}from '../middlewares/userAuth.js';

const router = Router();

router.route('/sign-up').post(signUp);
router.route('/sign-in').post(signIn);
router.route('/get-user-information').get(authenticationToken,getUserInformation);
router.route('/update-user-address').put(authenticationToken,updateUserAddress); 



export default router;