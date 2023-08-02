import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'DELETE') {
        try {
            const axiosRes = await axios.delete(`http://localhost:8080/api/users/delete/${req.query.username}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.query.token}`
                }
            });
            res.status(200).json(axiosRes.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', 'DELETE');
        res.status(405).end('Method Not Allowed');
    }
}
