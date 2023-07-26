import { Slider } from "@components/ui/slider";
import { useState } from "react";
import { Checkbox } from "./ui/checkbox";

const currentPwdCaracters = 10;
const specialCaracter = false;
const uppercase = true;
export default function ConfigurationsDeMotDePasseView(){
    const [nombreCaracteres, setNombreCaracteres] = useState([10]);
    return( <div>
             <title>Configurations de mot de passe | GTI619 | Labo 5</title>
             <div className="flex items-center justify-center mb-3">
                 <h1 className="titre-section">Configurations de mot de passe</h1>
                 <div className="grow"/>
                 </div>
                 <hr className="my-5 border border-neutral-800" />
                 <h2 className="text-xl text-neutral-300 mb-3">Valeurs actuels des configurations</h2>
                 <div className="flex gap-2 flex-wrap">
                    <div className="flex justify-between mb-2 flex-col border-4 border-neutral-700 max-w-max p-2 rounded-lg">
                        <label className="block mb-2" htmlFor="nombreCaracteres">Nombre de caractères requis</label>
                        <p className="text-3xl">{currentPwdCaracters}</p>
                    </div>
                    <div className="flex justify-between mb-2 flex-col border-4 border-neutral-700 max-w-max p-2 rounded-lg">
                        <label className="block mb-2" htmlFor="nombreCaracteres">Caractère en majuscule requis</label>
                        <p className="text-3xl">{uppercase ? "Oui":"Non"}</p>
                    </div>
                    <div className="flex justify-between mb-2 flex-col border-4 border-neutral-700 max-w-max p-2 rounded-lg">
                        <label className="block mb-2" htmlFor="nombreCaracteres">Caractères spéciale requis</label>
                        <p className="text-3xl">{specialCaracter ? "Oui":"Non"}</p>
                    </div>
                 </div>
    
                <hr className="my-5 border border-neutral-800" />

                 <h2 className="text-xl text-neutral-300 mb-3">Modifier les configurations</h2>
                 <form className="bg-neutral-700  font-semibold text-lg p-5 rounded-md flex flex-col gap-5">
                        
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block mb-2" htmlFor="nombreCaracteres">Nombre de caractères requis</label>
                                <p>{nombreCaracteres}</p>
                            </div>
                            <div>
                                <Slider value={nombreCaracteres} onValueChange={value=>{
                                    setNombreCaracteres(value);
                                }} min={5} max={20} step={1} />
                            </div>
                        </div>


                        <hr className="mt-5 border border-neutral-600" />

                        <div>
                            <div className="flex justify-between mb-2">
                                <h3 className="block mb-2">Classes de caractères</h3>
                            </div>
                            <div className="flex flex-col gap-2 text-base">
                                <div className="flex items-center space-x-2">
                                <Checkbox 
                                checked={uppercase}
                                id="uppercase" />
                                <label
                                        htmlFor="uppercase"
                                        className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Caractère en majuscule requis (A...Z)
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                <Checkbox 
                                checked={specialCaracter}
                                id="specialCaracter" />
                                <label
                                        htmlFor="specialCaracter"
                                        className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Caractère spéciale requis ($, %, #, !, @, etc.)
                                    </label>
                                </div>
                            </div>
                        </div>

                        




                            
                        <button
                        type="submit"
                        className="btn-primary mt-4">
                            Enregistrer les configurations
                        </button>

                        
                        

                 </form>
             </div>)
 }