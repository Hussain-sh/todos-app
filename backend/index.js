const express = require('express');
require('dotenv').config();
const cors = require('cors');

const app = express();
const PORT = process.env.PORT;
const CLIENT_URL = process.env.CLIENT_URL;

app.use(express.json());


app.use(cors({
  origin: [process.env.CLIENT_URL, 'http://localhost:3000'],
  credentials: true
}));

const taskRoutes = require("./routes/taskRoutes");

app.use('/api', taskRoutes);


app.listen(PORT, () => {
    console.log(`Server listening on port: ${PORT}`);
});