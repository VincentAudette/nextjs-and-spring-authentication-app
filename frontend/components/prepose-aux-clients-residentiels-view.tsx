import { useAuth } from "context/auth-context";
import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useState } from "react";

export default function PreposeAuxClientsResidentielsView(){

    const [page, setPage] = useState(0);

    const {profile} = useAuth();

   
    const fetchClients = async (page = 0) => {
        const res = await fetch(`/api/getClientResidentielList?token=${profile.token}&page=${page}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        return await res.json();
    };

const { data: clientResidentiels, isLoading, isError, error } = useQuery(['clientResidentielList', page], () => fetchClients(page));
    
    if (isLoading) return <LoadingQuery />
    if (isError) return <ErrorQuery error={error as Error} />

    return (
        <div>
            <title>Clients résidentiels | GTI619 | Labo 5</title>
                <div className="flex items-center justify-center mb-3">
                    <h1 className="titre-section">Clients résidentiels</h1>
                    <div className="grow"/>
                    <div className="flex gap-2 items-center">
                        Page {page+1} / {clientResidentiels.totalPages}
                        <button className="bg-neutral-700 py-2 px-4 rounded-md focus-dark" onClick={()=>setPage(page-1)} disabled={page===0}>&larr; Page précédente</button>
                        <button className="bg-neutral-700 py-2 px-4 rounded-md focus-dark" onClick={()=>setPage(page+1)} disabled={clientResidentiels.last}>Page suivante &rarr;</button>
                    </div>

                </div>
                <ul className="w-full  flex flex-col gap-2">
                    {clientResidentiels.content.length >=1 &&
                        clientResidentiels.content.map(({name},i)=>(
                            <li key={name+i} className="w-full font-semibold rounded-xl bg-neutral-200 text-black p-4" >
                                {name}
                                </li>
                        ))
                    }
                </ul>
            </div>
    )
}