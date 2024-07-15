const { createCanvas, loadImage } = require('canvas');
const fs = require('fs');

async function getBibleVerse() {
    versiculos = [
        "Gênesis 1:1",
        "Gênesis 1:27",
        "Gênesis 2:7",
        "Gênesis 2:24",
        "Gênesis 3:15",
        "Gênesis 6:8",
        "Gênesis 12:2-3",
        "Gênesis 15:6",
        "Gênesis 22:18",
        "Gênesis 28:15",
        "Gênesis 50:20",
        "Êxodo 3:14",
        "Êxodo 14:14",
        "Êxodo 20:3-17",
        "Levítico 19:18",
        "Números 6:24-26",
        "Deuteronômio 6:5",
        "Deuteronômio 7:9",
        "Deuteronômio 31:6",
        "Josué 1:9",
        "Josué 24:15",
        "Juízes 6:12",
        "Rute 1:16-17",
        "1 Samuel 16:7",
        "2 Samuel 7:22",
        "1 Reis 8:23",
        "2 Reis 17:39",
        "1 Crônicas 16:34",
        "2 Crônicas 7:14",
        "Esdras 7:10",
        "Neemias 8:10",
        "Ester 4:14",
        "Jó 1:21",
        "Jó 19:25-26",
        "Salmos 1:1-2",
        "Salmos 23:1-6",
        "Salmos 27:1",
        "Salmos 46:1",
        "Salmos 51:10",
        "Salmos 91:1-2",
        "Salmos 119:105",
        "Salmos 121:1-2",
        "Salmos 139:23-24",
        "Provérbios 3:5-6",
        "Provérbios 4:23",
        "Provérbios 9:10",
        "Provérbios 16:3",
        "Provérbios 18:10",
        "Provérbios 22:6",
        "Eclesiastes 3:1",
        "Eclesiastes 4:9-10",
        "Eclesiastes 12:13",
        "Cânticos 8:6-7",
        "Isaías 6:8",
        "Isaías 7:14",
        "Isaías 9:6",
        "Isaías 40:31",
        "Isaías 41:10",
        "Isaías 53:5",
        "Isaías 55:6-7",
        "Isaías 61:1",
        "Jeremias 29:11",
        "Jeremias 33:3",
        "Lamentações 3:22-23",
        "Ezequiel 36:26",
        "Daniel 3:17-18",
        "Daniel 6:22",
        "Daniel 12:3",
        "Oséias 6:6",
        "Joel 2:13",
        "Joel 2:28-29",
        "Amós 5:24",
        "Obadias 1:15",
        "Jonas 2:2",
        "Miquéias 6:8",
        "Miquéias 7:7",
        "Naum 1:7",
        "Habacuque 3:17-18",
        "Sofonias 3:17",
        "Ageu 2:9",
        "Zacarias 4:6",
        "Zacarias 9:9",
        "Malaquias 3:10",
        "Mateus 5:3-12",
        "Mateus 6:9-13",
        "Mateus 6:33",
        "Mateus 7:7",
        "Mateus 11:28-30",
        "Mateus 22:37-39",
        "Mateus 28:19-20",
        "Marcos 10:27",
        "Marcos 11:24",
        "Marcos 12:30-31",
        "Marcos 16:15",
        "Lucas 1:37",
        "Lucas 6:31",
        "Lucas 11:9",
        "Lucas 12:32",
        "Lucas 23:34",
        "Lucas 24:6-7",
        "João 1:1",
        "João 1:14",
        "João 3:16",
        "João 4:24",
        "João 8:12",
        "João 10:10",
        "João 11:25-26",
        "João 14:6",
        "João 15:5",
        "João 16:33",
        "Atos 1:8",
        "Atos 2:38",
        "Atos 4:12",
        "Atos 16:31",
        "Romanos 1:16",
        "Romanos 3:23",
        "Romanos 5:1",
        "Romanos 5:8",
        "Romanos 6:23",
        "Romanos 8:1",
        "Romanos 8:28",
        "Romanos 8:38-39",
        "Romanos 10:9",
        "Romanos 12:1-2",
        "Romanos 12:9",
        "1 Coríntios 6:19-20",
        "1 Coríntios 10:13",
        "1 Coríntios 13:4-7",
        "1 Coríntios 15:58",
        "2 Coríntios 4:7-9",
        "2 Coríntios 5:17",
        "2 Coríntios 12:9",
        "Gálatas 2:20",
        "Gálatas 5:22-23",
        "Gálatas 6:9",
        "Efésios 2:8-9",
        "Efésios 4:32",
        "Efésios 6:10-11",
        "Filipenses 1:6",
        "Filipenses 2:3-4",
        "Filipenses 4:6-7",
        "Filipenses 4:13",
        "Filipenses 4:19",
        "Colossenses 3:12-14",
        "1 Tessalonicenses 5:16-18",
        "2 Tessalonicenses 3:3",
        "1 Timóteo 4:12",
        "1 Timóteo 6:12",
        "2 Timóteo 1:7",
        "2 Timóteo 3:16-17",
        "2 Timóteo 4:7",
        "Tito 2:11-12",
        "Filemom 1:6",
        "Hebreus 4:12",
        "Hebreus 10:23-25",
        "Hebreus 11:1",
        "Hebreus 12:1-2",
        "Hebreus 13:8",
        "Tiago 1:2-3",
        "Tiago 1:5",
        "Tiago 1:19",
        "Tiago 1:22",
        "Tiago 4:7-8",
        "1 Pedro 2:9",
        "1 Pedro 3:15",
        "1 Pedro 4:8",
        "2 Pedro 3:9",
        "1 João 1:9",
        "1 João 3:1",
        "1 João 4:7-8",
        "1 João 4:18-19",
        "2 João 1:6",
        "3 João 1:11",
        "Judas 1:24-25",
        "Apocalipse 1:8",
        "Apocalipse 3:20",
        "Apocalipse 7:9-10",
        "Apocalipse 21:4",
        "Apocalipse 22:13"
    ]
    const versiculoEscolhido = versiculos[Math.floor(Math.random() * versiculos.length)];
    const [livro, passagem] = versiculoEscolhido.split(" ", 2);
    console.log(livro, passagem)
    try{
        const url = `https://bible-api.com/${livro}+${passagem}?translation=almeida`
        const response = await fetch(url);
        if (!response.ok) {throw new Error('Falha ao obter passagem bíblica');}
        const data = await response.json();
        return data;
    } catch (error) {console.error('Erro ao obter passagem bíblica:', error);}
}

async function addTextToImageA(inputImagePath, outputImagePath) {
    try {
        const backgroundImage = await loadImage(inputImagePath);
        const canvas = createCanvas(backgroundImage.width, backgroundImage.height);
        const ctx = canvas.getContext('2d');

        ctx.drawImage(backgroundImage, 0, 0, canvas.width, canvas.height);
        ctx.fillStyle = 'black';
        ctx.font = '54px Times New Roman';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        const textX = canvas.width / 2;
        const textY = canvas.height / 2;

        const verseData = await getBibleVerse();
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
        
        const imageUrl = outputImagePath.replace(/^\.\/public\//, 'https://adtc-7-setembro.vercel.app/');
        return imageUrl;
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
    addTextToImageA
};