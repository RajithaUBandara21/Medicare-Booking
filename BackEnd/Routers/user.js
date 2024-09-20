import express from 'express';
import { UpdateUser,deleteUser,getSingleUser,getAllUsers } from '../Controllers/userControlers.js';
import { authenticate,restrict } from '../auth/verifyToken.js';

const router = express.Router();

router.get('/', authenticate,  restrict(["admin"]), getAllUsers);
router.get('/:id',authenticate,  restrict(["patient"]), getSingleUser);
router.put('/:id', authenticate,  restrict(["patient"]), UpdateUser);
router.delete('/:id',authenticate,  restrict(["patient"]), deleteUser);

export default router;