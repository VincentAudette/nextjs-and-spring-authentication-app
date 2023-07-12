import axios from "axios";
import BACKEND_URL from "utils/BE/urls";
import { FILM_BANDEANNONCE } from "utils/FULL/endpoints";

export default function handler(req, res) {

    const urlBandeannonceX = BACKEND_URL+FILM_BANDEANNONCE+`/${req.query.idFilm}`;

    axios.get(urlBandeannonceX)
    .then((response)=>{

        return res.status(200).json(
           { lien:response.data.lien}
        )
    })
    .catch((err)=>{
        return res.status(400).json(
            {
                "message":"Aucune bandeannonce trouvé",
                err
            }
        )
    })

    }