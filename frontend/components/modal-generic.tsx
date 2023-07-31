import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'

import Notification from "@components/notification";
import NotificationContainer from './notification-container';
export default function ModalGeneric({ children, titre, open, setOpen}){
  

      const [errorModal, setErrorModal] = useState(false)
      const [errorMessage, setErrorMessage] = useState('')

     
  
    
      const cancelButtonRef = useRef(null)
    
      return (<>
      <NotificationContainer />
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
                <Dialog.Overlay className="fixed inset-0 bg-neutral-950/75 transition-opacity" />
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
                <div className="relative inline-block align-bottom bg-neutral-200/80 backdrop-blur-sm rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <h2 className="titre-section text-neutral-950">{titre}</h2>
                <div className="h-5" />
                {children}
                
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
          </>
      )
}
    