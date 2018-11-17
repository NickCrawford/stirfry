<template>
  <div id="sellout-top">
    <img src="@/assets/images/sellout/sellout_logo.png">
    <p>. </p>
    <p>Scroll down or click on a project to see more. </p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";
h1, p, img {
  position: relative;
  z-index: 10;
  text-align: left;
}
h1, p {
  padding-left: 10%;
}

img {
  width: 100%;
  
}

@media only screen and (min-width: 600px) {
  #sellout-top {
    margin-top: 20vh;
  }
}
</style>
