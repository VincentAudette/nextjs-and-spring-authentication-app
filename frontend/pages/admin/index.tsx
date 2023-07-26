
import AdminView from '@components/films-view copy'
import Layout from '@components/layout'
import { useState } from 'react';

const DASHBOARD_STR = "dashboard";
const CLIENTS_RESIDENTIELS = "clients-residentiels";
const CLIENTS_AFFAIRE = "clients-affaire";
const GESTION_DE_MDP = "mot-de-passe";
const CONFIG_MDP = "configurations-mot-de-passe";



export default function Dashboard() {
  
    const [activePage, setActivePage] =  useState(DASHBOARD_STR);

    const navigation = [
      { name: 'Tableau de bord', view:DASHBOARD_STR, current: DASHBOARD_STR === activePage },
      { name: 'Préposé aux clients résidentiels', view:CLIENTS_RESIDENTIELS, current: CLIENTS_RESIDENTIELS === activePage },
      { name: 'Préposé aux clients d’affaire', view:CLIENTS_AFFAIRE, current: CLIENTS_AFFAIRE === activePage },
      { name: 'Gestion de mot de passe', view:GESTION_DE_MDP, current: GESTION_DE_MDP === activePage },
      { name: 'Configurations de mot de passe', view:CONFIG_MDP, current: CONFIG_MDP === activePage },
    ];


   

    
  return (
   <Layout navigation={navigation} setActivePage={setActivePage}>
    <div className="bg-neutral-900 md:rounded-md py-5 px-4">
      <AdminView navigation={navigation} setActivePage={setActivePage} />
    </div>
   </Layout>
  )
}
