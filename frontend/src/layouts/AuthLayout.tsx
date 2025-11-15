import { Outlet } from "react-router-dom"
import { SiCodechef } from 'react-icons/si';

export const AuthLayout = () => {
    return (
        <>
            <div className="bg-teal-800 min-h-screen">

                <div className="py-10 lg:py-20 mx-auto w-[450px] ">
                    <div className="flex gap-4 items-center text-shadow-lg/30">
                        <h1 className="text-white text-5xl font-black "
                            >Mi Receta App
                        </h1>
                        <SiCodechef className="text-5xl text-white"/>
                    </div>
                    
                
                    <div className="mt-10 ">
                        <Outlet/>
                    </div>
                </div>

            </div>
        </>
    )
}
