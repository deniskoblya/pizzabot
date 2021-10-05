module.exports = {
  homeMenu: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "🍕 Заказать пиццу", callback_data: "show_pizza_menu" }],
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
