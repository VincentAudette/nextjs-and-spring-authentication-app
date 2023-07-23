import { Disclosure } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";
import { Personne } from "types/webflix";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
  }

  interface PersonneDisclosureProps{
      personne:Personne;
        key?:string;
  }

export default function PersonneDisclosure({personne, key}: PersonneDisclosureProps){
    
    if(!personne) return null

    let dateNaissance = null
    let age = null

    if(personne.hasOwnProperty('dateNaissance')){
        dateNaissance = new Date(personne.dateNaissance);
        const ajd = new Date()
        //@ts-ignore
        const age_dt = new Date(Math.abs(ajd-dateNaissance));
        const year = age_dt.getUTCFullYear();   
        age = Math.abs(year - 1970);  
    }
    
    return <Disclosure as="div" key={key} className="pt-2">
    {({ open }) => (
    <>
        <dt className="">
        <Disclosure.Button className="text-left w-full flex justify-between items-start text-neutral-400">
            <span className="font-medium text-neutral-300">{personne.nomPersonne}</span>
            <span className="ml-6 h-6 flex items-center">
            <ChevronDownIcon
                className={classNames(open ? '-rotate-180' : 'rotate-0', 'h-5 w-5 transform')}
                aria-hidden="true"
            />
            </span>
        </Disclosure.Button>
        </dt>
        <Disclosure.Panel as="dd" className="mt-2 pr-12">
         <div className="text-base">
            {personne.lieuNaissance && <><p>Lieu de naissance</p>
            <p className="text-sm text-neutral-400 mb-2">{personne.lieuNaissance}
            </p></>}
            {personne.dateNaissance && <div className="flex mb-2">
                <span>
                <p>Age</p>
                <p className="text-sm text-neutral-400">{age} ans</p>
                </span>
                <div className="grow" />
                <span>
                <p>Date de naisssance</p>
                <p className="text-sm text-neutral-400">{personne.dateNaissance}</p>
                </span>
            </div>}
            {personne.bio &&<><p>Biographie</p>
            <p className="text-sm text-neutral-400 overflow-y-scroll h-72">{personne.bio}</p>
            </>
            }
            </div>
        </Disclosure.Panel>
    </>
    )}
</Disclosure>
}