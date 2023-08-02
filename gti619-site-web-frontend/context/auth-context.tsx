import React,{useState, useEffect} from 'react'

const AuthContext = React.createContext(null)


function AuthProvider({children}) {
  const [profile, setProfile] = useState(() => {
    if (typeof window !== 'undefined') {
      const savedProfile = window.localStorage.getItem('profile');
      return savedProfile ? JSON.parse(savedProfile) : null;
    } else {
      return null;
    }
  });
  const [showNotification, setShowNotification] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && profile) {
      window.localStorage.setItem('profile', JSON.stringify(profile));
    }
  }, [profile]);
 
  const value = {profile, setProfile, showNotification, setShowNotification};
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

  
function useAuth() {
    const context = React.useContext(AuthContext)
    if (context === undefined) {
        throw new Error('useProfile must be used within a AuthProvider')
    }
    return context;
}

export {AuthProvider, useAuth};
