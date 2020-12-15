import Telegram from "node-telegram-bot-api"

const Bot = new Telegram(process.env.TELEGRAM_TOKEN!, { polling: true });

Bot.onText(/\/echo (.+)/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match![1];
    Bot.sendMessage(chatId, resp);
});

Bot.onText(/\/vacancies/, (msg, match) => {
    const chatId = msg.chat.id;
    const resp = match![1];
    Bot.sendMessage(chatId, "Hello");
});

Bot.on('message', (msg) => {
    const chatId = msg.chat.id;
    Bot.sendMessage(chatId, 'Received your message');
});