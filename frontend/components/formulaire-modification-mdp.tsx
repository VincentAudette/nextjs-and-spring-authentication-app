import { ArrowPathIcon } from "@heroicons/react/24/outline";
import { useAuth } from "context/auth-context";
import { useNotifications } from "context/notification-context";
import { useRouter } from "next/router";
import { useState } from "react";
import { logout } from "./layout";


export default function FormulaireModificationMdp({dark=false, needsPasswordResetView=false}:{dark?:boolean,needsPasswordResetView?:boolean}){

    const { notify } = useNotifications();
    const {profile} = useAuth();

    const router = useRouter();


    const [isSubmitting, setIsSubmitting] = useState(false);

    

    const handlePasswordModifcation = async (event) => {
        event.preventDefault();
        try {
            const response = await fetch(
                "/api/updateUserPassword?token="+profile.token,
                {
                    body: JSON.stringify({
                        currentPassword: event.target.current_password.value,
                        newPassword: event.target.new_password.value,
                        newPasswordConfirmation: event.target.confirm_password.value,
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    method: 'PUT'
                }
            );
    
            if (!response.ok) {
                const data = await response.json();
                notify({
                    heading: "Erreur de modification de mot de passe",
                    description: data.message
                });
                return;
            }
            notify({
                heading: "Succès",
                description: "Votre mot de passe a été modifié avec succès",
                color:"green"
            });
            // Formulaire vide une fois complété
            event.target.reset();
            // Redirection vers la page d'accueil
            if(needsPasswordResetView){
              router.push("/");
              return;
            }else{
              try{
                logout(profile.token)
                router.push('/');
              }catch (err){
                notify(
                  {
                    heading: 'Erreur durant la déconnexion',
                    description: err.message,
                  }
                )
              }
            }
        } catch (error) {
            notify({
                heading: "Erreur",
                description: error.message
            });
        }

        setIsSubmitting(false);
    };
    
   return (
    <form onSubmit={handlePasswordModifcation} className={` w-full my-auto ${dark ? "text-white":"text-neutral-800"}`}>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6 ">
                    <div className="col-span-full">
                      <label htmlFor="current-password" className="block text-sm font-medium leading-6 ">
                        Mot de passe actuel
                      </label>
                      <div className="mt-2">
                        <input
                          id="current-password"
                          name="current_password"
                          type="password"
                          autoComplete="current-password"
                          className={`block w-full rounded-md border-0  py-1.5 ${dark ?"focus-dark bg-neutral-800 focus:bg-neutral-700":"focus-light bg-white"}  shadow-sm   sm:text-sm sm:leading-6`}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="new-password" className="block text-sm font-medium leading-6 ">
                        Nouveau mot de passe
                      </label>
                      <div className="mt-2">
                        <input
                          id="new-password"
                          name="new_password"
                          type="password"
                          autoComplete="new-password"
                          className={`block w-full rounded-md border-0  py-1.5  shadow-sm  ${dark ?"focus-dark bg-neutral-800 focus:bg-neutral-700":"focus-light bg-white"}   sm:text-sm sm:leading-6`}
                        />
                      </div>
                    </div>

                    <div className="col-span-full">
                      <label htmlFor="confirm-password" className="block text-sm font-medium leading-6 ">
                        Confirmer le nouveau mot de passe
                      </label>
                      <div className="mt-2">
                        <input
                          id="confirm-password"
                          name="confirm_password"
                          type="password"
                          autoComplete="new-password"
                          className={`block w-full rounded-md  py-1.5  shadow-sm ${dark ?"focus-dark bg-neutral-800 focus:bg-neutral-700":"focus-light bg-white"} sm:text-sm sm:leading-6`}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="mt-8 flex">
                    <button
                      type="submit"
                      className="btn-primary disabled:opacity-50 disabled:hover:from-red-400 disabled:hover:to-red-700"
                        disabled={isSubmitting}
                    >
                      {
                        isSubmitting ?<div className="flex items-center gap-2"><ArrowPathIcon className="animate-spin ml-2 h-4 w-4 " /> <p>Chargement</p></div>  : "Sauvegarder"
                      }
                    </button>
                  </div>
                </form>
   )
}