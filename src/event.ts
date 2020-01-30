import { EventEmitter } from "events";

let Event: event;

class event extends EventEmitter {

}

export default class {
    static start() {
        if (!Event) {
            Event = new event();
        }
        return Event;
    }
}