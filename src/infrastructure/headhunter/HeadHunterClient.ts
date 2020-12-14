import axios from "axios";
import { HttpError } from "../../domain/shared/errors/HttpError";


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

}