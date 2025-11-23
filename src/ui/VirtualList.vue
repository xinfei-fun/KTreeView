<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { VirtualListEngine } from '../core/VirtualListEngine'
import type { FlatNode } from '../core/types'

const props = defineProps({
  items: Array as () => FlatNode[],
  itemHeight: { type: Number, default: 24 },
  height: { type: Number, required: true }
})

const emit = defineEmits(['range-change'])

const containerRef = ref<HTMLElement | null>(null)
const engine = new VirtualListEngine(props.itemHeight, props.height)

const visible = ref<FlatNode[]>([])

function update() {
  engine.updateItems(props.items || [])
  const range = engine.onScroll(containerRef.value?.scrollTop || 0)
  visible.value = engine.visible
  emit('range-change', range)
}

function onScroll() {
  update()
}

watch(() => props.items, update, { deep: true })
onMounted(update)
</script>

<template>
  <div class="vlist" :style="{ height: height + 'px', overflow: 'auto' }" ref="containerRef" @scroll="onScroll">
    <div :style="{ paddingTop: engine.padTop + 'px', paddingBottom: engine.padBottom + 'px' }">
      <slot :items="visible"></slot>
    </div>
  </div>
</template>
