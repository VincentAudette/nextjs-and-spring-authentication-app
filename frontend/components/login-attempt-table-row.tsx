import { CheckCircleIcon, MinusCircleIcon, XCircleIcon , LockClosedIcon} from "@heroicons/react/24/outline";
import React from "react";

const statesList = [
  { 
      state: 'DISABLED', 
      icon: <MinusCircleIcon className="text-red-400 h-5 w-5" />, 
      color: 'text-green-400', 
      stateDisplayName: 'Désactivé' 
  },
  { 
      state: 'LOCKED', 
      icon: <LockClosedIcon className="text-yellow-500 h-5 w-5" />, 
      color: 'text-red-400', 
      stateDisplayName: 'Bloqué' 
  },
  { 
      state: 'ACTIVE', 
      icon: <CheckCircleIcon className="text-emerald-500 h-5 w-5" />, 
      color: 'text-blue-400', 
      stateDisplayName: 'Actif' 
  }
];




function LoginAttemptTableRow({ loginAttempt }:{loginAttempt: {id:string, success:boolean, attemptTime:Date, userLocked:boolean, state:string}}) {

  const loginAttemptState = statesList.find(s => {
    if(!loginAttempt?.state) return false;
    return s.state === loginAttempt?.state.toUpperCase()});

  return (
    <tr key={loginAttempt.id}>
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
        <div className="flex items-center gap-x-4">
          <div className="truncate text-sm font-medium leading-6 ">{loginAttempt.id}</div>
        </div>
      </td>
      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
          <div className={(loginAttempt.success ?'text-green-400 bg-green-400/10':'text-rose-400 bg-rose-400/10') + ' flex-none rounded-full p-1'}>
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </div>
          <div className="hidden sm:block">{loginAttempt.success ? 'Succès' : 'Échec'}</div>
        </div>
      </td>
      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        {loginAttempt.userLocked ? <div>
          <div className="flex items-center gap-x-2 sm:justify-start">
            <XCircleIcon className=" text-red-400 h-5 w-5" />
            <div className="hidden sm:block">Oui</div>
          </div>
        </div> : loginAttempt.state == "DISABLED" ?<div className="flex items-center gap-x-2 sm:justify-start">
            <MinusCircleIcon className="text-red-400 h-5 w-5" />
            <div className="hidden sm:block">Désactivé</div>
        </div>:<div>
          <div className="flex items-center gap-x-2 sm:justify-start">
           <CheckCircleIcon className="text-emerald-500 h-5 w-5" />
            <div className="hidden sm:block">Non</div>
          </div>
        </div> }
      </td>

      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        <div>
            {loginAttemptState?.state && <div className="flex items-center gap-x-2 sm:justify-start">
              {loginAttemptState?.icon}
              <div className="hidden sm:block">{loginAttemptState?.stateDisplayName}</div>
              </div>
              }
        </div>
      </td>

      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        {new Date(loginAttempt.attemptTime).toLocaleString()}
      </td>
      
    </tr>
  );
}

export default LoginAttemptTableRow;
