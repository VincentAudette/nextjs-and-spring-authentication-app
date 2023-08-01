import { useEffect, useState } from "react";
import { Settings2 } from "lucide-react";
import ModalGeneric from "./modal-generic";
import FormulaireConfigurationsMdp from "./formulaire-configurations-mdp";
import { useQuery } from "react-query";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import { useAuth } from "context/auth-context";
import { AdjustmentsHorizontalIcon } from "@heroicons/react/24/outline";

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
      label:"text-base",
      text:"text-sm"
    },
    md: {
      padding: "p-5",
      label:"text-lg",
      text:"text-md"
    },
    lg:{
      padding: "py-12",
      label:"text-xl",
      text:"text-lg"
    },
    xl:{
      padding: "p-5",
      label:"text-4xl",
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
                    className={`${selectedDisplay} rounded-xl hover:cursor-pointer text-base bg-neutral-500 text-white  items-center flex justify-center py-2 px-3 hover:bg-opacity-70 transition-opacity duration-500 focus-dark `}>
                        <p>Modifier les paramètres</p>
                       <AdjustmentsHorizontalIcon className="h-5 w-5 ml-2" />
                    </button>
                  </div>
                  <hr className="my-5 border border-neutral-800" />
                </div>}



                 <div className=" gap-4 flex-col w-full grid sm:grid-cols-2 ">
                    {
                        [
                            {label: "Nombre de caractères requis",isNeeded:true, value: passwordConfig.passwordLength, representation:"#Caractères"},
                            {label: "Caractères spéciaux", isNeeded:passwordConfig.needsSpecialCharacter, value: passwordConfig.needsSpecialCharacter ? "Oui":"Non", representation:"!@#$%^&*"},
                            {label: "Caractères en majuscule",isNeeded:passwordConfig.needsUppercase, value: passwordConfig.needsUppercase ? "Oui":"Non", representation:"Aa-Zz"},
                            {label: "Numéros",isNeeded:passwordConfig.needsNumber, value: passwordConfig.needsNumber ? "Oui":"Non", representation:"0123456789"},
                            
                        ].map(({label, value, representation, isNeeded})=>(
                            <div
                            key={label}
                            className={`flex justify-between items-center ${isNeeded ?"bg-neutral-200 text-neutral-800":"bg-neutral-400 text-neutral-200"} flex-col  px-2 ${selectedDisplay.padding} rounded-md`}>
                                <label className={`block  ${isNeeded ? " text-neutral-900":"text-neutral-50"} font-bold min-h-[4.2rem] ${selectedDisplay.label}`} htmlFor={label}>{label}</label>
                                <p className={`${isNeeded ? "bg-neutral-800 text-slate-50 shadow-xl":"bg-neutral-500"} ${selectedDisplay.text} text-neutral-300 px-5 py-1 rounded-full my-2`}>{representation}</p>
                                <p className={` ${isNeeded ?"text-neutral-800":"text-neutral-50"} text-4xl mt-3`}>{value}</p>
                            </div>
                        ))
                    }
                    
                 </div>

                 
             </div></>
             )
 }