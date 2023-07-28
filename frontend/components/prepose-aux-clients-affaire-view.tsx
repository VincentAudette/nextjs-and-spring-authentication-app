import { useAuth } from 'context/auth-context';
import { useQuery } from 'react-query';
import ErrorQuery, { Error } from './error-query';
import LoadingQuery from './loading-query';
import { useState } from 'react';


export default function PreposeAuxClientsAffaireView(){

    const [page, setPage] = useState(0);

    const {profile} = useAuth();

    

    const fetchClients = async (page = 0) => {
        const res = await fetch(`/api/getClientAffaireList?token=${profile.token}&page=${page}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        return await res.json();
    };
    

    const { data: clientsAffaire, isLoading, isError, error } = useQuery(['clientAffaireList', page], () => fetchClients(page));

    
    if (isLoading) return <LoadingQuery />
    if (isError) return <ErrorQuery error={error as Error} />

    
    
    
    
    return (
        <div>
            <title>Clients résidentiels | GTI619 | Labo 5</title>
            <div className="flex flex-col justify-center mb-3">
                <div className='flex items-center'>
                    <h1 className="titre-section">Clients affaire</h1>
                    <div className='grow'/>
                    <div className="flex gap-2 items-center">
                            Page {page+1} / {clientsAffaire.totalPages}
                            <button className="bg-neutral-700 py-2 px-4 rounded-md" onClick={()=>setPage(page-1)} disabled={page===0}>&larr; Page précédente</button>
                            <button className="bg-neutral-700 py-2 px-4 rounded-md" onClick={()=>setPage(page+1)} disabled={clientsAffaire.last}>Page suivante &rarr;</button>
                        </div>
                </div>
                <ul className="w-full py-3 flex flex-col gap-2">
                    {clientsAffaire.content.length >=1 &&
                        clientsAffaire.content.map(({name})=>(
                            <li className="w-full font-semibold rounded-xl bg-neutral-200 text-black p-4" key={name}>
                                {name}
                                </li>
                        ))
                    }
                </ul>
                </div>
            </div>
    )
}