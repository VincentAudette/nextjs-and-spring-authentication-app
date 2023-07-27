import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { Checkbox } from "./ui/checkbox";
import Notification from "@components/notification";
import { Slider } from './ui/slider';
export default function ConfigurationMdpModal({ open, setOpen, configurations, setConfigurations}){
  

      const [errorModal, setErrorModal] = useState(false)
      const [errorMessage, setErrorMessage] = useState('')

      const handleConfigurationChanges = async (e)=>{
        e.preventDefault();
        setOpen(false);
      }
  
    
      const cancelButtonRef = useRef(null)
    
      return (<>
            <Notification showNotification={errorModal}  setShowNotification={setErrorModal} description={errorMessage} heading={'ERROR'}/>
            <Transition.Root show={open} as={Fragment}>
          <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" initialFocus={cancelButtonRef} onClose={setOpen}>
            <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
              >
                <Dialog.Overlay className="fixed inset-0 bg-neutral-900/75 transition-opacity backdrop-blur-xl" />
              </Transition.Child>
    
              {/* This element is to trick the browser into centering the modal contents. */}
              <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                &#8203;
              </span>
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                enterTo="opacity-100 translate-y-0 sm:scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              >
                <div className="relative inline-block align-bottom bg-neutral-50/20 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <h2 className="titre-section ">Modifier les configurations</h2>
                <div className="h-5" />
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
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
          </>
      )
}
    