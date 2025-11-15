import { useForm } from "react-hook-form";
import { Link } from "react-router-dom";
import type { UserRegisterForm } from '../../types';
import ErrorMessage from "../../components/ErrorMessage";
import { createAccount } from "../../services/AuthApi";
import { useMutation } from "@tanstack/react-query";
import { toast } from "sonner";

export default function RegisterView() {
  
  const initialValues: UserRegisterForm = {
    name: '',
    email: '',
    password: '',
    password_confirmation: '',
  }

  const { register, handleSubmit, watch, reset, formState: { errors } } = useForm<UserRegisterForm>({ defaultValues: initialValues });
  const password = watch('password')

  const {mutate} = useMutation({
    mutationFn: createAccount,
    onError:(error)=> {
        toast.error(error.message)
    },
    onSuccess:(data)=> {
        toast.success(data)
        reset()
    }
  })

  const handleRegister = (formData: UserRegisterForm) => mutate(formData)

  return (
    <>
        <p className="text-2xl font-light text-white mt-5">
            Llena el formulario para
            <span className=" text-teal-300 font-bold text-shadow-lg/20"> crear tu cuenta</span>
        </p>

        <form
            onSubmit={handleSubmit(handleRegister)}
            className="space-y-5 p-10 bg-white mt-5"
            noValidate
        >
        <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
                htmlFor="email"
                >Email
            </label>
            <input
                id="email"
                type="email"
                placeholder="Email de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("email", {
                required: "El Email de registro es obligatorio",
                pattern: {
                    value: /\S+@\S+\.\S+/,
                    message: "E-mail no válido",
                },
                })}
            />
            {errors.email && (
                <ErrorMessage>{errors.email.message}</ErrorMessage>
            )}
        </div>

        <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
                >Nombre de usuario
            </label>
            <input
                type="name"
                placeholder="Nombre de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("name", {
                required: "El Nombre de usuario es obligatorio",
                })}
            />
            {errors.name && (
                <ErrorMessage>{errors.name.message}</ErrorMessage>
            )}
        </div>

        <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
                >Contraseña
            </label>

            <input
                type="password"
                placeholder="Password de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("password", {
                required: "La contraseña es obligatoria",
                minLength: {
                    value: 6,
                    message: 'La contraseña debe ser mínimo de 6 caracteres'
                }
                })}
            />
            {errors.password && (
                <ErrorMessage>{errors.password.message}</ErrorMessage>
            )}
        </div>

        <div className="flex flex-col gap-5">
            <label
                className="font-normal text-2xl"
                >Repetir Contraseña
            </label>

            <input
                id="password_confirmation"
                type="password"
                placeholder="Repite Password de Registro"
                className="w-full p-3  border-gray-300 border"
                {...register("password_confirmation", {
                required: "Repetir la contraseña es obligatorio",
                validate: value => value === password || 'Las contraseñas no son iguales'
                })}
            />

            {errors.password_confirmation && (
                <ErrorMessage>{errors.password_confirmation.message}</ErrorMessage>
            )}
        </div>

        <input
            type="submit"
            value='Registrarme'
            className="bg-indigo-500 hover:bg-indigo-800 w-full p-3  text-white font-black  text-xl cursor-pointer"
        />
      </form>

        <nav className="mt-10 flex flex-col space-y-3">
            <Link to={`/auth/login`}
            className="text-center font-light text-white"
                >¿Ya tienes una cuenta? Ingresa aquí
            </Link>
        </nav>
    </>
  )
}