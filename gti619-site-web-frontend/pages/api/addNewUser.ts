import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const user = req.body;

        try {
            const axiosRes = await axios.post("http://localhost:8080/api/user", user, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.query.token}`,
                },
            });
            res.status(200).json(axiosRes.data);
        } catch (error) {
            if (error.response && error.response.data.message === "SESSION_EXPIRED") {
                return res.status(401).json({
                    message: "Votre session a expiré.",
                });
            }
            res.status(error.response?.status || 500).json({ 
                message: error.response ? error.message : "An error occurred while processing your request." 
            });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
