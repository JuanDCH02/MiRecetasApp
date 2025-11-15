import type { Recipe } from "../../types"


type CommentListProps = {
    ingredients: Recipe['ingredients']
}

export const IngredientList = ({ingredients} : CommentListProps) => {

    return (
        <aside className="md:w-72 border-l border-l-gray-300">
            <div className="space-y-2">
                <h3 className="text-center text-xl my-5 p-2 font-bold ">
                    Lista de Ingredientes
                </h3>
                {ingredients.map(ing =>(

                    <p key={ing.name} className="text-center text-lg font-bold text-gray-500"
                        >{ing.name} {ing.amount} {ing.unit}
                    </p>
                )) }
            </div>
        </aside>
    )
}
