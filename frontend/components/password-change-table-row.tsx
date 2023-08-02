import { CheckCircleIcon, MinusCircleIcon, XCircleIcon , LockClosedIcon, EyeIcon, UserIcon} from "@heroicons/react/24/outline";
import React from "react";

const statesList = [
  { 
    changeType: 'USER_MODIFIED', 
      icon: <UserIcon className="text-orange-400 h-5 w-5" />, 
      color: 'text-green-400', 
      stateDisplayName: 'Utilisateur' 
  },
  { 
    changeType: 'ADMIN_RESET', 
      icon: <EyeIcon className="text-blue-500 h-5 w-5" />, 
      color: 'text-red-400', 
      stateDisplayName: 'Administateur' 
  },
 
];




function PasswordChangeTableRow({ passwordChange }:{passwordChange: {id:string, changeType:string, changeTimestamp:Date}}) {

  const passwordChangeState = statesList.find(s => {
    if(!passwordChange?.changeType) return false;
    return s.changeType === passwordChange?.changeType.toUpperCase()});

  return (
    <tr key={passwordChange.id}>
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
        <div className="flex items-center gap-x-4">
          <div className="truncate text-sm font-medium leading-6 ">{passwordChange.id}</div>
        </div>
      </td>
      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        <div>
            {passwordChangeState?.changeType && <div className="flex items-center gap-x-2 sm:justify-start">
              {passwordChangeState?.icon}
              <div className="hidden sm:block">{passwordChangeState?.stateDisplayName}</div>
              </div>
              }
        </div>
      </td>

      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        {new Date(passwordChange.changeTimestamp).toLocaleString()}
      </td>
      
    </tr>
  );
}

export default PasswordChangeTableRow;
