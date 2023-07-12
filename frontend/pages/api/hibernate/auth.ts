import axios from "axios";
import BACKEND_URL from "../../../utils/BE/urls";
import { AUTH_ENDPOINT } from "../../../utils/FULL/endpoints";
 /**
  * Cas 2 : connexion d’un utilisateur au système ;
  */
export default function handler(req, res) {

     
    // POST: localhost:3000/api/hibernate/auth

    axios.post(BACKEND_URL+AUTH_ENDPOINT, {
      courriel:req.body.email,
      motDePasse: req.body.password
    })
    .then((response)=>{

      // query database for user
       
        return res.status(200).json({
          data: response.data,
        });
    })
    .catch((err)=>{
      return res.status(401).json({
        mes:"Vous n'avez pas fournis les bons identifiants.",
        err
      });
    });
  
  }