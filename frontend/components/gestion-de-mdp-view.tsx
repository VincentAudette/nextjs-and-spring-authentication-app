import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";
import { getDisplayNameRole } from "./layout";
import UserSecurityInfo from "./user-security-info";

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
            <title>Utilisateurs | GTI619 | Labo 5</title>
            <div className="flex flex-col justify-center mb-3">
                <h1 className="titre-section mb-5">Liste d&apos;utilisateurs</h1>
                <div className="grow"/>
                <div className="flex flex-col gap-4">
                    {
                        users.length >= 1 &&
                        users.map(user=>(
                            <UserSecurityInfo user={user} key={user.username}/>
                        ))
                    }
                </div>
             
                </div>
            </div>)
}