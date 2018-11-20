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
// Import Fonts
@import url("https://use.typekit.net/qdy3aps.css");

// Import Styles
@import "@/assets/styles/index.scss";

* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}

html,
body {
  overflow-y: auto;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  text-align: center;

  background-color: #d0cbc7;

  font-family: ff-good-headline-web-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  line-height: 1.45;
  font-size: 1em;
}

#app {
  // overflow: hidden;
  width: 100%;
  // height: 100%;
}

// @media screen and (min-width: $md-bp) {
//   body {

//   }
// }
</style>
