import Telegram from "node-telegram-bot-api";
import { messageHandler } from "./usecases/message";
import { startUseCase } from "./usecases/start";

export class Bot {

    private _bot: Telegram;
    public constructor() {
        this._bot = new Telegram(process.env.TELEGRAM_TOKEN!, { polling: true });
    }

    public initialize() {
        this._bot.onText(/\/start/, async (msg, match) => await startUseCase(this._bot, msg));
        this._bot.on("message", async (msg) => await messageHandler(this._bot, msg));
    }
}