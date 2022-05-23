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
    @node-drag-over="handleDragOver"
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
    handleDrop(draggingNode, dropNode, dropType, event) {
      console.log('tree drop: ', dropNode.label, dropType);
    },
    allowDrop(draggingNode, dropNode, type) {
      if (this.sameLevelDrop) return draggingNode.parent === dropNode.parent && type !== 'inner';
      return true;
    },
    allowDrag(draggingNode) {
      return true;
    },
    /**
     * handleDragOver 触发频率很高
     * 按照我的理解，本来应该通过 enter 和 leave 事件来修改手势的，以提高性能
     * 但是由于 allowDrop 的存在，导致 enter 和 leave 事件不能像预期那样触发
     * 所以只能使用 over 事件
     */
    handleDragOver(draggingNode, dropNode, event) {
      const isAbleToDrop = draggingNode.parent === dropNode.parent;
      if (this.sameLevelDrop && !isAbleToDrop) {
        console.log('不允许 drop');
      } else if (this.sameLevelDrop && isAbleToDrop) {
        console.log('允许 drop');
        /**
         * 不能使用 setData api
         * 这样没有效果
         * event.dataTransfer.setData('dropEffect', 'move')
         */
        // eslint-disable-next-line no-param-reassign
        event.dataTransfer.dropEffect = 'move';
      }
    },
  },
};
</script>
