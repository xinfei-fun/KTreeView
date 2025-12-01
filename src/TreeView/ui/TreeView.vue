<template>
  <div class="k-tree-view">
    <VirtualList>
      <template #default="{ visibleItems }">

        <div v-for="item in visibleItems" :key="item.id" class="k-tree-node" :style="{
          paddingInlineStart: item.level * indentSize + 'px',
          height: itemHeight + 'px'
        }">
        
            <!-- 如果是 叶子节点 -->
            <div v-if="item.isLeaf" class="k-node-leaf">
              <slot> {{ item.id }}叶子节点：{{ item.label }}</slot>
            </div>
            <div v-else>
              <slot> {{ item.id }}非叶子节点：{{ item.label }}</slot>
            </div>
          
          
        </div>
      </template>
    </VirtualList>
  </div>
</template>

<script setup>
  import TreeModel from '../core/TreeModel';


  defineOptions({
    name: 'KTreeView'
  })

  const props = defineProps({
    itemHeight: {
      type: Number,
      required: false,
      default: 34
    },
    indentSize: {
      type: Number,
      required: false,
      default: 16
    }
  })

  const treemodel = new TreeModel()

</script>

<style scoped lang="scss">
  .k-tree-view {
    width: 100%;
    height: 100%;

    .k-tree-node {
      width: 100%;
      white-space: nowrap;
      overflow: hidden;
    }
  }

</style>