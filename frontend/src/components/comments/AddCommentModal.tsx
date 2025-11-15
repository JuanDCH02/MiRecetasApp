import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"
import { createComment } from "../../services/CommentApi"
import { toast } from "sonner"
import type { Recipe } from "../../types"
import { useNavigate, useParams } from "react-router-dom"


export default function AddCommentModal() {

    const {recipeId} = useParams()
    const navigate = useNavigate()
    const [comment, setComment] = useState('')
    const queryClient = useQueryClient()

    const {mutate} = useMutation({
        mutationFn:({ id, content }: { id:Recipe['_id'], content:string }) =>createComment(id, content),
        onError(error){
            toast.error(error.message)
        },
        onSuccess(data){
            toast.success(data)
            setComment('')
            queryClient.invalidateQueries({ queryKey: ["recipeData", recipeId] })
            navigate(`/recipes/${recipeId}`)
        }
    })

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault()
        if (!comment.trim()) return toast.error("El comentario no puede estar vacío") 
            
        mutate({id: recipeId!, content:comment})
    }

    return (
        <>
            <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
                <div className="bg-white rounded-lg shadow-xl p-6 w-1/2">
                    <div className="flex justify-between">
                        <h2 className="text-2xl font-bold mb-4">Agregar Comentario</h2>
                        <p className=" text-red-600 text-xl font-bold my-0 cursor-pointer "
                            onClick={() => navigate(-1)}
                            >X
                        </p>
                    </div>
                    <form onSubmit={handleSubmit} >
                        <input type="text" value={comment}
                        onChange={(e) => setComment(e.target.value)}
                         className="border border-gray-300 p-2 rounded w-full mb-4"
                         placeholder="Escribe tu comentario aquí..."
                        />
                        <button className="bg-indigo-500 text-white px-4 py-2 rounded hover:bg-indigo-600 cursor-pointer"
                            >Enviar Comentario
                        </button>
                    </form>
                </div>
            </div>
        
        </>
    )
}
