import axios from "axios";
import jwt from 'jsonwebtoken';

export default async function handler(req, res) {
  try {
    const response = await axios.post("http://localhost:8080/api/login", {
      username: req.body.username,
      password: req.body.password,
    });
    
    const decoded = jwt.verify(response.data.token, process.env.SECRETE_AUTH_KEY);

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
