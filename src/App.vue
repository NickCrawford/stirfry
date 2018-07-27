<template>
  <div id="app">
    <router-view/>
    <main-canvas></main-canvas>
  </div>
</template>

<script>
import MainCanvas from "@/components/MainCanvas.vue";

export default {
  components: { MainCanvas }
};
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}

html {
  background-color: red; //#162129;
}

#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;

  position: relative;
}

#main-canvas {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  overflow: hidden;
}
</style>
