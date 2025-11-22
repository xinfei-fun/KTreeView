<template>
  <div class="ktree-item">
    <div class="label" @click="toggle">
      {{ node.label }}
    </div>

    <div v-if="node.expanded" class="children">
      <KTreeItem
        v-for="child in node.children"
        :key="child.id"
        :node="child"
      />
    </div>
  </div>
</template>

<script setup>
import { reactive } from 'vue'
import KTreeItem from './KTreeItem.vue'

const props = defineProps({
  node: { type: Object, required: true }
})

const toggle = () => {
  props.node.expanded = !props.node.expanded
}
</script>

<style scoped>
.ktree-item {
  padding-left: 16px;
}
.label {
  cursor: pointer;
}
</style>
