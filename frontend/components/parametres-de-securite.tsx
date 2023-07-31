import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import ModalGeneric from "./modal-generic";
import FormulaireConfigurationsMdp from "./formulaire-configurations-mdp";
import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";

export const getConfigurations = async (token) => {
    
    const res = await fetch(`/api/getPasswordConfig?token=${token}`);
    if (!res.ok) {
      const errorObj = await res.json();
      errorObj.status = res.status;
      throw errorObj;
    }
    return await res.json();
  }




export default function ParametresDeSecurite({displaySize}:{displaySize:string}) {
  const [configurations, setConfigurations] = useState({});

  const displays = {
    sm: {
      padding: "py-4 px-3",
      text:"text-sm"
    },
    md: {
      padding: "p-5",
      text:"text-md"
    },
    lg:{
      padding: "p-5",
      text:"text-lg"
    },
    xl:{
      padding: "p-5",
      text:"text-2xl"
    },
  }



  const { profile } = useAuth();

  const { data: passwordConfig, isLoading, isError, error } = useQuery(['passwordConfig',profile.token], ({queryKey})=>getConfigurations(queryKey[1]), {enabled: !!profile.token});

  useEffect(() => {
    if (passwordConfig) {
      setConfigurations(passwordConfig);
    }
  }, [passwordConfig]);

  const [open, setOpen] = useState(false);

  if (isLoading) return <LoadingQuery />
  if (isError) return <ErrorQuery error={error as Error} />

  if(displaySize === "sm"){
    
  }

  const selectedDisplay = displays[displaySize];



  return (
    <>
      {displaySize !== "sm" && <ModalGeneric {...{ open, setOpen, titre: "Modification des paramètres de sécurité" }}>
        <FormulaireConfigurationsMdp {...{ configurations, setConfigurations, setOpen }} />
      </ModalGeneric>}
        <div className="flex flex-col">
             <title>Paramètres de sécurité | GTI619 | Labo 5</title>

                
                {displaySize !== "sm" && <div className="w-full grow">
                  <div className=" w-full  justify-between flex items-center mb-3">
                    <h1 className="titre-section">Paramètres de sécurité</h1>
                 
                    <button 
                    onClick={()=>{setOpen(true)}}
                    className={`${selectedDisplay} rounded-lg bg-red-700 text-white  items-center flex justify-center p-3 hover:bg-opacity-70 transition-opacity duration-500 focus-dark `}>
                        <label>Modifier les paramètres</label>
                        <div className="ml-2 mr-4">
                          <Settings2 className="w-5 h-5 text-white"  />
                        </div>
                    </button>
                  </div>
                  <hr className="my-5 border border-neutral-800" />
                </div>}



                 <div className=" gap-2 flex-col w-full grid sm:grid-cols-2">
                    {
                        [
                            {label: "Nombre de caractères requis",isNeeded:true, value: passwordConfig.passwordLength, representation:"#Caractères"},
                            {label: "Caractères spéciaux", isNeeded:passwordConfig.needsSpecialCharacter, value: passwordConfig.needsSpecialCharacter ? "Oui":"Non", representation:"!@#$%^&*"},
                            {label: "Caractères en majuscule",isNeeded:passwordConfig.needsUppercase, value: passwordConfig.needsUppercase ? "Oui":"Non", representation:"Aa-Zz"},
                            {label: "Numéros",isNeeded:passwordConfig.needsNumber, value: passwordConfig.needsNumber ? "Oui":"Non", representation:"0123456789"},
                            
                        ].map(({label, value, representation, isNeeded})=>(
                            <div
                            key={label}
                            className={`flex justify-between items-center ${isNeeded ?"bg-slate-300 text-neutral-800":"bg-neutral-400 text-neutral-200"} flex-col  px-2 ${selectedDisplay.padding} rounded-lg`}>
                                <label className={`block  ${isNeeded ? " text-slate-900 font-bold":"text-neutral-700"} min-h-[4rem] ${selectedDisplay.text}}`} htmlFor={label}>{label}</label>
                                <p className={selectedDisplay.text + " bg-black text-neutral-300 px-5 py-1 rounded-md my-2"}>{representation}</p>
                                <p className={` ${isNeeded ?"text-slate-800":"text-neutral-700"} text-4xl`}>{value}</p>
                            </div>
                        ))
                    }
                    
                 </div>

                 
             </div></>
             )
 }