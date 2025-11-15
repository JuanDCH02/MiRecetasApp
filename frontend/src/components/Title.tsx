

export const Title = ({children} : {children: React.ReactNode}) => {
    return (
        <p className="text-center text-4xl font-black text-gray-500 capitalize
        my-4 text-shadow-lg/20">
            {children}
        </p>
    )
}
