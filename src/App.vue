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
@import url("https://use.typekit.net/qdy3aps.css");

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

  font-family: ff-good-headline-web-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
}

#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
}
</style>
