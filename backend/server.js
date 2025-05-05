require('dotenv').config(); // <-- Important!
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_URI)

  .then(() => console.log('MongoDB connected'))
  .catch(err => console.error('MongoDB connection error:', err));

const formDataSchema = new mongoose.Schema({
  type: String,
  bags: Number,
  helpGroups: [String],
  location: String,
  organisation: String,
  street: String,
  city: String,
  postcode: String,
  phone: String,
  day: String,
  time: String,
  notes: String,
}, { collection: 'donation_data_fetched' });

const FormData = mongoose.model('FormData', formDataSchema);

app.post('/api/saveFormData', async (req, res) => {
  const formData = req.body;

  if (!formData) {
    return res.status(400).json({ message: 'No form data provided' });
  }

  try {
    const newFormData = new FormData(formData);
    await newFormData.save();
    console.log('Form data saved:', formData);
    res.status(200).json({ message: 'Form data saved successfully' });
  } catch (error) {
    console.error('Error saving form data:', error);
    res.status(500).json({ message: 'Failed to save form data' });
  }
});

// New Endpoint to Fetch Form Data for Admin
app.get('/api/getFormData', async (req, res) => {
  try {
    const data = await FormData.find({});
    res.status(200).json(data);
  } catch (error) {
    console.error('Error fetching form data:', error);
    res.status(500).json({ message: 'Failed to fetch form data' });
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});