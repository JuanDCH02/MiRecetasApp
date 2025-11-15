import { isAxiosError } from "axios";
import { api } from "../lib";
import { userSchema, type UserLoginForm, type UserRegisterForm } from "../types";

export const createAccount = async(formData : UserRegisterForm) => {
    try {
        const {data} = await api.post<string>('/auth/create-account', formData)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export const authenticate = async(formData : UserLoginForm) => {
    try {
        const {data} = await api.post<string>('/auth/login', formData)
        
        localStorage.setItem('autenticationToken', data)
        return data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}
export async function getUser() {
    const token = localStorage.getItem('autenticationToken') 

    try {
        const {data} = await api('/auth/user', 
            { headers: { Authorization: `Bearer ${token}`} })
        const res = userSchema.safeParse(data)
        if(res.success) return res.data
    } catch (error) {
        if(isAxiosError(error) && error.response){
            throw new Error(error.response.data.error)
        }
    }
}