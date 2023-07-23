import { Fragment, useState, useEffect } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { fetchFilteredFilm } from "../controllers/filmController";
import { useWebflix } from "../context/webflix-context";
import Notification from "./notification";

export default function CommandPalette({ open, setOpen}) {
	const { setListeFilms, pageValue, setPageValue } =
		useWebflix();
		//Beter reset
//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks
	const [titre, setTitre] = useState("");
	const [acteur, setActeur] = useState("");
	const [realisateur, setRealisateur] = useState("");
	const [genre, setGenre] = useState("");
	const [pays, setPays] = useState("");
	const [anneeBegin, setAnneeBegin] = useState(1900);
	const [anneeEnd, setAnneeEnd] = useState(new Date().getFullYear());
	const [langue, setLangue] = useState("");

	//set DELAY au query call
	// useEffect(() => {
	//   const timeOutId = setTimeout(() => setDisplayMessage(query), 500);
	//   return () => clearTimeout(timeOutId);
	// }, [rawQuery]);

	function closeModal() {
		setOpen(false);
	}

	const [notification, setNotification] = useState(false);
	const [errMessage, setErrMessage] = useState('');

	useEffect(()=>{
        (async ()=>{
			try{
				const _listeFilms = await fetchFilteredFilm(pageValue,
				  acteur,
				  titre,
				  realisateur,
				  genre,
				  pays,
				  anneeBegin,
				  anneeEnd,
				  langue);
				setListeFilms(_listeFilms);
			}catch(err){
				setErrMessage(err);
				setNotification(true);
			}
        })()
    },[setPageValue, pageValue]);

	function resetSearch(){
		setActeur('')
		setTitre('')
		setRealisateur('')
		setGenre('')
		setPays('')
		setAnneeBegin(1900)
		setAnneeEnd(new Date().getFullYear())
		setLangue('')
	}

	function sendSearch() {
		(async ()=>{
			const _resetPage = 1
			setPageValue(_resetPage)
			const _listeFilms = await fetchFilteredFilm(
				1,
				acteur,
				titre,
				realisateur,
				genre,
				pays,
				anneeBegin,
				anneeEnd,
				langue
			);
			setListeFilms(_listeFilms);
		})()
		closeModal();
	}
	function openModal() {
		setOpen(true);
	}

	return (
		<>
		 <Notification showNotification={notification}  setShowNotification={setNotification} description={errMessage} heading={'ERROR'}/>
			<Transition appear show={open} as={Fragment}>
				<Dialog
					as="div"
					className="fixed inset-0 z-10 overflow-y-auto"
					onClose={closeModal}
				>
					<div className="med-h-screen px-4 text-center">
						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0"
							enterTo="opacity-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100"
							leaveTo="opacity-0"
						>
							<Dialog.Overlay className="fixed inset-0 bg-neutral-900 bg-opacity-70 transition-opacity" />
						</Transition.Child>

						{/* This element is to trick the browser into centering the modal contents. */}

						<Transition.Child
							as={Fragment}
							enter="ease-out duration-300"
							enterFrom="opacity-0 scale-95"
							enterTo="opacity-100 scale-100"
							leave="ease-in duration-200"
							leaveFrom="opacity-100 scale-100"
							leaveTo="opacity-0 scale-95"
						>
							<div className="inline-block w-full max-w-xl p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
								<Dialog.Title
									as="h3"
									className="text-lg font-medium leading-6 text-neutral-900"
								>
									Recherche
								</Dialog.Title>
								<div className=" text-black">
									<div className="input-container">
										<label className="text-black">
											Titre:{" "}
										</label>
										<input
											type="text"
											name="titre"
											className="input-field"
											value={titre}
											onChange={(e) =>
												setTitre(e.target.value)
											}
										/>
									</div>
									<div className="input-container">
										<label className="text-black">
											Acteurs:{" "}
										</label>
										<input
											type="text"
											name="acteur"
											className="input-field"
											value={acteur}
											onChange={(e) =>
												setActeur(e.target.value)
											}
										/>
									</div>
									<div className="input-container">
										<label className="text-black">
											Realisateur:{" "}
										</label>
										<input
											type="text"
											name="Realisateur"
											className="input-field"
											value={realisateur}
											onChange={(e) =>
												setRealisateur(e.target.value)
											}
										/>
									</div>
									<div className="input-container">
										<label className="text-black">
											Genre:{" "}
										</label>
										<select
											className="input-field"
											name="Genre"
											value={genre}
											onChange={(e) =>
												setGenre(e.target.value)
											}
											defaultValue="Choissisez un genre"
										>
											{
												[
													"Choissisez un genre",
													"Action",
												"Adventure",
												"Animation",
												"Biography",
												"Comedy",
												"Crime",
												 "Crime",
												 "Documentary",
												 "Drama",
												 "Family",
												 "Film-Noir",
												 "Fantasy",
												 "History",
												 "Horror",
												 "Music",
												 "Musical",
												 "Mystery",
												 "Romance",
												 "Sci-Fi",
												 "Sport",
												 "Thriller",
												 "War",
												 "Western",
											   ].map((genre)=>{
												   return <option key={genre}>{genre}</option>
											   })
											}
										</select>
										
									</div>
									<div className="input-container">
										<label className="text-black">
											Pays:{" "}
										</label>
										<select
											className="input-field"
											name="Pays"
											value={pays}
											onChange={(e) =>
												setPays(e.target.value)
											}
											defaultValue="Choissisez un pays"
										>
											{
												[
													"Choissisez un pays",
													"Algeria"
													, "Australia"
													, "Austria"
													, "Brazil"
													, "Canada"
													, "China"
													, "Czech Republic"
													, "France"
													, "Germany"
													, "Hong Kong"
													, "India"
													, "Italy"
													, "Japan"
													, "Malta"
													, "Mexico"
													, "New Zealand"
													, "Poland"
													, "South Africa"
													, "South Korea"
													, "Spain"
													, "Sweden"
													, "Taiwan"
													, "UK"
													, "USA"
													,"West Germany"
											   ].map((pays)=>{
												   return <option key={pays}>{pays}</option>
											   })
											}
										</select>
									
									</div>
									<div className="input-container">
										<label className="text-black">
											De:{" "}
										</label>
										<input
											type="number"
											name="anneEnd"
											className="input-field"
											value={anneeBegin}
											onChange={(e) =>
												setAnneeBegin(
													Number(e.target.value)
												)
											}
										/>
										<label className="text-black">
											A:{" "}
										</label>
										<input
											type="number"
											name="AnneeEnd"
											className="input-field"
											value={anneeEnd}
											onChange={(e) =>
												setAnneeEnd(
													Number(e.target.value)
												)
											}
										/>
									</div>

									<div className="input-container">
										<label className="text-black">
											Langue:{" "}
										</label>
										<select
											className="input-field"
											name="Langues"
											value={langue}
											onChange={(e) =>
												setLangue(e.target.value)
											}
											defaultValue="Choissisez une langue"
										>
											{
												[
													"Choissisez une langue",
													"Aramaic",
													"Cantonese",
													"English",
													"French",
													"German",
													"Italian",
													"Japanese",
													"Korean",
													"Mandarin",
													"Portuguese",
													"Spanish",
													"Swedish"
											   ].map((langue)=>{
												   return <option key={langue}>{langue}</option>
											   })
											}
										</select>
									</div>
								</div>

								<div className="mt-4 flex justify-end">
									<button
										type="button"
										className="mr-2 inline-flex justify-center px-4 py-2 text-sm font-medium text-slate-600 border bg-white-600 rounded-md hover:text-red-600 hover:border-red-600 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={resetSearch}
									>
										Reset
									</button>

									<button
										type="button"
										className="inline-flex justify-center px-4 py-2 text-sm font-medium text-blue-900 bg-blue-100 border border-transparent rounded-md hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500"
										onClick={sendSearch}
									>
										Chercher
									</button>
									
								</div>
							</div>
						</Transition.Child>
					</div>
				</Dialog>
			</Transition>
		</>
	);
}
