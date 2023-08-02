import axios from 'axios';

export default async function handler (req, res) {
  if (req.method === 'GET') {
    const response = await axios.get('http://localhost:8080/api/password-reset-notifications', {
      headers: {
        Authorization: `Bearer ${req.query.token}`, 
      },
    });
    return res.status(200).json(response.data);
  }

  return res.status(405).json({ message: 'Method not allowed' }); // Return 405 status if not GET
};
