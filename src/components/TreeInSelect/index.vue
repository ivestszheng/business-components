<template>
  <div class="content-box">
    <div class="container">
      <!-- 可以单独选中父节点 -->
      <el-select
        v-if="chooseParentNode"
        v-model="selectTree"
        clearable
        placeholder="请选择"
        :popper-append-to-body="false"
        multiple
        class="select-tree"
        @clear="handleClear"
        @remove-tag="handleRemoveTag"
      >
        <!-- option 上不加 disabled 会导致可以直接点击背景空白部分选中 -->
        <el-option :value="selectTreeValue" style="height: auto" disabled>
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            accordion
            highlight-current
            icon-class="el-icon-arrow-down"
            :default-expand-all="true"
            :check-strictly="true"
            @check="handleCheck"
          ></el-tree>
        </el-option>
      </el-select>

      <!-- 不可以单独选中父节点 -->
      <el-select
        v-else
        v-model="selectTree"
        clearable
        placeholder="请选择"
        :popper-append-to-body="false"
        multiple
        class="select-tree"
        @change="selectChange"
      >
        <el-option :value="selectTreeValue" style="height: auto" disabled>
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            accordion
            highlight-current
            icon-class="el-icon-arrow-down"
            :default-expand-all="true"
            @check-change="handleCheckChange"
          ></el-tree>
        </el-option>
      </el-select>
      <div>长度：{{ selectTree.length }}</div>
      <div>内容：{{ selectTree }}</div>
      <div>长度：{{ selectTreeValue.length }}</div>
      <div>内容：{{ selectTreeValue }}</div>
      <el-button style="margin: 10px 0" @click="selectAll">全选</el-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TreeInSelect',
  props: {
    data: {
      type: Array,
      default: () => [],
    },
    chooseParentNode: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      selectTree: [],
      selectTreeValue: [],
    };
  },
  methods: {
    handleClear() {
      console.log('清空');

      const vitrualNodes = this.$refs.tree.getCheckedNodes(false, false);

      this.selectTreeValue = [];
      vitrualNodes.forEach((vitrualNode) => {
        const actualNode = this.$refs.tree.getNode(vitrualNode.id);
        actualNode.data.mark = 0;
        actualNode.checked = false;
        actualNode.indeterminate = false;
      });
    },
    // select框值改变时候触发的事件
    selectChange(e) {
      console.log('默认模式 select change', e);
      const eLen = e.length;
      const arrNew = [];
      const dataLength = this.selectTreeValue.length;

      for (let i = 0; i < dataLength; i += 1) {
        for (let j = 0; j < eLen; j += 1) {
          if (e[j] === this.selectTreeValue[i].label) {
            arrNew.push(this.selectTreeValue[i]);
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew); // 设置勾选的值
    },
    // 多选模式下移除tag时触发
    handleRemoveTag(tag) {
      console.log('单独删除', tag);
      // 触发这个事件时候代表删除动作，且节点里一定有 mark 属性
      // selectTree 不需要手动维护
      // 只需要维护 selectTreeValue
      for (let index = 0; index < this.selectTreeValue.length; index += 1) {
        const { label } = this.selectTreeValue[index];
        if (tag === label) {
          this.selectTreeValue.splice(index, 1);
        }
      }
      const vitrualNodes = this.$refs.tree.getCheckedNodes(false, false);

      for (let i = 0; i < vitrualNodes.length; i += 1) {
        const vitrualNode = vitrualNodes[i];

        if (tag === vitrualNode.label) {
          const actualNode = this.$refs.tree.getNode(vitrualNode.id);

          actualNode.data.mark = 0;
          actualNode.checked = false;
          actualNode.indeterminate = false;
          break;
        }
      }
    },
    // 节点选中状态发生变化时的回调
    handleCheckChange() {
      const res = this.$refs.tree.getCheckedNodes(true, true); // 这里两个true，1. 是否只是叶子节点 2. 是否包含半选节点（就是使得选择的时候不包含父节点）
      const arrLabel = [];
      const arr = [];
      res.forEach((item) => {
        arrLabel.push(item.label);
        arr.push(item);
      });
      this.selectTreeValue = arr;
      this.selectTree = arrLabel;
    },
    // 当复选框被点击的时候触发
    // 共两个参数，依次为：传递给 data 属性的数组中该节点所对应的对象、树目前的选中状态对象，包含 checkedNodes、checkedKeys、halfCheckedNodes、halfCheckedKeys 四个属性
    handleCheck(currentObj, allSelected) {
      console.log('currentObj', currentObj);
      console.log('allSelected', allSelected);

      // 这个方法不会再次触发 check 事件
      // this.$refs.tree.setChecked(3, true);
      // 要在这个地方判断状态，状态有：未选中 0、选中自身 1、选中全部 2
      this.judgeMark(currentObj);
    },
    judgeMark(currentObj = {}) {
      /* eslint-disable no-param-reassign */
      const removeNode = (obj) => {
        for (let index = 0; index < this.selectTree.length; index += 1) {
          const ele = this.selectTree[index];
          if (ele === obj.label) {
            this.selectTree.splice(index, 1);
            break;
          }
        }
        for (let index = 0; index < this.selectTreeValue.length; index += 1) {
          const { label } = this.selectTreeValue[index];
          if (label === obj.label) {
            this.selectTreeValue.splice(index, 1);
            break;
          }
        }
      };

      const changeChildrenStatusToFalse = (children) => {
        children.forEach((child) => {
          child.mark = 0;
          this.$refs.tree.setChecked(child.id, false);
          removeNode(child);
          if (Object.prototype.hasOwnProperty.call(child, 'children')) {
            changeChildrenStatusToFalse(child.children);
          }
        });
      };

      switch (currentObj.mark) {
        case undefined:
          Object.defineProperty(currentObj, 'mark', {
            value: 1,
            writable: true,
          });
          this.$refs.tree.setChecked(currentObj.id, true);
          this.selectTreeValue.push(currentObj);
          this.selectTree.push(currentObj.label);

          if (Object.prototype.hasOwnProperty.call(currentObj, 'children')) {
            currentObj.children.forEach((child) => {
              this.judgeMark(child);
            });
          }
          break;
        case 0:
          currentObj.mark = 1;
          this.$refs.tree.setChecked(currentObj.id, true);
          this.selectTreeValue.push(currentObj);
          this.selectTree.push(currentObj.label);

          if (Object.prototype.hasOwnProperty.call(currentObj, 'children')) {
            currentObj.children.forEach((child) => {
              this.judgeMark(child);
            });
          }
          break;
        case 1:
          if (Object.prototype.hasOwnProperty.call(currentObj, 'children')) {
            currentObj.mark = 2;
            this.$refs.tree.setChecked(currentObj.id, true);
            this.$refs.tree.getNode(currentObj.id).indeterminate = true;

            changeChildrenStatusToFalse(currentObj.children);
          } else {
            currentObj.mark = 0;
            this.$refs.tree.setChecked(currentObj.id, false);
            removeNode(currentObj);
          }
          break;
        case 2:
          currentObj.mark = 0;
          removeNode(currentObj);
          break;
        default:
          break;
      }
      /* eslint-disable no-param-reassign */
    },
    // 树全选
    selectAll() {
      const allNodes = this.getAllNodes(this.data);

      this.$refs.tree.setCheckedKeys(allNodes);
      if (this.chooseParentNode) {
        // 需要手动维护 selectTree 和 selectTreeValue
        const vitrualNodes = this.$refs.tree.getCheckedNodes(false, false);

        this.selectTree = [];
        this.selectTreeValue = [];
        vitrualNodes.forEach((node) => {
          node.mark = 1;
          this.selectTree.push(node.label);
          this.selectTreeValue.push(node);
        });

        console.log(vitrualNodes);
      }
    },
    // 获取所有节点
    getAllNodes(nodes = [], arr = []) {
      // for (const item of nodes) {
      //   const parentArr = [];

      //   arr.push(item.id);
      //   if (item.children) parentArr.push(...item.children);
      //   if (parentArr && parentArr.length) this.getAllNodes(parentArr, arr);
      // }
      nodes.forEach((item) => {
        const parentArr = [];
        arr.push(item.id);
        if (item.children) parentArr.push(...item.children);
        if (parentArr && parentArr.length) this.getAllNodes(parentArr, arr);
      });
      return arr;
    },
  },
};
</script>
<style lang="less" scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.select-drop-down {
  position: relative;
}
/deep/.select-tree {
  .el-select-dropdown__item {
    padding: 0 10px;
  }
  .el-select-dropdown__item.hover,
  .el-select-dropdown__item:hover {
    background: transparent;
  }
  .el-tree-node__content {
    position: relative;
  }
  .expanded.el-tree-node__expand-icon.el-icon-arrow-down {
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-tree-node__expand-icon {
    position: absolute;
    top: 0;
    right: 0;
  }
  .el-tree-node__expand-icon.expanded {
    transform: rotate(-180deg);
  }
}
/deep/.el-select-dropdown__item {
  pointer-events: none;
  padding-left: 0;
  right: 0;
}
/deep/.el-tree {
  pointer-events: none;
}
/deep/.el-tree__empty-block {
  pointer-events: none;
}
/deep/.el-tree-node__content {
  pointer-events: auto;
}
</style>
