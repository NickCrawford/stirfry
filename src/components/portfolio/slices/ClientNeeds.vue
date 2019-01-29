<template>
  <div class="client-needs container">
    <div class="summary">
      <slot/>
    </div>
    <div class="services">
      <h5>What we worked on:</h5>
      <p>
        <span
          v-for="tag in services"
          :key="tag.id"
          class="service-tag"
          v-if="tag.service"
        >{{ tag.service }}</span>
      </p>
      <p>
        <slot name="link_to"></slot>
      </p>
    </div>
  </div>
</template>

<script>
export default {
  props: ["services"]
};
</script>


<style lang="scss">
@import "@/GlobalVars.scss";

.client-needs {
  display: grid;
  grid-template-columns: 1fr;
  grid-column-gap: 8rem;
  align-items: center;
  align-content: center;

  min-height: 33vh;
  font-size: 1.25em;

  text-align: left;

  @media screen and (min-width: $md-bp) {
    grid-template-columns: 1fr 1fr;
  }
}

.client-needs .summary {
  grid-column: 1 / span 1;
  color: white;
}

.client-needs .service-tag {
  margin-right: 1ch;
  text-transform: capitalize;
}
</style>
