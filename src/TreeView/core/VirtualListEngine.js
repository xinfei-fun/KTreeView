/**
 * @property {number} itemHeight - 行高
 * @property {number} height - 容器高
 * @description 虚拟列表引擎，用于实现虚拟滚动。 目前是 行高是定高
 */

export class VirtualListEngine {
    // 行高，初始化的时候传入，目前是定高
    #itemHeight;

    // 预加载 缓冲
    #bufferSize;

    constructor(itemHeight, bufferSize = 5) {
        this.#itemHeight = itemHeight;
        this.#bufferSize = bufferSize;
    }

    /**
     * @description 重新计算列表的状态
     * @param {*} containerHeight 容器高度，这里指的是虚拟列表容器的高度，一般而言这个高度是固定的，但也可能会变
     * @param {*} scrollTop 滚动了多少距离
     * @param {*} total 列表总的行数（不是可视区域行数）
     * @returns 列表需要刷新的状态，包括可视区域的切片，偏移量，总高度
     */
    reCalculate(containerHeight, scrollTop, total) {
        if (!total || !containerHeight) {
            return {
                offset: 0,
                totalHeight: 0,
                start: 0,
                end: 0,
            };
        }

        const visibleCount = Math.ceil(containerHeight / this.#itemHeight);

        // 原本应该 的起始位置， 结束位置
        const _start = Math.floor(scrollTop / this.#itemHeight - this.#bufferSize);
        const _end = _start + visibleCount + this.#bufferSize * 2;

        // 其实可能不够 一个缓冲区，最多从 0 开始, 到 total 结束
        const start = Math.max(0, _start);
        const end = Math.min(total, _end);

        const offset = start * this.#itemHeight;
        const totalHeight = total * this.#itemHeight;

        return {
            offset,
            totalHeight,
            start,
            end,
        };
    }

    //
}
