import base from "../../base";
import login from "./login";
import register from "./register";

export default base.setRouter([{
  method: "post",
  router: login,
  url: "/login",
  timeout: 500
}, {
  method: "post",
  router: register,
  url: "/register",
}])