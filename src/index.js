
import KTree from './KTree.vue'
import KTreeItem from './KTreeItem.vue'

export { KTree, KTreeItem }

export default {
  install(app) {
    app.component('KTree', KTree)
    app.component('KTreeItem', KTreeItem)
  }
}

