import axios from "axios";
import dayjs from "dayjs";
import { Setting } from "../../domain/settings/entities/setting.entity";
import { HttpError } from "../../domain/shared/errors/http-error";


export class HeadHunterClient {

    private baseUrl: string = "https://api.hh.ru";

    public async findAllVacancies(): Promise<any> {
        try {
            const vacancies: any = [];

            const { data } = await axios({ method: "GET", url: this.baseUrl + "/vacancies" });
            vacancies.concat(data.items);

            for (let i = 1; i < data.pages; i++) {
                const { data } = await axios({ method: "GET", url: this.baseUrl + "/vacancies", params: { page: i } });
                vacancies.concat(data.items);
            }

            return data;
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

    public async findFreshVacanciesBySetting(setting: Setting): Promise<any> {
        try {
            const dateFrom = dayjs().subtract(12, "h").format();
            const dateTo = dayjs().format();

            const { data } = await axios({
                method: "GET",
                url: this.baseUrl + "/vacancies",
                params: {
                    date_from: dateFrom,
                    date_to: dateTo,
                    text: setting.keywords.join(","),
                    currency: setting.currency,
                    salary: setting.salaryFrom
                }
            });

            console.log(data)

            return data;
        } catch (err) { throw new HttpError(err.statusCode, err.message); }
    }

}