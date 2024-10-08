import express from 'express';
import {
  UpdateDoctor,
  deleteDoctor,
  getSingleDoctor,
  getAllDoctors,
  getDoctorProfile,
} from "../Controllers/doctorControler.js";
import reviewRouter from "./review.js";


import {
    authenticate,
    restrict
    } from "../auth/verifyToken.js";


const router = express.Router();

//nested routes
router.use("/:doctorId/reviews", reviewRouter);

router.get('/', getAllDoctors);
router.get('/:id', getSingleDoctor);
router.put('/:id',authenticate,  restrict(["doctor"]), UpdateDoctor);
router.delete('/:id',authenticate,  restrict(["doctor"]), deleteDoctor);

router.get("/profile/me", authenticate, restrict(["doctor"]), getDoctorProfile);

export default router;