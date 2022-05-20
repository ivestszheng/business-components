<template>
  <div>
    <div class="switch-btns">
      单独选中父节点：
      <el-switch v-model="isChosenParrentNode" active-color="#13ce66" inactive-color="#ff4949"> </el-switch>
    </div>
    <TreeInSelect :data="dataSource" :choose-parent-node="isChosenParrentNode" />
  </div>
</template>

<script>
import TreeInSelect from '@/components/TreeInSelect/index.vue';

export default {
  name: 'TreeInSelectView',
  components: { TreeInSelect },
  data() {
    this.dataSource = [
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
    ];
    return {
      isChosenParrentNode: true,
    };
  },
};
</script>
