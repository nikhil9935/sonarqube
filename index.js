const express = require('express');
const app = express();
const mockData = require('./mockData');

const filterData = (data, query) => {
  return data.filter(option =>
    option.toLowerCase().includes(query.toLowerCase())
  );
};

app.get('/search', (req, res) => {
  try {
    const { query = '' } = req.query;
    if (!query.trim()) {
      return res.json(mockData);
    }

    const filteredResults = filterData(mockData, query);
    res.json(filteredResults);
  } catch (err) {
    console.error('Error occurred during search:', err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});

app.get('/', (req, res) => {
  res.send('Testing Dropdown Functionality');
});

const port = process.env.PORT || 8000;
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
