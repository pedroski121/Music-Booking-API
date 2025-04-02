import express from 'express';
import { body } from 'express-validator';
import { auth } from '../auth/auth.middleware';
import { currentUserController, deleteCurrentUserAccount, updateCurrentUser } from './user.controller';
import { Role } from './user.types';



const router = express.Router();

// Get current-user
router.get('/api/users/me', auth, currentUserController );

// Update current-user name or role
router.patch('/api/users/me', 
    auth,
    body('name').isString().optional(),  
    body("role").isIn(Object.values(Role)).optional(),
    updateCurrentUser
);

// Delete current-user account 
router.delete('/api/users/me', auth, deleteCurrentUserAccount);

export {router as userRoutes}