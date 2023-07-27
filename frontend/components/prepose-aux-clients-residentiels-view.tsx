import { useAuth } from "context/auth-context";
import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";

export default function PreposeAuxClientsResidentielsView(){

    const {profile} = useAuth();

    const fetchClients = async () => {
        const res = await fetch(`/api/getClientResidentielList?token=${profile.token}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        return await res.json();
    };
    
    const { data: clientResidentiels, isLoading, isError, error } = useQuery('clientResidentielList', fetchClients);
    
    if (isLoading) return <LoadingQuery />
    if (isError) return <ErrorQuery error={error as Error} />

    return (
        <div>
            <title>Préposé aux clients résidentiels | GTI619 | Labo 5</title>
            <div className="flex items-center justify-center mb-3">
                <h1 className="titre-section">Préposé aux clients résidentiels</h1>
                <div className="grow"/>
                </div>
                <ul className="w-full  flex flex-col gap-2">
                    {clientResidentiels.content.length >=1 &&
                        clientResidentiels.content.map(({name},i)=>(
                            <li key={name+i} className="w-full text-lg font-semibold rounded-sm bg-neutral-200 text-black p-4" >
                                {name}
                                </li>
                        ))
                    }
                </ul>
            </div>
    )
}