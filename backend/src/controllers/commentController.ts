import type { Request, Response } from 'express';
import Comment from '../models/Comment';
import Recipe from '../models/Recipe';


export class CommentController {
    static CreateComment = async (req: Request, res: Response) => {
        if (!req.user) return res.status(401).json({ error: 'No autorizado' })
        const {recipeId} = req.params

        try {
            const comment = new Comment({
                content: req.body.content,
                author_id: req.user._id,
                author_name: req.user.name,
                recipe: recipeId
            })

            const recipe = await Recipe.findById(recipeId)
            recipe.comments.push(comment._id)
            await Promise.allSettled([ recipe.save(), comment.save() ]) 

            return res.status(201).send('Comentario creado correctamente')
        } catch (error) {
            console.log(error)
            return res.status(500).json({ error: 'Error al crear el comentario' })
        }
    }
    
    static DeleteComment = async (req: Request, res: Response) => {
        if (!req.user) return res.status(401).json({ error: 'No autorizado' })
        const {commentId, recipeId} = req.params
        const recipe = await Recipe.findById(recipeId)

        const comment = await Comment.findById(commentId)
        recipe.comments = recipe.comments.filter(com => com._id.toString() !== commentId.toString())
        try {
            await Promise.allSettled([ recipe.save(), comment.deleteOne() ]) 
            res.send('Comentario eliminado correctamente')   
        } catch (error) {
            console.log(error)
        }
    }
}