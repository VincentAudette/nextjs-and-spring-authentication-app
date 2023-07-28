import { useState } from "react";
import { Settings2 } from "lucide-react";
import ModalGeneric from "./modal-generic";
import FormulaireConfigurationsMdp from "./formulaire-configurations-mdp";

export default function ParametresDeSecurite(){
    const [configurations, setConfigurations] = useState({
        specialCaracter: false,
        uppercase: true,
        numeros: true,
        nombreCaracteres: [10]
    });
    const [open, setOpen] = useState(false);
    return( 
        <>
        <ModalGeneric {...{open, setOpen, titre:"Modification des paramètres de sécurité"}}>
            <FormulaireConfigurationsMdp {...{configurations, setConfigurations, setOpen}}/>
        </ModalGeneric>
        <div>
             <title>Paramètres de sécurité | GTI619 | Labo 5</title>
                <div className="flex items-center justify-center mb-3">
                 <h1 className="titre-section">Paramètres de sécurité</h1>
                 <div className="grow"/>
                 <button 
                 onClick={()=>{setOpen(true)}}
                 className="rounded-full bg-neutral-600 text-white p-2 hover:bg-neutral-700 focus-dark">
                    <Settings2 className="w-5 h-5"  />
                 </button>
                 </div>
                 <hr className="my-5 border border-neutral-800" />
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
                            className="flex justify-between items-center flex-col bg-neutral-200 text-neutral-800 px-2 py-9 rounded-lg">
                                <label className="block text-neutral-700 " htmlFor="nombreCaracteres">{label}</label>
                                <p className="text-3xl">{value}</p>
                            </div>
                        ))
                    }
                    
                 </div>

                 
             </div></>
             )
 }