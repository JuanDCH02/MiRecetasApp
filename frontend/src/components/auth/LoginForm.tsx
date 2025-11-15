import {useForm} from 'react-hook-form'
import { Title } from '../Title'

export const LoginForm = () => {

    const {register, handleSubmit, reset} = useForm()

    const handleLogin = (formData)=> {
        
        console.log(formData)
        
        reset()
    }
    return (
        <>
            <Title>Iniciar Sesión</Title>
            <form onSubmit={handleSubmit(handleLogin)}
                className=" mt-10 space-y-3 p-5 bg-emerald-100 rounded-lg shadow-lg"
            >
                
                <div>
                    <label htmlFor="username"
                    className="block mb-1 font-bold text-gray-700">
                        Ingrese su nombre de ususario:
                    </label>
                    <input type="text" id="username"
                        placeholder="Email@ejemplo.com"
                        className='bg-white w-full rounded p-3 '
                        {...register("username", {
                                required: "Nombre de usuario es obligatoro",
                            })}
                    />
                </div>

                <div>
                    <label htmlFor="password"
                    className="block mb-1 font-bold text-gray-700">
                        Ingrese su contraseña:
                    </label>
                    <input type="password" id="password"
                        placeholder="Contrase***"
                        className='bg-white w-full rounded p-3'
                        {...register("password", {
                                required: "La contraseña es obligatoro",
                            })}
                    />
                </div>

                <input type="submit" 
                    value='inicia Sesión'
                    className='bg-indigo-500 text-white font-semibold rounded p-3 hover:bg-indigo-800
                    cursor-pointer'
                />
                


            </form>
        </>
    )
}
