import { ExclamationIcon } from "@heroicons/react/outline";

export default function NoResultBlock(){
    return (
        <div className="py-14 px-6 text-center text-sm sm:px-14">
        <ExclamationIcon className="mx-auto h-6 w-6 text-stone-400" aria-hidden="true" />
        <p className="mt-4 font-semibold text-stone-900">Aucun résultat</p>
        <p className="mt-2 text-stone-500">Nous n&apos;avons pas trouvé de film pour cette requête.</p>
      </div>
      );
}