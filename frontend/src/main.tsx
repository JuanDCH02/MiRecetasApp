import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {Toaster} from 'sonner'
import { router } from './router.tsx'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const queryClient = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>

        {router()}
        <Toaster 
            position='top-right'
            richColors={true}
            duration={3000}
        />
        </QueryClientProvider>
    </StrictMode>,
)
