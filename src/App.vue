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
  overflow: hidden;
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  text-align: center;

  background-color: #d0cbc7;

  font-family: ff-good-headline-web-pro, sans-serif;
  font-weight: 300;
  font-style: normal;
  font-weight: 400;
  line-height: 1.45;
  font-size: 1em;
}

#app {
  overflow: hidden;
  width: 100%;
  height: 100%;
}

h1 {
  font-family: good-headline-web-pro-wide, sans-serif;
  font-weight: 800;
  font-style: normal;
}

p {
  margin-bottom: 1.3em;
}

h1,
h2,
h3,
h4 {
  margin: 1.414em 0 0.5em;
  font-weight: inherit;
  line-height: 1.2;
}

h1 {
  margin-top: 0;
  font-size: 5.063em;
}

h2 {
  font-size: 3.375em;
}

h3 {
  font-size: 2.25em;
}

h4 {
  font-size: 1.5em;
}

small,
.font_small {
  font-size: 0.667em;
}

// @media screen and (min-width: $md-bp) {
//   body {

//   }
// }
</style>
