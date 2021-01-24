import { getRepository } from "typeorm";
import { TelegramState } from "../../domain/shared/enums/telegram-state";
import { User } from "../../domain/users/entities/user.entity";

export class TelegramStateManager {
    public static async setState(telegramId: string, state: TelegramState): Promise<void> {
        await getRepository(User).update({ telegramId }, { telegramState: state });
    }
}