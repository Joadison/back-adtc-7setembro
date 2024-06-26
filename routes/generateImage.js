const express = require('express');
const router = express.Router();
const { addTextToImage } = require('../utils/gerarStory');

router.get('/generateImage', async (req, res) => {
    const { book, chapter, verse, checkboxId } = req.query;
    const inputImagePath = `./public/image/${checkboxId}.png`;
    const outputImagePath = `./public/Story/${checkboxId}.png`;

    try {
        const imagePath = await addTextToImage(book, chapter, verse, inputImagePath, outputImagePath);
        res.json({ path: imagePath });
    } catch (error) {
        console.error('Erro ao gerar imagem:', error);
        res.status(500).json({ error: 'Erro ao gerar imagem' });
    }
});

module.exports = router;
