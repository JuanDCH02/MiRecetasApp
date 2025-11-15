import type { Request, Response } from 'express';
import Recipe, { IRecipe } from '../models/Recipe';
import User, { IUser } from '../models/User';
import cloudinary from '../config/cloudinary';
import streamifier from 'streamifier';

// helper que sube buffer a cloudinary usando upload_stream
const uploadBufferToCloudinary = (fileBuffer: Buffer, folder = 'recipes') => {
  return new Promise<any>((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { folder, transformation: [{ width: 1200, crop: 'limit' }] },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );
    streamifier.createReadStream(fileBuffer).pipe(uploadStream);
  });
};

export class RecipeController {

    static CreateRecipe = async (req: Request<{}, IRecipe, {}  >, res: Response) => {
        if (!req.user) return res.status(401).json({ error: 'No autorizado' })
        try {
            const recipe = new Recipe(req.body)
            recipe.author = req.user._id
            
            await recipe.save()
            return res.status(201).send('Receta creada correctamente')
        } catch (error) {
            console.log(error)
        }
    }

    static GetAllRecipes = async (req: Request, res: Response) => {
        try {
            const recipes = await Recipe.find()
            if(recipes) return  res.json(recipes)
            return res.json({error:'No hay recetas disponibles'})
           
        } catch (error) {
            console.log(error)
        }
    }

    static GetUserRecipes = async (req: Request, res: Response) => {
        try {
            const recipes = await Recipe.find({
                //obtiene todas las recetas del usuario logeado
                $or:[
                    { author:{$in: req.user._id} }
                ]
            })
            if(recipes) return  res.json(recipes)
            return res.json({error:'No hay recetas disponibles'})
           
        } catch (error) {
            console.log(error)
        }
    }

    static GetFavoritesRecipes = async (req: Request, res: Response) => {
        try {
            const recipes = await Recipe.find({
                _id: {$in: req.user.favorites}
            })
            if(recipes) return res.json(recipes)
            return res.json({error:'No hay recetas disponibles'})
           
        } catch (error) {
            console.log(error)
        }
    }

    static GetRecipeById = async (req: Request, res: Response) => {
        const {recipeId} = req.params
        try {
            const recipe = await Recipe.findById(recipeId).populate('comments')
            
            if(recipe) return res.json(recipe)
            return res.json({error:'Receta no encontrada'})
           
        } catch (error) {
            console.log(error)
        }
    }

    static UpdateRecipe = async (req: Request, res: Response) => {
        if (!req.user) return res.status(401).json({ error: 'No autorizado' })
        const {recipeId} = req.params

        try {
            const recipe = await Recipe.findById(recipeId)

            if(recipe){
                //si el autor es distinto al logeado no la puede editar
                if(recipe.author.toString() !== req.user._id.toString()) return res.json({error:'Sin permisos'})
                recipe.title = req.body.title
                recipe.cookTime = req.body.cookTime
                recipe.portions = req.body.portions
                recipe.steps = req.body.steps
                recipe.ingredients = req.body.ingredients
                recipe.tags = req.body.tags
                
                await recipe.save()
                return res.send('Receta actualizada correctamente')
            }
            return res.json({error:'Receta no encontrada'})
           
        } catch (error) {
            console.log(error)
        }
    }

    static DeleteRecipe = async (req: Request, res: Response) => {
        if (!req.user) return res.status(401).json({ error: 'No autorizado' })
        const {recipeId} = req.params

        try {
            const recipe = await Recipe.findById(recipeId)
            
            if(recipe){
                //si el autor es distinto al logeado no la puede eliminar
                if(recipe.author.toString() !== req.user._id.toString()) return res.json({error:'Sin permisos'})
                await recipe.deleteOne()
                // Elimina la receta de los favoritos de todos los usuarios
                await User.updateMany(
                    { favorites: recipeId },
                    { $pull: { favorites: recipeId } }
                )                
                return res.send('Receta eliminada correctamente')
            } 
            return res.send('Receta no encontrada')
           
        } catch (error) {
            console.log(error)
        }
    }
    
    static FavoriteRecipe = async (req: Request, res: Response) => {
        if (!req.user) return res.status(401).json({ error: 'No autorizado' })
        const { recipeId } = req.params;
        let message = '';

        try {
            const user = await User.findById(req.user._id)
            if (!user) return res.status(404).send('Usuario no encontrado');

            const recipe = await Recipe.findById(recipeId);
            if (!recipe) return res.status(404).send('Receta no encontrada');

            // Verifica si no está en favoritos y la agregamos
            if (!user.favorites.includes(recipeId)) {
                user.favorites.push(recipeId)
                recipe.likesCount += 1
                recipe.isLiked = true
                message = 'Receta agregada a favoritos'
            } else {
                //si ya estaba la eliminamos
                user.favorites = user.favorites.filter(recipe => recipe.toString() !== recipeId.toString())
                recipe.likesCount = Math.max(recipe.likesCount - 1, 0)
                recipe.isLiked = false
                message = 'Receta eliminada de favoritos'
            }
            await user.save()
            await recipe.save()
            return res.json({message, likesCount:recipe.likesCount})

        } catch (error) {
            console.log(error);
            res.status(500).send('Error al agregar a favoritos');
        }
    }

    
}