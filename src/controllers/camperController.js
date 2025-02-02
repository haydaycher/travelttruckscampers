import axios from 'axios';

const API_URL = 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers';


export const getCampers = async (req, res) => {
  try {
    const response = await axios.get(API_URL);
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

export const getCamperById = async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/${req.params.id}`);
    if (!response.data) {
      return res.status(404).json({ message: 'Camper not found' });
    }
    res.status(200).json(response.data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

