import axios from "axios";
import BACKEND_URL from "utils/BE/urls";
import { LOCATION_ENPOINT } from "utils/FULL/endpoints";

export default function handler(req, res) {

    /**
  • Cas 4 : location de films.
     */

  // GET http://localhost:3000/api/hibernate/films/locations/{idUtilisateur}


  

    axios.get(`${BACKEND_URL}${LOCATION_ENPOINT}/${req.query.idUtilisateur}`)
    .then((response)=>{
      
        return res.status(200).json({
          data: response.data,
        });
    })
    .catch((err)=>{
      return res.status(400).json({
        mes:"Il de récupérer les locations",
        err
      });
    });
  
  }