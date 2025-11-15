import { useQuery } from "@tanstack/react-query"
import { Title } from "../../components/Title"
import { getUserFavorites } from "../../services/RecipeApi"
import { RecipeCard } from "../../components/cards/RecipeCard"


export const UserFavorites = () => {

    const {data, isLoading} = useQuery({
        queryKey: ['userFavorites'],
        queryFn: getUserFavorites
    })

    isLoading && <Title>Cargando ...</Title>

    return (
        <>
            <h1 className="text-5xl text-center font-black text-shadow-md/20 text-teal-600 my-5 
            capitalize">
                mis recetas favoritas
            </h1>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3 justify-items-center">
                {!isLoading && (!data || data.length === 0) ? (
                    <p className="text-center col-span-3 text-gray-500 text-xl">
                        No hay recetas disponibles
                    </p>
                ) : (
                    data?.map((recipe) => (
                        <RecipeCard
                            key={recipe._id}
                            recipe={recipe}
                        />
                    ))
                )}
            </div>
                    
        </>
    )
}
