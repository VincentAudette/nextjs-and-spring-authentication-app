import { Fragment, useEffect, useState } from 'react'
import { Menu, Popover, Transition } from '@headlessui/react'
import { AtSymbolIcon, BellIcon, CalendarIcon, HomeIcon, PhoneIcon, XMarkIcon } from '@heroicons/react/24/outline'
import WebflixLogo from '../components/webflix_logo'
import { useRouter } from 'next/router'
import Link from 'next/link'
import DashboardView from '../components/dashboard-view'
import FilmsView from '../components/films-view'
import LocationsView from '../components/locations-view'
import { useAuth } from '../context/auth-context'
import LocationModal from '@components/location-modal'
import CommandPaletteV2 from '@components/command-paletteV2'
import StatsView from '@components/stats-view'
import ETSLogo from '@components/SVG/ETSLogo'
import Layout from '@components/layout'

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
    const {profile, listeFilms, setListeFilms, pageValue, setPageValue} = useAuth()
    const [activePage, setActivePage] =  useState(DASHBOARD_STR);
    const [focusedElement, setFocusedElement] =useState(null)

    console.log("profile", profile);
    


    const navigation = [
      { name: 'Tableau de bord', view:DASHBOARD_STR, current: DASHBOARD_STR === activePage },
      { name: 'Locations', view:LOCATIONS_STR, current: LOCATIONS_STR === activePage },
      { name: 'Statistiques', view:STATS_STR, current: STATS_STR === activePage },
    ];



   

    
  return (
    <Layout
      navigation={navigation}
      setActivePage={setActivePage}
      setFocusedElement={setFocusedElement}
      focusedElement={focusedElement}
      
    >

              <div className="bg-neutral-900 lg:rounded-md py-5 px-4">
              {
                DASHBOARD_STR === activePage && <DashboardView setActivePage={setActivePage} navigation={navigation} />
              }
              {
                LOCATIONS_STR === activePage && <LocationsView idUtilisateur={profile.idUtilisateur} />
              }
              {
                STATS_STR === activePage && <StatsView />
              }
              
              </div>
    </Layout>
    

        
  )
}
