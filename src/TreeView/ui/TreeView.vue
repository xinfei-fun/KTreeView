<template>
    <div class="k-tree-view">
        <VirtualList :listItems="flatenList" :item-height="itemHeight">
            <template #default="{ visibleItems }">
                <div
                    v-for="item in visibleItems"
                    :key="item.id"
                    :class="['k-tree-node', { 'k-tree-node-selected': item.id === selectedNodeId }]"
                    :style="{
                        paddingInlineStart: item.level * indentSize + 'px',
                        height: itemHeight + 'px',
                    }"
                    @click.stop="handleNodeClick(item)"
                >
                    <!-- 非叶子节点有箭头等图标 -->
                    <span v-if="!item.isLeaf" class="k-node-arrow">
                        <slot name="icon" :node="item">
                            <!-- 如果正在 loading -->
                            <span v-if="item.isLoading" class="loading-icon"></span>

                            <!-- 展开状态 -->
                            <span v-else-if="item.isExpanded">▼</span>

                            <!-- 折叠状态 -->
                            <span v-else>▶</span>
                        </slot>
                    </span>

                    <!-- 默认插槽标签 -->
                    <slot>
                        <span class="k-node-label"> {{ item.id }}节点：{{ item.label }}</span>
                    </slot>
                </div>
            </template>
        </VirtualList>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import TreeModel from '../core/TreeModel';
import VirtualList from './VirtualList.vue';

defineOptions({
    name: 'KTreeView',
});

const emit = defineEmits(['node-click']);

const props = defineProps({
    itemHeight: {
        type: Number,
        required: false,
        default: 34,
    },
    indentSize: {
        type: Number,
        required: false,
        default: 16,
    },
    getChildren: {
        type: Function,
        required: true,
    },
});

const treemodel = new TreeModel(props.getChildren);
const flatenList = ref([]);
const selectedNodeId = ref(null);

// 处理节点点击事件
const handleNodeClick = async (item) => {
    selectedNodeId.value = item.id;

    emit('node-click', item);

    if (!item.isLeaf) {
        if (item.isExpanded) {
            treemodel.collapse(item.id);
        } else {
            await treemodel.expand(item.id);
        }
        flatenList.value = treemodel.flattenList;
    }
};

defineExpose({
    reBuildTree: (treeData) => {
        treemodel.reBuild(treeData);
        flatenList.value = treemodel.flattenList;
    },
    collapseNode: (nodeId) => {
        treemodel.collapse(nodeId);
        flatenList.value = treemodel.flattenList;
    },
    expandNode: async (nodeId) => {
        await treemodel.expand(nodeId);
        flatenList.value = treemodel.flattenList;
    },
});
</script>

<style scoped lang="scss">
.k-tree-view {
    box-sizing: border-box;
    width: 100%;
    height: 100%;

    .k-tree-node {
        box-sizing: border-box;
        white-space: nowrap;
        overflow: hidden;
        cursor: pointer;

        &:hover {
            background: #f5f7fa;
        }

        .k-node-arrow {
            .loading-icon {
                display: inline-block;
                width: 12px;
                height: 12px;
                border: 2px solid #999;
                border-top-color: transparent;
                border-radius: 50%;
                animation: spin 0.5s linear infinite;
            }

            @keyframes spin {
                to {
                    transform: rotate(360deg);
                }
            }
        }

        .k-node-label {
            padding-left: 12px;
        }
    }

    .k-tree-node-selected {
        background: rgba(64, 158, 255, 0.15);
        &:hover {
            background: rgba(64, 158, 255, 0.15);
        }
    }
}
</style>
