<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  components: {}
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html,
body {
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;

  background-color: #162129;
}

#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
