// 1. Le groupe d’aˆge du client ; 
// 2. La province du client ;
// 3. Le jour de la semaine ;
// 4. Le mois dans l’anne ́e.

import axios from "axios";
import BACKEND_URL from "../../../../../../utils/BE/urls";
import {  COTE_MOYENNE_FILM_CONSULTE } from "../../../../../../utils/FULL/endpoints";
 /**
  * Cas 2 : connexion d’un utilisateur au système ;
  */
export default function handler(req, res) {

     const {idFilm} = req.query;
    // POST: localhost:3000/api/hibernate/auth
    console.log(req.query);
    

    axios.get(BACKEND_URL+COTE_MOYENNE_FILM_CONSULTE+`/${idFilm}`)
    .then((response)=>{
       
        return res.status(200).json({
          coteMoyenne: response.data,
        });
    })
    .catch((err)=>{
      return res.status(401).json({
        mes:"Il est impossible de performer la recherche de statistique",
        err
      });
    });
  
  }