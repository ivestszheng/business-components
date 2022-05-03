<template>
  <div class="content-box">
    <div class="container">
      <el-select
        v-model="selectTree"
        clearable
        placeholder="请选择"
        :popper-append-to-body="false"
        multiple
        class="select-tree"
        @change="selectChange"
      >
        <el-option :value="selectTreeValue" style="height: auto">
          <!-- 可以单独选中父节点 -->
          <el-tree
            v-if="chooseParentNode"
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            accordion
            highlight-current
            icon-class="el-icon-arrow-down"
            :check-strictly="true"
            @check="handleCheck"
          ></el-tree>
          <!-- 不可以单独选中父节点 -->
          <el-tree
            v-else
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            accordion
            highlight-current
            icon-class="el-icon-arrow-down"
            @check-change="handleCheckChange"
          ></el-tree>
        </el-option>
      </el-select>
      <div>{{ selectTree }}</div>
      <div>{{ selectTreeValue }}</div>
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
      selectTree: '',
      selectTreeValue: [],
    };
  },
  methods: {
    // select框值改变时候触发的事件
    selectChange(e) {
      console.log('select change', e);
      const arrNew = [];
      const dataLength = this.selectTreeValue.length;
      const eleng = e.length;
      for (let i = 0; i < dataLength; i += 1) {
        for (let j = 0; j < eleng; j += 1) {
          if (e[j] === this.selectTreeValue[i].label) {
            arrNew.push(this.selectTreeValue[i]);
          }
        }
      }
      this.$refs.tree.setCheckedNodes(arrNew); // 设置勾选的值
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
      // console.log('currentObj', currentObj);
      // console.log('allSelected', allSelected);

      // 这个方法不会再次触发 check 事件
      // this.$refs.tree.setChecked(3, true);
      // 要在这个地方判断状态，状态有：未选中 0、选中自身 1、选中全部 2
      this.judgeMark(currentObj);
    },
    judgeMark(currentObj = {}) {
      /* eslint-disable no-param-reassign */
      const changeChildrenStatus = (children) => {
        children.forEach((child) => {
          child.mark = 0;
          this.$refs.tree.setChecked(child.id, false);
          if (Object.prototype.hasOwnProperty.call(child, 'children')) {
            changeChildrenStatus(child.children);
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
          // this.selectTreeValue.push(currentObj);
          // this.selectTree.push(currentObj.label);

          if (Object.prototype.hasOwnProperty.call(currentObj, 'children')) {
            currentObj.children.forEach((child) => {
              this.judgeMark(child);
            });
          }
          break;
        case 0:
          currentObj.mark = 1;
          this.$refs.tree.setChecked(currentObj.id, true);
          // this.selectTreeValue.push(currentObj);
          // this.selectTree.push(currentObj.label);

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
            changeChildrenStatus(currentObj.children);
          } else {
            currentObj.mark = 0;
            this.$refs.tree.setChecked(currentObj.id, false);
          }
          break;
        case 2:
          currentObj.mark = 0;
          break;
        default:
          break;
      }
      /* eslint-disable no-param-reassign */
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
