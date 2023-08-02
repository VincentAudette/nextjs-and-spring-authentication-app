import Notification from "./notification";
import { useState } from "react";
import Image from "next/image";
import ETSLogo from "./SVG/ETSLogo";
import FormulaireLogin from "./formulaire-login";
import NotificationContainer from "./notification-container";

export default function LoginView(){



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
                            <h2 className="mt-6 text-xl font-extrabold">Authentification par Équipe F - GTI619</h2>
                            </div>  
                            <div className="mt-8">
                            <div className="mt-6">
                            <FormulaireLogin />
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