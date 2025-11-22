<template>
  <div>
    <h2>KTree Playground</h2>

    <button type="button" @click="fetchRootTree">点击加载第一层树</button>

    <KTree :node="node" v-for="node in nodes" />
  </div>
</template>

<script setup>
  import { ref } from 'vue'
  import { KTree } from 'ktree'
  import { genRandomData } from './genRandomData.js'

  const tree = ref([])

  const fetchRootTree = () => {
    const dataList = genRandomData(0)

    setTimeout(() => {
      tree.value = dataList
    }, 2000);
  }


</script>
