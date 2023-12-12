import { Log } from "../logSystem/logger";

class LogMain {

    constructor() {
        this.init();
    }

    private init(): void {
        Log.instance.init(LogAppenderType.CONSOLE | LogAppenderType.FILE, LogLevel.ALL);
        Log.instance.debug("tsaea")
        Log.instance.info(11111)
        Log.instance.error([12312, "hhhh", ["dsa"]], 11)
    }
}

let main = new LogMain();