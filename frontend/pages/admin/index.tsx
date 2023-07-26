
import ConfigurationsDeMotDePasseView from '@components/configurations-de-mdp-view';
import AdminView from '@components/films-view copy'
import GestionDeMotDePasseView from '@components/gestion-de-mdp-view';
import Layout from '@components/layout'
import PreposeAuxClientsAffaireView from '@components/prepose-aux-clients-affaire-view';
import PreposeAuxClientsResidentielsView from '@components/prepose-aux-clients-residentiels-view';
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
     {navigation[0].current && <AdminView navigation={navigation} activePage={activePage} setActivePage={setActivePage} />}
     {navigation[1].current && <PreposeAuxClientsResidentielsView />}
     {navigation[2].current && <PreposeAuxClientsAffaireView />}
      {navigation[3].current && <GestionDeMotDePasseView />}
      {navigation[4].current && <ConfigurationsDeMotDePasseView />}
    </div>
   </Layout>
  )
}
