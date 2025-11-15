import { Router } from "express";
import {body, param} from 'express-validator'
import { AuthController } from "../controllers/authController";
import { handleInputErrors } from "../middlewares/validation";
import { authenticate } from "../middlewares/auth";



const router = Router()


router.post('/create-account',
    body('name')
        .notEmpty().withMessage('Nombre de usuario obligatorio'),
    body('email')
        .isEmail().withMessage('El email no es valido'),
    body('password')
        .isLength({min: 6}).withMessage('La contraseña debe tener al menos 6 caracteres'),
    body('password_confirmation')
        .custom((value, {req}) => {
        if(value != req.body.password){
            throw new Error('La contraseña no es igual')
        }
        return true
    }),
    handleInputErrors,
    AuthController.CreateUser
)

router.post('/login',
    body('password')
        .notEmpty().withMessage('La contraseña es obligatoria'),
    body('email')
        .isEmail().withMessage('El email no es válido'),
    handleInputErrors,
    AuthController.login
)

router.get('/user', authenticate, AuthController.user)






export default router;
