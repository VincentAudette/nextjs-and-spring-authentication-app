import WebflixLogo from "./webflix_logo";
import FRONTEND_URL from "../utils/FE/urls";
import { AUTH_ENDPOINT } from "../utils/FULL/endpoints";
import { useRouter } from "next/router";
import { useWebflix } from "../context/webflix-context";
import Notification from "./notification";
import { useState } from "react";
import {LockClosedIcon} from '@heroicons/react/24/solid'
import Image from "next/image";
import ETSLogo from "./SVG/ETSLogo";

export default function LoginView(){

    const router = useRouter();
    const {setProfile, setShowNotification, showNotification} = useWebflix()

    const [notifcationContent, setNotificationContent] = useState({heading:"", description:"", IconColor:""})


    const loginUserHandler = async event => {
        event.preventDefault()

        const res = await fetch(
          FRONTEND_URL+AUTH_ENDPOINT,
          {
            body: JSON.stringify({
              email: event.target.email.value,
              password: event.target.password.value
            }),
            headers: {
              'Content-Type': 'application/json'
            },
            method: 'POST'
          }
        );
    
        const result = await res.json()

        if( result.hasOwnProperty("data")){
            //load items in context
            setProfile(result.data);
            //then redirect
            router.push('/dashboard');
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
                                    <label htmlFor="email" className="block text-sm font-medium text-neutral-50">
                                    Courriel
                                    </label>
                                    <div className="mt-1">
                                    <input
                                        id="email"
                                        name="email"
                                        type="email"
                                        autoComplete="email"
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

                                <div className="flex items-center justify-between">
                                    

                                    <div className="text-sm">
                                    <a href="#" className="font-medium text-neutral-300 hover:text-white">
                                        Oublier votre mot de passe?
                                    </a>
                                    </div>
                                </div>

                                <div>
                                    <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-b from-red-400 to-red-700 hover:bg-gradient-to-b hover:from-red-300 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    >
                                    Se connecter &rarr;
                                    </button>
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