<template>
  <div id="app">
    <nav>
      <router-link to="/home"> Home </router-link>|
      <router-link to="/rolling-up-list"> RollingUpList </router-link>
    </nav>
    <router-view class="router-view" />
  </div>
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  padding: 30px;
  a {
    font-weight: bold;
    color: #2c3e50;
    &.router-link-exact-active {
      color: #42b983;
    }
  }
}

.router-view {
  display: flex;
  justify-content: center;
}
</style>
