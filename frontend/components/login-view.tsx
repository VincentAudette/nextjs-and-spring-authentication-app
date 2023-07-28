import FRONTEND_URL from "../utils/FE/urls";
import { AUTH_ENDPOINT } from "../utils/FULL/endpoints";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth-context";
import Notification from "./notification";
import { useState } from "react";
import Image from "next/image";
import ETSLogo from "./SVG/ETSLogo";
import Link from "next/link";

export default function LoginView(){

    const router = useRouter();
    const {setProfile, setShowNotification, showNotification} = useAuth()

    const [notifcationContent, setNotificationContent] = useState({heading:"", description:"", IconColor:""})


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
    
        const result = await res.json()
        console.log("RESULT=====",result);
        

        if( result.hasOwnProperty("data")){
            //load items in context
            setProfile({
                token: result.data.token,
                username: result.decoded.sub,
                role: result.decoded.role
            });

            //Check the role to redirect to the right page
            if(result.decoded.role === "ROLE_ADMINISTRATEUR"){
                router.push('/admin');
            }else if(result.decoded.role === "ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS"){
                router.push('/dashboard');
            }else if(result.decoded.role === "ROLE_PREPOSE_AUX_CLIENTS_DAFFAIRE"){
                router.push('/dashboard');
            }

        }else{
            setNotificationContent({
                heading:"Pas authorisé",
                description:result.mes,
                IconColor:"text-red-900"
            });
            setShowNotification(true);

        }
        
      }





    return (
        <>
        <title>Authentification ÉTS | GTI619</title>
    <Notification {...notifcationContent} setShowNotification={setShowNotification} showNotification={showNotification} />
    <div className="h-full bg-neutral-700 text-white">
                <div className="h-full">
                  
                
                    <div className="min-h-screen flex">
                        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                            <div className="mx-auto w-full max-w-sm lg:w-96">
                            <div>
                           <ETSLogo />
                            <h2 className="mt-6 text-xl font-extrabold">Authentification par Équipe F - GTI619</h2>
                            
                            </div>  

                            <div className="mt-8">
                            

                            <div className="mt-6">
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
                                        autoComplete="username"
                                        required
                                        className="input"
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
                                        autoComplete="current-password"
                                        required
                                        className="input"
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
                                    <Link href="reset-pwd" className="font-medium text-neutral-300 hover:text-white">
                                        Oublier votre mot de passe?
                                    </Link>
                                    </div>
                                </div>
                            </form>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="hidden lg:block relative w-0 flex-1">
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src="/pavillon-d.jpg"
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