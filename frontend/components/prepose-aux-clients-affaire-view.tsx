import { useAuth } from 'context/auth-context';
import { useQuery } from 'react-query';
import ErrorQuery, { Error } from './error-query';
import LoadingQuery from './loading-query';


export default function PreposeAuxClientsAffaireView(){

    const {profile} = useAuth();

    const fetchClients = async () => {
        const res = await fetch(`/api/getClientAffaireList?token=${profile.token}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        return await res.json();
    };
    
    const { data: clientsAffaire, isLoading, isError, error } = useQuery('clientAffaireList', fetchClients);

    
    if (isLoading) return <LoadingQuery />
    if (isError) return <ErrorQuery error={error as Error} />
    
    
    
    return (
        <div>
            <title>Préposé aux clients résidentiels | GTI619 | Labo 5</title>
            <div className="flex flex-col items-center justify-center mb-3">
                <h1 className="titre-section text-left w-full">Préposé aux clients affaire</h1>
                <ul className="w-full py-3 flex flex-col gap-2">
                    {clientsAffaire.content.length >=1 &&
                        clientsAffaire.content.map(({name})=>(
                            <li className="w-full text-lg font-semibold rounded-sm bg-neutral-200 text-black p-4" key={name}>
                                {name}
                                </li>
                        ))
                    }
                </ul>
                </div>
            </div>
    )
}