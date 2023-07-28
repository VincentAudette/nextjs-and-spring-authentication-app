
export default function DashboardView({setActivePage, navigation}){
    return (<div>
       <ul className="space-y-3 mt-3" data-testid="d2">
       {navigation.map((navItem,i)=>{
           return i>0 && <li key={`nav-${navItem.name}`}>
           <button onClick={()=>setActivePage(navItem.view)} className="w-full py-28 focus-dark border-neutral-800 bg-neutral-700 hover:bg-neutral-500 rounded-md text-lg">{navItem.name}</button>
          </li>
       })}
       </ul>
    </div>)
  
}