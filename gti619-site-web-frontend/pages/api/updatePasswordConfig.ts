import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const newConfig = req.body;

        try {
            const axiosRes = await axios.put("http://localhost:8080/api/password-config", newConfig, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.query.token}`,
                },
            });
            res.status(200).json(axiosRes.data);
        } catch (error) {
            if (error.response && error.response.data === "SESSION_EXPIRED") {
                return res.status(401).json({
                    message: "Votre session a expiré.",
                });
            }
            res.status(error.response?.status || 500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
