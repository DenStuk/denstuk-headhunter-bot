import Telegram from "node-telegram-bot-api";
import { getRepository } from "typeorm";
import { User } from "../../../domain/users/entities/user.entity";
import { HeadHunterClient } from "../../headhunter/hh-client";

export const messageHandler = async (bot: Telegram, msg: Telegram.Message) => {

    const user = await getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.settings", "settings")
        .where("user.telegramId = :telegramId", { telegramId: msg.chat.id.toString() })
        .getOne();
    

    switch (msg.text) {
        case "Last Vacancies":
            if (user) {
                let vacancies: any = [];
                const hhClient = new HeadHunterClient();
                for (const setting of user.settings) {
                    try {
                        const data = await hhClient.findFreshVacanciesBySetting(setting);
                        vacancies = [vacancies, ...data.items];
                    } catch (err) {
                        console.log(err);
                    }
                }
                const paginated = vacancies.slice(-3);

                let response = "";
                for (const vacancy of paginated) {
                    response += `${vacancy.name} (${vacancy.salary && vacancy.salary.to || ""} ${vacancy.salary && vacancy.salary.currency || ""})\n`;
                    if (vacancy.address) {
                        if (vacancy.address.raw) { response += `${vacancy.address.raw + " - " || ""}`; }
                    }
                    if (vacancy.employer.name) { response += `${vacancy.employer.name}\n`; }
                    if (vacancy.snippet.responsibility) { response += `${vacancy.snippet.responsibility}` }
                    response += "https://spb.hh.ru/vacancy/" + vacancy.id + "\n\n"
                }

                bot.sendMessage(msg.chat.id, response, {
                    reply_markup: {
                        "inline_keyboard": [
                            [{ text: "Next", callback_data: "1" }],
                        ],
                        resize_keyboard: true
                    }
                });
            }

            break;

        case "My Settings":
            

    }
}