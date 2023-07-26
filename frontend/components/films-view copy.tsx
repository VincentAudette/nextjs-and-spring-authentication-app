import DashboardView from "./dashboard-view";

export default function AdminView({navigation,activePage, setActivePage}){

    
    
    return (<div>
        <title>Administrateur | GTI619 | Labo 5</title>
        <div className="flex items-center justify-center mb-3">
            <h1 className="titre-section">Administrateur</h1>
            <div className="grow"/>
            
        </div>
        <DashboardView setActivePage={setActivePage} navigation={navigation} />

        {/* TODO: add the correct active page views when ready */}
        

    </div>)
  
}