const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const generateImageRoutes = require('./routes/generateImage');
const generateImageARoutes = require('./routes/generateImageA');
const { initializeBot } = require('./services/telegramBot');

const app = express();
const port = 3333;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use('/generateimage', generateImageRoutes);
app.use('/generateimageA', generateImageARoutes);

app.get('/', (req, res) => {
  res.send('Home Page');
});

app.listen(port, () => {
    console.log(`Servidor está rodando em http://localhost:${port}`);
    initializeBot();
});

module.exports = app;
