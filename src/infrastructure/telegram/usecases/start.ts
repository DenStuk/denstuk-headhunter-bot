import { getRepository } from "typeorm";
import Telegram from "node-telegram-bot-api";
import { User } from "../../../domain/users/entities/user.entity";
import { TelegramStateManager } from "../state-manager";
import { TelegramState } from "../../../domain/shared/enums/telegram-state";

export const startUseCase = async (bot: Telegram, msg: Telegram.Message) => {
    const user = await getRepository(User).findOne({ name: msg.from!.username });

    if (!user) {
        const createdUser = getRepository(User).create({
            name: msg.chat.username,
            telegramId: msg.chat.id.toString(),
        });
        await getRepository(User).save(createdUser);
    }
    if (user && user.telegramId !== msg.chat.id.toString()) {
        await getRepository(User).update({ name: msg.from!.username }, {
            telegramId: msg.chat.id.toString()
        });
    }

    TelegramStateManager.setState(msg.chat.id.toString(), TelegramState.MENU)

    bot.sendMessage(msg.chat.id, `Hi! @${msg.from!.username}`, {
        reply_markup: {
            "keyboard": [
                [{ text: "Last Vacancies" }],
                [{ text: "My Settings" }],
                [{ text: "Add Setting" }]
            ],
            resize_keyboard: true
        }
    });
}