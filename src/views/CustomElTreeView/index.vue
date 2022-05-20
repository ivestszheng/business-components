<template>
  <div>
    <div class="switch-btns">
      <el-switch
        v-model="isSameLevelDrop"
        active-color="#13ce66"
        inactive-color="#ff4949"
        inactive-text="无拖拽限制"
        active-text="只允许同级上下拖拽"
      />
    </div>
    <CustomTree :data="dataSource" :same-level-drop="isSameLevelDrop" />
  </div>
</template>

<script>
import CustomTree from '@/components/CustomElTree/index.vue';

export default {
  name: 'ElTreeView',
  components: {
    CustomTree,
  },
  data() {
    return {
      isSameLevelDrop: true,
      dataSource: [
        {
          id: 1,
          label: '一级 1',
          children: [
            {
              id: 4,
              label: '二级 1-1',
              children: [
                {
                  id: 9,
                  label: '三级 1-1-1',
                },
                {
                  id: 10,
                  label: '三级 1-1-2',
                },
              ],
            },
          ],
        },
        {
          id: 2,
          label: '一级 2',
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
          label: '一级 3',
          children: [
            {
              id: 7,
              label: '二级 3-1',
            },
            {
              id: 8,
              label: '二级 3-2',
              children: [
                {
                  id: 11,
                  label: '三级 3-2-1',
                },
                {
                  id: 12,
                  label: '三级 3-2-2',
                },
                {
                  id: 13,
                  label: '三级 3-2-3',
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>

<style></style>
