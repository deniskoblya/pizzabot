module.exports = {
  homeMenu: {
    reply_markup: JSON.stringify({
      inline_keyboard: [
        [{ text: "текст кнопки", callback_data: "textbutton" }],
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
