import axios from 'axios';

export default async function handler(req, res) {
    try {
        const axiosRes = await axios.post(`http://localhost:8080/api/reset-password?username=${req.query.username}`);
        res.status(200).json(axiosRes.data);
    } catch (error) {
        res.status(error.response?.status || 500).json({ message: error.message });
    }
}
