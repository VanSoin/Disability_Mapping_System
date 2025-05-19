import express from 'express';
import cors from 'cors';
import libxmljs from 'libxmljs2';

const app = express();

// Enable CORS and JSON body parsing
app.use(cors());
app.use(express.json());

// POST route for XML validation
app.post('/validate', async (req, res) => {
  try {
    const { xml, xsd } = req.body;

    // Parse and validate the XML and XSD
    const xsdDoc = libxmljs.parseXml(xsd); // Parse XSD
    const xmlDoc = libxmljs.parseXml(xml); // Parse XML

    const isValid = xmlDoc.validate(xsdDoc);

    if (isValid) {
      res.json({ message: 'XML is valid!' });
    } else {
      const errors = xmlDoc.validationErrors.map(err => err.message);
      res.status(400).json({ errors });
    }
  } catch (error) {
    res.status(500).json({ errors: [error.message] });
  }
});

// Test route
app.get('/', (req, res) => {
  res.send('Server is running');
});
app.get('/validate', (req, res) => {
  res.send('This endpoint only supports POST requests for XML validation.');
});
// Start the server
app.listen(5001, () => console.log('Server is running on http://localhost:5001'));
