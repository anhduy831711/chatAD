import { Router } from "express";
import client from "./client";

const ROUTE = Router();

ROUTE.use('/', client);

export default ROUTE;