import "reflect-metadata";
import dotenv from "dotenv";
import http from "http";
dotenv.config();

import "./infrastructure/telegram";
import { HeadHunterClient } from "./infrastructure/headhunter/HeadHunterClient";



class Program {

    public static async Main() {
        console.clear();
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

        const hhClient = new HeadHunterClient();
        const vacancies = await hhClient.findAllVacancies();
        console.log(vacancies);

        
        // const application: Application = container.get<Application>(TYPES.IApplication);
        // application.initialize();
        const server = http.createServer();

        server.listen(process.env.PORT, () => {
            console.log(`http://${process.env.HOST}:${process.env.PORT}`);
            console.log("Heap: " + (process.memoryUsage().heapTotal / (1024 * 1024)).toFixed(2) + " MB");
            console.log("CPU Time: " + process.cpuUsage().user);
        });
    }

}

Program.Main();