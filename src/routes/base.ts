import { Response, Request, Router, NextFunction } from "express";
import * as Session from 'express-session';
import DB from "../db";
import { Db } from "mongodb";
import { IService } from "../services/base";
import event from "../event";
import * as EventEmitter from "events";


export interface IResult {
    code: number;
    data?: any;
    error?: Error;
    message?: string;
}

interface IRouter {
    method: string,
    url: string,
    router: any,
    timeout?: number
}

let userDefault = {
    user: {
        name: "Nguyen Van A"
    }
}

export default abstract class {

    protected req: Request;
    private res: Response;
    private db: Db;
    private event: EventEmitter;
    protected session: Session;

    constructor(req: Request, res: Response) {
        this.req = req;
        this.res = res;
        this.session = req["session"];
        this.event = event.start();
    }

    public static setRouter(routers: IRouter[]): Router {
        const ROUTER = Router();
        routers.forEach((route, index) => {

            ROUTER[route.method](route.url, (req: Request, res: Response) => {
                let contructor = new route.router(req, res);
                return contructor.main();
            })
        })
        return ROUTER;
    }

    protected result(code: number, dataOrError: any, msg?: string): IResult {
        if (code > 0) {
            return {
                code,
                data: dataOrError,
                message: msg || 'ok'
            }
        }

        return {
            code: dataOrError.code ? dataOrError.code : code,
            error: dataOrError.message || dataOrError.toString(),
            message: msg || "error"
        }
    }

    public async main() {
        try {
            this.db = await DB.start();
            let result = await this.action();

            if (result) {
                this.res.set('Content-Type', 'application/json');
                this.res.json(result);
            }
        } catch (error) {
            console.log(error);
            
            process.env.NODE_ENV === 'dev' && console.error(error);
            this.res.json(this.result(-1, error));
        }
    }

    abstract async action();

    protected buildService<T extends IService>(service: { new(...args): T }): T {
        return new service(this.db, this.session);
    }

    protected emitEvent(event, ...args): boolean {
        return this.event.emit(event, ...args);
    }

    protected get params() {
        return this.req.params;
    }

    protected get query() {
        return this.req.query;
    }

    protected get body() {
        return this.req.body;
    }
}