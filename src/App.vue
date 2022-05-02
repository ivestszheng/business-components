<template>
  <div id="app">
    <CustomNav />
    <router-view class="router-view" />
  </div>
</template>
<script>
import CustomNav from '@/components/CustomNav/nav';

export default {
  name: 'App',
  components: { CustomNav },
};
</script>
<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  overflow: scroll;
}

.router-view {
  display: flex;
  justify-content: center;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
</style>
