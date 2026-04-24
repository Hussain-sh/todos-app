const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;

app.use(express.json());

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true
}))


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});