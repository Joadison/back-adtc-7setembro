const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const { addTextToImageA } = require('../utils/agerarStory');

router.get('/generateImageA', async (req, res) => {
    const inputImagePath = `./public/image/1.png`;
    const outputImagePath = `./public/Story/A.png`;
    
    try {
        const imagePath = await addTextToImageA(inputImagePath, outputImagePath);
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
