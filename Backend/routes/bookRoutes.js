import { Router } from "express";
import {authenticationToken}from '../middlewares/userAuth.js';
import {createBooks,
    updateBooks,

} from '../controllers/bookController.js';


const router = Router();

router.route('/add-books').post(authenticationToken,createBooks);
router.route('/update-book').put(authenticationToken,updateBooks)


export  default router;