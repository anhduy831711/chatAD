import * as express from "express";
import * as path from "path";
import * as cookieParser from "cookie-parser";
import * as logger from "morgan";
import * as cors from "cors";
import { constant } from "./constant";
import route from "./routes";
import * as http from "http";
import * as cluster from "cluster";
import { cpus } from "os";
import DB from "./db";
import * as WebSocket from "ws";
import * as url from "url";
import * as fs from "fs";
import * as compression from 'compression';
import * as timeout from "connect-timeout";
import * as helmet from 'helmet';
import * as rateLimit from 'express-rate-limit';
import * as session from "express-session";
import * as redis_connect from "connect-redis";
import * as redis from "redis";

import event from "./event";
import "./config";

// var redisStore = redis_connect(session);
// var client = redis.createClient();
const { CORS, ENV, bodyParserOptions, optionsPublic } = constant;

(async () => {
    let Db = await DB.start();
    const numCPUs = cpus().length;
    const PORT = ENV.PORT;
    let limit = rateLimit({
        windowMs: 4 * 10000,
        max: 68
    });

    // let optionHttps = {
    //     key: fs.readFileSync(path.join(__dirname, "../key.pem")),
    //     cert: fs.readFileSync(path.join(__dirname, "../cert.pem"))
    // };

    let Event = event.start();

    Event.on("test", (data, data2) => {
        console.log("da vao day data");
        console.log(data);
        console.log(data2);
    })

    var app = express();

    let sessionParser = session({
        secret: ENV.APP_SECRET,
        //store: new redisStore({ host: ENV.HOST, port: 6379, client: client, ttl: 260 }),
        saveUninitialized: false,
        resave: false,
        cookie: { maxAge: 60000 * 60 * 24 }
    });

    logger.format('ebp', '[Backend] :method :url :status :res[content-length] - :response-time ms');

    // view engine setup
    app.set("views", path.join(__dirname, "views"));
    app.set("view engine", "ejs");
    app.use(express.json({ limit: "300kb" }));
    app.use(sessionParser);
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
    app.use("/public", express.static(path.join(__dirname, "public"), optionsPublic));

    app.use("/api", route);

    app.get("/chat", (req, res, next) => {
        if (!req.session["authentication"]) {
            return res.redirect("/");
        }
        next();
    }, (req, res) => {
        res.render("index");
    })

    app.get("/", (req, res) => {
        if (req.session["authentication"]) {
            res.redirect('/chat');
            return;
        }
        res.render("login");
    });

    const wss = new WebSocket.Server({ noServer: true });

    if (ENV.NODE_ENV == "production") {
        if (cluster.isMaster) {
            console.log(`Master ${process.pid} is running`);

            // Fork workers.
            for (let i = 0; i < numCPUs; i++) {
                cluster.fork();
            }

            cluster.on("exit", (worker, code, signal) => {
                console.log(`worker ${worker.process.pid} died`);
            });
        } else {
            var server = http.createServer(app)
            server.listen(PORT, () => {
                console.log(`start server at port ${PORT}`);
            });


            server.on('upgrade', (request, socket, head) => {
                console.log('Parsing session from request...');
                const pathname = url.parse(request.url).pathname;
                let response = {} as any;
                sessionParser(request, response, () => {
                    if (!request.session.authentication) {
                        socket.destroy();
                        return;
                    }
                    wss.handleUpgrade(request, socket, head, function done(ws) {
                        wss.emit('connection', ws, request);
                    });
                })
            })
            wss.on('connection', (ws, request) => {

                global["websocket"] = ws;
                ws["userID"] = request["session"].authentication._id;
                console.log(ws["userID"]);

                ws.on('message', (message) => {
                    console.log('received: %s', message);
                    wss.clients.forEach(function each(client) {
                        if (client.readyState === WebSocket.OPEN) {
                            console.log(client["userID"]);

                            client.send("hello");
                        }
                    });

                });
                ws.on('close', function () {
                    console.log('stopping client interval');
                    //clearInterval(id);
                });
                //ws.send('something');
            });
            console.log(`Worker ${process.pid} started`);
        }
    } else {
        var server = http.createServer(app)
        server.listen(PORT, () => {
            console.log(`start server at port ${PORT}`);
        });

        server.on('upgrade', (request, socket, head) => {
            console.log('Parsing session from request...');
            const pathname = url.parse(request.url).pathname;
            let response = {} as any;
            sessionParser(request, response, () => {
                if (!request.session.authentication) {
                    socket.destroy();
                    return;
                }
                wss.handleUpgrade(request, socket, head, function done(ws) {
                    wss.emit('connection', ws, request);
                });
            })
        })
        wss.on('connection', (ws, request) => {
            global["websocket"] = ws;
            console.log('client connect');

            ws["userID"] = request["session"].authentication._id;
            wss.clients.forEach(function each(client) {
                if (client.readyState === WebSocket.OPEN) {
                    if (client["userID"] == "5eaae72d174806432816881a") {
                        client.send("hello");
                    }
                }
            });

            ws.on('message', (message) => {
                console.log('received: %s', message);
                wss.clients.forEach(function each(client) {
                    if (client.readyState === WebSocket.OPEN) {
                        console.log(client["userID"]);

                        client.send("hello");
                    }
                });

            });
            ws.on('close', function () {
                console.log('stopping client interval');
                //clearInterval(id);
            });
            //ws.send('something');
        });
        console.log(`Worker ${process.pid} started`);
    }
})();
