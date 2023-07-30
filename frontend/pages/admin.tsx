
import ParametresDeSecurite from '@components/parametres-de-securite';
import AdminView from '@components/admin-view'
import GestionDeMotDePasseView from '@components/gestion-de-mdp-view';
import Layout from '@components/layout'
import PreposeAuxClientsAffaireView from '@components/prepose-aux-clients-affaire-view';
import PreposeAuxClientsResidentielsView from '@components/prepose-aux-clients-residentiels-view';
import { useEffect, useState } from 'react';
import { AcademicCapIcon, GlobeAmericasIcon, IdentificationIcon, ShieldCheckIcon } from '@heroicons/react/24/outline';
import NotificationAvecAction from '@components/notification-avec-action';
import { useAuth } from 'context/auth-context';
import { useRouter } from 'next/router';
import RoleBasedRedirection from '@components/role-based-redirection';

const DASHBOARD_STR = "dashboard";
const CLIENTS_RESIDENTIELS = "clients-residentiels";
const CLIENTS_AFFAIRE = "clients-affaire";
const GESTION_DE_MDP = "mot-de-passe";
const PARAMETRES_DE_SECURITE = "paramètres de sécurité";



export default function AdminPage() {



  const {profile} = useAuth();
  const router = useRouter();

 
    const [activePage,setActivePage] =  useState(DASHBOARD_STR);

    const navigation = [
      { name: 'Tableau de bord', view:DASHBOARD_STR, current: DASHBOARD_STR === activePage, icon: null },
      { name: 'Clients résidentiels', view:CLIENTS_RESIDENTIELS, current: CLIENTS_RESIDENTIELS === activePage, icon: AcademicCapIcon },
      { name: 'Clients d’affaire', view:CLIENTS_AFFAIRE, current: CLIENTS_AFFAIRE === activePage, icon: GlobeAmericasIcon },
      { name: 'Liste d\'utilisateurs', view:GESTION_DE_MDP, current: GESTION_DE_MDP === activePage, icon: IdentificationIcon },
      { name: 'Paramètres de sécurité', view:PARAMETRES_DE_SECURITE, current: PARAMETRES_DE_SECURITE === activePage, icon: ShieldCheckIcon },
    ];


    useEffect(() => {
      if (!profile) {
        router.push('/');
      }
    }, [profile, router]);
   
  return (
    <RoleBasedRedirection allowedRoles={["ROLE_ADMINISTRATEUR"]} >
   <Layout navigation={navigation} setActivePage={setActivePage}>
    <div className="bg-neutral-900 md:rounded-md py-5 px-4">
    <NotificationAvecAction />
     {navigation[0].current && <AdminView navigation={navigation} activePage={activePage} setActivePage={setActivePage} />}
     {navigation[1].current && <PreposeAuxClientsResidentielsView />}
     {navigation[2].current && <PreposeAuxClientsAffaireView />}
      {navigation[3].current && <GestionDeMotDePasseView />}
      {navigation[4].current && <ParametresDeSecurite />}
    </div>
   </Layout>
   </RoleBasedRedirection>
  )
}
