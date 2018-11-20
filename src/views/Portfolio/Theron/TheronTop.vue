<template>
  <div id="theron-top">
    <h1>Theron Brown</h1>
    <p class="subtitle-text">A personal website for jazz musician Theron Brown.</p>
    <p>Check it out <a href="https://www.theronbrownmusic.com/" target="_blank">here.</a> </p>
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
a {
  color: white;
  font-weight: bold;
}

img {
  width: 100%;
  
}

#theron-top {
  padding: 0px 10%;
  position: absolute;
  top: 0px;
}

@media only screen and (min-width: 600px) {
  #theron-top {
    margin-top: 25vh;
    padding: 0px;
  }
  h1, p {
    text-align: left;
    padding-left: 10%;
  
  }
  h1 {
    margin-top: 20px;
    margin-bottom: 30px;

  }
}
</style>
