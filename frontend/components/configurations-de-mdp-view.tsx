import { useState } from "react";
import { Settings2 } from "lucide-react";
import ConfigurationMdpModal from "./configuration-mdp-modal";

export default function ConfigurationsDeMotDePasseView(){
    const [configurations, setConfigurations] = useState({
        specialCaracter: false,
        uppercase: true,
        numeros: true,
        nombreCaracteres: [10]
    });
    const [open, setOpen] = useState(false);
    return( 
        <>
        <ConfigurationMdpModal {...{open, setOpen, configurations, setConfigurations}} />
        <div>
             <title>Configurations de mot de passe | GTI619 | Labo 5</title>
                <div className="flex items-center justify-center mb-3">
                 <h1 className="titre-section">Configurations de mot de passe</h1>
                 <div className="grow"/>
                 <button 
                 onClick={()=>{setOpen(true)}}
                 className="rounded-full bg-white text-black p-4 hover:bg-neutral-200">
                    <Settings2  />
                 </button>
                 </div>
                 <hr className="my-5 border border-neutral-800" />
                 <h2 className="mb-5">Valeurs actuels des configurations</h2>
                 <div className=" gap-2 flex-col w-full grid sm:grid-cols-2">
                    <div className="flex justify-between  flex-col border-2 border-neutral-800 blue p-2 rounded-lg">
                        <label className="block " htmlFor="nombreCaracteres">Nombre de caractères requis</label>
                        <p className="text-3xl">{configurations.nombreCaracteres[0]}</p>
                    </div>
                    <div className="flex justify-between  flex-col border-2 border-neutral-800 blue p-2 rounded-lg">
                        <label className="block " htmlFor="majuscule">Caractère en majuscule requis</label>
                        <p className="text-3xl">{configurations.uppercase ? "Oui":"Non"}</p>
                    </div>
                    <div className="flex justify-between  flex-col border-2 border-neutral-800 blue p-2 rounded-lg">
                        <label className="block " htmlFor="numeros">Numéros requis</label>
                        <p className="text-3xl">{configurations.numeros ? "Oui":"Non"}</p>
                    </div>
                    <div className="flex justify-between  flex-col border-2 border-neutral-800 blue p-2 rounded-lg">
                        <label className="block " htmlFor="nombreCaracteres">Caractères spéciale requis</label>
                        <p className="text-3xl">{configurations.specialCaracter ? "Oui":"Non"}</p>
                    </div>
                 </div>

                 
             </div></>
             )
 }