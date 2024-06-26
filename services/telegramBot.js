const TelegramBot = require('node-telegram-bot-api');
const axios = require('axios'); 

const token = '7494109745:AAFXplcuuM2vUPoOv08Zlrny0fMXBTy2qt8';
const imageUrl = 'https://adtc-7-setembro.vercel.app/generateImageA';
const bot = new TelegramBot(token, { polling: true });

function initializeBot() {
    bot.onText(/\/start/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Olá! Como posso ajudar?');
    });
    bot.onText(/\/jogo/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Vamos jogar!!!');
        bot.sendMessage(chatId, 'https://joadison.github.io/QuizBiblico/');
    });
    bot.onText(/\/oracao/, (msg) => {
        const chatId = msg.chat.id;
        console.log(chatId);
        bot.sendMessage(chatId, 'Pode digitar, que já estaremos orando por você!');
        
        bot.once('message', (msg) => {
            const userChatId = msg.chat.id;
            const oracaoText = msg.text;
            const outroChatId = '1088237134';
            const mensagem = `Alguém está pedindo oração:\n${oracaoText}`;
            bot.sendMessage(outroChatId, mensagem);
        });
    });
    bot.onText(/\/instagram/, (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Meu instagram é');
        bot.sendMessage(chatId, 'https://www.instagram.com/adtc.7setembro1');
        bot.sendMessage(chatId, 'E este é da nossa Juventude! ');
        bot.sendMessage(chatId, 'https://www.instagram.com/juventudetc7s1');
    });
    bot.onText(/\/imagem/, async (msg) => {
        const chatId = msg.chat.id;
        bot.sendMessage(chatId, 'Gerando imagem...');
        try {
            const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
            bot.sendPhoto(chatId, Buffer.from(response.data, 'binary'));
        } catch (error) {
            bot.sendMessage(chatId, 'Desculpe, ocorreu um erro ao processar a imagem.');
        }
    });
    bot.on('message', (msg) => {
        const chatId = msg.chat.id;
    });
    console.log('Bot iniciado...');
}
module.exports = { initializeBot };
