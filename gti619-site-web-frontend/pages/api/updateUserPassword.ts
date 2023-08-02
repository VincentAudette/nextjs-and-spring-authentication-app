import axios from 'axios';

export default async function handler(req, res) {
    if (req.method === 'PUT') {
        const passwordData = req.body;
        

        try {
            const axiosRes = await axios.put(`http://localhost:8080/api/user/update-password`, passwordData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${req.query.token}`,
                },
            });
            res.status(200).json(axiosRes.data);
        } catch (error) {
            res.status(error.response?.status || 500).json({ message: error?.response?.data || error.message });
        }
    } else {
        res.setHeader('Allow', ['PUT']);
        res.status(405).end(`Method ${req.method} Not Allowed`);
    }
}

