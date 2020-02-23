import base from "../../base";
import login from "./login";
import register from "./register";
import deleteUser from "./delete"

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