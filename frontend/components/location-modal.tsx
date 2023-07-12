import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import WebflixLongLogo from './graphics/webflix-long'
import { Film } from 'types/webflix';
import { rentFilm } from '@controllers/filmController';
import Notification from "@components/notification";
export default function LocationModal({open, setOpen, focusedFilm, profile}){
  
  const film : Film= focusedFilm.props.children.props.film;

      const [errorModal, setErrorModal] = useState(false)
      const [errorMessage, setErrorMessage] = useState('')

      const handleRental = async ()=>{
        try {
          await rentFilm(film.idFilm, profile.idUtilisateur);
          setOpen(false)
        }catch (e){
          setErrorModal(true)
          setErrorMessage(e)
        }
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
                <Dialog.Overlay className="fixed inset-0 bg-stone-900 bg-opacity-75 transition-opacity" />
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
                <div className="relative inline-block align-bottom bg-stone-50 rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
                <WebflixLongLogo className="h-20 mx-auto w-auto text-[#d81f26]"/>
                  <div className="sm:flex sm:items-start  my-12">
                    
                    
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <Dialog.Title as="h3" className="text-lg leading-6 font-medium text-stone-900">
                        Louer le film {film.titre}
                      </Dialog.Title>
                      <div className="mt-2">
                        <p className="text-sm text-stone-500">
                          Les frais de film s&apos;applique si vous poursuivez avec cette transaction.
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="mt-5 sm:mt-4 sm:flex sm:flex-row-reverse">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-slate-600 text-base font-medium text-white hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                      onClick={handleRental}
                    >
                      Poursuivre
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-stone-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-stone-700 hover:bg-stone-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500 sm:mt-0 sm:w-auto sm:text-sm"
                      onClick={() => setOpen(false)}
                      ref={cancelButtonRef}
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </Dialog>
        </Transition.Root>
          </>
      )
}
    