import { LogAppender } from "./log_appender";
import { LogAppenderFactory } from "./log_appender_factory";
import { LogEvent } from "./log_event";

interface LogImpl {
    info(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

/** 对外使用的类 */
export class Log implements LogImpl {
    /** 日志等级 */
    private level: LogLevel;
    private appenderMap: Map<LogAppenderType, LogAppender>;

    constructor() {
        this.appenderMap = new Map<LogAppenderType, LogAppender>();
    }

    private static _instance: Log;
    public static get instance(): Log {
        if (!this._instance) {
            this._instance = new Log();
        }
        return this._instance;
    }

    public init(logAppType: number, level: LogLevel): void {
        this.level = level;
        for (let i = __LogAppenderType.START; i < __LogAppenderType.END; ++i) {
            const n = 1 << i;
            if ((n & logAppType) > 0) {
                const app = LogAppenderFactory.instance.create(n);
                console.log(app)
                if (app) {
                    this.appenderMap.set(n, app);
                }
            }
        }
    }


    private _logMsg(level: LogLevel, ...args: any[]): void {
        const ev = new LogEvent(process.pid, level, args);
        for (const app of this.appenderMap.values()) {
            app.append(ev);
        }
    }

    public info(...args: any[]): void {
        if (this.level > LogLevel.INFO) {
            return;
        }
        this._logMsg(LogLevel.INFO, args);
    }

    public debug(...args: any[]): void {
        if (this.level > LogLevel.DEBUG) {
            return;
        }
        this._logMsg(LogLevel.DEBUG, args);
    }
    public warn(...args: any[]): void {
        if (this.level > LogLevel.WARN) {
            return;
        }
        this._logMsg(LogLevel.WARN, args);
    }
    public error(...args: any[]): void {
        if (this.level > LogLevel.ERROR) {
            return;
        }
        this._logMsg(LogLevel.ERROR, args);
    }
}