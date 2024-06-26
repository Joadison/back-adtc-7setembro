const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function getBibleVerse(book, chapter, verse) {
    try {
        const url = `https://bible-api.com/${book}+${chapter}:${verse}?translation=almeida`;
        const response = await fetch(url);
        if (!response.ok) {throw new Error('Falha ao obter passagem bíblica');}
        const data = await response.json();
        return data;
    } catch (error) {console.error('Erro ao obter passagem bíblica:', error);}
}

async function addTextToImage(book, chapter, verse, inputImagePath, outputImagePath) {
    try {
        const backgroundImage = await loadImage(inputImagePath);
        const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'white';
        ctx.font = '64px Times New Roman';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textX = canvas.width / 2;
        const textY = canvas.height / 2;

        const verseData = await getBibleVerse(book, chapter, verse);
        
        if (verseData) {
            const { text, reference } = verseData;
            const lines = breakTextIntoLines(text, 25);
            let yOffset = textY - (lines.length - 1) * 50;
            lines.forEach(line => {
                ctx.fillText(line, textX, yOffset);
                yOffset += 75;
            });
            ctx.font = 'italic 54px Times New Roman';
            ctx.fillText(reference, textX, textY + 400);
        } else {
            throw new Error('Falha ao obter passagem bíblica');
        }

        const buffer = canvas.toBuffer('image/png');
        fs.writeFileSync(outputImagePath, buffer);
        return outputImagePath;
    } catch (error) {
        console.error('Erro ao adicionar texto à imagem:', error);
    }
}

function breakTextIntoLines(text, maxLength) {
    const words = text.split(' ');
    const lines = [];
    let currentLine = '';

    words.forEach(word => {
        if (currentLine.length + word.length <= maxLength) {
            currentLine += (currentLine === '' ? '' : ' ') + word;
        } else {
            lines.push(currentLine);
            currentLine = word;
        }
    });

    if (currentLine !== '') {
        lines.push(currentLine);
    }

    return lines;
}

module.exports = {
    addTextToImage
};