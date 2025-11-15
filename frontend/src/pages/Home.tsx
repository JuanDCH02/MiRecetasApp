import { useState } from "react"
import { CategoryFilter } from "../components/CategoryFilter"
import { RecipeCard } from "../components/cards/RecipeCard"
import { Title } from "../components/Title"
import { getRecipes } from "../services/RecipeApi"
import {useQuery} from '@tanstack/react-query'

export const Home = () => {

    const [selectedCategory, setSelectedCategory] = useState('todas')
    const handleCategoryChange = (category: string) => {
        setSelectedCategory(category)
    };

    const {data, isLoading} = useQuery({
        queryKey:['recipes'],
        queryFn: getRecipes
    })

     const filteredRecipes = data?.filter(recipe => {
        // Si la categoría es 'todas' retornamos tal cual
        if (selectedCategory === 'todas') {
            return true;
        }
        //verificamos si la categoría está incluida en los tags de la receta
        return recipe.tags.includes(selectedCategory);
    });
    return (
        <>
            {isLoading && <Title>Cargando ...</Title>}
            <CategoryFilter onCategoryChange={handleCategoryChange} />
            <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 justify-items-center gap-3">

                {!isLoading && (!filteredRecipes || filteredRecipes.length === 0) ? (
                    <p className="text-center col-span-3 text-gray-500 text-xl">
                        No hay recetas disponibles
                    </p>
                ) : (
                    filteredRecipes?.map((recipe) => (
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
