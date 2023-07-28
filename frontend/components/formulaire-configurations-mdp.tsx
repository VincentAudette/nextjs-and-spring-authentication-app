import { Checkbox } from "./ui/checkbox";
import { Slider } from './ui/slider';

export default function FormulaireConfigurationsMdp({setOpen, configurations, setConfigurations}){

    const handleConfigurationChanges = async (e)=>{
        e.preventDefault();
        setOpen(false); 
      }

    return (
        <form
                onSubmit={handleConfigurationChanges}
                className="font-semibold text-lg p-5 rounded-md flex flex-col gap-5">
                        
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block mb-2" htmlFor="nombreCaracteres">Nombre de caractères requis</label>
                                <p>{configurations.nombreCaracteres[0]}</p>
                            </div>
                            <div>
                                <Slider value={configurations.nombreCaracteres} onValueChange={value=>{
                                    setConfigurations({
                                        ...configurations,
                                        nombreCaracteres: value
                                    });
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
                                checked={configurations.uppercase}
                                onClick={()=>{setConfigurations(
                                    {...configurations, uppercase:!configurations.uppercase}
                                )}}
                                id="uppercase" />
                                <label
                                        htmlFor="uppercase"
                                        className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Caractère en majuscule requis (A-Z)
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                <Checkbox 
                                onClick={()=>{setConfigurations({
                                    ...configurations,
                                    numeros:!configurations.numeros
                                })}}
                                checked={configurations.numeros}
                                id="numeros" />
                                <label
                                        htmlFor="numeros"
                                        className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                                    >
                                        Numéros requis (0-9)
                                    </label>
                                </div>
                                <div className="flex items-center space-x-2">
                                <Checkbox 
                                onClick={()=>{
                                  setConfigurations({
                                    ...configurations,
                                    specialCaracter:!configurations.specialCaracter
                                })
                                }}
                                checked={configurations.specialCaracter}
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
    )
}