import { User } from "../../../domain/users/entities/User";
import { getRepository } from "typeorm";
import { Roles } from "../../../domain/shared/enums/Roles";

(async () => {
    const user = await getRepository(User).create({
        name: "DenStuk",
        telegramId: "@DenStuk",
        role: Roles.ADMIN
    });

    await getRepository(User).save(user);
})();