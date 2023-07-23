import { fetchBandeannonce, fetchCorrelation, fetchCoteMoyenne } from "@controllers/filmController";
import { Disclosure } from "@headlessui/react";
import Link from "next/link";
import { useEffect, useState } from "react";
import { Film } from "types/webflix";
import CoteMoyenneStars from "./cote-moyenne-stars";
import PopcornIcon from "./graphics/popcorn-icon";
import PersonneDisclosure from "./personne-disclosure";

interface FilmCardParams{
    film: Film,
    moreInfo?: boolean
    setLocationModalOpen?:any
}



export default function FilmCard({film, moreInfo, setLocationModalOpen}:FilmCardParams){ 

   const [activeList, setActiveList] = useState(0)
   const [bandeannnonce, setBandeannonce] = useState('')
   const [correlation, setCorrelation] = useState([])
   const [coteMoyenne, setCoteMoyenne] = useState('')


   useEffect(()=>{
    if(moreInfo){
      (async ()=>{
          try{
              const _bandeannnonce = await fetchBandeannonce(film.idFilm)
            const _correlation = await fetchCorrelation(film.idFilm)
              const _coteMoyenne = await fetchCoteMoyenne(film.idFilm)
            //   setBandeannonce(_bandeannnonce)
              console.log("_correlation**********", _correlation);
              console.log("_coteMoyenne**********", _coteMoyenne);
              
              setCorrelation(_correlation)
              setCoteMoyenne(_coteMoyenne)
          }catch(err){
            // setBandeannonce("Erreur")
            console.log("ERRORS FETCHING ITEMS",err);
            
          }
        })()  
    }
   
   },[moreInfo, film.idFilm]);

   console.log("correlation*****=========",correlation);
   console.log("coteMoyenne",coteMoyenne);
   

//    if(bandeannnonce && bandeannnonce !== 'Erreur') return <div>Loading...</div>
  
 

    const dureeEnHeure = film.duree / 60;
    let heures = Math.floor(dureeEnHeure);
    // const min = Number.parseInt(new String(dureeEnHeure).split(".")[1].slice(0,2));
    const min = film.duree - heures*60;

    let minutes =min;
    if(min>60){
        heures +=1;
        minutes -= 60;
    }
    return  (<>
                <div className="flex space-x-3 items-center">
                    {/* <FilmIcon className="h-6 w-6" /> */}
                    <p className=" text-xl font-bold">{film.titre}</p>
                    <div className="grow" />
                    <p>{heures}h {minutes}min</p>
                </div>
                <div className=" items-start space-y-2">
                    <div className="text-left">Année: {film.annee}</div>
                    <div className="flex gap-2 flex-wrap">
                    {film.genres.map(genre=>(
                        <p key={`${film.idFilm}-genre-${genre.idGenre}`} className="bg-neutral-700 px-2 rounded-md">{genre.genre}</p>
                    ))}
                    </div>
                </div>
                {moreInfo && <div>
                    <div>
                        <div className="flex w-full gap-2">

                        <button 
                        onClick={()=>setLocationModalOpen(true)}
                        className="flex bg-gradient-to-br space-x-3 from-purple-500 to-red-500 text-white px-4 py-2 my-3 mt-5 rounded-md hover:scale-110">
                            <PopcornIcon className="h-6 w-6" />
                            <p>Louer</p>
                        </button> 
                       {bandeannnonce && bandeannnonce!=="Erreur" && <Link href={bandeannnonce}  passHref>
                        <a 
                        target="_blank"
                        className="flex bg-gradient-to-br space-x-3 border text-white hover:border-neutral-200 hover:text-neutral-200 px-4 py-2 my-3 mt-5 rounded-md">
                            {/* <PlayIcon className="h-6 w-6" /> */}
                            <p>Bande annonce</p>
                        </a>
                        </Link>}
                        </div>

                        
                       <div className="my-3 space-y-2">
                            <p className="text-lg -mb-2 font-medium ">Cote Moyenne</p>
                            <div className="flex group items-center py-3 h-10 gap-2"><CoteMoyenneStars coteMoyenne={coteMoyenne} /> <span className="hidden group-hover:block text-sm">{coteMoyenne}</span></div>
                        </div>
                        
                        <div className="my-3 space-y-2">
                            <p className="text-lg -mb-2 font-medium ">Correlation</p>
                            <div>

                                <ul>
                                {correlation && correlation.map((item, i)=>{
                                        return <li className="flex" key={`correlation-${i}`}>
                                           <span>Film(item) {i}</span> {item}
                                        </li>
                                })}
                                </ul>

                            </div>
                        </div>

                        <div className="my-3 space-y-2">
                            <p className="text-lg -mb-2 font-medium ">Résumé</p>
                            <p className="text-sm ">{film.resume}</p>
                        </div>
                        <div className="my-3 space-y-2">
                            <p className="text-lg -mb-2 font-medium ">Langue</p>
                            <p className="text-sm ">{film.langue}</p>
                        </div>
                        <div className="my-3 space-y-2">
                            <p className="text-lg -mb-2 font-medium ">Pays</p>
                            <div className="text-sm my-3 flex space-x-3">{film.pays.map(p=>(<p className="border border-neutral-500 rounded-md px-1" key={`pays-${p.idPays}`}>{p.nom}</p>))}</div>

                        </div>
                    </div>
                    <div className="my-3">
                        <p className="text-lg -mb-2 font-medium ">Realisateur</p>
                        <PersonneDisclosure personne={film.realisateur} />
                    </div>
                    <div>
                    <button onClick={()=>{setActiveList(0)}} className="text-lg font-medium mt-3 rounded-l-md bg-slate-600 hover:bg-slate-700 px-2 disabled:bg-slate-800" disabled={activeList===0}>Acteurs</button>
                    <button onClick={()=>{setActiveList(1)}} className="text-lg font-medium mt-3 rounded-r-md bg-slate-600 hover:bg-slate-700 px-2 disabled:bg-slate-800" disabled={activeList===1}>Scenaristes</button>
                    </div>
                    {activeList === 0 && film.acteurs.map(acteur=><PersonneDisclosure key={`${acteur.nomPersonne}`} personne={acteur} />)}

                    {activeList === 1 && film.scenaristes.map(scenariste=>(
                        <div key={`${film.idFilm}-scenariste-${scenariste.idScenariste}`} className="pt-2">
                                <p className="font-medium text-neutral-300">{scenariste.nom}</p>
                    </div>))
                    }
                    </div>
                }
            </>)
}