/**
 * @property {number} itemHeight - 行高
 * @property {number} height - 容器高
 * @description 虚拟列表引擎，用于实现虚拟滚动。 目前是 容器和 行都是定高
 */

export class VirtualListEngine {
  // 行高，容器高，初始化的时候传入，目前是定高
  itemHeight;
  height;

  // 填充的上下 边白
  padTop=0;
  padBottom = 0;

  // 维护状态, 起止索引
  start = 0;
  end = 0;

  // 传入的所有节点，注意这个是 扁平的节点
  items= [];

  constructor(itemHeight, height) {
    this.itemHeight = itemHeight
    this.height = height
  }

  // 更新节点
  updateItems(items) {
    this.items = items
  }

  // 

}
