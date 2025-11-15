import { useMutation, useQueryClient } from "@tanstack/react-query"
import { deleteRecipe } from "../../services/RecipeApi"
import { toast } from "sonner"
import { useNavigate, useParams } from "react-router-dom"


export default function ConfirmDelete() {
    const {recipeId} = useParams()
    const queryClient = useQueryClient()
    const navigate = useNavigate()
    
    const {mutate} = useMutation({
        mutationFn: deleteRecipe,
        onError:(error)=>{
            toast.error(error.message)
        },
        onSuccess:(data)=>{
            toast.success(data)
            queryClient.invalidateQueries({queryKey: ['userRecipes', 'recipes', 'userFavorites']})
            navigate("/recipes/my-recipes")
        }
    })
    return (
        <div className="fixed inset-0 backdrop-blur-lg flex items-center justify-center z-50">
            <div className="bg-white w-2/3 mx-auto p-4 rounded-lg shadow-lg">
                <h3 className="text-center text-2xl font-bold my-5">Desea eliminar esta receta?</h3>
                <div className="flex justify-center gap-5">
                    <button type="submit" onClick={() => mutate(recipeId!)}
                        className="bg-red-500 text-white font-bold px-4 py-2 rounded hover:bg-red-600 cursor-pointer mx-2"
                        >Eliminar
                    </button>
                    <button type="button" onClick={() => navigate("/recipes/my-recipes")}
                        className="bg-gray-500 text-white font-bold px-4 py-2 rounded hover:bg-gray-600 cursor-pointer mx-2"
                        >Cancelar
                    </button>
                </div>
            </div>

        </div>
    )
}
