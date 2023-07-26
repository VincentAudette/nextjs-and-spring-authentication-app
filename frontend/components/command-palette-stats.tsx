import { Fragment, useState, useEffect } from "react";
import { Combobox, Dialog, Transition } from "@headlessui/react";
import { fetchFilteredFilm, fetchStatistics } from "../controllers/filmController";
import { useAuth } from "../context/auth-context";
import Notification from "./notification";

export default function CommandPaletteStats({ open, setOpen}) {
	const { setLlisteStats, pageValue, setPageValue } =
		useAuth();
		//Beter reset
//https://stackoverflow.com/questions/54895883/reset-to-initial-state-with-react-hooks
	const [groupeAge, setGroupeAge] = useState(-1);
	const [province, setProvince] = useState("");
	const [jourSemaine, setJourSemaine] = useState(-1);
	const [mois, setmois] = useState(-1);

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

	// useEffect(()=>{
    //     (async ()=>{
	// 		try{
	// 			const _listeFilms = await fetchStatistics({pageValue,
	// 			  groupeAge,
	// 			  realisateur,
	// 			  province,
	// 			  pays,
	// 			  anneeBegin,
	// 			  anneeEnd,
	// 			  langue});
	// 			setListeFilms(_listeFilms);
	// 		}catch(err){
	// 			setErrMessage(err);
	// 			setNotification(true);
	// 		}
    //     })()
    // },[setPageValue, pageValue]);

	function resetSearch(){
		setGroupeAge(-1)
		setProvince('')
		setJourSemaine(-1)
		setmois(-1)
	}

	function sendSearch() {
		(async ()=>{
			const _listeStats = await fetchStatistics(
				{
				groupeAge,
				province,
				jourSemaine,
				mois
				}
			);
			setLlisteStats(_listeStats["data"]);
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
											Groupe Age:{" "}
										</label>
										<input
											type="number"
											name="groupeAge"
											className="input-field"
											value={groupeAge}
											onChange={(e) =>
												setGroupeAge(parseInt(e.target.value))
											}
										/>
									</div>
									
									
									<div className="input-container">
										<label className="text-black">
											Province:{" "}
										</label>
										<select
											className="input-field"
											name="Province"
											value={province}
											onChange={(e) =>
												setProvince(e.target.value)
											}
											defaultValue="Choissisez une province"
										>
											{
												[
													"Choissisez une province", "AB", "BC", "MB", "NB", "NL", "NS", "NT", "ON", "QC", "SK"
											   ].map((province)=>{
												   return <option key={province}>{province}</option>
											   })
											}
										</select>
										
									</div>
									<div className="input-container">
										<label className="text-black">
											Jour de la semaine (int):{" "}
										</label>
										<input
											type='number'
											className="input-field"
											name="JourSemaine"
											value={jourSemaine}
											onChange={(e) =>
												setJourSemaine(parseInt(e.target.value))
											}
										/>
									
									</div>
									<div className="input-container">
										<label className="text-black">
											Mois de l'année (int):{" "}
										</label>
										<input
											type="number"
											name="mois"
											className="input-field"
											value={mois}
											onChange={(e) =>
												setmois(
													Number(e.target.value)
												)
											}
										/>
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
