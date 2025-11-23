<script setup lang="ts">
import type { FlatNode } from '../core/types'

const props = defineProps({
  node: Object as () => FlatNode
})

const emit = defineEmits(['toggle'])
</script>

<template>
  <div class="treenode" :style="{ paddingLeft: node.depth * 16 + 'px' }">
    <span @click="emit('toggle', node)" style="cursor: pointer;">
      {{ node.collapsed ? '📁' : '📂' }}
    </span>
    <span>{{ node.label }}</span>
  </div>
</template>

<style scoped>
.treenode {
  user-select: none;
  height: 24px;
  display: flex;
  align-items: center;
}
</style>
