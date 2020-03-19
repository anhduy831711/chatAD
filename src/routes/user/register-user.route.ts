import base from "../base.route";
import UserService, { IUserService, IValidateUser } from "../../services/user.service"
import * as requestIp from 'request-ip'
import { IUser } from "../../db/interface";
import { log } from "../../../src/constant";

export default class extends base {
  async action() {
    let user = this.body as IUser;
    let validateUser = this.buildService<IValidateUser>(UserService);
    await validateUser.validate_email(user.email);
    validateUser.validate_password(user.password);
    let userService = this.buildService<IUserService>(UserService);
    let ipClient = requestIp.getClientIp(this.req);
    user.type = "user";
    user.ip = [];
    user.ip.push(ipClient);
    await userService.create(user);
    return log.SUCCESS.REGISTER_MEMBER_GROUP;
  }
}