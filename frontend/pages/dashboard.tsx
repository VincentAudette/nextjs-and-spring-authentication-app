import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { AtSymbolIcon, BellIcon, CalendarIcon, HomeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import WebflixLogo from '../components/webflix_logo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DashboardView from '../components/dashboard-view'
import FilmsView from '../components/films-view'
import LocationsView from '../components/locations-view'
import { useWebflix } from '../context/webflix-context'
import LocationModal from '@components/location-modal'
import CommandPaletteV2 from '@components/command-paletteV2'
import StatsView from '@components/stats-view'

const DASHBOARD_STR = "dashboard";
const FILMS_STR = "films";
const LOCATIONS_STR = "locations";
const STATS_STR = "stats";

const userNavigation = [
  { name: 'Sign out', href: '/' },
]

function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const {profile, listeFilms, setListeFilms, pageValue, setPageValue} = useWebflix()
    const [activePage, setActivePage] =  useState(DASHBOARD_STR);
    const [focusedElement, setFocusedElement] =useState(null)
    const [locationModalOpen, setLocationModalOpen] =useState(false)
    const [commandPalette, setCommandPalette] =useState(false)

    console.log("profile", profile);
    


    const navigation = [
      { name: 'Dashboard', view:DASHBOARD_STR, current: DASHBOARD_STR === activePage },
      { name: 'Films', view:FILMS_STR, current: FILMS_STR === activePage },
      { name: 'Locations', view:LOCATIONS_STR, current: LOCATIONS_STR === activePage },
      { name: 'Statistiques', view:STATS_STR, current: STATS_STR === activePage },
    ];


    useEffect(()=>{
      document.addEventListener('keydown', logKey);
      function logKey(e) {
        if(e.code === "KeyK"){
          setCommandPalette(!commandPalette)
        }
      }
    })
   

    
  return (
    <div className="min-h-screen bg-neutral-800">
      <CommandPaletteV2 open={commandPalette} setOpen={setCommandPalette} />
      {profile && focusedElement!==null && <LocationModal open={locationModalOpen} setOpen={setLocationModalOpen} focusedFilm={focusedElement} profile={profile}/>}
      <Popover
        as="header"
        className={({ open }) =>
          classNames(
            open ? 'fixed inset-0 z-40 overflow-y-auto' : '',
            'bg-neutral-900 shadow-sm lg:static lg:overflow-y-visible'
          )
        }
      >
        {({ open }) => (
          <>
            <div className="mx-auto px-4 sm:px-6 lg:px-8">
              <div className="relative flex justify-between xl:grid xl:grid-cols-12 lg:gap-8">
                <div className="flex md:absolute md:left-0 md:inset-y-0 lg:static xl:col-span-2">
                  <div className="flex-shrink-0 flex items-center">
                   <WebflixLogo className="h-12 w-auto" />
                  </div>
                </div>
                <div className="min-w-0 flex-1 md:px-8 lg:px-0 xl:col-span-6">
                  <div className="flex items-center px-6 py-4 md:max-w-3xl md:mx-auto lg:max-w-none lg:mx-0 xl:px-0">
                    <div className="w-full">
                      <label htmlFor="search" className="sr-only">
                        Search
                      </label>
                      <div className="relative">
                        <div className="pointer-events-none absolute inset-y-0 left-0 pl-3 flex items-center">
                        </div>
                        <button
                          onClick={()=>setCommandPalette(true)}
                          className="block w-full bg-neutral-800 border border-neutral-700 rounded-md py-2 pl-10 pr-3 text-sm placeholder-neutral-500 focus:outline-none focus:text-neutral-50 focus:placeholder-neutral-400 focus:ring-1 focus:ring-slate-500 focus:border-slate-500 sm:text-sm"
                        >Recherche</button>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="flex items-center md:absolute md:right-0 md:inset-y-0 lg:hidden">
                  {/* Mobile menu button */}
                  <Popover.Button className="-mx-2 rounded-md p-2 inline-flex items-center justify-center text-neutral-400 hover:bg-neutral-100 hover:text-neutral-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-slate-500">
                    <span className="sr-only">Open menu</span>
                    {open ? (
                      <XMarkIcon className="block h-6 w-6" aria-hidden="true" />
                    ) : (
                      // <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                      <div>
                        MENU
                      </div>
                    )}
                  </Popover.Button>
                </div>
                <div className="hidden lg:flex lg:items-center lg:justify-end xl:col-span-4">
              

                  {/* Profile dropdown */}
                  <Menu as="div" className="flex-shrink-0 relative ml-5">
                    <div>
                      <Menu.Button className="bg-slate-500 rounded-full items-center align-middle flex focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500">
                        <span className="sr-only">Ouvrir le menu</span>
                        <p className="rounded-full capitalize font-semibold p-2">{profile && profile.nom.split(" ")[0][0]+profile.nom.split(" ")[1][0]}</p>
                        {/* <img className="h-10 w-10 rounded-full object-cover" src={user.imageUrl} alt="" /> */}
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
                              <Link
                                href={item.href}
                                passHref
                              >
                               <button 
                               className={classNames(
                                  active ? 'bg-neutral-100' : '',
                                  'block py-2 px-4 text-sm text-neutral-700'
                                )}> {item.name}</button>
                              </Link>
                            )}
                          </Menu.Item>
                        ))}
                      </Menu.Items>
                    </Transition>
                  </Menu>

                  {/* <a
                    href="#"
                    className="ml-6 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-slate-600 hover:bg-slate-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-slate-500"
                  >
                    BOUTON FONCTION
                  </a> */}
                </div>
              </div>
            </div>

            <Popover.Panel as="nav" className="lg:hidden" aria-label="Global">
              <div className="max-w-3xl mx-auto px-2 pt-2 pb-3 space-y-1 sm:px-4">
                {navigation.map((item) => (
                
                    <button
                    onClick={()=>{setActivePage(item.view)}}
                    key={item.name}
                    className={classNames(
                      item.current ? 'bg-neutral-800 text-neutral-100' : 'hover:bg-neutral-50 hover:text-neutral-800 text-neutral-100',
                      'block rounded-md py-2 px-3 text-base font-medium'
                    )}>
                      {item.name}
                    </button>
                ))}
              </div>
              <div className="border-t border-neutral-800 pt-4 pb-3">
                <div className="max-w-3xl mx-auto px-4 flex items-center sm:px-6">
                   <div className="bg-slate-500 rounded-full items-center align-middle flex ">
                        <p className="rounded-full capitalize font-semibold p-2">{profile && profile.nom.split(" ")[0][0]+profile.nom.split(" ")[1][0]}</p>
                  </div>
                  {profile && <div className='bg-neutral-900 p-5 rounded-md'>
                <p className='text-lg font-bold'>{profile.nom}</p>
                <p className='text-md font-bold'>ID - {profile.idUtilisateur}</p>
                <div className='text-neutral-300 text-sm space-y-2 mt-3'>
                <span className='flex items-center space-x-2'><PhoneIcon className='h-5 w-5' /><p>{profile.numTel}</p></span>
                <span className='flex items-center space-x-2'><AtSymbolIcon className='h-5 w-5' /><p>{profile.courriel}</p></span>
                <span className='flex items-center space-x-2'><CalendarIcon className='h-5 w-5' /><p>{profile.dateDeNaissance}</p></span>
                {/* <span className='flex items-center space-x-2'><HomeIcon className='h-5 w-5' /><p>{profile.adresse.numeroCivique} {profile.adresse.rue}, {profile.adresse.ville}, {profile.adresse.province}, {profile.adresse.codePostal}</p></span> */}
                </div>

              </div>}
                 
                </div>
                <div className="mt-3 max-w-3xl mx-auto px-2 space-y-1 sm:px-4">
                  {userNavigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="block rounded-md py-2 px-3 text-base font-medium text-neutral-500 hover:bg-neutral-50 hover:text-neutral-900"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
              </div>
            </Popover.Panel>
          </>
        )}
      </Popover>

      <div className="py-6">
        <div className=" mx-auto sm:px-6 lg:px-8 lg:grid lg:grid-cols-12 lg:gap-8">
          <div className="hidden lg:block lg:col-span-3 xl:col-span-2 ">
            <nav aria-label="Sidebar" className="sticky top-6 space-y-2 flex flex-col ">
            {navigation.map((item) => (
                    <button
                      key={item.name}
                      onClick={()=>{setActivePage(item.view)}}
                      className={`hidden lg:block py-2 px-3 text-base font-medium rounded-md  ${item.current ? "bg-neutral-900 text-neutral-50" :"  text-neutral-400 hover:bg-neutral-50 hover:text-neutral-900"}`}
                    >
                      {item.name}
                    </button>
                  ))}
            </nav>
          </div>
          <main className="lg:col-span-9 xl:col-span-6">
              <div className="bg-neutral-900 rounded-md py-5 px-4">
              {
                DASHBOARD_STR === activePage && <DashboardView setActivePage={setActivePage} navigation={navigation} />
              }
              {
                FILMS_STR === activePage && <FilmsView listeFilms={listeFilms} setFocusedElement={setFocusedElement} pageValue={pageValue} setPageValue={setPageValue} setLocationModalOpen={setLocationModalOpen}/>
              }
              {
                LOCATIONS_STR === activePage && <LocationsView idUtilisateur={profile.idUtilisateur} />
              }
              {
                STATS_STR === activePage && <StatsView />
              }
              
              </div>

          </main>
          <aside className="hidden xl:block xl:col-span-4">
            <div className="sticky top-6 space-y-4">
              {
                focusedElement !== null &&  <div className='bg-neutral-900 p-5 rounded-md'>{focusedElement}</div>
              }
              {profile && <div className='bg-neutral-900 p-5 rounded-md'>
                <p className='text-lg font-bold'>{profile.nom}</p>
                <p className='text-md font-bold'>ID - {profile.idUtilisateur}</p>
                <div className='text-neutral-300 text-sm space-y-2 mt-3'>
                <span className='flex items-center space-x-2'><PhoneIcon className='h-5 w-5' /><p>{profile.numTel}</p></span>
                <span className='flex items-center space-x-2'><AtSymbolIcon className='h-5 w-5' /><p>{profile.courriel}</p></span>
                <span className='flex items-center space-x-2'><CalendarIcon className='h-5 w-5' /><p>{profile.dateDeNaissance}</p></span>
                {/* <span className='flex items-center space-x-2'><HomeIcon className='h-5 w-5' /><p>{profile.adresse.numeroCivique} {profile.adresse.rue}, {profile.adresse.ville}, {profile.adresse.province}, {profile.adresse.codePostal}</p></span> */}
                </div>
              </div>}
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
