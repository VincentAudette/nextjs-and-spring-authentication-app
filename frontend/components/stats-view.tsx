import { useState } from "react";
import CommandPaletteStats from "./command-palette-stats";
import { useAuth } from "../context/auth-context";


export default function StatsView(){
    const {listeStats} = useAuth()
    // const [locations, setLocations] = useState([]);
    // const router =useRouter();

    // useEffect(()=>{
    //     (async ()=>{
    //         const _locations: Location[] = await fetchUserLocations(idUtilisateur);
    //         setLocations(_locations);
    //     })()
    // },[router])

    // let isSuperUser = false;

    // if(locations.length>1){
    //     const locationObj:Location = locations[0];
    //     const locationDate1 = new Date(locationObj.dateEmprunt);
    //     const locationDate2 = new Date(locationObj.dateARetourner);
    //     if(locationDate1>locationDate2){
    //         isSuperUser =true;
    //     }
    // }

    const [paletteOpen, setPaletteOpen] = useState(false);

   

    
    return (<div>
        <title>Webflix | Statistiques</title>
        <h1 className="titre-section">Statistiques</h1>
        <CommandPaletteStats open={paletteOpen} setOpen={setPaletteOpen} />
        <button onClick={()=> setPaletteOpen(true)} className=" rounded-md bg-white hover:bg-neutral-300 text-lg py-3 px-4 text-neutral-900">Recherche statistiques</button>
        <ul className="space-y-3 mt-3">
        {listeStats} locations
        </ul>
    </div>)
  
}