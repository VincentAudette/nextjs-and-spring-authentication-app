import ETSLogo from "@components/SVG/ETSLogo";
import FormulaireModificationMdp from "@components/formulaire-modification-mdp";
import LoadingQuery from "@components/loading-query";
import NotificationContainer from "@components/notification-container";
import { getConfigurations } from "@components/parametres-de-securite";
import Image from "next/image";
import { useQuery } from "react-query";

export default function ReinitialiserMotDePasse(){
    const { data: passwordConfig, isLoading, isError, error } = useQuery('passwordConfig', getConfigurations);
    return (
            <>
            <title>Authentification ÉTS | GTI619</title>
            <div className="flex flex-col-reverse fixed bottom-0 md:top-0 md:bottom-auto md:right-0 sm:inset-x-auto inset-x-0 z-10 p-5 max-h-screen overflow-scroll gap-3">
           <NotificationContainer />
            </div>
    
            <div className="h-full bg-neutral-700 text-white">
                    <div className="h-full">
                        <div className="min-h-screen flex">
                            <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                                <div className="mx-auto w-full max-w-sm lg:w-96">
                                <div>
                               <ETSLogo />
                               <h2 className="mt-6 mb-3 text-xl font-extrabold">Réinitialiser votre mot de passe</h2>
                              {isLoading ?<LoadingQuery />: <ul className="list-disc">
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
                                 </ul>}
                                </div>  
                                <div className="mt-8">
                                <div className="mt-6">
                                <FormulaireModificationMdp dark={true} needsPasswordResetView={true}  />
                                </div>
                                </div>
                            </div>
                            </div>
                            <div className="hidden lg:block relative w-0 flex-1">
                            <Image
                                className="absolute inset-0 h-full w-full object-cover"
                                src="/ets-lab.jpg"
                                alt=""
                                height={4639}
                                width={6232}
                            />
                            </div>
                        </div>
                    </div>
                </div>
                </>)
}