const express = require('express');
const router = express.Router();
const fs = require('fs').promises;
const path = require('path');
const { addTextToImageA } = require('../utils/agerarStory');

router.get('/', async(req, res) => {
    const inputImagePath = `https://utfs.io/f/5e6e6114-76e5-4f6f-8894-e9a4fc4215f5-1g.png`;
    const tempDir = os.tmpdir();
    const outputImagePath = path.join(tempDir, 'A.png');
    
    try {
        await fs.mkdir(path.dirname(outputImagePath), { recursive: true });
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
    finally {
        try {
            await fs.unlink(outputImagePath);
        } catch (cleanupError) {
            console.error('Erro ao limpar imagem temporária:', cleanupError);
        }
    }
});

module.exports = router;
