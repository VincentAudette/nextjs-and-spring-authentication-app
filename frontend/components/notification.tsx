import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import {  ShieldExclamationIcon } from '@heroicons/react/24/outline'
export default function Notification({ heading, description }) {
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
        <div className="max-w-full sm:max-w-sm min-w-max bg-red-300/80 backdrop-blur-md shadow-lg shadow-red-950/20 rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden ">
          <div className="p-4">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <ShieldExclamationIcon className="h-6 w-6 text-red-800" aria-hidden="true" />
              </div>
              <div className="ml-3 w-0 flex-1 pt-0.5 text-red-950 min-w-max">
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

