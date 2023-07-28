import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";
import { getDisplayNameRole } from "./layout";

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
                            <div key={user.id} className="py-5 px-6 rounded-xl bg-neutral-50 text-neutral-950 ">
                                <div className="flex justify-between border-b pb-3 mb-4">
                                    <p className=" font-bold" > Nom d&apos;utilisateur : {user.username}</p>
                                    <div className="flex gap-2 text-xs items-center">
                                        <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1  font-medium text-red-800">
                                        <span className=" border-r pr-2 border-red-800">Role</span>
                                        <span className="font-semibold pl-2">{getDisplayNameRole(user.role)}</span>
                                        </span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 divide-x space-x-3">

                                    <section className="px-2">
                                    <p>Informations des sessions</p> 
                                
                                    </section>
                                    <section className="px-2 pl-5">
                                    <p>Tentatives de connexion</p> 

                                    </section>
                                </div>
                                <button className="focus-light w-full bg-white shadow-sm hover:shadow-none  hover:bg-neutral-100 text-neutral-700 text-center rounded-md mt-5">
                                    <p className="px-4 py-2">Revoquer le mot de passe </p>
                                    </button>
                            
                            </div>
                        ))
                    }
                </div>
             
                </div>
            </div>)
}