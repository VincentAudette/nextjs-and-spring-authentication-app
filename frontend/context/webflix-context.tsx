import React,{useState} from 'react'

const WebflixContext = React.createContext(null)


function WebflixProvider({children}) {
    const [profile, setProfile] = useState(null);
    const [showNotification, setShowNotification] = useState(false);
    const [listeFilms, setListeFilms] = useState([]);
    const [listeStats, setLlisteStats] = useState(0);
    const [pageValue, setPageValue] = useState(1);
   
    const value = {profile, setProfile, showNotification, setShowNotification, listeFilms, setListeFilms, listeStats, setLlisteStats, pageValue, setPageValue}
    return <WebflixContext.Provider value={value}>{children}</WebflixContext.Provider>
  }
  
  function useWebflix() {
    const context = React.useContext(WebflixContext)
    if (context === undefined) {
      throw new Error('useProfile must be used within a WebflixProvider')
    }
    return context;
  }

 
  export {WebflixProvider, useWebflix};