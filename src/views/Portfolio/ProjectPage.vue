<template>
  <div class="project-page" v-if="project">
    <div class="heading-container">
      <h1>{{ $prismic.richTextAsPlain(project.title) }}</h1>
      <h2 class="subtitle">{{ $prismic.richTextAsPlain(project.subtitle) }}</h2>
    </div>

    <div class="hero-image-container"></div>

    <section v-for="(slice, index) in project.body" :key="'slice-' + index">
      <template v-if="slice.slice_type === 'client_needs'">
        <prismic-rich-text :field="slice.primary.client_needs"/>
      </template>

      <template v-else-if="slice.slice_type === 'two_column_sticky'">
        <prismic-rich-text :field="slice.primary.title"/>
        <template v-for="(item, index) in slice.items">
          <prismic-image :field="item.image" :key="'photo-item-' + index"/>
        </template>
      </template>
    </section>
  </div>
</template>

<script>
export default {
  name: "ProjectPage",
  data() {
    return {
      project: null
    };
  },
  methods: {
    getContent(uid) {
      this.$prismic.client.getByUID("project", uid).then(document => {
        this.project = document.data;
        console.log(this.project);
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
  min-height: 100vh;
  background-color: $light-background;
}

.heading-container {
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  padding: var(--heading-height) calc(1 / 12 * 100vw);

  min-height: 50vh;

  text-align: left;
}

.subtitle {
  margin-top: 0;
}

.hero-image-container {
  min-height: 80vh;
  background-color: $black;
}
</style>
