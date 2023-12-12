/* 双链表 */

class ListNode<T> {
    prevPtr: ListNode<T>;
    nextPtr: ListNode<T>;
    value: T;
    constructor(value: T) {
        this.value = value;
    }
}
/* 双链表base，还能用来实现queue */
export abstract class LinkListBase<T> {
    private head: ListNode<T>;
    private tail: ListNode<T>;
    private capacity: number;

    constructor() {
        this.init();
    }

    private init(): void {
        this.capacity = 0;

        let headNode = new ListNode<T>(null);
        let tailNode = new ListNode<T>(null);

        headNode.nextPtr = tailNode;
        headNode.prevPtr = null;
        tailNode.prevPtr = headNode;
        tailNode.nextPtr = null;

        this.head = headNode;
        this.tail = tailNode;
    }

    protected _push_back(value: T): void {
        let valueNode = new ListNode<T>(value);
        let tmpNode = this.tail.prevPtr;

        valueNode.nextPtr = this.tail;
        valueNode.prevPtr = tmpNode;
        tmpNode.nextPtr = valueNode;
        this.tail.prevPtr = valueNode;

        this.capacity++;
    }

    protected _pop_back(): T {
        if (this.size == 0) {
            return null;
        }
        let valueNode = this.tail.prevPtr;
        valueNode.prevPtr.nextPtr = valueNode.nextPtr;
        valueNode.nextPtr.prevPtr = valueNode.prevPtr;
        valueNode.nextPtr = null;
        valueNode.prevPtr = null;
        this.capacity--;
        return valueNode.value;
    }

    protected _push_front(value: T): void {
        let valueNode = new ListNode<T>(value);
        let tmpNode = this.head.nextPtr;

        valueNode.nextPtr = tmpNode;
        valueNode.prevPtr = this.head;
        tmpNode.prevPtr = valueNode;
        this.head = valueNode;

        this.capacity++;
    }

    protected _pop_front(): T {
        if (this.size == 0) {
            return null;
        }

        let valueNode = this.head.nextPtr;
        valueNode.prevPtr.nextPtr = valueNode.nextPtr;
        valueNode.nextPtr.prevPtr = valueNode.prevPtr;
        valueNode.nextPtr = null;
        valueNode.prevPtr = null;
        this.capacity--;
        return valueNode.value;
    }

    protected _front(): T {
        if (this.size == 0) {
            return null;
        }
        return this.head.nextPtr.value;
    }

    protected _back(): T {
        if (this.size == 0) {
            return null;
        }
        return this.tail.prevPtr.value;
    }

    public get size(): number {
        return this.capacity;
    }
}

/* 双链表 */
export class LinkList<T> extends LinkListBase<T> {
    public push_back(value: T): void {
        this._push_back(value);
    }
    public pop_back(): T {
        return this._pop_back();
    }
    public push_front(value: T): void {
        this._push_front(value);
    }
    public pop_front(): T {
        return this._pop_front();
    }
    public back(): T {
        return this._back();
    }
    public front(): T {
        return this._front();
    }
}