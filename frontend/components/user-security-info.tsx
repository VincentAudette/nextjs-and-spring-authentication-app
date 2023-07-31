import { useState } from "react";
import { getDisplayNameRole } from "./layout";
import { useQuery, useQueryClient } from "react-query";
import { useAuth } from "context/auth-context";
import LoadingQuery from "./loading-query";
import ErrorQuery, { Error } from "./error-query";
import SessionTableRow from "./session-table-row";
import Pagination from "./pagination";
import LoginAttemptTableRow from "./login-attempt-table-row";
import { LockClosedIcon, LockOpenIcon } from "@heroicons/react/24/outline";
import { CheckBadgeIcon, CheckCircleIcon, ClockIcon, ExclamationCircleIcon, NoSymbolIcon } from "@heroicons/react/20/solid";

export default function UserSecurityInfo({user}){
    const [expanded, setExpanded] = useState(false);
    const {profile} = useAuth();

    const [page, setPage] = useState(0);
    const [loginAttemptPage, setLoginAttemptPage] = useState(0);
    const [pageSize, setPageSize] = useState(5);


    const fetchUserSessions = async ({queryKey}) => {
        const [_key, username, page] = queryKey;
        const res = await fetch(`/api/getUserSessions?token=${profile.token}&username=${username}&page=${page}&size=${pageSize}`);
        if (!res.ok) {
            const errorObj = await res.json();
            errorObj.status = res.status;
            throw errorObj;
        }
        
        return await res.json();
    };

    const fetchUserLoginAttempts = async ({queryKey}) => {
        const [_key, username, loginAttemptPage] = queryKey;
        const res = await fetch(`/api/getUserLoginAttempts?token=${profile.token}&username=${username}&page=${loginAttemptPage}&size=${pageSize}`);
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
        queryClient.invalidateQueries(['userSessions', user.username, page]);
      };

      const onPageChangeLoginAttempts = (newPage) => {
        setLoginAttemptPage(newPage);
        queryClient.invalidateQueries(['loginAttempts', user.username, loginAttemptPage]);
      };
      

    const { data: sessions, isLoading, isError, error } = useQuery(['userSessions', user.username, page],fetchUserSessions, { enabled: expanded });
    const { data: loginAttempts, isLoading:isLoadingLoginAttempts, isError:isLoginAttemptsError, error: errorLoginAttempts } = useQuery(['loginAttempts', user.username, loginAttemptPage], fetchUserLoginAttempts, { enabled: expanded });

    console.log("USER", user);
    

    return (<div key={user.username} className="py-5 px-6 rounded-xl bg-neutral-200 text-neutral-950 ">
    <button 
    onClick={()=>setExpanded(!expanded)}
    className="flex justify-between items-center w-full p-5 rounded-2xl hover:bg-neutral-300">
        <div className="flex flex-col items-start">
            <p className=" font-bold text-lg" >{user.username}</p>
            <div  className="h-3" />
            <div className="text-sm flex gap-3">
                {user.accountNonLocked ? <span className="inline-flex items-center rounded-md py-1">
                <CheckCircleIcon className="h-4 w-4 text-red-500" />
                <span className="font-semibold pl-2">Compte actif</span>
                </span> : <span className="inline-flex items-center rounded-md py-1  font-medium">
                <ClockIcon className="h-4 w-4 text-red-500" />
                <span className="font-semibold pl-2">Compte bloqué temporairement</span>
                </span>}
                {
                    !user.enabled && <span className="inline-flex items-center rounded-md py-1  font-medium">
                    <ExclamationCircleIcon className="h-4 w-4 text-red-500" />
                    <span className="font-semibold pl-2">Compte désactivé</span>
                    </span>
                }
            </div>
        </div>
        <div className="flex gap-2 text-xs items-center">
            <div className="flex gap-2 text-xs items-center">
                <span className="inline-flex items-center rounded-md bg-red-200 px-2 py-1  font-medium text-red-800">
                <span className=" border-r pr-2 border-red-800">Role</span>
                <span className="font-semibold pl-2">{getDisplayNameRole(user.role)}</span>
                </span>
            </div>
        </div>
    </button>
    <div className="flex flex-col divide-y">
    {expanded && <section className=" ">
    <div className="bg-neutral-300 h-1 rounded-full mt-3 mb-5" />
        <p className="font-bold pl-4 pr-8 sm:pl-6 lg:pl-8 mb-3">Panneau d&apos;actions utilisateur</p> 
        <div className="flex gap-2 text-sm pl-4 pr-8 sm:pl-6 lg:pl-8">
                <button className="focus-light max-w-[15rem] w-full text-neutral-200 bg-neutral-600 shadow-sm hover:shadow-none  hover:bg-neutral-700 text-center rounded-md ">
                <p className="px-4 py-2">Réinitialiser le mot de passe</p>
                </button>
                {!user.accountNonLocked && (<button className=" focus-light max-w-[15rem] w-full text-neutral-200 bg-neutral-600 shadow-sm hover:shadow-none  hover:bg-neutral-700 text-center rounded-md ">
                <span className="flex items-center mx-auto max-w-max px-4 gap-2"><LockOpenIcon className="h-4 w-4" />
                <p className=" py-2">Débloquer le compte</p></span>
                </button>)}
                <button className="focus-light w-full max-w-[15rem] bg-red-600 shadow-sm hover:shadow-none  hover:bg-red-700 text-red-50 text-center rounded-md ">
                <p className="px-4 py-2">Supprimer utilisateur</p>
                </button>
        </div>
        </section>}
    {expanded && sessions && (
        isLoading ? <LoadingQuery /> : isError ? <ErrorQuery error={error as Error} /> : (
            
            <section className="py-2">
                <div className="bg-neutral-300 h-1 rounded-full mt-3" />
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
                <thead className="border-b-2 text-left  text-sm border-neutral-300">
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
                <tbody className="divide-y divide-neutral-300">
                {
                    sessions.content.map((session, i) => (
                        <SessionTableRow key={`session-${session.id}`} session={session} />))
                }
                </tbody>
            </table>

           

            </section>
            ))}



            {expanded && loginAttempts && (
            isLoadingLoginAttempts ? <LoadingQuery /> : isLoginAttemptsError ? <ErrorQuery error={errorLoginAttempts as Error} /> : (
                loginAttempts.totalElements >= 1 && <section className="py-2">
                <div className="bg-neutral-300 h-1 rounded-full mt-3" />
                <div className="flex  text-base py-5 items-center w-full">
                    <p className="font-bold pl-4 pr-8 sm:pl-6 lg:pl-8 ">Tentatives de connexions</p> 
                    <p className=" bg-neutral-300 px-2 py-1 text-sm rounded-sm">{loginAttempts.totalElements}</p>
                    <div className="grow"/>
                    <div>
                    <Pagination
                        currentPage={loginAttempts.number}
                        totalPages={loginAttempts.totalPages}
                        onPageChange={onPageChangeLoginAttempts}
                    />
                    </div>
                </div>

            
            <table className="w-full overflow-x-scroll">
                <thead className="border-b-2 text-left  text-sm border-neutral-300">
                <tr>
                    <th scope="col" className="py-2 pl-4 pr-8 font-semibold sm:pl-6 lg:pl-8">
                    ID Tentative
                    </th>
                    <th scope="col" className="hidden py-2 pl-0 pr-8 font-semibold sm:table-cell">
                    État de la tentative
                    </th>
                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                    Accès bloqué
                    </th>
                    <th scope="col" className="py-2 pl-0 pr-4 text-right font-semibold sm:pr-8 sm:text-left lg:pr-20">
                    Date de tentative
                    </th>
                </tr>
                </thead>
                <tbody className="divide-y divide-neutral-300">
                {
                    loginAttempts.content.map((loginAttempt, i) => (
                        <LoginAttemptTableRow key={`login-attempt-${loginAttempt.id}`} loginAttempt={loginAttempt} />))
                }
                </tbody>
            </table>

            </section>
            ))}
        </div>
        

    
    

</div>)
}