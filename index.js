const TelegramBot = require("node-telegram-bot-api");
const { homeMenu, pizzaMenu } = require("./buttons");
const token = "2030130508:AAECK7OzxLvqzbKFrfHmc8Q7ovPyIkaCIAs";

const pizzas = [
  {
    name: "Рол 'Веган'",
    pic: "https://mr-sushi.com.ua/kiev/files/products/izobrazhenie_viber_2021-02-04_18-16-52.560x420.jpg?76ae31fc250bdfb52346e114eabab7df",
    description: "норі,рис,салатний мікс,огірок,авокадо,горіховий соус",
    price: "85",
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

  if (data === "pizza0_XL") {
    console.log(this);
  }
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
                callback_data: `pizza${num}_${item.size.m.name}`,
              },
              {
                text: `${item.size.l.name} - ${item.size.l.price} грн.`,
                callback_data: `pizza${num}_${item.size.l.name}`,
              },
              {
                text: `${item.size.xl.name} - ${item.size.xl.price} грн.`,
                callback_data: `pizza${num}_${item.size.xl.name}`,
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

bot.on("inline_query", (query) => {
  const results = [
    {
      id: 0,
      type: "article",
      title: `Рол "Веган" 85 грн`,
      description: "норі,рис,салатний мікс,огірок,авокадо,горіховий соус",
      thumb_url:
        "https://mr-sushi.com.ua/kiev/files/products/izobrazhenie_viber_2021-02-04_18-16-52.560x420.jpg?76ae31fc250bdfb52346e114eabab7df",
      input_message_content: {
        message_text: `Полное описание моей пиццы`,
      },
    },
    {
      id: 1,
      type: "article",
      title: `Курочка с овощами 99 грн`,
      description:
        "Соус томатний, сир моцарела, філе куряче копчене, перець болгарський, маслини, броколі, орегано базилік",
      thumb_url:
        "https://mistercat.com.ua/media/com_ksenmart/images/products/w300xh220/middle-middle-color-center-center-2021-09-25-12-34-05-1-0-0-100001546.png",
      input_message_content: {
        message_text: `Полное описание моей пиццы`,
      },
    },
  ];

  bot.answerInlineQuery(query.id, results, {
    cache_time: 0,
    // switch_pm_text: "Заказать пиццу",
    switch_pm_parameter: "hello",
  });
});

// bot.onText(/\/start (.+)/, (msg, match) => {
//   const chatId = msg.chat.id;
//   bot.sendMessage(chatId, match);
// });
