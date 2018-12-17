<template>
  <div id="portfolio-page">
    <div class="space">Try to scroll down! :)</div>
    <div style="position: fixed; top: 1em; right: 1em;">{{ activeProject }}</div>
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
                <p
                  class="description"
                >{{ $prismic.richTextAsPlain(project.data.subtitle) || 'Project Subtitle'}}</p>
              </div>
            </div>
          </div>
        </div>

        <div class="image-container">
          <div class="image-offset">
            <div class="portfolio-images">
              <transition name="portfolio-image-animation">
                <div
                  class="portfolio-image"
                  v-for="(project, index) in projects"
                  :key="project.id"
                  v-if="activeProject == `project-${index}`"
                >
                  <div
                    v-if="project.data.layers"
                    class="parallax-layer"
                    v-for="(layer, index) in project.data.layers"
                    :key="`layer${index}`"
                    :style="{ transform: `translate(${ (mouse.x - (viewport.width / 2)) * (layer.depth / 100) }px, ${ (mouse.y - (viewport.height / 2)) * (layer.depth / 100 ) }px)`, 'z-index': layer.depth }"
                  >
                    <picture>
                      <!-- <source :srcset="mobileView.url" media="(max-width: 420px)">
                      <source :srcset="tabletView.url" media="(max-width: 840px)">-->
                      <img :src="layer.image.url" :alt="layer.image.alt">
                    </picture>
                  </div>
                </div>
              </transition>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="space">This is the end of our adventure</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [],
      activeProject: 0,
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
        threshold: 0.66
      } // https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API
    };
  },
  components: {},
  methods: {
    getContent() {
      this.$prismic.client
        .query(this.$prismic.Predicates.at("document.type", "project"), {
          // orderings: "[my.project.title desc]"
        })
        .then(response => {
          console.log("response", response);
          this.projects = response.results;
          this.projects.push({ data: {} });
          this.projects.push({ data: {} });
          this.projects.push({ data: {} });
          this.projects.push({ data: {} });
        });
    },

    handleMouseMove(e) {
      this.mouse.x = e.x;
      this.mouse.y = e.y;

      // console.log(
      //   `translate(${this.mouse.x - this.viewport.width / 2}, ${this.mouse.y -
      //     this.viewport.height / 2})`
      // );
    },
    handleResize() {
      this.viewport.width = window.innerWidth;
      this.viewport.height = window.innerHeight;
    },
    handleScroll() {
      var top = window.pageYOffset || document.documentElement.scrollTop;
    },
    onWaypoint({ going, direction, el }) {
      // going: in, out
      // direction: top, right, bottom, left
      if (going === this.$waypointMap.GOING_IN) {
        this.activeProject = el.id;
        console.log("waypoint going in!", this.activeProject);
      }

      if (direction === this.$waypointMap.DIRECTION_TOP) {
        console.log("waypoint going top!");
      }
    },
    // Positioning the item content
    positionItem() {
      const section = this.section.current;
      const child = section.querySelector(`#${this.state.activeItem}`);
      const scrollTop = window.pageYOffset || window.scrollY;
      const { top, bottom } = section.getBoundingClientRect();
      const childTop = child.getBoundingClientRect().top;
      const scrollTo = Math.round(childTop + scrollTop);
      const threshold = window.innerHeight / 3;

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
        ease: "Power4.easeInOut"
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

.portfolio-container {
  margin: 0 auto;
  position: relative;
}

.portfolio-navigation {
  position: absolute;
  top: 150px;
  bottom: 0;
  right: 70px;
  z-index: 2;
}

.navigation-buttons {
  display: none;
}

@media (min-width: 720px) {
  .navigation-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
    position: sticky;
    top: 150px;
  }
}

.navigation-button {
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-style: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  vertical-align: baseline;
  border: 0;
  background: transparent;
  appearance: none;
  margin-bottom: 30px;
  cursor: pointer;
  transition: color 200ms ease-in-out;
}
.navigation-button:focus {
  outline: none;
}
.navigation-button.isActive {
  color: #ab80ff;
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
  padding-right: 15px;
  width: calc(5 / 12 * 100%);
}

.image-offset {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.portfolio-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolio-image {
  position: absolute;
  top: 0;
  left: 0;
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
}

.portfolio-image {
  img,
  picture {
    height: 100%;
    width: 100%;
    object-fit: contain;
  }
}

.portfolio-image-animation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-color: #ab80ff;
  transform: translateY(-100%);
  will-change: transform;
}

.portfolio-text-container {
  flex: none;
  align-self: stretch;
  padding-left: calc(1 / 12 * 100%);
  padding-right: 15px;
  width: calc(7 / 12 * 100%);
}

.text-content {
  position: relative;
  min-height: 100vh;
}
@media (min-width: 720px) {
  .text-content {
    height: 100vh;
  }
}
.text-content-inner {
  position: absolute;
  bottom: 10vh;
  text-align: left;
}

/* For testing */
.space {
  display: flex;
  flex-direction: column;
  height: 400px;
  text-align: center;
  border-bottom: 1px solid red;
}
</style>
