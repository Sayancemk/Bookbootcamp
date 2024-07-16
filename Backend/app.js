import express from 'express';
import userRoutes from './routes/userRoutes.js'
import booksRoutes from './routes/bookRoutes.js'
import favouritesRoutes from './routes/favouritesRoutes.js'
import cartRoutes from './routes/cartRoutes.js'
import orderRoutes from './routes/orderRoutes.js'

const app=express();
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}))


//import routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/books',booksRoutes);
app.use('/api/v1/favourites',favouritesRoutes);
app.use('/api/v1/cart',cartRoutes);
app.use('/api/v1/order',orderRoutes);

export default app;