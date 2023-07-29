import { useAuth } from 'context/auth-context';
import { useQuery } from 'react-query';
import ErrorQuery, { Error } from './error-query';
import LoadingQuery from './loading-query';
import { useState } from 'react';
import Pagination from './pagination';


export default function PreposeAuxClientsAffaireView(){

    const [page, setPage] = useState<number>(0);

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

    const onPageChange = (newPage) => {
        setPage(newPage);
      };
    
    
    
    return (
        <div>
            <title>Clients résidentiels | GTI619 | Labo 5</title>
            <div className="flex flex-col justify-center ">
                <div className='flex items-center mb-3'>
                    <h1 className="titre-section">Clients affaire</h1>
                    <div className='grow'/>
                    <Pagination
                    darkMode={true}
                    currentPage={page}
                    totalPages={clientsAffaire.totalPages}
                    onPageChange={onPageChange}
                    />
                   
                </div>
                <ul className="w-full flex flex-col gap-2 ">
                    {clientsAffaire.content.length >=1 &&
                        clientsAffaire.content.map(({name})=>(
                            <li className="w-full font-semibold px-12 py-6 rounded-xl bg-neutral-200 text-black" key={name}>
                                {name}
                                </li>
                        ))
                    }
                </ul>
                </div>
            </div>
    )
}