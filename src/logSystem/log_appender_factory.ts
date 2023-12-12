import { FileAppender, LogAppender, StdoutAppender } from "./log_appender";

/** appender工厂类 */
export class LogAppenderFactory {
    private static _instance: LogAppenderFactory;
    public static get instance(): LogAppenderFactory {
        if (!this._instance) {
            this._instance = new LogAppenderFactory();
        }
        return this._instance;
    }

    private factory = new Map<LogAppenderType, new () => LogAppender>();
    public register(id: LogAppenderType, constru: new () => LogAppender) {
        if (!this.factory.has(id)) {
            this.factory.set(id, constru);
        }
    }

    public create(id: LogAppenderType): LogAppender {
        let obj: LogAppender = null;
        if (this.factory.has(id)) {
            obj = new (this.factory.get(id))();
        }
        return obj;
    }
}
LogAppenderFactory.instance.register(LogAppenderType.CONSOLE, StdoutAppender);
LogAppenderFactory.instance.register(LogAppenderType.FILE, FileAppender);
