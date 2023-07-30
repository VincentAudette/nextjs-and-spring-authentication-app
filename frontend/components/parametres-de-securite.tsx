import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import ModalGeneric from "./modal-generic";
import FormulaireConfigurationsMdp from "./formulaire-configurations-mdp";
import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";

export default function ParametresDeSecurite() {
  const [configurations, setConfigurations] = useState({});

  console.log("CONFIG", configurations);
  

  const { profile } = useAuth();

  const getConfigurations = async () => {
    const res = await fetch(`/api/getPasswordConfig?token=${profile.token}`);
    if (!res.ok) {
      const errorObj = await res.json();
      errorObj.status = res.status;
      throw errorObj;
    }
    return await res.json();
  }

  const { data: passwordConfig, isLoading, isError, error } = useQuery('passwordConfig', getConfigurations);

  useEffect(() => {
    if (passwordConfig) {
      setConfigurations(passwordConfig);
    }
  }, [passwordConfig]);

  const [open, setOpen] = useState(false);

  if (isLoading) return <LoadingQuery />
  if (isError) return <ErrorQuery error={error as Error} />

  console.log("PWD CONFIG", passwordConfig);

  return (
    <>
      <ModalGeneric {...{ open, setOpen, titre: "Modification des paramètres de sécurité" }}>
        <FormulaireConfigurationsMdp {...{ configurations, setConfigurations, setOpen }} />
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
                            {label: "Nombre de caractères requis", value: passwordConfig.passwordLength},
                            {label: "Caractères spéciaux", value: passwordConfig.needsSpecialCharacter ? "Oui":"Non"},
                            {label: "Caractères en majuscule", value: passwordConfig.needsUppercase ? "Oui":"Non"},
                            {label: "Numéros", value: passwordConfig.needsNumber ? "Oui":"Non"},
                            
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