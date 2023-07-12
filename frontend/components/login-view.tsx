import WebflixLogo from "./webflix_logo";
import FRONTEND_URL from "../utils/FE/urls";
import { AUTH_ENDPOINT } from "../utils/FULL/endpoints";
import { useRouter } from "next/router";
import { useWebflix } from "../context/webflix-context";
import Notification from "./notification";
import { useState } from "react";
import {LockClosedIcon} from '@heroicons/react/24/solid'

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
        <title>Webflix | Login</title>
    <Notification {...notifcationContent} setShowNotification={setShowNotification} showNotification={showNotification} />
    <div className="h-full bg-stone-900 text-white">
                <div className="h-full">
                    <div className=' absolute lg:block bottom-0 right-0 z-50 bg-stone-800 backdrop-blur-sm rounded-3xl px-6 py-3 bg-opacity-80 mr-5 mb-5 hidden shadow-2xl'>
                        <div className=" flex w-full items-center justify-center text-stone-300">
                            <svg fill="currentColor" className="h-32 w-auto pt-8 border-r border-stone-400 pr-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 194.475 173.275">
                                <path id="Path_1" data-name="Path 1" d="M0,40.05c.356,5.688,11.021,10.665,27.73,12.8q5.6.8,11.2,1.067l7.821.356V53.026l-8.71-.356a63.462,63.462,0,0,1-8.177-.711C11.376,49.649,1.778,44.316,1.422,40.05Z" transform="translate(0 17.721)" />
                                <path id="Path_2" data-name="Path 2" d="M194.39,38.648c-.178-5.333-10.31-8.888-30.219-11.2-11.021-1.067-22.22-1.6-33.418-1.6s-22.753.356-34.84,1.244a440.3,440.3,0,0,0-60.97,8L30.5,36.16l-2.311.711C15.212,39.893-.253,45.048.1,51.091H1.525C1.347,47.181,11.3,42.2,28.544,38.115l4.088-.889,2.666-.533a436.824,436.824,0,0,1,60.793-7.466c10.843-.711,21.686-1.067,32-1.067a343.491,343.491,0,0,1,35.729,1.778c19.909,2.133,27.019,6.044,27.2,8.888Z" transform="translate(0.075 6.679)" />
                                <path id="Path_3" data-name="Path 3" d="M70.47,27.636H25.142L4.7,109.049H50.561l3.022-12.621h-30.4l5.866-23.286H55.005L58.2,60.7H31.9l4.977-20.264H67.093l3.377-12.8ZM65.848,7.55c-1.778,0-3.555,1.067-6.755,2.844h-.356l-16,9.777-2.311,1.422H43.1l3.555.533h.178l18.309-5.688c2.133-.533,4.266-1.244,4.977-3.555a4.035,4.035,0,0,0-.533-3.2A4.551,4.551,0,0,0,67.27,7.906c-.533-.178-.889-.178-1.422-.356ZM94.467,80.075l-8,.533H84.157l-4.622,19.2H94.645l4.977-20.264-5.155.533Zm-17.6-61.5-3.2,12.443H96.6l-.711,2.311L85.579,75.1l2.311-.178,6.044-.533,7.11-.533,10.488-42.662h21.331l2.666-10.4.533-1.955Zm105.943-.356a37.436,37.436,0,0,0-19.375-5.333,26.806,26.806,0,0,0-19.375,7.466,23.873,23.873,0,0,0-6.755,16.531,23.108,23.108,0,0,0,7.11,16.531,51.761,51.761,0,0,0,5.51,5.333A68.139,68.139,0,0,1,154.9,63.9l1.067,1.6h.178l4.977-1.244L170.9,61.41a20.176,20.176,0,0,0-2.666-4.088,61.246,61.246,0,0,0-4.622-4.977l-2.489-2.311c-1.244-1.067-2.489-2.311-3.733-3.555a14.381,14.381,0,0,1-4.8-9.954A11.448,11.448,0,0,1,163.97,25.148h.533a21.331,21.331,0,0,1,14.221,6.221l1.244,1.067.355-1.422,2.844-11.554V19.1l.178-.533Zm-9.954,48.528c-4.444,1.422-9.066,2.844-13.687,3.911l-1.244.356v1.6c0,6.577-4.088,13.154-13.509,13.154q-9.332,0-17.6-8l-1.067-.889L125.4,78.3,122.375,90.74l-.178.711.533.356,1.422.889a43.479,43.479,0,0,0,21.153,5.333c18.487,0,28.263-12.976,28.263-25.775a31.233,31.233,0,0,0-.711-5.51Z" transform="translate(3.655 -7.55)" />
                                <path id="Path_4" data-name="Path 4" d="M163.718,33.228c0,1.778-5.333,6.577-26.13,11.91C119.812,49.759,95.815,53.314,70.4,55.27L36.089,57.58h-.355L35.2,61.669h.356c5.51-.178,29.152-1.778,35.018-2.311a490.409,490.409,0,0,0,50.838-6.4c6.044-1.244,11.91-2.489,17.242-3.911,19.553-4.977,28.8-10.132,28.441-16Z" transform="translate(27.37 12.278)" />
                            </svg>
                            <svg className=" h-24 w-auto pl-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 256 267" preserveAspectRatio="xMidYMid"><path d="M153.671 178.933l-.932 2.757 49.137 83.342 2.781 1.968L256 178.22l-51.342-89.137-50.986 89.85zM50.273.304L0 89.084l52.234 89.849 49.738-89.85-.134-3.63L52.565 2.11 50.273.304z" fill="#59666C"/><path d="M50.273.304l51.7 88.78h102.684L152.601.304H50.273zM52.234 178.933L102.864 267h101.793l-50.986-88.067H52.234z" fill="#BCAE79"/></svg>
                        </div>
                    </div>
                
                    <div className="min-h-screen flex">
                        <div className="flex-1 flex flex-col justify-center py-12 px-4 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
                            <div className="mx-auto w-full max-w-sm lg:w-96">
                            <div>
                            <WebflixLogo className="h-32 w-auto mx-auto" />

                            <h2 className="mt-6 text-3xl font-extrabold">Bienvenue sur Webflix</h2>
                            
                            </div>  

                            <div className="mt-8">
                            

                            <div className="mt-6">
                                <form onSubmit={loginUserHandler} className="space-y-6">
                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-stone-50">
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
                                    <label htmlFor="password" className="block text-sm font-medium text-stone-50">
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
                                    

                                    {/* <div className="text-sm">
                                    <a href="#" className="font-medium text-slate-600 hover:text-slate-500">
                                        Oublier votre mot de passe?
                                    </a>
                                    </div> */}
                                </div>

                                <div>
                                    <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                                    >
                                        <LockClosedIcon className="-ml-1 mr-2 h-5 w-5" aria-hidden="true" />
                                    Se connecter
                                    </button>
                                </div>
                                </form>
                            </div>
                            </div>
                        </div>
                        </div>
                        <div className="hidden lg:block relative w-0 flex-1">
                        <img
                            className="absolute inset-0 h-full w-full object-cover"
                            src="bear-hibernate.jpg"
                            alt=""
                        />
                        </div>
                    </div>
                </div>
            </div>
            </>)
}