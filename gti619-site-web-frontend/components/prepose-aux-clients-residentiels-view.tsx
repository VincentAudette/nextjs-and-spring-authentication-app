import { useAuth } from "context/auth-context";
import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useState } from "react";
import Pagination from "./pagination";

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

    const onPageChange = (newPage) => {
        setPage(newPage);
      };

    return (
        <div>
            <title>Clients résidentiels | GTI619 | Labo 5</title>
                <div className="flex items-center justify-center mb-3">
                    <h1 className="titre-section">Clients résidentiels</h1>
                    <div className="grow"/>
                    <div className="flex gap-2 items-center">
                    <Pagination
                    darkMode={true}
                    currentPage={page}
                    totalPages={clientResidentiels.totalPages}
                    onPageChange={onPageChange}
                    />
                    </div>
                </div>
                <ul className="w-full flex flex-col gap-2">
                    {clientResidentiels.content.length >=1 &&
                        clientResidentiels.content.map(({name},i)=>(
                            <li key={name+i} className="w-full font-semibold rounded-xl bg-neutral-200 text-black px-4 sm:px-6 lg:px-8 py-4" >
                                {name}
                                </li>
                        ))
                    }
                </ul>
            </div>
    )
}