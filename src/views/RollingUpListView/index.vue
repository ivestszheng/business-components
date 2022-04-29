<template>
  <div>
    <!-- 需要传入不同的数据源，否则作用域无法被隔离 -->
    <RolingUpList
      ref="rul1"
      class="rolling-up-list-case"
      :title="list1.title"
      height="180px"
      :row-len="1"
      :list="list1.value"
      @contentClick="handleContentClick"
    />
    <RolingUpList
      ref="rul2"
      class="rolling-up-list-case"
      :title="list2.title"
      height="180px"
      :row-len="1"
      :list="list2.value"
      @contentClick="handleContentClick"
    />
  </div>
</template>

<script>
import RolingUpList from '@/components/RollingUpList/index.vue';

export default {
  name: 'RollingUpListView',
  components: {
    RolingUpList,
  },
  data() {
    return {
      list1: {
        title: '我是一条很短的标题',
        value: [
          { label: '1', value: '我是一条短信息' },
          { label: '2', value: '我是一条短信息' },
          { label: '3', value: '我是一条短信息' },
          { label: '4', value: '我是一条短信息' },
          { label: '5', value: '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息' },
          { label: '6', value: '我是一条短信息' },
        ],
      },
      list2: {
        title: '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的标题',
        value: [
          { label: '1', value: '我是一条短信息' },
          { label: '2', value: '我是一条短信息' },
          { label: '3', value: '我是一条短信息' },
          { label: '4', value: '我是一条短信息' },
          { label: '5', value: '我是一条很长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长长的信息' },
          { label: '6', value: '我是一条短信息' },
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
