import {connectDB} from './config/db.js';
import express from 'express';
import dotenv from  'dotenv';
import productRoutes from './routes/product.route.js'

dotenv.config()

const PORT = process.env.PORT;

const app = express()

app.use(express.json()) //alows to accept JSON data

app.use('/api/products', productRoutes)

app.listen(PORT, () => {
    connectDB();
    console.log('Server is running on port ' + PORT);
})
