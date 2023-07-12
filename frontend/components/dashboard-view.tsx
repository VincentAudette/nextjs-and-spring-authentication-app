import WebflixLongLogo from "./graphics/webflix-long"

export default function DashboardView({setActivePage, navigation}){
    return (<div>
        <title>Webflix | Dashboard</title>
       <h1 className="titre-section" data-testid="d1">Dashboard</h1>
       
       <ul className="space-y-3 mt-3" data-testid="d2">
       {navigation.map((navItem,i)=>{
           return i>0 && <li key={`nav-${navItem.name}`}>
           <button onClick={()=>setActivePage(navItem.view)} className="w-full py-28 bg-stone-800 hover:bg-slate-700 rounded-md">{navItem.name}</button>
          </li>
       })}
       </ul>

    </div>)
  
}