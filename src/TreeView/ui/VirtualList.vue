<template>
    <!-- 容器层 -->
    <div ref="containerRef" class="k-virtual-list-container" @scroll="onScrollHandler">
        <!-- 幽灵层: 作用是撑开内容区，制造滚动条 -->
        <div class="k-ghost-layer" :style="{ height: renderState.totalHeight + 'px' }"></div>

        <!-- 内容层, 这是实际的内容 -->
        <div class="k-content-layer" :style="{ transform: `translateY(${renderState.offset}px)` }">
            <slot :visibleItems="renderState.visibleItems"></slot>
        </div>
    </div>
</template>

<script setup>
import { onMounted, reactive, useTemplateRef, watch, onBeforeUnmount } from 'vue';
import { VirtualListEngine } from '../core/VirtualListEngine';

defineOptions({
    name: 'KVirtualList',
});

const props = defineProps({
    itemHeight: {
        type: Number,
        required: false,
        default: 34,
    },
    listItems: {
        type: Array,
        required: true,
        default: () => [],
    },
});

const containerRef = useTemplateRef('containerRef');
const enginee = new VirtualListEngine(props.itemHeight);
let observer = null;

const renderState = reactive({
    visibleItems: [], // 切割后的小数组
    totalHeight: 0, // 总高度
    offset: 0, // 偏移量
});

// 刷新列表
const _refreshList = () => {
    if (!containerRef.value) {
        return;
    }

    const scrollTop = containerRef.value.scrollTop;
    const clientHeight = containerRef.value.clientHeight;
    const total = props.listItems.length;

    const { offset, totalHeight, start, end } = enginee.reCalculate(clientHeight, scrollTop, total);

    renderState.offset = offset;
    renderState.totalHeight = totalHeight;
    renderState.visibleItems = props.listItems.slice(start, end);
};

// 当滚动时候要随时更新
const onScrollHandler = () => {
    requestAnimationFrame(_refreshList);
};

// 传入的列表变化的时候，要刷新
watch(
    () => props.listItems,
    () => {
        onScrollHandler();
    }
);

// 初始化
onMounted(() => {
    onScrollHandler();
    observer = new ResizeObserver(onScrollHandler);
    observer.observe(containerRef.value);
});

// dispose
onBeforeUnmount(() => {
    observer.disconnect();
    observer = null;
});
</script>

<style lang="scss" scoped>
.k-virtual-list-container {
    width: 100%;
    height: 100%;
    overflow-y: auto;
    position: relative;

    .k-ghost-layer {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        z-index: -1;
    }

    .k-content-layer {
        position: absolute;
        top: 0;
        left: 0;
        min-width: 100%;
    }
}
</style>
