import { Router } from "express";
import {authenticationToken}from '../middlewares/userAuth.js';
import {createBooks,

} from '../controllers/bookController.js';


const router = Router();

router.route('/add-books').post(authenticationToken,createBooks);


export  default router;