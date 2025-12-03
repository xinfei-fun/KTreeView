import TreeView from './TreeView/ui/TreeView.vue';
import VirtualList from './TreeView/ui/VirtualList.vue';

// 1) 命名导出组件
export const KTreeView = TreeView;
export const KVirtualList = VirtualList;

// 2) 插件方式（也是命名导出）
export function install(app) {
    app.component('KTreeView', TreeView);
    app.component('KVirtualList', VirtualList);
}
