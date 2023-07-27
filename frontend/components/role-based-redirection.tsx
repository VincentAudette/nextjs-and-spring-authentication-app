import {useEffect, useState} from 'react';
import {useRouter} from 'next/router';
import {useAuth} from 'context/auth-context';
import ETSLogo from './SVG/ETSLogo';

export default function RoleBasedRedirection({allowedRoles, children}) {
    const {profile} = useAuth();
    const [viewReady, setViewReady] = useState(false);
    const router = useRouter();

    useEffect(() => {
        if(profile == null || !allowedRoles.includes(profile.role)){
            if(profile?.role === "ROLE_ADMINISTRATEUR"){
                router.push('/admin');
            } else {
                router.push('/');
            }
        } else {
            setViewReady(true);
        }
    }, [profile, router]);

    if(!viewReady){
        return (
            <div className='w-screen h-screen justify-center items-center flex'>
                <ETSLogo />
            </div>
        );
    }

    return children;
}
