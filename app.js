require("dotenv").config();
//const TelegramBot = require("node-telegram-bot-api");
const TeleBot = require("telebot");
const axios = require("axios");
const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

const generateImageRoutes = require("./routes/generateImage");
const generateImageARoutes = require("./routes/generateImageA");

//const token = process.env.TELEGRAM_TOKEN;
//const url = "https://back-adtc-7setembro.vercel.app";
//const url = "http://localhost:3444"

/* if (!token) {
  throw new Error("TELEGRAM_TOKEN não está definido!");
}
const bot = new TelegramBot(token); */

const bot = new TeleBot({ token: process.env.TELEGRAM_TOKEN });

const app = express();
const port = 3444;

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/generateimage", generateImageRoutes);
app.use("/generateimageA", generateImageARoutes);

app.get("/", (req, res) => {
  res.send("API OK!");
});

bot.on(["/start"], (msg) => {
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

bot.on("message", (msg) => {
  const chatId = msg.chat.id;
  const messageText = msg.text.toString().toLowerCase();

  if (messageText === "oi") {
    bot.sendMessage(chatId, "Olá, tudo bem?");
  }
  if (messageText === "paz do senhor!") {
    bot.sendMessage(chatId, "A PAZ DO SENHOR! Que Deus seja conosco!");
  } else if (messageText === "irmão, como você está?") {
    bot.sendMessage(chatId, "Estou bem, graças a Deus. E você, como está?");
  } else if (messageText === "Deus abençoe você!") {
    bot.sendMessage(chatId, "Deus abençoe você também, irmão!");
  } else {
    bot.sendMessage(chatId, "Desculpe, não entendi. Como posso ajudar?");
  }
});

app.post(`/bot/${token}`, (req, res) => {
  bot.processUpdate(req.body);
  res.sendStatus(200);
});

app.listen(port, () => {
  console.log(`Servidor está rodando em http://localhost:${port}`);
});

module.exports = app;
