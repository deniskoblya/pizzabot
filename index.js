const TelegramBot = require("node-telegram-bot-api");
const { homeMenu, pizzaMenu } = require("./buttons");
const token = "2030130508:AAFEk89snSVwe6L5HBwbC2xivikrrd9-804";

const pizzas = [
  {
    name: "Барбекью",
    pic: "https://mistercat.com.ua/media/com_ksenmart/images/products/w300xh220/middle-middle-color-center-center-2021-09-25-12-33-01-1-0-0-100001545.png",
    description:
      "Соус барбекю, сир моцарела, бекон, філе куряче, печериці, помідор, цибуля, орегано базилік",
    size: {
      m: {
        name: "M",
        price: "89",
        weight: "276",
      },
      l: {
        name: "L",
        price: "159",
        weight: "572",
      },
      xl: {
        name: "XL",
        price: "249",
        weight: "1083",
      },
    },
  },
  {
    name: "Курочка с овощами",
    pic: "https://mistercat.com.ua/media/com_ksenmart/images/products/w300xh220/middle-middle-color-center-center-2021-09-25-12-34-05-1-0-0-100001546.png",
    description:
      "Соус томатний, сир моцарела, філе куряче копчене, перець болгарський, маслини, броколі, орегано базилік",
    size: {
      m: {
        name: "M",
        price: "99",
        weight: "305",
      },
      l: {
        name: "L",
        price: "159",
        weight: "555",
      },
      xl: {
        name: "XL",
        price: "279",
        weight: "1000",
      },
    },
  },
];

const bot = new TelegramBot(token, { polling: true });

bot.setMyCommands([
  { command: "/start", description: "Начать сначала" },
  { command: "/info", description: "Информация о боте" },
]);

bot.on("callback_query", (msg) => {
  console.log(msg.data);
  const data = msg.data;
  const chatId = msg.message.chat.id;

  if (data === "show_pizza_menu") {
    pizzas.forEach((item, num) => {
      const pizzaItem = `<b>${item.name}</b>\n\n<b>Вес:</b> ${item.size.m.weight} гр.\n<b>Цена:</b> ${item.size.m.price} грн.\n\n<i>${item.description}</i>`;

      // bot.sendMessage(chatId, pizzaItem, pizzaSize);
      bot.sendPhoto(chatId, item.pic, {
        caption: pizzaItem,
        reply_markup: {
          inline_keyboard: [
            [
              {
                text: `${item.size.m.name} - ${item.size.m.price} грн.`,
                callback_data: `pizza_${item.size.m.name}`,
              },
              {
                text: `${item.size.l.name} - ${item.size.l.price} грн.`,
                callback_data: `pizza_${item.size.l.name}`,
              },
              {
                text: `${item.size.xl.name} - ${item.size.xl.price} грн.`,
                callback_data: `pizza_${item.size.xl.name}`,
              },
            ],
          ],
        },
        parse_mode: "HTML",
      });
    });
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
