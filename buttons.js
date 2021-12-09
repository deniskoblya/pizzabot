module.exports = {
  homeMenu: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [
          {
            text: "🍕 Заказать пиццу",
            switch_inline_query_current_chat: "пицца",
          },
        ],
      ],
    }),
  },
  pizzaMenu: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "текст кнопки pizza", callback_data: "pizzabutton" }],
      ],
    }),
  },
};
