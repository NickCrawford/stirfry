<template>
  <div
    class="project-page"
    :style="{ 'background-color': project ? project.background_color : '#f5d6ba', 'color': textColor }"
  >
    <header-bar :fixed="false" colorPalette="light"></header-bar>
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
        <template v-if="slice.slice_type === 'client_needs'">
          <client-needs :services="project.services" :link="slice.primary.link_to">
            <template>
              <prismic-rich-text :field="slice.primary.client_needs"/>
            </template>
            <template slot="link_to" v-if="slice.primary.link_to">
              <p>
                <a
                  :href="slice.primary.link_to.url"
                  class="link-style"
                >{{ $prismic.richTextAsPlain(slice.primary.link_cta) || 'View the project live' }}</a>
              </p>
            </template>
          </client-needs>
        </template>

        <template v-else-if="slice.slice_type === 'two_column_sticky'">
          <prismic-rich-text :field="slice.primary.title"/>
          <template v-for="(item, index) in slice.items">
            <prismic-image :field="item.image" :key="'photo-item-' + index"/>
          </template>
        </template>
      </section>
    </div>
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";

import ClientNeeds from "@/components/portfolio/slices/ClientNeeds.vue";

export default {
  name: "ProjectPage",
  components: { HeaderBar, ClientNeeds },
  data() {
    return {
      project: null
    };
  },
  computed: {
    textColor() {
      // if (!this.project || !this.project.background_color)
      return "#FFFFFF";

      // let color = this.project.background_color.split("#")[1];
      // console.log("color", color);

      // if (this.project && this.project.background_color)
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
</script>

<style lang="scss" scoped>
@import "~@/GlobalVars";

.project-page {
  position: relative;
  min-height: 100vh;
  transition: background-color 0.3s ease;
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
</style>
