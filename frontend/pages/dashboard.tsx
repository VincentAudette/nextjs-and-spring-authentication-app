import DashboardView from '../components/dashboard-view'
import { useAuth } from '../context/auth-context'
import Layout from '@components/layout'
import { useState } from 'react'
import PreposeAuxClientsResidentielsView from '@components/prepose-aux-clients-residentiels-view'
import PreposeAuxClientsAffaireView from '@components/prepose-aux-clients-affaire-view'
import RoleBasedRedirection from '@components/role-based-redirection'

const DASHBOARD_STR = "dashboard";
const CLIENTS_RESIDENTIELS = "clients-residentiels";
const CLIENTS_AFFAIRE = "clients-affaire";


function classNames(...classes) {
  return classes.filter(Boolean).join(' ')
}

export default function Dashboard() {
    const {profile} = useAuth()
    const [activePage, setActivePage] =  useState(DASHBOARD_STR);
    const [focusedElement, setFocusedElement] =useState(null)


    const navigation = profile?.role === "ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS" ? [
      { name: 'Tableau de bord', view:DASHBOARD_STR, current: DASHBOARD_STR === activePage },
      { name: 'Clients résidentiels', view:CLIENTS_RESIDENTIELS, current: CLIENTS_RESIDENTIELS === activePage },
    ]:[
      { name: 'Tableau de bord', view:DASHBOARD_STR, current: DASHBOARD_STR === activePage },
      { name: 'Clients d’affaire', view:CLIENTS_AFFAIRE, current: CLIENTS_AFFAIRE === activePage },
    ];


    
    
  return (
    <RoleBasedRedirection allowedRoles={["ROLE_PREPOSE_AUX_CLIENTS_RESIDENTIELS", "ROLE_PREPOSE_AUX_CLIENTS_DAFFAIRE"]}>
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
                CLIENTS_RESIDENTIELS === activePage && <PreposeAuxClientsResidentielsView />
              }
              {
                CLIENTS_AFFAIRE === activePage && <PreposeAuxClientsAffaireView />
              }
              
              </div>
    </Layout>
    </RoleBasedRedirection>
    

        
  )
}
