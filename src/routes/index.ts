import { Router } from "express";
import client from "./client";
import users, { NotAuthentication } from "./client/user";
import { authentication } from "../services/midlequare";
import groups from "./client/group";
// import messages from "./client/"

const ROUTE = Router();
ROUTE.use("/", NotAuthentication);
ROUTE.use('/users', authentication, users);
ROUTE.use("/groups", authentication, groups);
ROUTE.use('/', authentication, client);
// ROUTE.use('/messages', authentication, )
export default ROUTE;