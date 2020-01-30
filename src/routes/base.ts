import { Response, Request, Router, NextFunction } from "express";
import * as Session from 'express-session';
import DB from "../db";
import { Db } from "mongodb";
import { IService } from "../services/base";
import event from "../event";
import * as EventEmitter from "events";

interface IResult {
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
    protected res: Response;
    protected db: Db;
    private user: any
    private event: EventEmitter;

    constructor(req, res) {
        this.req = req;
        this.res = res;
        this.user = req.authentication;
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
        this.db = await DB.start();
        let result = await this.action();
        //  console.log(result);

        if (result) {
            this.res.set('Content-Type', 'application/json');
            this.res.json(result);
        }
    }

    abstract async action();

    protected buildService<T extends IService>(service: { new(...args): T }): T {
        return new service(this.db, this.user);
    }

    protected emitEvent(event, ...args): boolean {
        return this.event.emit(event, ...args);
    }
}