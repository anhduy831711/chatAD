import base from "../base.route";
import login from "./login-user.route";
import register from "./register-user.route";
import deleteUser from "./delete-user.route"

export default base.setRouter([{
  method: "delete",
  router: deleteUser,
  url: "/:_id"
}])

export const NotAuthentication = base.setRouter([{
  method: "post",
  router: login,
  url: "/login"
}, {
  method: "post",
  router: register,
  url: "/register",
}])