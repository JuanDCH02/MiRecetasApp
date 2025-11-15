import { recipeTags } from "../types"


interface CategoryFilterProps {
    onCategoryChange: (category: string) => void;
}

export const CategoryFilter = ({onCategoryChange}: CategoryFilterProps) => {

    const handleChange = (e: { target: { value: string } }) => {
        onCategoryChange(e.target.value)
    }

    return (
        <div className="bg-indigo-500 p-3 max-w-3xl mx-auto my-6 text-white rounded-lg
        shadow-md flex justify-around">

            <h2 className="font-black text-2xl">Filtra según tus gustos</h2>
            <select className="bg-indigo-600 rounded p-2 focus:outline-0"
                onChange={handleChange}
            >
                <option value="todas">Todas</option>
                {recipeTags.map(tag => (
                    <option key={tag} value={tag}
                    className="capitalize"
                        >{tag}
                    </option>
                ))}
            </select>

        </div>
    )
}
