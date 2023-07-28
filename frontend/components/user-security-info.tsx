import { useState } from "react";
import { getDisplayNameRole } from "./layout";

export default function UserSecurityInfo({user}){
    const [expanded, setExpanded] = useState(false);

    return (<div key={user.id} className="py-5 px-6 rounded-xl bg-neutral-200 text-neutral-950 ">
    <button 
    onClick={()=>setExpanded(!expanded)}
    className="flex justify-between w-full p-5 rounded-2xl hover:bg-neutral-300">
        <p className=" font-bold" > Nom d&apos;utilisateur : {user.username}</p>
        <div className="flex gap-2 text-xs items-center">
            <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1  font-medium text-red-800">
            <span className=" border-r pr-2 border-red-800">Role</span>
            <span className="font-semibold pl-2">{getDisplayNameRole(user.role)}</span>
            </span>
        </div>
    </button>
    {expanded && (
        <>
        <hr className="border-b border-neutral-300 rounded-full mt-2" />

<div className="flex flex-col divide-y">

    <section className="py-2">
    <p>Informations des sessions</p> 

    </section>
    <hr className="border-b border-neutral-300 rounded-full" />
    <section className="py-2">
    <p>Journalisation des connexions</p> 

    </section>
</div>
<button className="focus-light w-full bg-white shadow-sm hover:shadow-none  hover:bg-neutral-100 text-neutral-700 text-center rounded-md mt-5">
    <p className="px-4 py-2">Revoquer le mot de passe </p>
    </button></>

    )}
    

</div>)
}