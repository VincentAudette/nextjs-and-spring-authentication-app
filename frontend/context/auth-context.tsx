import React,{useState} from 'react'

const AuthContext = React.createContext(null)


function AuthProvider({children}) {
    const [profile, setProfile] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [listeFilms, setListeFilms] = useState([]);
    const [listeStats, setLlisteStats] = useState(0);
    const [pageValue, setPageValue] = useState(1);
   
    const value = {profile, setProfile, showNotification, setShowNotification, listeFilms, setListeFilms, listeStats, setLlisteStats, pageValue, setPageValue}
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