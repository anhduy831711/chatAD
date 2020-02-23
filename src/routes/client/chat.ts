import  base from "../base";
import Chat, { IChat } from "../../services/chat";

export default class extends base {
    async action() {
        console.log("da vao day");
        let service_chat = this.buildService<IChat>(Chat);
        let allowances = await service_chat.getAll();
        this.emitEvent("test", "hello word", "data");
        return this.result(200, allowances);
    }
}