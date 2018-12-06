<template>
  <div id="portfolio-and-studies">
    <div id="portfolio">
      <div id="portfolio-top"
        :class="[ $route.name + '-top']">
        <!-- Loads in a logo and brief description of the project -->
        <router-view name="top"></router-view>
      </div>
      
      <div id="portfolio-showcase">
        <div class="project-label"
          :class="[ $route.name + '-label']">
          <span>Website Design</span>
        </div>
        <flickity ref="showcase-flickity" :options="flickityOptions" id="flickity-container"
          v-on:init="doSomething()">
          <div class="portfolio-image-container">
            <img src="@/assets/images/sellout/sellout_phone.svg" class="phone-image">
            <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
          </div>
          <div class="portfolio-image-container">
            <img src="@/assets/images/theron/theron_phone.svg" class="phone-image">
            <img src="@/assets/images/phone_shadow.svg" class="phone-shadow">
          </div>
        </flickity>
      </div>
    </div>
    <router-link name="case-study"></router-link>
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
        wrapAround: true,
        
        // any options from Flickity can be used
      },

      showcaseRoutes: [
        'sellout',
        'theron'
      ]
    }
  },
  components: {
    Flickity
  },
  methods: {
    next() {
      this.$refs['showcase-flickity'].next();
    },
    
    previous() {
      this.$refs['showcase-flickity'].previous();
    },
    doSomething() {
      console.log("Initiated listener!!");
      
      var vm = this;

      this.$refs['showcase-flickity'].select( this.showcaseRoutes.indexOf(this.$route.name) );

      this.$refs['showcase-flickity'].on( 'select', function( index ) {
        vm.$router.push({ name: vm.showcaseRoutes[index] });
      });
    }
  }
}
</script>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";

/* The entire page, setting up grid: */
#portfolio {
  background: $background;
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
  margin-top: 30px;
  position: relative; 
  z-index: 10;
}
p {
  opacity: 0.5;
  z-index: 10;
  position: relative;
}

/* Portfolio descriptions, on the top on mobile/left on desktop: */

.sellout-top::after {
  background: $sellout-navy;
}

.theron-top::after {
  background-color: $theron-gray;
}
#portfolio-top {
  color: white;
  grid-column: 1/3;
  position: relative;
  z-index: 1;
  transition-duration: 1s;
}
#portfolio-top::after {
  content: "";
  position: absolute;
  left: -10%;
  bottom: -15%;
  width: 140%;
  height: 500px;
  transform: rotate(12deg);
  box-shadow: $box-shading-heavy;
  z-index: 0;
  transition-duration: 1s;
}

/* Flickity container for portfolio: */
#portfolio-showcase {
  position: relative;
  grid-column: 1/3;
  grid-row: 2 /3;
}

.project-label {
  padding: 10px 200px 10px 25px;
  color: white;
  transition-duration: .5s;
  position: absolute;
  font-weight: bold;
  left: 5%;
  top: 40px;
  box-shadow: $box-shading;
  transform: skewx(-20deg);
  
  display: none;
  animation: label-pop-in .5s linear;
}
span {
  display: block;
  transform: skewx(200deg);
}
.sellout-label {
  background: $blue;
}
.theron-label {
  background: $red;
}

/* Flickity container, obviously: */
#flickity-container {

  position: relative;
  height: 100%;
  width: 90%;
  margin: 0 auto;

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
  left: 52%;
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
  left: 54%;
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
    transform: rotate(12deg);
    z-index: 0;
  }
  .project-label {
    padding: 10px 25px 10px 100px;
    display: block;
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

@keyframes label-pop-in {
  0% {
    left: -200px;
  } 75% {
    left: 20px;
  } 100% {
    left: 0px;
  }
}
</style>

<style>
.flickity-viewport {
    overflow: visible;
  }
</style>