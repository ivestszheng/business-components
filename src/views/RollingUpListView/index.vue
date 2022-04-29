<template>
  <div>
    <RolingUpList class="rolling-up-list-case" :title="title" height="180px" :row-len="1" :list="list" @contentClick="handleContentClick" />
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
      title: '我是一条短标题',
      list: [
        { label: '1', value: '我是一条短信息' },
        { label: '1', value: '我是一条短信息' },
        { label: '1', value: '我是一条短信息' },
        { label: '1', value: '我是一条短信息' },
        { label: '1', value: '我是一条短信息' },
        { label: '1', value: '我是一条短信息' },
      ],
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
