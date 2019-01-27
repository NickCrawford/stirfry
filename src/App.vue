<template>
  <div id="app">
    <transition name="page-wipe" mode="out-in" :duration="500">
      <router-view/>
    </transition>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar";

export default {
  components: {
    HeaderBar
  }
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
:root {
  --heading-height: 2rem;
}

html,
body {
  // overflow-y: scroll;
  // overflow-x: hidden;
  width: 100%;
  height: auto;
  margin: 0;
  padding: 0;
  text-align: center;

  background-color: $skin;

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

$animation-timing-function: cubic-bezier(0.33, 1, 0.5, 1);

.page-wipe-enter-active,
.page-wipe-leave-active {
  overflow-x: hidden;

  &:after {
    content: "";
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 999999;
    background: #f5e8da;

    transition: transform 0.5s $animation-timing-function;
  }
}

.page-wipe-enter-active:after {
  transform: translateX(-100%);
}

.page-wipe-leave-active:after {
  transform: translateX(100%);
}

.page-wipe-enter:after, .page-wipe-leave-to:after
/* .component-fade-leave-active below version 2.1.8 */ {
  transform: translateX(0%);
}
</style>
