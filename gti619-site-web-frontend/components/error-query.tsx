import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useQueryClient } from 'react-query';

export interface Error {
    status: number;
    message: string;
}

interface ErrorQueryProps {
    error: Error;
}

export default function ErrorQuery({ error }: ErrorQueryProps) {
    const [timeLeft, setTimeLeft] = useState(5);
    const router = useRouter();
    const queryClient = useQueryClient(); 

    useEffect(() => {
        let timer: NodeJS.Timeout;
        if(error.status === 401){
            timer = setInterval(() => {
                if(timeLeft > 0){
                    setTimeLeft(timeLeft-1);
                } else {
                    clearInterval(timer);
                    
                    // Invalidate queries before routing
                    queryClient.invalidateQueries('clientAffaireList');
                    queryClient.invalidateQueries('clientResidentielList');
                    
                    router.push('/');
                }
            }, 1000);
        }
        // Cleanup timer on component unmount
        return () => {
            if (timer) clearInterval(timer);
        };
    }, [timeLeft, error.status, router, queryClient]);

    if (error.status === 401) {
        return (
            <div className='text-center flex flex-col gap-3'>
                <p className='text-xl font-semibold'>Erreur: {error.message}</p>
                <p>Vous serez redirigé à la page d&apos;authentification dans {timeLeft}.</p>
            </div>
        );
    }
    return <div><p>Une erreur s&apos;est produite: {error.message}</p></div>
}
