
export default function DashboardView({setActivePage, navigation}){
    return (<div>
       <ul className="space-y-3 mt-3" data-testid="d2">
       {navigation.map((navItem,i)=>{
           return i>0 && <li key={`nav-${navItem.name}`}>
           <button onClick={()=>setActivePage(navItem.view)} className="w-full py-12 focus-dark text-neutral-800 font-medium text-lg border-neutral-800 bg-neutral-200 hover:bg-neutral-300 rounded-xl">{navItem.name}</button>
          </li>
       })}
       </ul>
    </div>)
  
}