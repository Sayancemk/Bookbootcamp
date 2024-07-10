import express from 'express';
import userRoutes from './routes/userRoutes.js'
import booksRoutes from './routes/bookRoutes.js'
const app=express();
app.use(express.json({limit:"10mb"}));
app.use(express.urlencoded({extended:true,limit:"10mb"}))


//import routes
app.use('/api/v1/user',userRoutes);
app.use('/api/v1/books',booksRoutes);

export default app;