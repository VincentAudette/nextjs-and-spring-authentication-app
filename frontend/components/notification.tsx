import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import {  ShieldExclamationIcon } from '@heroicons/react/24/outline'
export default function Notification({ heading, description, color="red" }) {
  
  let bgColor;
  let textColor;
  let iconColor;
  let shadowColor;

  switch (color) {
    case "red":
      bgColor = "bg-red-300/80"
      textColor = "text-red-950"
      iconColor = "text-red-800"
      shadowColor = "shadow-red-950/20"
      break;
    case "green":
      bgColor = "bg-green-300/80"
      textColor = "text-green-950"
      iconColor = "text-green-800"
      shadowColor = "shadow-green-950/20"
      break;
  }        
      

  return (
    <>
      <Transition
        show={true} 
        as={Fragment}
        enter="transform ease-out duration-300 transition"
        enterFrom="translate-y-2 opacity-0 sm:translate-y-0"
        enterTo="translate-y-0 opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="opacity-100"
        leaveTo="opacity-0"
      >
        <div className={`max-w-full sm:max-w-sm min-w-max  backdrop-blur-md shadow-lg  rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ${bgColor} ${shadowColor}`}>
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShieldExclamationIcon className={`h-6 w-6 ${iconColor}`} aria-hidden="true" />
              </div>
              <div className={`ml-3 w-0 flex-1 pt-0.5 ${textColor} min-w-max`}>
                <p className="text-sm font-medium ">{heading}</p>
                <p className="mt-1 text-sm ">{description}</p>
              </div>
            </div>
          </div>
        </div>
      </Transition>
    </>
  )
}

