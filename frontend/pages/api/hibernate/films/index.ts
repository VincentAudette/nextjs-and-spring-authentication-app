import axios from "axios";
import BACKEND_URL from "utils/BE/urls";
import { FILM_ENDPOINT } from "utils/FULL/endpoints";
export default function handler(req, res) {

    /**
    • Cas 3 : recherche tous les films avec pagination
     */

    const maxResult = 8;
    const {page} = req.query;
    let firstResult= 0;

    if(page !== 1){
      //page=2 -> 8*(2-1)+1 = 8*1+1 = 9 => 9-1= 8 OK
      //page=3 -> 8*(3-1)+1 = 8*2+1= 16+1= 17 => 17-9 = 8 OK
      //page=4 -> 8*(4-1)+1 = 8*3+1= 24+1= 25 => 25-17 = 8 OK
      firstResult = maxResult * (page - 1);
    }
    

  axios.get(BACKEND_URL+`${FILM_ENDPOINT}?firstResult=${firstResult}&maxResult=${maxResult}`, req.body)
    .then((response)=>{
        return res.status(200).json({
          data: response.data,
        });
    })
    .catch((err)=>{
      return res.status(400).json({
        mes:"Il est impossible de récupérer les films.",
        err
      });
    });
  }