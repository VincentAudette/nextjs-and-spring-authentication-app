import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { Bars3Icon, BellIcon, UserIcon, XMarkIcon } from '@heroicons/react/24/outline'
import Link from 'next/link'
import ETSLogo from '@components/SVG/ETSLogo'
import { useAuth } from 'context/auth-context'
import { useRouter } from 'next/router'
import useIsClient from 'utils/use-is-client'
import NotificationContainer from './notification-container'
import { useNotifications } from 'context/notification-context'
import { useQuery, useQueryClient } from 'react-query'
import { Bell, CheckCircle } from 'lucide-react'




  
  function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  export const getDisplayNameRole = (role) => {
    switch(role){
      case 'ROLE_ADMINISTRATEUR':
        return 'Administrateur';
      case 'ROLE_PREPOSE_AUX_CLIENTS_DAFFAIRE':
        return 'Préposé aux clients d’affaire';
      case 'ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS':
        return 'Préposé aux clients résidentiels';
      default:
        return 'Aucun rôle';
  };

  }

 export const logout = async (token:string) => {
    const res = await fetch(`/api/logout?token=${token}`);
    if (!res.ok) {
      const errorObj = await res.json();
      errorObj.status = res.status;
      throw errorObj;
    } else {
      // Clear the client-side storage
      if (typeof window !== "undefined") {
        localStorage.removeItem("profile");
      }
  
      
    }
  }



export default function Layout(
    {children, navigation, setActivePage}:{
        children: React.ReactNode,
        navigation: {name:string, view:string, current:boolean}[],
        setActivePage: (view:string)=>void,
    }
    ){

    const router = useRouter();
    const isClient = useIsClient();
    const {profile} = useAuth();
    const {notify} = useNotifications();
    const queryClient = useQueryClient(); 

 
    const [focusedElement, setFocusedElement] = useState(null)
    const [notifications, setNotifications] = useState([])
    

    const userNavigation = [
      { name: 'Modifier mot de passe', onClick: ()=>setActivePage('gestion-de-compte') },
      { name: 'Déconnexion', href: '/', onClick: ()=>{
        try{
          logout(profile.token)
          router.push('/');
        }catch (err){
          notify(
            {
              heading: 'Erreur durant la déconnexion',
              description: err.message,
            }
          )
        }
      } },
    ]

    const fetchNotifications = async ({queryKey}) => {
      const [_key, role, token] = queryKey;
        if(role === 'ROLE_ADMINISTRATEUR'){
            const res = await fetch(`/api/getPasswordResetNotifications?token=${token}`)
    
            if(res.ok){
                const data = await res.json()
                setNotifications(data)
                return data;
            }
        }
    }


  const { data: passwordNotifications,isLoading:loadingPwdNotif, isError, error } = useQuery(['passwordResetNotifications', profile?.role, profile?.token], fetchNotifications, {
    enabled: profile?.role === 'ROLE_ADMINISTRATEUR',
  });


    



    return (
        <>
        <div className="flex flex-col-reverse fixed bottom-0 md:top-0 md:bottom-auto md:right-0 sm:inset-x-auto inset-x-0 z-[1000] p-5 max-h-screen overflow-scroll gap-3">
                <NotificationContainer />
            </div>
        <div className="min-h-screen bg-neutral-700 pb-5">
        <Popover
          as="header"
          className={({ open }) =>
            classNames(
              open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
              'bg-neutral-800 py-2 shadow-sm lg:static lg:overflow-y-visible'
            )
          }
        >
          {({ open }) => (
            <>
              <div className="mx-auto px-4 sm:px-6 lg:px-8">
                <div className="relative flex justify-between items-center">
                  <div className="flex  md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                    <div className="flex-shrink-0 flex items-center">
                    <ETSLogo className='h-20 w-20 pt-5 px-[11px] bg-red-500 my-auto mx-auto' />
                    </div>
                  </div>
                  
                  <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                    {/* Mobile menu button */}
                    <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-neutral-500">
                      <span className="sr-only">Open menu</span>
                      {open ? (
                        <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                      ) : (
                        <div className='flex gap-2 items-center'>
                         <Bars3Icon className='h-5 w-5' /> MENU
                        </div>
                      )}
                    </Popover.Button>
                  </div>
                  <div className="hidden lg:flex ">
                    {/* Profile dropdown */}
                    <Menu as="div" className="flex-shrink-0 relative ml-5">
                      <div>
                        <Menu.Button className="border bg-neutral-700 border-neutral-700 p-4 rounded-full items-center align-middle flex focus-dark">
                          <span className="sr-only">Ouvrir le menu</span>
                          <UserIcon className="h-6 w-6 text-neutral-100" aria-hidden="true" />
                        </Menu.Button>
                      </div>
                      <Transition
                        as={Fragment}
                        enter="transition ease-out duration-100"
                        enterFrom="transform opacity-0 scale-95"
                        enterTo="transform opacity-100 scale-100"
                        leave="transition ease-in duration-75"
                        leaveFrom="transform opacity-100 scale-100"
                        leaveTo="transform opacity-0 scale-95"
                      >
                        <Menu.Items className="origin-top-right absolute z-10 right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 py-1 focus:outline-none">
                          {userNavigation.map((item) => (
                            <Menu.Item key={item.name}>
                              {({ active }) => (
                                 <button 
                                 onClick={item.onClick}
                                 className={classNames(
                                    active ? 'bg-neutral-300 ' : '',
                                    'block py-2 px-4 text-sm w-full text-neutral-700'
                                  )}> {item.name}</button>
                              )}
                            </Menu.Item>
                          ))}
                        </Menu.Items>
                      </Transition>
                    </Menu>
                  </div>
                </div>
              </div>
  
              <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
                <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                  {navigation.map((item) => (
                  
                      <Popover.Button
                      onClick={()=>{setActivePage(item.view);
                      }}
                      key={item.name}
                      className={classNames(
                        item.current ? 'bg-neutral-600 text-neutral-100' : 'hover:bg-neutral-50 hover:text-neutral-800 text-neutral-100',
                        'block rounded-md py-2 px-3 text-base font-medium'
                      )}>
                        {item.name}
                      </Popover.Button>
                  ))}
                </div>
                <div className="border-t border-neutral-800 pt-4 pb-3">
                  <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                    {profile && <div className='bg-neutral-900 p-5 rounded-md'>
                  <p className='text-lg font-bold'>{profile.username}</p>
                  <p className='text-md'>Role - {profile.role}</p>
                </div>}
                   
                  </div>
                  <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                    {userNavigation.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="block rounded-md py-2 px-3 text-base font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                  </div>
                </div>
              </Popover.Panel>
            </>
          )}
        </Popover>
  
        <div className="py-6">
          <div className=" mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
            <div className="hidden lg:block lg:col-span-2 2xl:col-span-3 ">
              <nav aria-label="Sidebar" className="sticky top-6 space-y-2 flex flex-col ">
              {navigation.map((item) => (
                      <button
                        key={item.name}
                        onClick={()=>{setActivePage(item.view)}}
                        className={`hidden text-left lg:block py-2 px-3 text-base font-medium rounded-md  ${item.current ? "bg-neutral-900 text-neutral-50" :"  text-neutral-400 bg-neutral-800/50 hover:bg-neutral-50 hover:text-neutral-900"}`}
                      >
                        {item.name}
                      </button>
                    ))}
              </nav>
            </div>
            <main className=" lg:col-span-8 2xl:col-span-6">
                {children}
            </main>
            <aside className="hidden lg:col-span-2 xl:block 2xl:col-span-3">
              {isClient && <div className="sticky top-6 space-y-4">
                
                {profile && <div className='bg-neutral-900 p-5 rounded-md'>
                  <p className='text-lg font-bold'>{profile.username}</p>
                  <p className='text-base font-bold'>Role: {getDisplayNameRole(profile?.role)}</p>
                </div>}
                
                
                {
                  
                 passwordNotifications?.length >= 1 && !loadingPwdNotif && !error && ( <div className='bg-neutral-900 p-5 rounded-md'>
                    <div className='flex gap-2'>
                    <BellIcon className='h-6 w-6 text-red-500 animate-pulse' aria-hidden='true' />
                    <h2 className='font-bold text-lg mb-4'>Notifications</h2>
                    </div>
                    <ul className='flex flex-col gap-3'>
                        {notifications.map(notification => (
                            <li className='bg-neutral-400 flex flex-col gap-3 text-neutral-800 rounded-md p-4' key={notification.id}>
                                <div className='flex flex-col gap-1'>
                                  <p className='font-uppercase text-sm'>Utilisateur</p>
                                  <p className='text-lg font-semibold'>{JSON.parse(notification.username).username}</p>
                                  <p>Date d&apos;envoi: {new Date(notification.timestamp).toLocaleString()}</p>
                                  <p>État de la commande: {notification.isTreated ? 'Traité' : <span className='bg-neutral-500/50 text-neutral-950 border border-neutral-600/20 px-2  rounded-sm'>Non traité</span>}</p>
                                  <p>Demande de réinitialisation de mot de passe</p>
                                </div>
                                <button className="focus-light py-1 focus:ring-green-300 group max-w-[15rem] w-full text-neutral-800 bg-neutral-100 hover:border-green-600 border shadow-sm hover:shadow-none  hover:bg-green-100 text-center rounded-md "
                                 onClick={async () => {
                                    const res = await fetch(`/api/treatNotification?token=${profile?.token}&id=${notification.id}`,
                                   { method: 'PUT'} )
                                    if(!res.ok){
                                        const data = await res.json()
                                        notify(
                                            {
                                                heading: 'Erreur durant le traitement de la demande',
                                                description: data.message,
                                            }
                                        );
                                        return;
                                    }
                                    if(res.ok){
                                        queryClient.invalidateQueries('passwordResetNotifications');
                                        notify(
                                          {
                                              heading: 'Succès',
                                              description: "La demande a été traité avec succès",
                                              color: 'green'
                                          }
                                      );
                                    }
                                }}>
                                    <div className="flex items-center mx-auto max-w-min gap-2">
                                      <div className="group-hover:bg-green-300 rounded-md p-1">
                                      <CheckCircle className="h-4 w-4 group-hover:text-green-800" />
                                      </div>
                                      <p className=" min-w-max group-hover:text-green-900">Demande complété</p>
                                  </div>
                                  
                                  </button>
                            </li>
                        ))}
                    </ul>
                </div>)
                }

              </div>}
            </aside>
          </div>
        </div>
      </div>
      <div className='fixed bottom-0 text-neutral-500 text-xs bg-neutral-900/80 w-screen py-1 px-2'>
        {/* Add a copyright for École de technologie supérieur - GTI619 - Équipe F  */}
        &copy; École de Technologie Supérieure &middot; GTI619 &middot; Équipe F &middot; ÉTÉ 2023
      </div>
      </>
    )
}