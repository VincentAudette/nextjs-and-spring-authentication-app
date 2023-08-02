import { useMutation, useQueryClient } from "react-query";
import { Checkbox } from "./ui/checkbox";
import { Slider } from './ui/slider';
import { useAuth } from "context/auth-context";

export default function FormulaireConfigurationsMdp({setOpen, configurations, setConfigurations}){

    const queryClient = useQueryClient();
    const {profile} = useAuth();


    const handleConfigurationChanges = async (e)=>{
        e.preventDefault();

        try{
            const res = await mutation.mutateAsync(configurations);
            console.log(res);

        }catch(e){
            console.log(e);                             
        }

        setOpen(false); 

      }


const updateConfigurations = async (newConfig) => {
    const res = await fetch(`/api/updatePasswordConfig?token=${profile.token}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(newConfig)
    });
    if (!res.ok) {
        const errorObj = await res.json();
        errorObj.status = res.status;
        throw errorObj;
    }
    return await res.json();
}

const mutation = useMutation(updateConfigurations, {
    onSuccess: () => {
        queryClient.invalidateQueries('passwordConfig');
    },
});

    return (
        <form
                onSubmit={handleConfigurationChanges}
                className="font-semibold text-lg p-5 rounded-md flex flex-col gap-5 text-neutral-900">
                        
                        <div>
                            <div className="flex justify-between mb-2">
                                <label className="block mb-2" htmlFor="nombreCaracteres">Nombre de caractères requis</label>
                                <p>{configurations.passwordLength}</p>
                            </div>
                            <div>
                                <Slider value={[configurations.passwordLength]} onValueChange={value=>{
                                    setConfigurations({
                                        ...configurations,
                                        passwordLength: value[0]
                                    });
                                }} min={5} max={20} step={1} />
                            </div>
                        </div>


                        <hr className="mt-5 border  border-neutral-500/30 rounded-full" />

                        <div>
                            <div className="flex justify-between mb-2">
                                <h3 className="block mb-2">Classes de caractères</h3>
                            </div>
                            <div className="flex flex-col gap-2 text-base">
                                <div className="flex items-center space-x-2">
                                <Checkbox 
                                checked={configurations.needsUppercase}
                                onClick={()=>{setConfigurations(
                                    {...configurations, needsUppercase:!configurations.needsUppercase}
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
                                    needsNumber:!configurations.needsNumber
                                })}}
                                checked={configurations.needsNumber}
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
                                    needsSpecialCharacter:!configurations.needsSpecialCharacter
                                })
                                }}
                                checked={configurations.needsSpecialCharacter}
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