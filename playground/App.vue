<template>
  <div>
    <h2>KTree Playground</h2>

    <KTree :data="tree" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { KTree } from 'ktree'

  const tree = ref([
    {
      id: 1,
      label: 'Root A',
      expanded: true,
      children: [
        { id: 2, label: 'Child A1' },
        { id: 3, label: 'Child A2' }
      ]
    }
  ])
</script>
