<template>
  <div id="portfolio">
    <div id="portfolio-top">
      <h1>
        Our Dishes <br>
        <b>So Far...</b>
      </h1>
      <p>These are some of our past projects. </p>
      <p>Scroll down or click on a project to see more. </p>
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
  background: $green;
  color: white;
  grid-column: 1/3;
  position: relative;
  z-index: 1;
}
#portfolio-top::after {
  content: "";
  position: absolute;
  left: -10%;
  bottom: -15%;
  width: 120%;
  height: 200px;
  background-color: $green;
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
  width: 50%;
  z-index: 11;
  left: 48%;
  width: 30%;
}
.phone-shadow {
  width: 35%;
  left: 50%;
}

@media only screen and (min-width: 600px) {

}
</style>
