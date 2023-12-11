import { LinkListBase } from "./list";

/** 队列 */
export class Queue<T> extends LinkListBase<T> {
    public push(value: T): void {
        this._push_back(value);
    }
    public pop(): T {
        return this._pop_front();
    }
    public back(): T {
        return this._back();
    }
    public front(): T {
        return this._front();
    }
}