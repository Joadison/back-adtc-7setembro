require('dotenv').config();
const TelegramBot = require("node-telegram-bot-api");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const generateImageRoutes = require("./routes/generateImage");
const generateImageARoutes = require("./routes/generateImageA");

const token = process.env.TELEGRAM_TOKEN;
const url = "https://back-adtc-7setembro.vercel.app";

if (!token) {
  throw new Error("TELEGRAM_TOKEN não está definido!");
}

const bot = new TelegramBot(token);

const app = express();
const port = 3444

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/generateimage", generateImageRoutes);
app.use("/generateimageA", generateImageARoutes);
app.post(`/bot/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.get("/", (req, res) => {res.send("Conect!");});

bot.onText(/\/start/, (msg) => {
  const chatId = msg.chat.id;
  const currentHour = new Date().getHours();
  let greeting;
  if (currentHour < 12) {
    greeting = "Bom dia";
  } else if (currentHour < 18) {
    greeting = "Boa tarde";
  } else {
    greeting = "Boa noite";
  }
  const welcomeMessage = `${greeting}! Paz do Senhor! Em que posso ajudar você? Aqui estão algumas opções:
- Digite /jogo para jogar um jogo.
- Digite /oracao para enviar um pedido de oração.
- Digite /instagram para obter links para nossos perfis no Instagram.
- Digite /imagem para gerar uma imagem.`;

  bot.sendMessage(chatId, welcomeMessage);
});

bot.onText(/\/jogo/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Vamos jogar!!!");
  bot.sendMessage(chatId, "https://joadison.github.io/QuizBiblico/");
});

bot.onText(/\/oracao/, (msg) => {
  const chatId = msg.chat.id;
  console.log(chatId);
  bot.sendMessage(chatId, "Pode digitar, que já estaremos orando por você!");

  bot.once("message", (msg) => {
    const userChatId = msg.chat.id;
    const oracaoText = msg.text;
    const outroChatId = "1088237134";
    const mensagem = `Alguém está pedindo oração:\n${oracaoText}`;
    bot.sendMessage(outroChatId, mensagem);
  });
});

bot.onText(/\/instagram/, (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Meu instagram é");
  bot.sendMessage(chatId, "https://www.instagram.com/adtc.7setembro1");
  bot.sendMessage(chatId, "E este é da nossa Juventude! ");
  bot.sendMessage(chatId, "https://www.instagram.com/juventudetc7s1");
});

bot.onText(/\/imagem/, async (msg) => {
  const chatId = msg.chat.id;
  bot.sendMessage(chatId, "Gerando imagem...");
  try {
    const response = await axios.get(`${url}/generateimageA`, { responseType: "arraybuffer" });
    bot.sendPhoto(chatId, Buffer.from(response.data, "binary"));
  } catch (error) {
    bot.sendMessage(chatId, "Desculpe, ocorreu um erro ao processar a imagem.");
  }
});

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.toString().toLowerCase();

  if (messageText === 'oi') {
    bot.sendMessage(chatId, 'Olá, tudo bem?');
  }
  if (messageText === 'paz do senhor!') {
    bot.sendMessage(chatId, 'A PAZ DO SENHOR! Que Deus seja conosco!');
  } 
  if (messageText === 'irmão, como você está?') {
    bot.sendMessage(chatId, 'Estou bem, graças a Deus. E você, como está?');
  } 
  if (messageText === 'Deus abençoe você!') {
    bot.sendMessage(chatId, 'Deus abençoe você também, e sua familia!');
  }
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
  bot.setWebHook(`${url}/bot/${token}`)
  .then(() => {
    console.log(`Webhook configurado! Bot está ativo em ${url}`);
  })
  .catch((error) => {
    console.error('Erro ao configurar o webhook:', error);
  });
})

module.exports = app;
