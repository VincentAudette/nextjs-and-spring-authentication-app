import Image from "next/image";
import ETSLogo from "./SVG/ETSLogo";
import Link from "next/link";
import NotificationContainer from "./notification-container";
import { useNotifications } from "context/notification-context";
import { useState } from "react";
import { useRouter } from "next/router";

export default function DemandeAcces(){

    const {notify} = useNotifications();

    const [username, setUsername] = useState('');
    const router = useRouter();

    const demandeAccessHandler = async event => {
        event.preventDefault();

        try {
            const res = await fetch('/api/postPasswordResetNotify', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username })
            });

            if (res.ok) {
                notify({
                    heading: 'Success',
                    description: 'Password reset was successful.',
                    color: 'green'
                });
                router.push('/');
            } else {
                throw new Error(await res.text());
            }

        } catch (error) {
            notify({
                heading: 'Error',
                description: error.message,
                color: 'red'
            });
        }
    };

    const handleUsernameChange = (e) => {
        setUsername(e.target.value);
    }




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
                            <h2 className="mt-6 text-xl font-extrabold">Votre compte est suspendu?</h2>
                            
                            </div>  

                            <div className="mt-8">
                            

                            <div className="mt-6">
                            <form onSubmit={demandeAccessHandler} className="space-y-6">
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
                                            className="input focus-dark"
                                            value={username}
                                            onChange={handleUsernameChange}
                                        />

                                    </div>
                            </div>


                                <div>
                                    <button
                                    type="submit"
                                    className="w-full flex justify-center py-2 px-4 rounded-xl shadow-sm text-sm font-medium text-white bg-gradient-to-b from-red-400 to-red-700 hover:bg-gradient-to-b hover:from-red-300 hover:to-red-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-600"
                                    >
                                    Demande de réinitialisation
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