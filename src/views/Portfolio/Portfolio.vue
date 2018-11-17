<template>
  <div id="portfolio">
    <div id="portfolio-top">
      <!-- Loads in a logo and brief description of the project -->
      <router-view name="top"></router-view>
    </div>
    <div id="portfolio-showcase">
      <img src="@/assets/images/sellout_phone.svg" class="phone-image">
      <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
    </div>
  </div>
</template>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";

#portfolio {
  background: $white;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 40% 60%;
  overflow: hidden;
}

h1 {
  font-weight: normal;
  font-size: 3em;
  margin: 30px;
  position: relative; 
  z-index: 10;
}
p {
  opacity: 0.5;
  z-index: 10;
  position: relative;
}

#portfolio-top {
  background: $sellout-navy;
  color: white;
  grid-column: 1/3;
  position: relative;
  z-index: 1;
  transition-duration: .5s;
}
#portfolio-top::after {
  content: "";
  position: absolute;
  left: -10%;
  bottom: -15%;
  width: 120%;
  height: 200px;
  background-color: $sellout-navy;
  transform: rotate(12deg);
  z-index: 0;
}

#portfolio-showcase {
  grid-column: 1/3;
  grid-row: 2 /3;
  padding-top: 100px;

  img {
    position: absolute;
    transform: translatex(-50%) rotatez(3deg) skew(-4deg);
  }
}

.phone-image {
  width: 40%;
  max-width: 200px;
  z-index: 11;
  left: 48%;
  margin-top: -20px;
  margin-left: -20px;
  /*animation: phonefloat 10s  infinite;*/
  opacity: 1;
}
.phone-shadow {
  width: 45%;
  max-width: 220px;
  left: 50%;
}

@media only screen and (min-width: 600px) {
  #portfolio-top {
    grid-column: 1/2;
    grid-row: 1/3;
    background: none;
  }
  #portfolio-top::after {
    content: "";
    position: absolute;
    left: auto;
    right: 0px;
    height: 140vh;
    top: -20vh;
    width: 1000px;
    background-color: $sellout-navy;
    transform: rotate(12deg);
    z-index: 0;
  }

  #portfolio-showcase {
    grid-column: 2/3;
    grid-row: 1 /3;
    padding-top: 100px;
    position: relative;
    animation: floatin .5s linear;

    img {
      position: absolute;
      left: 50%;
      top: 50%;
      transform: translatex(-50%) translatey(-50%) rotatez(3deg) skew(-4deg);
    }
  }
}

@keyframes phonefloat {
  0% {
    margin-top: -10px;
    margin-left: -10px;
  } 50% {
    margin-top: -20px;
    margin-left: -20px;
  } 100% {
    margin-top: -10px;
    margin-left: -10px;
  }
}
</style>
