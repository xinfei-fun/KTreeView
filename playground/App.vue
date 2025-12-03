<template>
    <div class="playground-container">
        <header class="playground-header">
            <h1>KTreeView Playground</h1>
            <p class="subtitle">一个用于测试树组件的交互式演示页面</p>
        </header>

        <main class="playground-main">
            <!-- 控制面板 -->
            <div class="control-panel">
                <div class="control-section">
                    <h3>基本设置</h3>
                    <div class="input-row">
                        <label>节点数量：</label>
                        <input type="number" v-model="count" min="1" max="1000" placeholder="50" />
                        <button @click="onClick" :disabled="!count || count <= 0">生成树</button>
                    </div>
                </div>

                <div class="control-section">
                    <h3>样式设置</h3>
                    <div class="input-row">
                        <label>节点高度：{{ itemHeight }}px</label>
                        <input type="range" v-model="itemHeight" min="20" max="60" step="2" />
                    </div>
                    <div class="input-row">
                        <label>缩进大小：{{ indentSize }}px</label>
                        <input type="range" v-model="indentSize" min="8" max="40" step="2" />
                    </div>
                </div>

                <div class="control-section">
                    <h3>操作</h3>
                    <div class="button-row">
                        <button @click="expandAll">展开所有</button>
                        <button @click="collapseAll">折叠所有</button>
                        <button @click="resetTree">重置</button>
                    </div>
                </div>

                <div class="stats">
                    <p>当前节点数：{{ nodeCount }}</p>
                </div>
            </div>

            <!-- 树组件区域 -->
            <div class="tree-container">
                <h3>树组件预览</h3>
                <div class="tree-wrapper">
                    <TreeView
                        ref="treeviewRef"
                        :item-height="itemHeight"
                        :indent-size="indentSize"
                        :get-children="getChildren"
                        class="tree-view"
                    />
                </div>
            </div>
        </main>
    </div>
</template>

<script setup>
import { useTemplateRef, ref } from 'vue';
import { genRandomData } from './genRandomData.js';
import TreeView from '../src/TreeView/ui/TreeView.vue';

const treeviewRef = useTemplateRef('treeviewRef');
const count = ref(50);
const itemHeight = ref(34);
const indentSize = ref(16);
const nodeCount = ref(0);

const onClick = () => {
    if (!count.value || count.value <= 0) {
        alert('请输入有效的节点数量');
        return;
    }

    const dataList = genRandomData(0, count.value);
    nodeCount.value = dataList.length;
    treeviewRef.value.reBuildTree(dataList);
};

const getChildren = (nodeid) => {
    return genRandomData(nodeid, count.value, 1100);
};

const expandAll = () => {
    console.log('展开所有节点');
};

const collapseAll = () => {
    console.log('折叠所有节点');
};

const resetTree = () => {
    count.value = 50;
    itemHeight.value = 34;
    indentSize.value = 16;
    nodeCount.value = 0;
    treeviewRef.value.reBuildTree([]);
};
</script>

<style scoped>
.playground-container {
    min-height: 100vh;
    background: #f5f5f5;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
}

.playground-header {
    background: #2c3e50;
    color: white;
    text-align: center;
    padding: 20px;
}

.playground-header h1 {
    margin: 0;
    font-size: 2rem;
}

.subtitle {
    margin: 10px 0 0;
    opacity: 0.8;
}

.playground-main {
    display: flex;
    gap: 20px;
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
}

.control-panel {
    width: 300px;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
    height: fit-content;
}

.control-section {
    margin-bottom: 25px;
}

.control-section h3 {
    margin: 0 0 15px 0;
    color: #333;
    font-size: 1.1rem;
    border-bottom: 1px solid #eee;
    padding-bottom: 8px;
}

.input-row {
    margin-bottom: 15px;
}

.input-row label {
    display: block;
    margin-bottom: 5px;
    font-weight: 500;
    color: #555;
}

.input-row input[type='number'] {
    width: 80px;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 4px;
    margin-right: 10px;
}

.input-row input[type='range'] {
    width: 100%;
    margin-top: 5px;
}

.input-row button {
    padding: 8px 16px;
    background: #3498db;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
}

.input-row button:hover:not(:disabled) {
    background: #2980b9;
}

.input-row button:disabled {
    background: #bdc3c7;
    cursor: not-allowed;
}

.button-row {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.button-row button {
    padding: 10px;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-weight: 500;
}

.button-row button:nth-child(1) {
    background: #27ae60;
    color: white;
}

.button-row button:nth-child(2) {
    background: #e67e22;
    color: white;
}

.button-row button:nth-child(3) {
    background: #95a5a6;
    color: white;
}

.button-row button:hover {
    opacity: 0.9;
}

.stats {
    background: #ecf0f1;
    padding: 15px;
    border-radius: 4px;
    margin-top: 20px;
}

.stats p {
    margin: 0;
    color: #2c3e50;
    font-weight: 500;
}

.tree-container {
    flex: 1;
    background: white;
    border-radius: 8px;
    padding: 20px;
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

.tree-container h3 {
    margin: 0 0 20px 0;
    color: #333;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
}

.tree-wrapper {
    height: 500px;
    border: 1px solid #ddd;
    border-radius: 4px;
    overflow: hidden;
}

.tree-view {
    height: 100%;
}

/* 响应式设计 */
@media (max-width: 768px) {
    .playground-main {
        flex-direction: column;
    }

    .control-panel {
        width: 100%;
    }

    .button-row {
        flex-direction: row;
    }
}
</style>
