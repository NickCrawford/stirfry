<template>
  <div id="sellout-top">
    <img src="@/assets/images/sellout/sellout_logo.png">
    <p class="subtitle-text">A webapp to help local bands and venues organize. </p>
    <p>Scroll down or click on a project to see more. </p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";
h1, p, img {
  position: relative;
  z-index: 10;
  
}
.subtitle-text {
  font-size: 24px;
}

img {
  width: 100%;
  
}

#sellout-top {
  padding: 0px 10%;
}

@media only screen and (min-width: 600px) {
  #sellout-top {
    margin-top: 20vh;
    padding: 0px;
  }
  h1, p {
    text-align: left;
    padding-left: 10%;
  }
}
</style>
