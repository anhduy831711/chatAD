import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as cors from "cors";
import { CORS, optionsPublic, bodyParserOptions } from "./constant/constant";
import route from "./routes";
import * as http from "http";
import * as cluster from "cluster";
import { cpus } from "os";
import DB from "./db";
import * as WebSocket from "ws";
import * as url from "url";
import * as fs from "fs";
import * as session from "express-session";
import * as connect_mongo from "connect-mongo";
import * as compression from 'compression';
import * as timeout from "connect-timeout";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';

import event from "./event";
import "./config";

(async () => {
    let Db = await DB.start();
    const numCPUs = cpus().length;
    const PORT = process.env.SERVER_PORT;
    let limit = rateLimit({
        windowMs: 8 * 1000,
        max: 68
    });
    let sessionStore = connect_mongo(session);

    // let optionHttps = {
    //     key: fs.readFileSync(path.join(__dirname, "../key.pem")),
    //     cert: fs.readFileSync(path.join(__dirname, "../cert.pem"))
    // };

    let Event = event.start();

    Event.on("test", (data,data2) => {
        console.log("da vao day data");
        console.log(data);
        console.log(data2);
    })
    
    var app = express();

    logger.format('ebp', '[Backend] :method :url :status :res[content-length] - :response-time ms');

    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.use(helmet());
    app.use(timeout(process.env.TIMEOUT));
    app.use(cors(CORS));
    app.use(compression())
    app.use(logger('ebp'));
    app.use(logger('common', { stream: fs.createWriteStream(path.join(__dirname, './log/access.log'), { flags: 'a' }) }))
    app.use(express.json(bodyParserOptions));
    app.use(express.urlencoded({ extended: false }));
    app.use(cookieParser());
    app.use("/images", express.static(path.join(__dirname, "images"), optionsPublic));
    app.use("/api", limit, route);
    app.use(session({
        name: 'chatDA',
        secret: process.env.APP_SECRET || 'session_secret',
        store: new sessionStore({
            client: DB.getClient
        }),
        saveUninitialized: false,
        resave: false,
        cookie: {
            secure: false,
            maxAge: 1000 * 60 * 60 * 24 // * 30 // 30 days
        }
    }));

    app.get("/test", (req, res) => {
        res.render("index");
    })

    const wss = new WebSocket.Server({ noServer: true });

    // if (cluster.isMaster) {
    //     console.log(`Master ${process.pid} is running`);

    //     // Fork workers.
    //     for (let i = 0; i < numCPUs; i++) {
    //         cluster.fork();
    //     }

    //     cluster.on("exit", (worker, code, signal) => {
    //         console.log(`worker ${worker.process.pid} died`);
    //     });
    // } else {
    //     var server = http.createServer(app)
    //     server.listen(PORT, () => {
    //         console.log(`start server at port ${PORT}`);
    //     });


    //     server.on('upgrade', (request, socket, head) => {
    //         console.log('Parsing session from request...');

    //         const pathname = url.parse(request.url).pathname;
    //         console.log(pathname);

    //         wss.handleUpgrade(request, socket, head, function done(ws) {
    //             wss.emit('connection', ws, request);
    //         });
    //     })
    //     wss.on('connection', (ws) => {

    //         console.log('started client interval');
    //         ws.on('message', function incoming(message) {
    //             console.log('received: %s', message);
    //         });

    //         ws.on('close', function () {
    //             console.log('stopping client interval');
    //             //clearInterval(id);
    //         });
    //         //ws.send('something');
    //     });
    //     console.log(`Worker ${process.pid} started`);
    // }

    var server = http.createServer(app)
    server.listen(PORT, () => {
        console.log(`start server at port ${PORT}`);
    });


    server.on('upgrade', (request, socket, head) => {
        console.log('Parsing session from request...');

        const pathname = url.parse(request.url).pathname;
        console.log(pathname);

        wss.handleUpgrade(request, socket, head, function done(ws) {
            wss.emit('connection', ws, request);
        });
    })
    wss.on('connection', (ws) => {

        console.log('started client interval');
        ws.on('message', function incoming(message) {
            console.log('received: %s', message);
        });

        ws.on('close', function () {
            console.log('stopping client interval');
            //clearInterval(id);
        });
        //ws.send('something');
    });
    console.log(`Worker ${process.pid} started`);
})();
