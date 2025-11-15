import { isAxiosError } from "axios";
import { api } from "../lib";
import { type Recipe } from "../types";

export const createComment = async(id: Recipe['_id'], content: string)=> {
    const token = localStorage.getItem('autenticationToken')

    try {
        const {data} = await api.post<string>(`/recipes/${id}/comment`,{content}
            , { headers: { Authorization: `Bearer ${token}`} })
        return data
        
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error || 'Error al crear el comentario')
        }
    }
}