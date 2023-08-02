export interface Personne{
    idPersonne:number;
    nomPersonne:string;
    dateNaissance:string;
    lieuNaissance:string;
    photo:string;
    bio:string|null;
    categoriePersonne:null;
}

export interface Scenariste{
    idScenariste:number;
    nom:string;
}

export interface Pays{
    idPays: number;
    nom:string;
}

export interface Genre{
    idGenre: number;
    genre:string;
}

export interface Location{
    idLocation:number;
    dateDeRetour:string|null;
    dateARetourner:string;
    dateEmprunt:string;
    film:Film;
    utilisateur:Personne;
}


export interface Film{
    idFilm:number;
    titre:string;
    annee:number;
    langue:string;
    duree:number;
    resume:string;
    affiche:string;
    realisateur:Personne;
    acteurs: Personne[];
    scenaristes:Scenariste[];
    pays:Pays[];
    genres:Genre[];

}