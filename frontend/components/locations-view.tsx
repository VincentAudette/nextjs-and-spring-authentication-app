import { fetchUserLocations } from "@controllers/filmController"
import { useRouter } from "next/router";
import { useEffect, useState } from "react"
import { Location } from "types/webflix";
import FilmCard from "./film-card";

export default function LocationsView({idUtilisateur}){

    const [locations, setLocations] = useState([]);
    const router =useRouter();

    useEffect(()=>{
        (async ()=>{
            const _locations: Location[] = await fetchUserLocations(idUtilisateur);
            setLocations(_locations);
        })()
    },[router])

    let isSuperUser = false;

    if(locations.length>1){
        const locationObj:Location = locations[0];
        const locationDate1 = new Date(locationObj.dateEmprunt);
        const locationDate2 = new Date(locationObj.dateARetourner);
        if(locationDate1>locationDate2){
            isSuperUser =true;
        }
    }

   

    
    return (<div>
        <title>Webflix | Locations</title>
        <h1 className="titre-section">Locations</h1>
        <ul className="space-y-3 mt-3">
        {locations && locations.map((location:Location)=>{
           return <li key={`location-${location.idLocation}`}>
               <div className="flex space-x-8 border-t border-stone-600 pt-2" key={`location-${location.idLocation}`}>
                <span>
                <p className="font-semibold">Date emprunte</p>
                <p className="text-sm text-stone-400">{location.dateEmprunt}</p>
                </span>
                <span>
                <p className="font-semibold">Date à retourner</p>
                {!isSuperUser && <p className="text-sm text-stone-400">{location.dateARetourner}</p>}
                {isSuperUser  && <p className="text-sm text-stone-400">Aucune</p>}
                </span>
                {location.dateDeRetour && <span>
                <p className="font-semibold">Date de retour</p>
                <p className="text-sm text-stone-400">{location.dateDeRetour}</p>
                </span>}
                
            </div>
            <div className=" scale-75 border border-stone-600 rounded-md p-3">

                <FilmCard film={location.film} />
            </div>
                </li>
        })}
        </ul>
    </div>)
  
}