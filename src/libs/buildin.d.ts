declare type uint32_t = number;
declare type uint64_t = number;

declare interface Table<T> {
    [key: string]: T;
}