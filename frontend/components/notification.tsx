import { Fragment } from 'react'
import { Transition } from '@headlessui/react'
import {  ShieldExclamationIcon } from '@heroicons/react/24/outline'
import { XMarkIcon } from '@heroicons/react/24/solid'
export default function Notification({IconColor="red", heading, description,showNotification,setShowNotification}) {

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live="assertive"
        className="fixed inset-0 flex items-end px-4 py-6 pointer-events-none sm:p-6 sm:items-start z-50"
      >
        <div className="w-full flex flex-col items-center space-y-4 sm:items-end">
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={showNotification}
            as={Fragment}
            enter="transform ease-out duration-300 transition"
            enterFrom="translate-y-2 opacity-0 sm:translate-y-0 sm:translate-x-2"
            enterTo="translate-y-0 opacity-100 sm:translate-x-0"
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="max-w-sm w-full bg-red-200 bg-opacity-80 backdrop-blur-sm shadow-lg rounded-lg pointer-events-auto ring-1 ring-black ring-opacity-5 overflow-hidden">
              <div className="p-4">
                <div className="flex items-start">
                  <div className="flex-shrink-0">
                    <ShieldExclamationIcon className={`h-6 w-6 ${IconColor}`}aria-hidden="true" />
                  </div>
                  <div className="ml-3 w-0 flex-1 pt-0.5 text-black">
                    <p className="text-sm font-medium ">{heading}</p>
                    <p className="mt-1 text-sm ">{description}</p>
                  </div>
                  <div className="ml-4 flex-shrink-0 flex">
                    <button
                      className=" rounded-md inline-flex text-neutral-700 hover:text-black focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                      onClick={() => {
                        setShowNotification(false)
                      }}
                    >
                      <span className="sr-only">Close</span>
                      <XMarkIcon className="h-5 w-5" aria-hidden="true" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  )
}
