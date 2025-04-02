import express from 'express';
import { body } from 'express-validator';
import { Role } from '../users/user.types';
import { loginController, registerController } from './auth.controller';

const router = express.Router();


// Create a new user
router.post('/api/auth/register', 
    body("email").isEmail().notEmpty(),
    body("password").isLength({min:5}).notEmpty(), 
    body("name").isString().notEmpty(),
    body("role").isIn(Object.values(Role)).optional(),
    registerController
); 

// Login a user
router.post('/api/auth/login',
    body("email").isEmail().notEmpty(),
    body("password").isLength({min:5}).notEmpty(), 
    loginController
); 







export {router as authRoutes}