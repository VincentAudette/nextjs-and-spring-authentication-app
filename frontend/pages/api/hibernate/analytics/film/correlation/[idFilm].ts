/**
 * Letitre(et/ouimage)destrois(3)filmsayantleplushautindicedecorre ́lationaveclefilm
consulte ́, qui n’ont pas de ́ja` e ́te ́ loue ́s par le client.
 */

import axios from "axios";
import BACKEND_URL from "../../../../../../utils/BE/urls";
import { CORRELATION_FILM_CONSULTE } from "../../../../../../utils/FULL/endpoints";
 /**
  * Cas 2 : connexion d’un utilisateur au système ;
  */
export default function handler(req, res) {

     const {idFilm} = req.query;
    // POST: localhost:3000/api/hibernate/auth

    console.log("id film++++++++++++++++",idFilm );
    

    axios.get(BACKEND_URL+CORRELATION_FILM_CONSULTE+`/${idFilm}`)
    .then((response)=>{
      console.log("RESPONSE RECEIVED",response );
        return res.status(200).json({
          data: response.data,
        });
    })
    .catch((err)=>{
      return res.status(401).json({
        mes:"Il est impossible de performer la recherche de statistique",
        err
      });
    });
  
  }