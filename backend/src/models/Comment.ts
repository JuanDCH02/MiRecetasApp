import mongoose, {Schema, Types} from "mongoose";

export interface IComment {
    content: string
    author_id: Types.ObjectId
    author_name: string
    recipe: Types.ObjectId
}


const CommentSchema : Schema = new Schema({
    content: { type: String, required: true },
    author_id: { type: Types.ObjectId, ref: 'User', required: true },
    author_name: { type: String, required: true },
    recipe: { type: Types.ObjectId, ref: 'Recipe', required: true },
}, {timestamps: true})


const Comment = mongoose.model<IComment>('Comment', CommentSchema)
export default Comment;