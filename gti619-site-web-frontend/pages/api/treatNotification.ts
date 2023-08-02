import axios from 'axios';

export default async function handler(req, res){
  if (req.method === 'PUT') {
    try {
      const response = await axios.put(`http://localhost:8080/api/notifications/${req.query.id}/treat`, null, {
        headers: {
          Authorization: `Bearer ${req.query.token}`,
        },
      });
      return res.status(200).json(response.data);
    } catch (error) {
      console.error('Error occurred:', error);
      res.status(error.response?.status || 500).json({ message: error.message });
    }
  }

  return res.status(405).json({ message: 'Method not allowed' });
};
