import axios from "axios";
import BACKEND_URL from "utils/BE/urls";
import {FILM_ENDPOINT, FILM_RECHERCH} from "utils/FULL/endpoints";
export default function handler(req, res) {

    /**
     • Cas 3 : recherche tous les films avec pagination
     */
    const maxResult = 8;
    const {page} = req.query;
    let firstResult= 0;

    if(page !== 1){
        firstResult = maxResult * (page - 1) ;
    }
    
    req.body.firstResult= firstResult
    req.body.maxResult= maxResult

    axios.post(BACKEND_URL+`${FILM_RECHERCH}`, req.body)
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