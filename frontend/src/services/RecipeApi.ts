import { isAxiosError } from "axios";
import { api } from "../lib";
import { DashboardRecipeSchema, RecipeSchema, type CreateRecipeFormValues, type Recipe } from "../types";



export const getRecipes = async() => {
    try {
        const {data} = await api('/recipes/')
        const res = DashboardRecipeSchema.safeParse(data)
        if(res.success) return res.data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const getRecipeById = async(id : Recipe['_id']) => {
    try {
        const {data} = await api(`/recipes/${id}`)
        const res = RecipeSchema.safeParse(data)
        if(res.success) return res.data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const getUserRecipes = async() => {
    const token = localStorage.getItem('autenticationToken')
    try {
        const {data} = await api(`/recipes/my-recipes`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        const res = DashboardRecipeSchema.safeParse(data)
        if(res.success) return res.data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const getUserFavorites = async() => {
    const token = localStorage.getItem('autenticationToken')
    try {
        
        const {data} = await api(`/recipes/favorites`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        const res = DashboardRecipeSchema.safeParse(data)
        if(res.success) return res.data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const toggleFavorites = async(id: Recipe['_id']) => {
    const token = localStorage.getItem('autenticationToken')
    try {
        
        const {data} = await api.post<{message:string, likesCount:number}>(`/recipes/${id}/favorite`,
            {}, {
                headers: { Authorization: `Bearer ${token}`}
            })
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const createRecipe = async(formData : CreateRecipeFormValues) => {
    const token = localStorage.getItem('autenticationToken')
    try {
        const {data} = await api.post<string>(`/recipes`, formData, {
            headers: { Authorization: `Bearer ${token}`}
        })
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const updateRecipe = async({formData, id}:{formData: CreateRecipeFormValues,id: Recipe['_id']}) => {
    const token = localStorage.getItem('autenticationToken')
    try {
        const {data} = await api.put<string>(`/recipes/${id}`, formData, {
            headers: { Authorization: `Bearer ${token}`}
        })
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}

export const deleteRecipe = async(id: Recipe['_id']) => {
    const token = localStorage.getItem('autenticationToken')
    try {
        const {data} = await api.delete<string>(`/recipes/${id}`, {
            headers: { Authorization: `Bearer ${token}`}
        })
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}