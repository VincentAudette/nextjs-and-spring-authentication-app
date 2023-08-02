
export default function DashboardView({setActivePage, navigation}){
    return (<div className="">
       <ul className="flex flex-col gap-2 " data-testid="d2">
       {navigation.map((navItem,i)=>{
           return i>0 && <li key={`nav-${navItem.name}`}>
          
           <button onClick={()=>setActivePage(navItem.view)} className="group flex w-full justify-center items-center gap-2 py-9 focus-dark text-neutral-800 font-medium text-lg border-neutral-800 bg-neutral-200 hover:bg-neutral-300 rounded-xl">
           {
                navItem?.icon !== null && <div className="">
                <navItem.icon className="w-6 h-6 text-neutral-400 group-hover:text-red-500 "/>
                </div>
            }
            <p className="text-neutral-700 group-hover:text-neutral-900">{navItem.name}</p>
            
            </button>
          </li>
       })}
       </ul>
    </div>)
  
}