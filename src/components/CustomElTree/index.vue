<template>
  <el-tree
    :data="dataSource"
    node-key="id"
    default-expand-all
    draggable
    accordion
    :props="props"
    :allow-drop="allowDrop"
    :allow-drag="allowDrag"
    @node-drag-start="handleDragStart"
    @node-drag-end="handleDragEnd"
    @node-drop="handleDrop"
  >
    <span slot-scope="{ data }" class="custom-tree-node">
      <span> <i :class="data.icon"></i>{{ data.label }} </span>
    </span>
  </el-tree>
</template>

<script>
export default {
  name: 'CustomElTree',
  components: {},
  props: {
    dataSource: {
      type: Array,
      default: () => [],
    },
    props: {
      type: Object,
      default: () => {
        return { children: 'children', label: 'label' };
      },
    },
    sameLevelDrop: {
      type: Boolean,
      default: false,
    },
  },
  methods: {
    handleDragStart(node, ev) {
      console.log('drag start', node);
    },
    handleDragEnd(draggingNode, dropNode, dropType, ev) {
      console.log('tree drag end: ', dropNode && dropNode.label, dropType);
    },
    handleDrop(draggingNode, dropNode, dropType, ev) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (this.sameLevelDrop) return draggingNode.parent === dropNode.parent && type !== 'inner';
      return true;
    },
    allowDrag(draggingNode) {
      return true;
    },
  },
};
</script>
