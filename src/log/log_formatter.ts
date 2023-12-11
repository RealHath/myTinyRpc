import { Tools } from "../common/tool";

export class LogFormatter {
    private static _instance: LogFormatter;

    public static get instance(): LogFormatter {
        if (!this._instance) {
            this._instance = new LogFormatter();
        }
        return this._instance;
    }

    public format(level: LogLevel, ...args: any[]): string {
        let errorMsg: string = "";
        if (level >= LogLevel.ERROR) {
            errorMsg = Error().stack;
        }
        const str = `[${Tools.formatTimeStamp(Tools.getTime())}][${LogFormatter.LogLevelToString(level)}][${process.pid}][${__filename}]msg:${args} ${errorMsg}`;
        return str;
    }

    public static LogLevelToString(level: LogLevel): string {
        switch (level) {
            case LogLevel.ALL:
                return "ALL";
            case LogLevel.INFO:
                return "INFO";
            case LogLevel.DEBUG:
                return "DEBUG";
            case LogLevel.WARN:
                return "WARN";
            case LogLevel.ERROR:
                return "ERROR";
            default:
                return `UNKNOWN_${level}`
        }
    }
}