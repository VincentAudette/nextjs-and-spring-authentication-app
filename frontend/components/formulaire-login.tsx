import { useAuth } from "context/auth-context";
import { useNotifications } from "context/notification-context";
import Link from "next/link";
import { useRouter } from "next/router";

export default function FormulaireLogin(){
    const router = useRouter();
    const {setProfile} = useAuth()

const { notify } = useNotifications(); 

    const loginUserHandler = async event => {
        event.preventDefault()

        const res = await fetch(
          "/api/login",
          {
            body: JSON.stringify({
              username: event.target.username.value,
              password: event.target.password.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        );
    
        if (!res.ok) {
            const data = await res.json();
            console.log(data);

            if(data.err.status === 429){
                notify({
                    heading: "Trop de tentatives",
                    description: data.message
                });
            return;
            }else if(data.err.status === 401){
                notify({
                    heading: "Erreur d'authentification",
                    description: data.message
                });
            return;
            }else if(data.err.status === 500){
                notify({
                    heading: "Erreur interne",
                    description: data.message
                });
            return;
            }else if(data.err.status === 403){
                notify({
                    heading: "Non autorisé",
                    description: data.message
                });
                return;
            }
            else if(data.err.status === 404){
                notify({
                    heading: "Utilisateur introuvable",
                    description: data.message
                });
            return;
            }else if(data.err.status === 400){
                notify({
                    heading: "Erreur interne",
                    description: data.message
                });
            return;
            }else{
                notify({
                    heading: "Erreur durant la connexion.",
                    description: data.message
                });
            return;
            }
        }
        
        const result = await res.json();
        if( result.hasOwnProperty("data")){
            //load items in context
            setProfile({
                token: result.data.token,
                username: result.decoded.sub,
                role: result.decoded.role
            });

            if(result.decoded.needsToResetPassword){
                router.push('/reinitialiser-mot-de-passe');
                return;
            }
            

            //Check the role to redirect to the right page
            if(result.decoded.role === "ROLE_ADMINISTRATEUR"){
                router.push('/admin');
            }else if(result.decoded.role === "ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS"){
                router.push('/dashboard');
            }else if(result.decoded.role === "ROLE_PREPOSE_AUX_CLIENTS_DAFFAIRE"){
                router.push('/dashboard');
            }

        }else{
            
            
            // if(result.err.status === 429){
            //     notify({
            //         heading:"Trop de tentatives",
            //         description:"Vous avez trop tenté de vous connecter. Veuillez réessayer plus tard.",
            //     });
            //     return;
            // }
            // if(result.err.status === 401){
            //     notify({
            //         heading:"Erreur d'authentification",
            //         description:"Nom d'utilisateur ou mot de passe invalide.",
            //     });
            //     return;
            // }

        }
        
      }


    return (
        <form onSubmit={loginUserHandler} className="space-y-6">
                                <div>
                                    <label htmlFor="username" className="block text-sm font-medium text-neutral-50">
                                    Nom d&apos;utilisateur
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        id="username"
                                        name="username"
                                        type="string"
                                        required
                                        className="input focus-dark"
                                    />
                                    </div>
                                </div>

                                <div className="space-y-1"> 
                                    <label htmlFor="password" className="block text-sm font-medium text-neutral-50">
                                    Mot de passe
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        id="password"
                                        name="password"
                                        type="password"
                                        required
                                        className="input focus-dark"
                                    />
                                    </div>
                                </div>


                                <div>
                                    <button
                                    type="submit"
                                    className="btn-primary"
                                    >
                                    Se connecter &rarr;
                                    </button>
                                </div>

                                <div className="flex items-center justify-between">
                                    

                                    <div className="text-sm">
                                    <Link href="demande-acces" className="font-medium text-neutral-300 hover:text-white">
                                        Demande de réinitialisation du mot de passe.
                                    </Link>
                                    </div>
                                </div>
                            </form>
    )
}