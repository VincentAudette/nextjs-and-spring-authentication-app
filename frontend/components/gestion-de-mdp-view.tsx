import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";

export default function GestionDeMotDePasseView(){

    const {profile} = useAuth();
   
   
    const fetchUsers = async () => {
        const res = await fetch(`/api/getUsers?token=${profile.token}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        return await res.json();
    };
    

    const { data: users, isLoading, isError, error } = useQuery('users',fetchUsers);

    console.log(users);
    

    
    if (isLoading) return <LoadingQuery />
    if (isError) return <ErrorQuery error={error as Error} />

   return( <div>
            <title>Gestion de mot de passe | GTI619 | Labo 5</title>
            <div className="flex flex-col justify-center mb-3">
                <h1 className="titre-section mb-5">Gestion de mot de passe</h1>
                <div className="grow"/>
                {
                    users.length >= 1 &&
                    users.map(user=>(
                        <div key={user.id} className="py-5 px-6 rounded-xl bg-neutral-50 text-neutral-950 font-bold">
                            <p > Nom d&apos;utilisateur : {user.username}</p>
                        </div>
                    ))
                }
             
                </div>
            </div>)
}