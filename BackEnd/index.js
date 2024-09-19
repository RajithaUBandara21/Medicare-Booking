import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

const corsOptions = {
    origin:true,
};

app.get('/', (req, res) => {
    res.send('Hello World!');

}); 

// MongoDB Connection

mongoose.set('strictQuery', false);
const connectDB = async () =>{
    try{
        await mongoose.connect(process.env.MONGO_URL, {
// userNewUrlParser: true,
// userUnifiedTopology: true,
    });
    console.log('MongoDB is connected');
} catch (error) {
    console.error(error.message);
 
}}

// middleware

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());


app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port: ${port}`);
});