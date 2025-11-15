import { Router } from "express";
import {body, param} from 'express-validator'
import { RecipeController } from "../controllers/recipeController";
import { handleInputErrors } from "../middlewares/validation";
import { CommentController } from "../controllers/commentController";
import { recipeExists } from "../middlewares/recipe";
import { authenticate } from "../middlewares/auth";
import upload from "../middlewares/uploads";



const router = Router()

    //recetas
    router.param('recipeId', recipeExists)

router.post('/',
    authenticate,
    body('image')
        .notEmpty().withMessage('La imagen es obligatoria '),
    body('title')
        .notEmpty().withMessage('El título es obligatorio '),
    body('cookTime')
        .notEmpty().withMessage('El tiempo de cocción es obligatorio '),
    body('tags')
        .notEmpty().withMessage('Las etiquetas son obligatorias '),
     body('steps')
         .isArray({min: 2}).withMessage('Coloca al menos dos pasos'), 
    body('ingredients')
         .isArray({min: 2}).withMessage('Coloca al menos dos ingredientes'),
    handleInputErrors,
    RecipeController.CreateRecipe
)
router.post('/:recipeId/favorite',
    authenticate,
    RecipeController.FavoriteRecipe
)
router.get('/', RecipeController.GetAllRecipes)

router.get('/my-recipes', authenticate, RecipeController.GetUserRecipes)

router.get('/favorites', authenticate, RecipeController.GetFavoritesRecipes)

router.get('/:recipeId', handleInputErrors,RecipeController.GetRecipeById)

router.put('/:recipeId',
    authenticate,
    body('title')
        .notEmpty().withMessage('El título es obligatorio '),
    body('cookTime')
        .notEmpty().withMessage('El tiempo de cocción es obligatorio '),
    body('tags')
        .notEmpty().withMessage('Las etiquetas son obligatorias '),
    body('steps')
         .isArray({min: 2}).withMessage('Coloca al menos dos pasos'),
    body('ingredients')
         .isArray({min: 2}).withMessage('Coloca al menos dos ingredientes'),
    handleInputErrors,
    RecipeController.UpdateRecipe
)
router.delete('/:recipeId',authenticate, handleInputErrors,RecipeController.DeleteRecipe)

    //comentarios
router.post('/:recipeId/comment', 
    authenticate,
    body('content')
        .notEmpty().withMessage('El contenido es obligatorio'),
    handleInputErrors,
    CommentController.CreateComment
)
router.delete('/:recipeId/comment/:commentId',
    authenticate,
    handleInputErrors,
    CommentController.DeleteComment
)


export default router;