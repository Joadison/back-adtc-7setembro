const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { addTextToImage } = require('../utils/gerarStory');

router.get('/', async (req, res) => {
    const { book, chapter, verse, checkboxId } = req.query;
    const inputImagePath = `https://utfs.io/f/5e6e6114-76e5-4f6f-8894-e9a4fc4215f5-1g.png`;
    const outputImagePath = `./public/Story/1.png`;

    try {
        const imagePath = await addTextToImage(book, chapter, verse, inputImagePath, outputImagePath);
        const imageBuffer = await fs.readFile(outputImagePath);
        res.writeHead(200, {
            'Content-Type': 'image/png',
            'Content-Length': imageBuffer.length
        });
        res.end(imageBuffer);
    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        res.status(500).json({ error: 'Erro ao gerar imagem' });
    }
});

module.exports = router;
