import axios from "axios";
import jwt from 'jsonwebtoken';
import BACKEND_URL from "utils/BE/urls";
import { AUTH_ENDPOINT } from "utils/FULL/endpoints";

export default async function handler(req, res) {
  try {
    const response = await axios.post(BACKEND_URL + AUTH_ENDPOINT, {
      username: req.body.username,
      password: req.body.password,
    });

    console.log('req.body', req.body);
    
    console.log('response', response.data);

    // Verify and decode the token
    const decoded = jwt.verify(response.data.token, process.env.SECRETE_AUTH_KEY);

    console.log('decoded JWT', decoded);

    return res.status(200).json({
      data: response.data,
      decoded,
    });
  } catch (err) {
    return res.status(401).json({
      message: "Vous n'avez pas fournis les bons identifiants.",
      err
    });
  }
}
