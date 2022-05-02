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
          <el-tree
            ref="tree"
            :data="data"
            show-checkbox
            node-key="id"
            accordion
            highlight-current
            :props="defaultProps"
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
  components: {},
  data() {
    return {
      selectTree: '',
      selectTreeValue: [],
      data: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '一级 1-1',
            },
          ],
        },
        {
          id: 2,
          label: '二级 2',
          children: [
            {
              id: 5,
              label: '二级 2-1',
            },
            {
              id: 6,
              label: '二级 2-2',
            },
          ],
        },
        {
          id: 3,
          label: '三级 3',
          children: [
            {
              id: 7,
              label: '三级 3-1',
            },
            {
              id: 8,
              label: '三级 3-2',
              children: [
                {
                  id: 81,
                  label: '三级 3-2-1',
                },
                {
                  id: 82,
                  label: '三级 3-2-2',
                },
              ],
            },
          ],
        },
      ],
      defaultProps: {
        children: 'children',
        label: 'label',
      },
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
      // console.log(`arr:${JSON.stringify(arr)}`);
      // console.log(`arrLabel:${arrLabel}`);
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
  pointer-events: none !important;
  padding-left: 0;
  right: 0;
}
/deep/.el-tree {
  pointer-events: none;
}
/deep/.el-tree__empty-block {
  pointer-events: none;
}
/deep/.el-tree-node {
  pointer-events: auto;
}
</style>
