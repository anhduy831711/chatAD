import { Router } from "express";
import users, { NotAuthentication } from "./user";
import { authentication } from "../utility/midlequare";
import groups from "./group";
// import messages from "./client/"

const ROUTE = Router();
ROUTE.use("/", NotAuthentication);
ROUTE.use('/users', authentication, users);
ROUTE.use("/groups", authentication, groups);

// ROUTE.use('/messages', authentication, )
export default ROUTE;