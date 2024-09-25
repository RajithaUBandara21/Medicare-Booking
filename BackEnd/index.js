import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import authRoute from './Routers/auth.js';
import userRoute from './Routers/user.js';
import doctorRoute from './Routers/doctor.js';
import reviewRoute from './Routers/review.js';


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

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use('/api/v1/auth', authRoute);
app.use('/api/v1/users', userRoute);
app.use('/api/v1/doctors', doctorRoute);
app.use('/api/v1/reviews', reviewRoute);



app.listen(port, () => {
    connectDB();
    console.log(`Server is running on port: ${port}`);
});



