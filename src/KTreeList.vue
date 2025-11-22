<template>
  <div class="ktreelist">

    

    <KTreeItem
      v-for="item in data"
      :key="item.id"
      :node="item"
    />
  </div>
</template>

<script setup>
import KTreeItem from './KTreeItem.vue'

defineOptions({
  name: 'KTreeList'
})


defineProps({
  node: {
    type: Object,
    default: () => ({})
  }
})
</script>

<style scoped>
.ktree {
  font-size: 14px;
}
</style>
