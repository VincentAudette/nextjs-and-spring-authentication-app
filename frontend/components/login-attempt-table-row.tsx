import { CheckCircleIcon, XCircleIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/solid";
import React from "react";

function LoginAttemptTableRow({ loginAttempt }:{loginAttempt: {id:string, success:boolean, attemptTime:Date, userLocked:boolean}}) {

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
        </div> :<div>
          <div className="flex items-center gap-x-2 sm:justify-start">
           <CheckCircleIcon className="text-slate-400 h-5 w-5" />
            <div className="hidden sm:block">Non</div>
          </div>
        </div> }
      </td>
      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        {new Date(loginAttempt.attemptTime).toLocaleString()}
      </td>
      
    </tr>
  );
}

export default LoginAttemptTableRow;
