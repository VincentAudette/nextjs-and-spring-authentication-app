
export default function DashboardView({setActivePage, navigation}){
    return (<div>
       <ul className="space-y-3 mt-3" data-testid="d2">
       {navigation.map((navItem,i)=>{
           return i>0 && <li key={`nav-${navItem.name}`}>
           <button onClick={()=>setActivePage(navItem.view)} className="w-full py-28 bg-neutral-800 hover:bg-slate-700 rounded-md">{navItem.name}</button>
          </li>
       })}
       </ul>
    </div>)
  
}