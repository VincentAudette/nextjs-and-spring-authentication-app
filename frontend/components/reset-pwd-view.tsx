import WebflixLogo from "./webflix_logo";
import FRONTEND_URL from "../utils/FE/urls";
import { AUTH_ENDPOINT } from "../utils/FULL/endpoints";
import { useRouter } from "next/router";
import { useAuth } from "../context/auth-context";
import Notification from "./notification";
import { useState } from "react";
import Image from "next/image";
import ETSLogo from "./SVG/ETSLogo";
import Link from "next/link";

export default function ResetPwdView(){

    const router = useRouter();
    const {setProfile, setShowNotification, showNotification} = useAuth()

    const [notifcationContent, setNotificationContent] = useState({heading:"", description:"", IconColor:""})


    

    const resetPwd = async event => {
        event.preventDefault()
    };



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
                            <h2 className="mt-6 text-xl font-extrabold">Mot de passe oublié?</h2>
                            
                            </div>  

                            <div className="mt-8">
                            

                            <div className="mt-6">
                            <form onSubmit={resetPwd} className="space-y-6">
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
                                    className="w-full flex justify-center py-2 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-b from-red-400 to-red-700 hover:bg-gradient-to-b hover:from-red-300 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    >
                                    Modifier le mot de passe
                                    </button>
                                </div>
                                <div className="text-sm">
                                    <Link href="/" className="font-medium text-neutral-300 hover:text-white">
                                        &larr; Retour à la page de connexion
                                    </Link>
                                    </div>
                            </form>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="hidden lg:block relative w-0 flex-1">
                        <Image
                            className="absolute inset-0 h-full w-full object-cover"
                            src="/reset-pwd-bib.jpg"
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