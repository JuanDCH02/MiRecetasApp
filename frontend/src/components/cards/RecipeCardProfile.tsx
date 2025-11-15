import { useEffect, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import type { RecipeCardProfile } from "../../types";

type recipeCardProfileProps = {
    recipe: RecipeCardProfile
}

export default function RecipeCardProfile({ recipe }: recipeCardProfileProps) {
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const navigate = useNavigate()

    // Ref para detectar clicks fuera del menú
    const menuContainerRef = useRef<HTMLDivElement | null>(null)

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (isMenuOpen && menuContainerRef.current && !menuContainerRef.current.contains(e.target as Node)) {
                setIsMenuOpen(false)
            }
        }

        const handleEsc = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isMenuOpen) {
                setIsMenuOpen(false)
            }
        }

        document.addEventListener('mousedown', handleClickOutside)
        document.addEventListener('keydown', handleEsc)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
            document.removeEventListener('keydown', handleEsc)
        }
    }, [isMenuOpen])

    return (
        <div className="w-5/6 mx-auto flex flex-col md:flex-row justify-between items-start md:items-center bg-white shadow-md p-5 border-b border-b-slate-400 hover:bg-gray-50 gap-4">
            {/* Contenedor imagen y detalles */}
            <div className="flex flex-col md:flex-row gap-6 flex-1 w-full">
                <img 
                    src={recipe.image} className="w-32 h-32 object-cover rounded-lg" alt="recipe-photo" 
                />
                <div className="flex flex-col justify-center">
                    <h2 className="text-3xl font-bold text-gray-600 mb-3">{recipe.title}</h2>
                    <p className="text-gray-500 mb-2 font-medium">
                        Tiempo de preparación: {recipe.cookTime}
                    </p>
                    <p className="text-gray-500 mb-2 font-medium">
                        Porciones: {recipe.portions}
                    </p>
                </div>
            </div>

            {/* Menú desplegable */}
            <div ref={menuContainerRef} className="relative w-full md:w-auto flex justify-end">
                <button 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    className="p-2 hover:bg-gray-100 rounded-full"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-500 cursor-pointer" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                    </svg>
                </button>

                {isMenuOpen && (
                    <div className="absolute right-0 mt-2 w-48 border border-gray-300 rounded-md shadow-lg bg-white z-10">
                        <div className="py-1 cursor-pointer">
                            <Link
                                to={`/recipes/${recipe._id}`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                >Ver receta
                            </Link>
                            <Link
                                to={`/recipes/${recipe._id}/edit`}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-300"
                                >Editar
                            </Link>
                            <button
                                onClick={() => navigate(`/recipes/${recipe._id}/confirm-delete`)}
                                className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-300
                                cursor-pointer"
                                >Eliminar
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
