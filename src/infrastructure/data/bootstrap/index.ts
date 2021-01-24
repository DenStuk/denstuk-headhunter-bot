import {User} from "../../../domain/users/entities/user.entity";
import {getRepository} from "typeorm";
import {Roles} from "../../../domain/shared/enums/roles";
import {Setting} from "../../../domain/settings/entities/setting.entity";
import {CurrencyType} from "../../../domain/shared/enums/currency-type";

export default async () => {
    const user = await getRepository(User).create({
        name: "DenStuk",
        telegramId: "something",
        role: Roles.ADMIN
    });
    await getRepository(User).save(user);

    const setting = await getRepository(Setting).create({
        currency: CurrencyType.RUR,
        keywords: ["nodejs", "developer"],
        salaryFrom: 75000,
        salaryTo: 250000,
        user
    });
    await getRepository(Setting).save(setting);
}