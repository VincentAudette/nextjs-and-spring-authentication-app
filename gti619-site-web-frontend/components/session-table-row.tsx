import React from "react";

function SessionTableRow({ session }) {
  const statuses = {
    true: 'text-green-400 bg-green-400/10',
    false: 'text-rose-400 bg-rose-400/10'
  }

  return (
    <tr key={session.id}>
      <td className="py-4 pl-4 pr-8 sm:pl-6 lg:pl-8">
        <div className="flex items-center gap-x-4">
          <div className="truncate text-sm font-medium leading-6 ">{session.id}</div>
        </div>
      </td>
      <td className="py-4 pl-0 pr-4 text-sm leading-6 sm:pr-8 lg:pr-20">
        <div className="flex items-center justify-end gap-x-2 sm:justify-start">
          <div className={statuses[session.active] + ' flex-none rounded-full p-1'}>
            <div className="h-1.5 w-1.5 rounded-full bg-current" />
          </div>
          <div className="hidden sm:block">{session.active ? 'Actif' : 'Inactif'}</div>
        </div>
      </td>
      <td className="hidden py-4 pl-0 pr-8 text-sm leading-6 text-neutral-700 md:table-cell lg:pr-20">
        {new Date(session.createdAt).toLocaleString()}
      </td>
      <td className="hidden py-4 pl-0 pr-4 text-sm leading-6 text-neutral-700 sm:table-cell sm:pr-6 lg:pr-8">
        {new Date(session.lastAccessed).toLocaleString()}
      </td>
    </tr>
  );
}

export default SessionTableRow;
