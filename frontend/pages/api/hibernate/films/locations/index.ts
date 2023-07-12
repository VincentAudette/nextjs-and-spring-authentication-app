import axios from "axios";
import BACKEND_URL from "utils/BE/urls";
import { LOCATION_ENPOINT } from "utils/FULL/endpoints";

export default function handler(req, res) {

    /**
  • Cas 4 : location de films.
     */

  // POST http://localhost:3000/api/hibernate/films/location

  axios.post(BACKEND_URL+LOCATION_ENPOINT, req.body)
    .then((response)=>{
        return res.status(200).json({
          data: response.data,
        });
    })
    .catch((err)=>{
      return res.status(400).json({
        error:err.response.data.error,
      });
    });
  
  }