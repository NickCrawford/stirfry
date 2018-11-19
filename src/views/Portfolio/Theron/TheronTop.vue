<template>
  <div id="sellout-top">
    <h1>Theron Brown</h1>
    <p class="subtitle-text">Theron's website</p>
    <p>Scroll down or click on a project to see more. </p>
  </div>
</template>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";
h1, p, img {
  position: relative;
  z-index: 10;
  margin-bottom: 0px;
}
h1 {
  margin-top: 20px;
  margin-bottom: 0px;
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
  h1 {
    margin-top: 20px;
    margin-bottom: 0px;
  }
}
</style>
