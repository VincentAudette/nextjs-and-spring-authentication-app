import FormulaireModificationMdp from "./formulaire-modification-mdp";
import { useQuery } from "react-query";
import ParametresDeSecurite, { getConfigurations } from "./parametres-de-securite";
import { useAuth } from "context/auth-context";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import ModalGeneric from "./modal-generic";
import { useState } from "react";
import { MagnifyingGlassPlusIcon } from "@heroicons/react/20/solid";

export default function GestionDeCompte(){
    const { profile } = useAuth();
    const [open, setOpen] = useState(false);
    const { data: passwordConfig, isLoading, isError, error } = useQuery('passwordConfig', getConfigurations);
if (isLoading) return <LoadingQuery />
  if (isError) return <ErrorQuery error={error as Error} />
    return (
        <>
        <title>Gestion de Compte | GTI619 | École de Technologie Supérieure</title>
      <div>
        <ModalGeneric titre="Exigences du mot de passe" open={open} setOpen={setOpen} >
          <div className="p-5">
                      <ParametresDeSecurite displaySize="sm"/>
          </div>
        </ModalGeneric>
        <h1 className="titre-section pb-3">Gestion de compte</h1>
        <hr className="my-5 border border-neutral-800" />
        <div className="bg-neutral-200 rounded-md grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-9 py-10 sm:px-6 md:grid-cols-12 lg:px-20 h-full">
                <div className="md:col-span-4 flex flex-col h-full mt-20">
                  <h2 className=" font-semibold leading-7 text-neutral-800 text-2xl">Changer votre mot de passe</h2>
                  <div className="h-4" />
                  <div className=" text-sm text-neutral-600">
                    <p className="mt-1 leading-6">
                        Le mot de passe doit respecter les configurations de sécurité suivantes
                    </p>
                    <div className="h-2" />
                    <button className="flex gap-2 group hover:bg-neutral-300 focus-light bg-neutral-100 px-4 py-2 rounded-full" onClick={()=>setOpen(true)}>
                      <MagnifyingGlassPlusIcon className="w-5 h-5 text-red-500 group-hover:text-red-600 rounded-full" />
                      <span className="font-semibold">Voir les configurations</span>
                    </button>
                    <div className="h-2" />
                    <ul className="list-disc">
                    {
                            [
                                {label: "Nombre de caractères requis", value: passwordConfig.passwordLength},
                                {label: "Caractères spéciaux", value: passwordConfig.needsSpecialCharacter ? "Oui":"Non"},
                                {label: "Caractères en majuscule", value: passwordConfig.needsUppercase ? "Oui":"Non"},
                                {label: "Numéros", value: passwordConfig.needsNumber ? "Oui":"Non"},
                                
                            ].map(({label, value})=>(
                                <li
                                key={label}
                               >
                                    {label}: <strong>{value}</strong>
                                </li>
                            ))
                        }
                        </ul>
                  </div>
                  
                </div>


              <div className=" md:col-span-8 xl:px-20 py-20  flex flex-col items-center rounded-xl">
                <h3 className="text-neutral-800  text-xl mb-10 font-bold">Entrez votre nouveau mot de passe</h3>
                
                <FormulaireModificationMdp dark={false} />
              </div>

              </div>
        
      </div>
        </>
    )
}