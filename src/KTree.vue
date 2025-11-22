<template>
  <div class="ktree">

    

    <KTreeItem
      v-for="item in data"
      :key="item.id"
      :node="item"
    />
  </div>
</template>

<script setup>
import KTreeItem from './KTreeItem.vue'
defineProps({
  data: {
    type: Array,
    default: () => []
  }
})
</script>

<style scoped>
.ktree {
  font-size: 14px;
}
</style>
