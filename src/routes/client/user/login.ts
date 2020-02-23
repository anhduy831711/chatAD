import base from "../../base";
import UserService, { IUserService, IValidateUser } from "../../../services/user"
import { scrypto } from "../../../utility/crypto"
import { log } from "../../../constant";

export default class extends base {
  async action() {
    let { email, password } = this.body;
    let validateUser = this.buildService<IValidateUser>(UserService);
    validateUser.validate_email(email);
    validateUser.validate_password(password);
    let userService = this.buildService<IUserService>(UserService);
    let user = await userService.getOne({ email }, { email: 1, first_name: 1, last_name: 1, password: 1, salt: 1 });
    if(!user){
      throw log.USER_ERROR.USER_NOT_FOUND;
    }
    let hashPassword = scrypto.sha512(password, user.salt);
    if (hashPassword !== user.password) {
      throw log.ERROR.UNAUTHENTICATION;
    }
    let expired = new Date();
    expired.setDate(expired.getDate() + 1);

    this.session.userID = user._id;
    let token = scrypto.encrypt(JSON.stringify({
      _id: user._id,
      expired: expired.getTime()
    }));
    return { token };
  }
}