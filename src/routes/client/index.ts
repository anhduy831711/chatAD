import base from "../base";
import chat from "./chat";
import insertChat from "./insertChat";

export default base.setRouter([
    {
        method: "get",
        url: "/test",
        router: chat,
        timeout: 500
    }, {
        method : "post",
        url : "/allowance",
        router : insertChat,
        timeout : 500
    }
])