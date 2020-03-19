import base from "../base.route";
import create_message from "./create-message";

export default base.setRouter([{
  method: "post",
  router: create_message,
  url: "/messages"
}])