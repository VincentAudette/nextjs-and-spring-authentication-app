import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";
import { getDisplayNameRole } from "./layout";
import UserSecurityInfo from "./user-security-info";
import { PlusIcon } from "lucide-react";
import ModalGeneric from "./modal-generic";
import { useState } from "react";
import FormulaireCreationUtilisateur from "./formulaire-creation-utilisateur";

export default function ListeUtilisateurs(){

    const [open, setOpen] = useState(false);

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
    

    const { data: users, isLoading, isError, error } = useQuery('users', fetchUsers);

    console.log(users);

    

    
    if (isLoading) return <LoadingQuery />
    if (isError) return <ErrorQuery error={error as Error} />

   return( <div>
    <ModalGeneric {...{ open, setOpen, titre: "Ajouter un utlisateur" }}>
        <FormulaireCreationUtilisateur {...{ setOpen }} />
        {/* <FormulaireConfigurationsMdp {...{ configurations, setConfigurations, setOpen }} /> */}
      </ModalGeneric>
            <title>Utilisateurs | GTI619 | Labo 5</title>
            <div className="flex flex-col justify-center mb-3">
                <div className="flex items-center border-b-2 mb-5 pb-5 border-neutral-700/50">
                <h1 className="titre-section">Liste d&apos;utilisateurs</h1>
                <div className="grow"/>
                <button 
                 onClick={()=>{setOpen(true)}}
                 className="rounded-full bg-neutral-600 text-white p-2 hover:bg-neutral-700 focus-dark">
                    <PlusIcon className="w-5 h-5"  />
                 </button>
                 </div>
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