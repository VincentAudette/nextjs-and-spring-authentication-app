import { Film } from "types/webflix";
import FilmCard from "./film-card";

export default function FilmsView({listeFilms, setFocusedElement, pageValue, setPageValue, setLocationModalOpen}){

    
    
    return (<div>
        <title>Webflix | Films</title>
        <div className="flex items-center justify-center mb-3">
            <h1 className="titre-section">Films</h1>
            <div className="grow"/>
            <div className="flex space-x-1 items-center">
                <p className="mr-1 font-medium">Page {pageValue}</p>
                <button onClick={()=>{
                    const newPageValue = pageValue-1;
                    if(newPageValue>0){
                        setPageValue(newPageValue)
                    }
                }} className="bg-neutral-800 h-9 w-9 rounded-md flex items-center justify-center">
                    {"<"}
                    </button>
                <button onClick={()=>{
                    const newPageValue = pageValue+1;
                    setPageValue(newPageValue);
                }} className="bg-neutral-800 h-9 w-9 rounded-md flex items-center justify-center">
                    {">"}
                    </button>
            </div>
        </div>
        <ul className="space-y-3">
        {listeFilms && listeFilms.map((film:Film)=>{
           
            return (<button onClick={()=>setFocusedElement(<div>
                 <FilmCard film={film} moreInfo={true} setLocationModalOpen={setLocationModalOpen} />
            </div>)} className=" w-full bg-neutral-800 p-2 hover:bg-neutral-600 rounded-md space-y-4" key={film.idFilm}>
                <FilmCard film={film} />

               
            </button>)
        })}
        </ul>

    </div>)
  
}