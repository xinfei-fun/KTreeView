# @baker_kong/ktreeview

![npm version](https://img.shields.io/npm/v/@baker_kong/ktreeview)
![license](https://img.shields.io/npm/l/@baker_kong/ktreeview)
![vue](https://img.shields.io/badge/vue-3.x-brightgreen)
![downloads](https://img.shields.io/npm/dm/@baker_kong/ktreeview)

一个高性能的 Vue 3 树形视图组件，支持虚拟滚动和大量节点。

## ✨ 特性

- **虚拟滚动**：支持数十万至百万个节点的高性能渲染
- **异步加载**：支持动态加载子节点数据
- **完全可定制**：可自定义节点高度、缩进大小和样式
- **Vue 3 兼容**：使用 Composition API 和 `<script setup>` 语法
- **灵活的插槽系统**：支持自定义节点内容和图标
- **响应式设计**：适配各种屏幕尺寸
- **轻量级**：无冗余依赖，打包体积小

## 📦 安装

```bash
npm install @baker_kong/ktreeview
```

或者使用 yarn：

```bash
yarn add @baker_kong/ktreeview
```

## 🚀 快速开始

### 基本使用

```vue
<template>
  <KTreeView
    :item-height="34"
    :indent-size="16"
    :get-children="getChildren"
  />
</template>

<script setup>
import { TreeView } from '@baker_kong/ktreeview';

// 获取子节点的函数
const getChildren = async (nodeId) => {
  // 这里可以是从 API 获取数据
  return [
    { id: `${nodeId}-1`, label: '子节点 1', isLeaf: false },
    { id: `${nodeId}-2`, label: '子节点 2', isLeaf: true },
  ];
};
</script>
```

### 完整示例

```vue
<template>
  <div class="container">
    <KTreeView
      ref="treeRef"
      :item-height="itemHeight"
      :indent-size="indentSize"
      :get-children="fetchChildren"
      @node-click="handleNodeClick"
    >
      <!-- 自定义节点内容 -->
      <template #default="{ node }">
        <div class="custom-node">
          <span v-if="!node.isLeaf" class="node-icon">
            {{ node.isExpanded ? '📂' : '📁' }}
          </span>
          <span class="node-label">{{ node.label }}</span>
          <span v-if="node.isLoading" class="loading">⏳</span>
        </div>
      </template>

      <!-- 自定义展开/折叠图标 -->
      <template #icon="{ node }">
        <span v-if="node.isLoading" class="spinner"></span>
        <span v-else-if="node.isExpanded">⬇️</span>
        <span v-else>➡️</span>
      </template>
    </TreeView>

    <div class="controls">
      <button @click="expandAll">展开所有</button>
      <button @click="collapseAll">折叠所有</button>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue';
import { TreeView } from '@baker_kong/ktreeview';

const treeRef = ref();
const itemHeight = ref(34);
const indentSize = ref(16);

// 模拟异步获取子节点
const fetchChildren = async (nodeId) => {
  // 模拟 API 延迟
  await new Promise(resolve => setTimeout(resolve, 500));
  
  return Array.from({ length: 5 }, (_, i) => ({
    id: `${nodeId}-${i}`,
    label: `节点 ${nodeId}-${i}`,
    isLeaf: i % 3 === 0, // 每第三个节点是叶子节点
  }));
};

const handleNodeClick = (node) => {
  console.log('节点被点击:', node);
};

const expandAll = () => {
  // 实现展开所有节点的逻辑
};

const collapseAll = () => {
  // 实现折叠所有节点的逻辑
};
</script>

<style scoped>
.container {
  height: 500px;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  overflow: hidden;
}

.custom-node {
  display: flex;
  align-items: center;
  padding: 0 8px;
}

.node-icon {
  margin-right: 8px;
}

.node-label {
  flex: 1;
}

.loading {
  margin-left: 8px;
  font-size: 12px;
}

.spinner {
  display: inline-block;
  width: 12px;
  height: 12px;
  border: 2px solid #ccc;
  border-top-color: transparent;
  border-radius: 50%;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  to { transform: rotate(360deg); }
}

.controls {
  margin-top: 16px;
  display: flex;
  gap: 8px;
}

.controls button {
  padding: 8px 16px;
  background: #007bff;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
}

.controls button:hover {
  background: #0056b3;
}
</style>
```

## 📖 API 文档

### Props

| 属性名 | 类型 | 默认值 | 说明 |
|--------|------|--------|------|
| `item-height` | `Number` | `34` | 每个节点的高度（像素） |
| `indent-size` | `Number` | `16` | 每层缩进的大小（像素） |
| `get-children` | `Function` | **必填** | 获取子节点的异步函数，接收 `nodeId` 参数，返回节点数组 |

### 方法

通过 `ref` 暴露的方法：

| 方法名 | 参数 | 说明 |
|--------|------|------|
| `reBuildTree` | `treeData: Array` | 重新构建树，传入新的根节点数据 |

### 插槽

| 插槽名 | 作用域参数 | 说明 |
|--------|------------|------|
| `default` | `{ node }` | 自定义节点内容 |
| `icon` | `{ node }` | 自定义展开/折叠图标 |

### 事件

| 事件名 | 参数 | 说明 |
|--------|------|------|
| `node-click` | `node: Object` | 节点被点击时触发 |

## 🎯 节点数据结构

每个节点应该包含以下属性：

```javascript
{
  id: 'unique-id',      // 唯一标识符（必填）
  label: '节点标签',     // 显示文本
  isLeaf: false,        // 是否为叶子节点
  isExpanded: false,    // 是否已展开（内部使用）
  isLoading: false,     // 是否正在加载（内部使用）
  level: 0,            // 节点层级（内部使用）
  // 可以添加任意自定义属性
}
```

## 🔧 开发

### 项目设置

```bash
# 安装依赖
npm install

# 启动开发服务器（playground）
npm run dev

# 构建库
npm run build

# 代码检查
npm run lint

# 自动修复代码格式
npm run lint:fix
```

### 项目结构

```
src/
├── TreeView/
│   ├── core/           # 核心逻辑
│   │   ├── TreeModel.js
│   │   └── VirtualListEngine.js
│   └── ui/             # UI 组件
│       ├── TreeView.vue
│       └── VirtualList.vue
└── index.js            # 入口文件
```

## 🤝 贡献

欢迎贡献代码！请遵循以下步骤：

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/amazing-feature`)
3. 提交更改 (`git commit -m 'Add some amazing feature'`)
4. 推送到分支 (`git push origin feature/amazing-feature`)
5. 开启 Pull Request

### 报告问题

请在 [GitHub Issues](https://github.com/xinfei-fun/KTreeView/issues) 报告问题。

## 📄 许可证

本项目基于 ISC 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情。

## 👨‍💻 作者

**Baker Kong**
- 邮箱: bakercore@foxmail.com
- 网站: [https://youzistack.vip](https://youzistack.vip)
- GitHub: [@xinfei-fun](https://github.com/xinfei-fun)

## 🙏 致谢

感谢所有为这个项目做出贡献的人！

---

**提示**: 这个组件专为处理大量数据的树形结构而设计。如果遇到性能问题，请考虑：
1. 使用虚拟滚动（默认启用）
2. 合理设置 `item-height` 属性
3. 实现分页或懒加载子节点
