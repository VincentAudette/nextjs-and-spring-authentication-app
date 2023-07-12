// 1. Le groupe d’aˆge du client ; 
// 2. La province du client ;
// 3. Le jour de la semaine ;
// 4. Le mois dans l’anne ́e.

import axios from "axios";
import { Console } from "console";
import BACKEND_URL from "../../../../utils/BE/urls";
import { ANALYTICS_STATS, AUTH_ENDPOINT } from "../../../../utils/FULL/endpoints";
 /**
  * Cas 2 : connexion d’un utilisateur au système ;
  */
export default function handler(req, res) {

     const {groupeAge, province, jourSemaine, mois} = req.body;
    // POST: localhost:3000/api/hibernate/auth
    console.log(req.body);
    
    //send in body because of JUSTIN

    axios.post(BACKEND_URL+ANALYTICS_STATS+'V2',
       {
        groupeAge: groupeAge, //tous
        province: province,
        jourSemaine: jourSemaine, //tous
        moisAnnee: mois, //avril
       })
    .then((response)=>{
       
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