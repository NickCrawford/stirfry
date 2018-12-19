<template>
  <div id="portfolio-page">
    <div class="space">Try to scroll down! :)</div>
    <section class="portfolio-container" v-if="projects">
      <div class="flex-row">
        <div class="portfolio-text-container">
          <div
            class="text-content"
            :id="`project-${index}`"
            v-for="(project, index) in projects"
            :key="project.id"
            v-waypoint="{ active: true, callback: onWaypoint, options: intersectionOptions }"
          >
            <div class="text-content-inner">
              <div>
                <h1
                  class="heading"
                >{{ $prismic.richTextAsPlain(project.data.title) || 'Project Title' + index }}</h1>
                <h2
                  class="description"
                >{{ $prismic.richTextAsPlain(project.data.subtitle) || 'Project Subtitle'}}</h2>
              </div>
            </div>
          </div>
        </div>

        <div class="image-container">
          <div class="image-offset">
            <div class="portfolio-images">
              <!-- <transition name="portfolio-image-animation"> -->
              <transition-group
                name="staggered-fade"
                v-bind:css="false"
                v-on:before-enter="beforeEnter"
                v-on:enter="enter"
                v-on:leave="leave"
                tag="div"
                v-for="(project, projectIndex) in projects"
                :key="project.id"
                class="portfolio-image"
              >
                <div
                  v-show="activeProject == `project-${projectIndex}`"
                  v-for="(layer, index) in project.data.layers"
                  :key="`layer-${index}`"
                  v-bind:data-depth="layer.depth"
                  :style="{ transform: `translate(${ parallaxX(layer.depth) }px, ${ parallaxY(layer.depth) }px)`, 'z-index': layer.depth }"
                  class="parallax-layer"
                >
                  <picture>
                    <!-- <source :srcset="mobileView.url" media="(max-width: 420px)">
                    <source :srcset="tabletView.url" media="(max-width: 840px)">-->
                    <img :src="layer.image.url" :alt="layer.image.alt">
                  </picture>
                </div>
              </transition-group>
              <!-- </transition> -->
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="space">This is the end of our adventure</div>
  </div>
</template>

<script>
import { TweenMax, TimelineLite, Power3 } from "gsap/TweenMax";
import { ScrollToPlugin } from "gsap/all";
// import { ScrollToPlugin } from "ScrollToPlugin";

const PARALLAX_FADE_DURATION = 1;

var checkScrollSpeed = (function(settings) {
  settings = settings || {};

  var lastPos,
    newPos,
    timer,
    delta,
    delay = settings.delay || 50; // in "ms" (higher means lower fidelity )

  function clear() {
    lastPos = null;
    delta = 0;
  }

  clear();

  return function() {
    newPos = window.scrollY;
    if (lastPos != null) {
      // && newPos < maxScroll
      delta = newPos - lastPos;
    }
    lastPos = newPos;
    clearTimeout(timer);
    timer = setTimeout(clear, delay);
    return delta;
  };
})();

export default {
  data() {
    return {
      projects: [],
      activeProject: null,
      mouse: {
        x: 0,
        y: 0
      },
      viewport: {
        width: 0,
        height: 0
      },
      intersectionOptions: {
        root: null,
        rootMargin: "0px 0px 0px 0px",
        threshold: 0.5
      }, // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API,
      isScrolling: false,
      scrollSpeed: 0
    };
  },
  components: {},
  methods: {
    // Returns the proper amount to translate an image based on it's parallax depth
    parallaxX(depth) {
      return (this.mouse.x - this.viewport.width / 2) * (depth / 100);
    },
    parallaxY(depth) {
      return (
        (this.mouse.y - this.viewport.height / 2) * (depth / 100) -
        Math.max(Math.min(this.scrollSpeed, 5), -5) * depth
      );
    },

    beforeEnter: function(el) {
      el.style.opacity = 0;
      el.style.top = `${Math.sign(this.scrollSpeed) * 10}%`;
    },
    enter: function(el, done) {
      var delay = (el.dataset.depth * 10) / 100 + 0.3 + 0.8;
      TweenMax.to(el, PARALLAX_FADE_DURATION, {
        opacity: 1,
        top: 0,
        ease: Power3.easeOut,
        delay: delay
        // onComplete: done()
      });
    },
    leave: function(el, done) {
      var delay = (el.dataset.depth * 10) / 100;

      TweenMax.to(el, PARALLAX_FADE_DURATION, {
        opacity: 0,
        top: `${Math.sign(this.scrollSpeed) * -10}%`,
        ease: Power3.easeIn,
        delay: delay
      });
    },

    getContent() {
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "project"), {
          // orderings: "[my.project.title desc]"
        })
        .then(response => {
          console.log("response", response);
          this.projects = response.results;
        });
    },

    handleMouseMove(e) {
      this.mouse.x = e.x;
      this.mouse.y = e.y;
    },
    handleResize() {
      this.viewport.width = window.innerWidth;
      this.viewport.height = window.innerHeight;
    },
    handleScroll(e) {
      clearTimeout(this.scrollTimer);

      this.scrollTimer = setTimeout(() => {
        this.positionItem();
      }, 300);
      this.scrollSpeed = checkScrollSpeed();
    },
    onWaypoint({ going, direction, el }) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypointMap.GOING_IN) {
        this.activeProject = el.id;
        TweenMax.killAll(true, true, true, false);
        // console.log("waypoint going in!", this.activeProject);
      }

      if (direction === this.$waypointMap.DIRECTION_TOP) {
        el.dataset.direction = this.$waypointMap.DIRECTION_TOP;
        // console.log("waypoint going top!");
      }
    },
    // Positioning the item content
    positionItem() {
      if (!this.activeProject) return;

      const section = this.activeProject;
      const child = document.querySelector(`#${this.activeProject}`);
      const scrollTop = window.pageYOffset || window.scrollY;
      const { top, bottom } = child.getBoundingClientRect();
      const childTop = child.getBoundingClientRect().top;
      const scrollTo = Math.round(childTop + scrollTop);
      const threshold = window.innerHeight * 0.5;

      // Not positioning if not active child or is scrolling
      if (!child || this.isScrolling) {
        return;
      }

      // Not positioning first item until scrolled 1/3 of screen height
      if (top > threshold) {
        return;
      }

      // Not positioning when scrolled through last item
      if (bottom + threshold < window.innerHeight) {
        return;
      }

      clearTimeout(this.scrollTimer);

      this.isScrolling = true;

      const t = new TimelineLite();

      // Positioning the item content with gsap scroll to plugin
      t.to(window, 0.8, {
        scrollTo: scrollTo,
        ease: Power3.easeInOut
      }).call(() => {
        this.isScrolling = false;
      });
    }
  },
  created() {
    window.addEventListener("resize", this.handleResize);
    window.addEventListener("mousemove", this.handleMouseMove);
    window.addEventListener("scroll", this.handleScroll, { passive: true });

    this.handleResize();
    this.handleScroll();
    this.getContent();
  },
  destroyed() {
    window.removeEventListener("resize", this.handleResize);
    window.removeEventListener("mousemove", this.handleMouseMove);
    window.removeEventListener("scroll", this.handleScroll);
  }
};
</script>

<style lang="scss">
</style>


<style lang="scss" scoped>
@import "@/GlobalVars.scss";

#portfolio-page {
  background-color: $background;
}

.portfolio-container {
  margin: 0 auto;
  position: relative;
}

.portfolio-navigation {
  position: absolute;
  top: 150px;
  bottom: 0;
  left: 70px;
  z-index: 2;
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;

  flex-direction: row;
}

.image-container {
  flex: none;
  align-self: stretch;
  // padding-left: 15px;
  // padding-right: calc(1 / 12 * 100%);
  width: calc(5 / 12 * 100%);
}

.image-offset {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
  padding-right: calc(1 / 12 * 100vw);
}

.portfolio-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolio-image {
  position: absolute;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
}

.portfolio-image .parallax-layer {
  position: absolute;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;

  transform: none;
  transform-origin: center center;

  transition: transform 0.3s ease-out;
}

.portfolio-image {
  img,
  picture {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

.portfolio-text-container {
  flex: none;
  align-self: stretch;
  padding-left: calc(1 / 12 * 100%);
  padding-right: 15px;
  width: calc(7 / 12 * 100%);
}

.text-content {
  display: flex;
  flex-direction: column;
  justify-content: center;
  position: relative;
  min-height: 90vh;
  margin-top: 5vh;
  margin-bottom: 5vh;
}
@media (min-width: 720px) {
  .text-content {
    height: 100vh;
  }
}
.text-content-inner {
  position: relative;
  // bottom: 10vh;
  text-align: left;
}

.description {
  margin-top: 0;
}

// .description {
//   font-size: 5em;
// }
/* For testing */
.space {
  display: flex;
  flex-direction: column;
  height: 50vh;
  text-align: center;
  border-bottom: 1px solid red;
}
</style>
