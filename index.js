const TelegramBot = require("node-telegram-bot-api");
const { homeMenu, pizzaMenu } = require("./options");
const token = "2030130508:AAFEk89snSVwe6L5HBwbC2xivikrrd9-804";

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Начать сначала" },
  { command: "/info", description: "Информация о боте" },
]);

bot.on("callback_query", (msg) => {
  console.log(msg.data);
  const data = msg.data;
  const chatId = msg.message.chat.id;

  if (data === "textbutton") {
    bot.sendMessage(chatId, `Ты выбрал кнопку ${data}, и это круто`);
  }
});

bot.on("message", (msg) => {
  console.log(msg);
  const text = msg.text;
  const chatId = msg.chat.id;
  const userName = msg.chat.first_name;

  if (text === "/start") {
    bot.sendMessage(
      chatId,
      `Привет, ${userName}, это стартовое сообщение`,
      homeMenu
    );
  }

  if (text === "/info") {
    bot.sendMessage(chatId, `Сообщение-ответ на команду информации`);
  }

  // if (msg.from.id === "459417921") {
  //   bot.sendMessage(chatId, `@andr_sheptitsk cлышь, рот закрой уже`);
  // }
});

// bot.onText(/\/start (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, match);
// });
