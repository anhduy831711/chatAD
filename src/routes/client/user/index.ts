import base from "../../base";
import login from "./login";
import register from "./register";

export default base.setRouter([{
  method: "post",
  router: login,
  url: "/login"
}, {
  method: "post",
  router: register,
  url: "/register",
}])