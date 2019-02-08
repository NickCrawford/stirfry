<template>
  <div
    class="project-page"
    :style="{ 'background-color': project ? project.background_color : '#f5d6ba', 'color': textColor }"
  >
    <header-bar :fixed="false" :colorPalette="headerColorPalette"></header-bar>
    <div class="hero-container">
      <div v-if="project">
        <div class="heading-container container">
          <h1>{{ $prismic.richTextAsPlain(project.title) }}</h1>
          <h2 class="subtitle">{{ $prismic.richTextAsPlain(project.subtitle) }}</h2>
        </div>

        <div class="hero-image-container">
          <prismic-image
            :field="layer.image"
            v-for="(layer, index) in project.layers"
            :key="`layer-${index}`"
            :style="{ 'z-index': layer.depth}"
            class="hero-image"
            :class="{ 'background': layer.depth <= 0 }"
          />
        </div>
      </div>
    </div>

    <div v-if="project">
      <section v-for="(slice, index) in project.body" :key="'slice-' + index">
        <client-needs
          v-if="slice.slice_type === 'client_needs'"
          :services="project.services"
          :link="slice.primary.link_to"
        >
          <template>
            <prismic-rich-text :field="slice.primary.client_needs"/>
          </template>
          <template slot="link_to" v-if="slice.primary.link_to.url">
            <p>
              <a
                :href="slice.primary.link_to.url"
                class="link-style"
              >{{ $prismic.richTextAsPlain(slice.primary.link_cta) || 'View the project live' }}</a>
            </p>
          </template>
        </client-needs>

        <two-column-sticky
          v-else-if="slice.slice_type === 'two-column-sticky'"
          :class="{ 'right-align': slice.primary.text_alignment == 'right' }"
        >
          <template slot="description">
            <prismic-rich-text :field="slice.primary.description"/>
          </template>
          <template v-for="(item, index) in slice.items">
            <prismic-image :field="item.image" :key="'photo-item-' + index"/>
          </template>
        </two-column-sticky>

        <large-media v-else-if="slice.slice_type === 'large_media'">
          <prismic-image :field="slice.primary.image"/>
        </large-media>
      </section>
      <project-page-footer></project-page-footer>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
import ProjectPageFooter from "@/components/portfolio/ProjectPageFooter.vue";

import ClientNeeds from "@/components/portfolio/slices/ClientNeeds.vue";
import TwoColumnSticky from "@/components/portfolio/slices/TwoColumnSticky.vue";
import LargeMedia from "@/components/portfolio/slices/LargeMedia.vue";

export default {
  name: "ProjectPage",
  components: {
    HeaderBar,
    ProjectPageFooter,
    ClientNeeds,
    TwoColumnSticky,
    LargeMedia
  },
  data() {
    return {
      project: null,
      headerColorPalette: "light"
    };
  },
  computed: {
    textColor() {
      let lightColor = "#FFFFFF",
        darkColor = "#000000";
      if (!this.project || !this.project.background_color) return lightColor;

      let hex = this.project.background_color;

      let red = hexToDec(hex.substr(1, 2)),
        green = hexToDec(hex.substr(3, 2)),
        blue = hexToDec(hex.substr(5, 2));

      var contrast = Math.sqrt(
        red * red * 0.241 + green * green * 0.691 + blue * blue * 0.068
      );

      if (contrast > 130) {
        this.headerColorPalette = "gray";
        return darkColor;
      }
      return lightColor;
    }
  },
  methods: {
    getContent(uid) {
      this.$prismic.client.getByUID("project", uid).then(document => {
        this.project = document.data;
      });
    }
  },
  created() {
    this.getContent(this.$route.params.uid);
  },
  beforeRouteUpdate(to, from, next) {
    this.getContent(to.params.uid);
    next();
  }
};

var hexToDec = function(hexString) {
  var decString = hexString.replace(/[^a-f0-9]/gi, "");
  return parseInt(decString, 16);
};
</script>

<style lang="scss" scoped>
@import "~@/GlobalVars";

.project-page {
  position: relative;
  min-height: 100vh;
  transition: background-color 0.3s ease, color 0.3s ease;
  background-color: $light-background;
}

header {
  position: absolute;
}

.hero-container {
  position: relative;
}

.heading-container {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  // transform: translateY(33%);

  display: flex;
  flex-direction: column;
  align-items: start;

  text-align: left;
  z-index: 99;

  * {
    background-color: $black;
    color: $light-background;
    padding: 0.5rem;
    z-index: 10;
    transform: translate(0, 0);
  }
}

.subtitle {
  margin-top: 0;
}

.link-style {
  color: inherit;
}

.hero-image-container {
  position: relative;
  min-height: 100vh;
  background-color: $black;
}

.hero-image {
  position: absolute;
  top: 5rem;
  bottom: 5rem;
  left: 0;

  width: 100%;
  height: calc(100% - 10rem);
  object-fit: contain;
}

.hero-image.background {
  top: 0;
  height: 100%;
  object-fit: cover;
}

section {
  width: 100%;
  margin-bottom: 4rem;
}

section:last-child {
  margin-bottom: 0;
}
</style>
