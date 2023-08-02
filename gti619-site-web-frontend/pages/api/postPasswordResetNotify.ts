import axios from 'axios';

export default async function handler(req, res) {
  if (req.method === 'POST') {
    const response = await axios.post('http://localhost:8080/api/password-reset-notify', { username: req.body.username });
    return res.status(200).json(response.data);
  }

  return res.status(405).json({ message: 'Method not allowed' }); // Return 405 status if not POST
};
