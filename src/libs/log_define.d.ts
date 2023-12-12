/** 日志等级 */
declare const enum LogLevel {
    ALL,
    DEBUG,
    INFO,
    WARN,
    ERROR,
}

/** 日志输出目的地 */
declare const enum __LogAppenderType {
    START = 0,
    CONSOLE = 0,
    FILE,
    SOCKET,
    END,
}
declare const enum LogAppenderType {
    CONSOLE = 1 << __LogAppenderType.CONSOLE,
    FILE = 1 << __LogAppenderType.FILE,
    SOCKET = 1 << __LogAppenderType.SOCKET,
}