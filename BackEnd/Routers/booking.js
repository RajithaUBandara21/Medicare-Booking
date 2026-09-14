import express from 'express';
import {
    createBooking,
} from '../Controllers/bookingController.js';
import { authenticate, restrict } from '../auth/verifyToken.js';


const router = express.Router({ mergeParams: true });

router.route('/')
.post(authenticate, restrict(["patient"]), createBooking)

export default router;
