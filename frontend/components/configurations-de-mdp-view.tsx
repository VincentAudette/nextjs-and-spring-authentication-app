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
                    {
                        [
                            {label: "Nombre de caractères requis", value: configurations.nombreCaracteres[0]},
                            {label: "Caractères spéciaux", value: configurations.specialCaracter ? "Oui":"Non"},
                            {label: "Caractères en majuscule", value: configurations.uppercase ? "Oui":"Non"},
                            {label: "Numéros", value: configurations.numeros ? "Oui":"Non"},
                            
                        ].map(({label, value})=>(
                            <div
                            key={label}
                            className="flex justify-between  flex-col bg-white text-neutral-800 p-2 rounded-lg">
                                <label className="block " htmlFor="nombreCaracteres">{label}</label>
                                <p className="text-3xl">{value}</p>
                            </div>
                        ))
                    }
                    
                 </div>

                 
             </div></>
             )
 }