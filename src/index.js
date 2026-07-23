const express = require('express');
const admin = require('firebase-admin');
const cors = require('cors');
require('dotenv').config();

// Firebase Admin SDK-nın başladılması (Service account JSON faylı tələb olunur)
// const serviceAccount = require('./path-to-serviceAccountKey.json');
// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

const app = express();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 5000;

app.get('/', (req, res) => {
  res.send('Firebase Node.js Backend işləyir!');
});

app.listen(PORT, () => {
  console.log(`Server ${PORT} portunda işə düşdü.`);
});