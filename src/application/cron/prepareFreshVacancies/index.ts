import cron from "cron";
import dayjs from "dayjs";

const CronJob = cron.CronJob;

const prepareFreshVacancies = new CronJob("0 0 9 * * *", async () => {
    console.log("Preparing fresh vacancies");
    

}, null, true, "Europe/Moscow");
prepareFreshVacancies.start();