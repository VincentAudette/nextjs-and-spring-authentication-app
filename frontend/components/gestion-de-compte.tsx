import FormulaireModificationMdp from "./formulaire-modification-mdp";
import { useQuery } from "react-query";
import { getConfigurations } from "./parametres-de-securite";
import { useAuth } from "context/auth-context";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";

export default function GestionDeCompte(){
    const { profile } = useAuth();
    const { data: passwordConfig, isLoading, isError, error } = useQuery(['passwordConfig',profile.token], ({queryKey})=>getConfigurations(queryKey[1]), {enabled: !!profile.token});
if (isLoading) return <LoadingQuery />
  if (isError) return <ErrorQuery error={error as Error} />
    return (
        <>
        <title>Gestion de Compte | GTI619 | École de Technologie Supérieure</title>
      <div>
        <h1 className="titre-section">Gestion de compte</h1>

        <div className="grid max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-10 sm:px-6 md:grid-cols-3 lg:px-8">
                <div>
                  <h2 className="text-base font-semibold leading-7 text-white">Changer votre mot de passe</h2>
                  <div className="h-4" />
                  <div className=" text-sm text-neutral-300">
                    <p className="mt-1 leading-6">
                        Le mot de passe doit respecter les configurations de sécurité suivantes
                    </p>
                    <div className="h-3" />
                    <ul className="list-disc list-inside">
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

                <FormulaireModificationMdp />
              </div>
        
      </div>
        </>
    )
}