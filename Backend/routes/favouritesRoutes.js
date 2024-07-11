import {Router} from 'express';

import {addBookToFavourites,
    removeBokFromFavourites,
    getfavouriteBook,
        }
    from '../controllers/favouritesController.js'
    
import {authenticationToken} from '../middlewares/userAuth.js';

const router=Router();

router.route('/add-book-to-favourites').put(authenticationToken,addBookToFavourites);

router.route('/remove-book-from-favourite').delete(authenticationToken,removeBokFromFavourites);

router.route('/get-favourite-book').get(authenticationToken,getfavouriteBook);

export default router;