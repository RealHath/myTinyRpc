import { Tools } from "../common/tool";

/** 一条日志内容类 */
export class LogEvent {
    private readonly m_date: string;
    private readonly m_timeStamp: number;
    private readonly m_pid: number;
    private readonly m_level: LogLevel;
    private readonly m_content: string;

    constructor(pid: number, level: LogLevel, ...args: any[]) {
        this.m_timeStamp = Tools.getTime();
        this.m_date = Tools.formatTimeStamp(this.m_timeStamp);
        this.m_pid = pid;
        this.m_level = level;
        this.m_content = args.toString();
    }

    get date(): string {
        return this.m_date;
    }

    get pid(): number {
        return this.m_pid;
    }

    get level(): LogLevel {
        return this.m_level;
    }

    get content(): string {
        return this.m_content;
    }

    public toString(): string {
        //原本是打算用正则replace的，但是会拷贝多分字符串浪费内存
        let str: string = `${this.date} pid:${this.pid} [${LogEvent.LogLevelToString(this.level)}] ${this.content}`;
        if (this.level >= LogLevel.ERROR) {
            str += ` ${Error().stack}`;
        }
        return str;
    }

    public static LogLevelToString(level: LogLevel): string {
        switch (level) {
            case LogLevel.INFO:
                return "INFO";
            case LogLevel.DEBUG:
                return "DEBUG";
            case LogLevel.WARN:
                return "WARN";
            case LogLevel.ERROR:
                return "ERROR";
            default:
                return "ALL";
        }
    }
}