import cron from "cron";
import dayjs from "dayjs";
import { getLogger } from "log4js";
import { getRepository } from "typeorm";
import { User } from "../../../domain/users/entities/user.entity";

const logger = getLogger();
const CronJob = cron.CronJob;

const prepareFreshVacancies = new CronJob("0/10 * * * * *", async () => {
    logger.info("[CRON] Preparing fresh vacancies");

    const users = await getRepository(User)
        .createQueryBuilder("user")
        .leftJoinAndSelect("user.settings", "settings")
        .getMany();


}, null, true, "Europe/Moscow");
prepareFreshVacancies.start();