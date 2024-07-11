import { Router } from "express";
import {authenticationToken}from '../middlewares/userAuth.js';
import {createBooks,
    updateBooks,
    deleteBook,
    getAllBook,
    getRecentbook,
    getBookById,

} from '../controllers/bookController.js';


const router = Router();

router.route('/add-books').post(authenticationToken,createBooks);
router.route('/update-book').put(authenticationToken,updateBooks);
router.route('delete-book').delete(authenticationToken,deleteBook);
router.route('get-all-book').get(getAllBook);
router.route('get-recent-book').get(getRecentbook);
router.route('get-book-by-id/:id').get(getBookById);


export  default router;