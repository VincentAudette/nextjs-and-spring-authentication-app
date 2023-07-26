// pages/api/clients.js
import axios from 'axios';

export default async function handler(req, res) {
    try {
        const axiosRes = await axios.get('http://localhost:8080/clientAffaire/list?page=0&size=10', {
            headers: {
                Authorization: `Bearer ${req.query.token}}`,
            },
        });
        res.status(200).json(axiosRes.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
}
