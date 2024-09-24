import express from 'express';
import { UpdateUser,deleteUser,getSingleUser,getAllUsers, getMyAppointments, getUserProfile } from '../Controllers/userControlers.js';
import { authenticate,restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.get('/', authenticate,  restrict(["admin"]), getAllUsers);
router.get('/:id',authenticate,  restrict(["patient"]), getSingleUser);
router.put('/:id', authenticate,  restrict(["patient"]), UpdateUser);
router.delete('/:id',authenticate,  restrict(["patient"]), deleteUser);
router.delete('/profile/me',authenticate,  restrict(["patient"]), getUserProfile);
router.delete('/appointments/my-appointments',authenticate,  restrict(["patient"]), getMyAppointments);

export default router;