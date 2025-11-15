import { Request, Response, NextFunction } from "express"
import Recipe, { IRecipe } from "../models/Recipe"

//añado el parametro recipe al objeto request
declare global {
    namespace Express {
        interface Request{
            recipe: IRecipe
        }
    }
}

export async function recipeExists(req:Request, res: Response, next: NextFunction) {
    try {
        const recipe = await Recipe.findById(req.params.recipeId)
        if(!recipe) return res.status(404).json({error: 'Receta no Encontrada'})
        //agrego la receta existente al request
        req.recipe = recipe
        next()
    } catch (error) {
        res.status(500).json({error: 'Hubo un error'})
    }
}