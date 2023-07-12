import { Film, Location } from "types/webflix";
import FRONTEND_URL from "utils/FE/urls";
import {
	ANALYTICS_STATS,
  CORRELATION_FILM_CONSULTE,
  FILM_BANDEANNONCE,
	FILM_ENDPOINT,
	FILM_RECHERCH,
	LOCATION_ENPOINT,
} from "utils/FULL/endpoints";

export const fetchListeFilm = async (page: number): Promise<Film[]> => {
	const res = await fetch(FRONTEND_URL + FILM_ENDPOINT + `?page=${page}`, {
		headers: {
			"Content-Type": "application/json",
		},
		method: "GET",
	});

	const result = await res.json();

	return new Promise((resolve, reject) => {
		if (result.data.length < 1) {
			reject("Il y a eu un erreur durant la requête des films");
		}
		resolve(result.data);
	});
};

export const fetchFilteredFilm = async (
	page,
	acteur,
	titre,
	realisateur,
	genre,
	pays,
	anneeBegin = -1,
	anneeEnd = -1,
	langue
): Promise<Film[]> => {
	const res = await fetch(FRONTEND_URL + FILM_RECHERCH + `?page=${page}`, {
		body: JSON.stringify({
			acteur,
			titre,
			realisateur,
			genre,
			pays,
			anneeBegin,
			anneeEnd,
			langue,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const result = await res.json();
	return new Promise((resolve, reject) => {
		if (!result.data) {
			reject("Il y a eu un erreur durant la requête des films");

		}else if (result.data.length < 1){
			resolve(result.data)
		}
		resolve(result.data);
	});
};

export const rentFilm = async (idFilm, idUtilisateur): Promise<number> => {
	const res = await fetch(FRONTEND_URL + LOCATION_ENPOINT, {
		body: JSON.stringify({
			idFilm,
			idUtilisateur,
		}),
		headers: {
			"Content-Type": "application/json",
		},
		method: "POST",
	});

	const result = await res.json();

	return new Promise((resolve, reject) => {
		if (!result.hasOwnProperty("data")) {
			reject(result.error);
		}
		resolve(result.data);
	});
};

export const fetchUserLocations = async (idUtilisateur): Promise<Location[]> => {
	const res = await fetch(FRONTEND_URL + LOCATION_ENPOINT + "/" + idUtilisateur,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		}
	);

	const result = await res.json();
	const locations: Location[] = result.data;

	return new Promise((resolve, reject) => {
		if (!result.hasOwnProperty("data")) {
			reject(`L'utilisateur ${idUtilisateur} n'as pas de locations.`);
		}
		resolve(locations);
	});
};


export const fetchBandeannonce = async (idFilm): Promise<string> => {
	const res = await fetch(FRONTEND_URL + FILM_BANDEANNONCE + "/" + idFilm,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		}
	);

	const result = await res.json();

	return new Promise((resolve, reject) => {
		if (!result.hasOwnProperty("lien")) {
			reject(`Impossible de trouver la bandeannonce de ${idFilm}.`);
		}
		resolve(result.lien);
	});
};

export const fetchCorrelation = async (idFilm): Promise<Array<any>> => {
	const res = await fetch(FRONTEND_URL + CORRELATION_FILM_CONSULTE + "/" + idFilm,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		}
	);

	const result = await res.json();

	// this is an array
	console.log("result from api",result.data);
	

	return new Promise((resolve, reject) => {
		// if (!result.hasOwnProperty("correlation")) {
		// 	reject(`Impossible de trouver les film de correlation du film: ${idFilm}.`);
		// }
		resolve(result);
	});
};

export const fetchCoteMoyenne = async (idFilm): Promise<string> => {
	const res = await fetch(FRONTEND_URL + CORRELATION_FILM_CONSULTE + "/" + idFilm,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "GET",
		}
	);

	const result = await res.json();

	console.log('RESULT COTE MOYENNE ========', result.data);
	

	return new Promise((resolve, reject) => {
		if (!result.hasOwnProperty("coteMoyenne")) {
			reject(`Impossible de trouver la cote moyenne de ${idFilm}.`);
		}
		resolve(result.data);
	});
};


export const fetchStatistics = async (statsObj:any): Promise<number> => {
	const res = await fetch(FRONTEND_URL + ANALYTICS_STATS,
		{
			headers: {
				"Content-Type": "application/json",
			},
			method: "POST",	
			body: JSON.stringify({
				...statsObj
			}),
		}
	);

	const result = await res.json();

	return new Promise((resolve, reject) => {
		// if (!result.hasOwnProperty("lien")) {
		// 	reject(`Impossible de trouver les statistiques.`);
		// }
		resolve(result);
	});
};


