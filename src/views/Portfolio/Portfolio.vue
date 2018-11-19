<template>
  <div id="portfolio">
    <div id="portfolio-top">
      <!-- Loads in a logo and brief description of the project -->
      <router-view name="top"></router-view>
    </div>
    
    <!--<div id="portfolio-showcase">
      <div class="portfolio-images">
        <img src="@/assets/images/sellout_phone.svg" class="phone-image">
        <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
      </div>
    </div>-->
    <div id="portfolio-showcase">
      <flickity ref="flickity" :options="flickityOptions" id="flickity-container">
        <div class="portfolio-image-container">
          <img src="@/assets/images/sellout_phone.svg" class="phone-image">
          <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
        </div>
        <div class="portfolio-image-container">
          <img src="@/assets/images/sellout_phone.svg" class="phone-image">
          <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
        </div>
      </flickity>
    </div>
    
    
    <!--<flickity ref="flickity" :options="flickityOptions" id="flickity-container">
      <div id="portfolio-showcase" class="carousel-cell">
        <img src="@/assets/images/sellout_phone.svg" class="phone-image">
        <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
      </div>
    </flickity>-->
      
  </div>
</template>

<script>
import Flickity from 'vue-flickity';

export default {
  data() {
    return {
      flickityOptions: {
        initialIndex: 3,
        prevNextButtons: true,
        pageDots: false,
        wrapAround: true
        
        // any options from Flickity can be used
      }
    }
  },
  components: {
    Flickity
  },
  methods: {
    next() {
      this.$refs.flickity.next();
    },
    
    previous() {
      this.$refs.flickity.previous();
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";

/* The entire page, setting up grid: */
#portfolio {
  background: $white;
  height: 100vh;
  width: 100%;
  display: grid;
  grid-template-columns: 50% 50%;
  grid-template-rows: 40% 60%;
  overflow: hidden;
}

/* Text styling for this page: */
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

/* Portfolio descriptions, on the top on mobile/left on desktop: */
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

/* Flickity container for portfolio: */
#portfolio-showcase {
  
  grid-column: 1/3;
  grid-row: 2 /3;
}

/* Flickity container, obviously: */
#flickity-container {

  position: relative;
  height: 100%;

  grid-column: 2/3;
  grid-row: 1/3;
}


/* Image containers themselves, inside flickity: */
.portfolio-image-container {
  position: relative;
  min-width: 200px;
  min-height: 200px;
  width: 50%;
  height: 100%;
  animation: floatin .5s linear;
  margin: 0px 200px;

  img {
    transform: translatex(-50%) translatey(-50%) rotatez(3deg) skew(-4deg);
  }
}

/* Images: */
.phone-image {
  position: absolute;
  width: 60%;
  max-width: 230px;
  z-index: 11;
  left: 48%;
  top: 55%;
  margin-top: -10px;
  margin-left: -10px;
  /*animation: phonefloat 10s  infinite;*/
  opacity: 1;
}
.phone-shadow {
  position: absolute;
  width: 67%;
  max-width: 250px;
  left: 50%;
  top: 55%;
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
  }

  .portfolio-image-container {
    height: 100vh;
  } 

  .phone-image {
    width: 80%;
  }
  .phone-shadow {
    width: 87%;
  }
  

  .portfolio-images {
    
    padding-top: 100px;
    position: relative;

    img {
      
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

<style>
.flickity-viewport {
    overflow: visible;
  }
</style>