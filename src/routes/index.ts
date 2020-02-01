import { Router } from "express";
import client from "./client";
import users from "./client/user"
import { authentication } from "../services/midlequare"

const ROUTE = Router();

ROUTE.use('/users', users);
ROUTE.use('/', authentication, client);

export default ROUTE;