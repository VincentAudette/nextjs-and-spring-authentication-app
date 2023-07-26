import { useAuth } from 'context/auth-context';
import { useQuery } from 'react-query';

export default function PreposeAuxClientsAffaireView(){

    const {profile} = useAuth();

    const fetchClients = async () => {
        try{
            const res = await fetch(`/api/getClientAffaireList?token=${profile.token}`);
            if (!res.ok) {
                throw new Error('Network response was not ok');
            }
            return await res.json();
        }catch(err){
            throw new Error(err.message);
        }
    };
    
    const { data: clientsAffaire, isLoading, isError, error } = useQuery('clientAffaireList', fetchClients);
    
    if (isLoading) return <div>Loading...</div>
    if (isError){
        console.log(error);
        return <div>Error occurred</div>
    }
    
    
    return (
        <div>
            <title>Préposé aux clients résidentiels | GTI619 | Labo 5</title>
            <div className="flex flex-col items-center justify-center mb-3">
                <h1 className="titre-section">Préposé aux clients affaire</h1>
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