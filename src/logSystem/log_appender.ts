import { Queue } from "../common/queue";
import { LogEvent } from "./log_event";

/** 日志输出，输出到文件或者控制台 */
export abstract class LogAppender {
    // protected readonly logType: LogAppenderType;
    // protected readonly m_level: LogLevel;

    /** 消息队列 */
    protected readonly msgQueue: Queue<LogEvent>;

    protected m_async: boolean = false;

    /** 输出日志，同步 */
    protected abstract syncAppend(ev: LogEvent): void;

    protected asyncAppend(ev: LogEvent): void {
        this.msgQueue.push(ev);
    }

    public append(ev: LogEvent): void {
        if (!this.m_async) {
            this.syncAppend(ev);
        }
        else {
            this.asyncAppend(ev);
        }
    }
}

/** 控制台输出 */
export class StdoutAppender extends LogAppender {
    protected override syncAppend(ev: LogEvent): void {
        console.log(ev.toString())
    }

}

/** 文件输出 */
export class FileAppender extends LogAppender {
    /** 文件名 */
    private fileName: string;
    /** 文件路径 */
    private filePath: string = "../log/";
    /** 单个文件大小 MB */
    private fileSize: uint32_t;
    /** 分文件 */
    private date: Date;

    private fileHandle: File;

    protected override syncAppend(ev: LogEvent): void {
        
    }
}