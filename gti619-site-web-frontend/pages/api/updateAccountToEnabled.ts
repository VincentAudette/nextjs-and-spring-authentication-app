import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'POST') {
        try {
            const axiosRes = await axios.post(
                `http://localhost:8080/api/users/update-account-to-enabled?username=${req.query.username}`, 
                {}, // request body (empty in this case)
                { // request options
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${req.query.token}`,
                    },
                }
            );
            res.status(200).json(axiosRes.data);
        } catch (error) {
            if (error.response && error.response.data === "SESSION_EXPIRED_OR_INACTIVE") {
                return res.status(401).json({
                    message: "Votre session a expiré.",
                });
            }
            console.log("ERREUR === ",error.response.data.status);
            console.log("ERREUR Data: ",error.response.data);

         
            
            res.status(error.response?.status || 500).json({ message: error.message });
        }
    } else {
        res.setHeader('Allow', ['POST']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}
