<template>
  <div>
    <el-switch v-model="isPopoverMode" active-color="#13ce66" inactive-color="#ff4949" inactive-text="走马灯模式" active-text="弹出框模式">
    </el-switch>
    <!-- 需要传入不同的数据源，否则作用域无法被隔离 -->
    <RolingUpList
      v-show="!isPopoverMode"
      class="rolling-up-list-case"
      height="180px"
      :title="list1.title"
      :row-len="1"
      :list="list1.value"
      @contentClick="handleContentClick"
    />
    <RolingUpList
      v-show="!isPopoverMode"
      class="rolling-up-list-case"
      height="180px"
      :title="list2.title"
      :row-len="1"
      :list="list2.value"
      @contentClick="handleContentClick"
    />
    <PopoverRollingUpList
      v-show="isPopoverMode"
      class="rolling-up-list-case"
      height="180px"
      :mode="'popover'"
      :title="list3.title"
      :row-len="1"
      :list="list3.value"
      @contentClick="handleContentClick"
    />
  </div>
</template>

<script>
import RolingUpList from '@/components/RollingUpList/index.vue';

const PopoverRollingUpList = () => import('@/components/RollingUpList/index.vue');

export default {
  name: 'RollingUpListView',
  components: {
    RolingUpList,
    PopoverRollingUpList,
  },
  data() {
    return {
      isPopoverMode: true,
      list1: {
        title: '我是一条长度非常非常非常非常非常非常非常非常非常极限的标题',
        value: [
          { label: '1', value: '我是一条短信息' },
          { label: '2', value: '我是一条短信息' },
          { label: '3', value: '我是一条一般长长长长长长长长长长长长长长长长长长长长长长长长的信息' },
          { label: '4', value: '我是一条长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息' },
          {
            label: '5',
            value:
              '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息',
          },
          // 这个长度下效果会出问题，也可能是时间太短了
          {
            label: '6',
            value:
              '我是一条究极长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长信息',
          },
        ],
      },
      list2: {
        title:
          '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的标题',
        value: [
          { label: '1', value: '我是一条短信息' },
          { label: '2', value: '我是一条短信息' },
          { label: '3', value: '我是一条短信息' },
          { label: '4', value: '我是一条短信息' },
          {
            label: '5',
            value:
              '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息',
          },
          { label: '6', value: '我是一条短信息' },
        ],
      },
      list3: {
        title:
          '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的标题',
        value: [
          { label: '1', value: '我是一条短信息' },
          { label: '2', value: '我是一条短信息' },
          { label: '3', value: '我是一条一般长长长长长长长长长长长长长长长长长长长长长长长长的信息' },
          { label: '4', value: '我是一条长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息' },
          {
            label: '5',
            value:
              '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息',
          },
          // 这个长度下效果会出问题，也可能是时间太短了
          {
            label: '6',
            value:
              '我是一条究极长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长信息',
          },
        ],
      },
    };
  },
  methods: {
    handleContentClick(contentVal) {
      console.log(contentVal);
    },
  },
};
</script>

<style>
.rolling-up-list-case {
  width: 580px;
  box-sizing: border-box;
  margin: 16px 45px 0 20px;
}
</style>
