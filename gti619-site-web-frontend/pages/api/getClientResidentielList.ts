import axios from 'axios';

export default async function handler(req, res) {
    try {
        const axiosRes = await axios.get(`http://localhost:8080/clientResidentiel/list?page=${req.query.page}&size=10`, {
            headers: {
                Authorization: `Bearer ${req.query.token}}`,
            },
        });
        res.status(200).json(axiosRes.data);
    } catch (error) {
        if(error.response.data == "SESSION_EXPIRED"){
            return res.status(401).json({
                message: "Votre session a expiré.",
            });
        }
        res.status(error.response?.status || 500).json({ message: error.message });
    }
}
