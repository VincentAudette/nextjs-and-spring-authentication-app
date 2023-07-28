import { useState } from "react";
import { getDisplayNameRole } from "./layout";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "context/auth-context";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import SessionTableRow from "./session-table-row";
import Pagination from "./pagination";

export default function UserSecurityInfo({user}){
    const [expanded, setExpanded] = useState(false);
    const {profile} = useAuth();

    const [page, setPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);

    const fetchUserSessions = async ({queryKey}) => {
        const [_key, userId, page] = queryKey;
        const res = await fetch(`/api/getUserSessions?token=${profile.token}&userId=${userId}&page=${page}&size=${pageSize}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        
        return await res.json();
    };
    const queryClient = useQueryClient();
    const onPageChange = (newPage) => {
        setPage(newPage);
        queryClient.invalidateQueries(['userSessions', user.id, page]);
      };
      

    const { data: sessions, isLoading, isError, error } = useQuery(['userSessions', user.id, page],fetchUserSessions, { enabled: expanded });

    

    return (<div key={user.id} className="py-5 px-6 rounded-xl bg-neutral-200 text-neutral-950 ">
    <button 
    onClick={()=>setExpanded(!expanded)}
    className="flex justify-between w-full p-5 rounded-2xl hover:bg-neutral-300">
        <p className=" font-bold" > Nom d&apos;utilisateur : {user.username}</p>
        <div className="flex gap-2 text-xs items-center">
            <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1  font-medium text-red-800">
            <span className=" border-r pr-2 border-red-800">Role</span>
            <span className="font-semibold pl-2">{getDisplayNameRole(user.role)}</span>
            </span>
        </div>
    </button>
    {expanded && isLoading ? <LoadingQuery /> : isError ? expanded && <ErrorQuery error={error as Error} /> : expanded && sessions && (
        <>
        <hr className="border-b border-neutral-300 rounded-full mt-2" />
        <div className="flex flex-col divide-y">

            <section className="py-2">
                <div className="flex  text-base py-5 items-center w-full">
                    <p className="font-bold pl-4 pr-8 sm:pl-6 lg:pl-8 ">Informations des sessions</p> 
                    <p className=" bg-neutral-300 px-2 py-1 text-sm rounded-sm">{sessions.totalElements}</p>
                    <div className="grow"/>
                    <div>
                    <Pagination
                        currentPage={sessions.number}
                        totalPages={sessions.totalPages}
                        onPageChange={onPageChange}
                    />
                    </div>
                </div>

            <table className="w-full overflow-x-scroll">
                <thead className="border-b text-left  text-sm border-neutral-300">
                <tr>
                    <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                    ID Session
                    </th>
                    <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                    État
                    </th>
                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                    Date de création
                    </th>
                    <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold md:table-cell lg:pr-20">
                    Dernière activité
                    </th>
                </tr>
                </thead>
                {
                    sessions.content.map((session, i) => (
                        <SessionTableRow key={`session-${session.id}`} session={session} />))
                }
            </table>

            </section>
            <hr className="border-b border-neutral-300 rounded-full" />
            <section className="py-2">
            <p>Journalisation des connexions</p> 

            </section>
        </div>
        <button className="focus-light w-full bg-white shadow-sm hover:shadow-none  hover:bg-neutral-100 text-neutral-700 text-center rounded-md mt-5">
            <p className="px-4 py-2">Revoquer le mot de passe </p>
            </button></>

    )}
    

</div>)
}