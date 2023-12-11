import { Queue } from "../common/queue";
import { LogFormatter } from "./log_formatter";

interface LogImpl {
    log(...args: any[]): void;
    debug(...args: any[]): void;
    warn(...args: any[]): void;
    error(...args: any[]): void;
}

export class Log implements LogImpl {
    /** 文件名 */
    private fileName: string;
    /** 文件路径 */
    private filePath: string;
    /** 单个文件大小 MB */
    private fileSize: uint32_t;
    /** 分文件 */
    private date: Date;
    /** 消息队列 */
    private msgQueue: Queue<string>;
    /** 日志等级 */
    private level: LogLevel;


    private static _instance: Log;

    public static get instance(): Log {
        if (!this._instance) {
            this._instance = new Log();
        }
        return this._instance;
    }

    public init(fileName: string, filePath: string, fileSize: number): void {
        this.fileName = fileName;
        this.filePath = filePath;
        this.fileSize = fileSize;
    }

    /** 异步函数 */
    public execute(): void {

    }

    public log(...args: any[]): void {
        if (this.level > LogLevel.INFO) {
            return;
        }
        const str = LogFormatter.instance.format(this.level, args);
    }

    public debug(...args: any[]): void {
        if (this.level > LogLevel.DEBUG) {
            return;
        }
        const str = LogFormatter.instance.format(this.level, args);
    }
    public warn(...args: any[]): void {
        if (this.level > LogLevel.INFO) {
            return;
        }
        const str = LogFormatter.instance.format(this.level, args);
    }
    public error(...args: any[]): void {
        if (this.level > LogLevel.INFO) {
            return;
        }
        const str = LogFormatter.instance.format(this.level, args);
    }
}