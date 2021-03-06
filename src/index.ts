import "reflect-metadata";
import dotenv from "dotenv";
import util from "util";
import http from "http";
dotenv.config();

import "./application/cron";
import { Bot } from "./infrastructure/telegram";
import bootstrap from "./infrastructure/data/bootstrap";

import { createConnection, getConnectionOptions } from "typeorm";

util.inspect.defaultOptions.depth = 5;

class Program {

    public static async Main() {
        console.clear();
        console.log(`NODE_ENV: ${process.env.NODE_ENV}`);

        const connectionOptions = await getConnectionOptions(process.env.NODE_ENV);
        await createConnection({ ...connectionOptions, name: "default" } as any);
        await bootstrap();

        // const application: Application = container.get<Application>(TYPES.IApplication);
        // application.initialize();

        const telegramBot = new Bot();
        telegramBot.initialize();

        const server = http.createServer();

        server.listen(process.env.PORT, () => {
            console.log(`http://${process.env.HOST}:${process.env.PORT}`);
            console.log("Heap: " + (process.memoryUsage().heapTotal / (1024 * 1024)).toFixed(2) + " MB");
            console.log("CPU Time: " + process.cpuUsage().user);
        });
    }

}

Program.Main();