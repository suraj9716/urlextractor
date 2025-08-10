// backend/server.ts
import express from 'express';
import axios from 'axios';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(express.json());

app.post('/api/unshorten', async (req, res) => {
  const shortUrl = req.body.url;

  try {
    const response = await axios.get(shortUrl, {
      maxRedirects: 5,
      timeout: 5000,
      headers: {
        'User-Agent': 'Mozilla/5.0',
      },
    });

    res.status(200).json({ url: response.request.res.responseUrl || shortUrl });
  } catch (err) {
    console.error(err);
    res.status(400).json({ error: 'Failed to unshorten.' });
  }
});

app.listen(3000, () => {
  console.log('Server running on http://localhost:3000');
});
