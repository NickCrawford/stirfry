<template>
  <div class="large-media">
    <slot/>
  </div>
</template>

<style lang="scss">
@import "@/GlobalVars.scss";

.large-media {
  display: flex;
  position: relative;
  width: 100%;
  padding: 0 2rem;

  height: 100%;
  max-height: 90vh;
  overflow: hidden;

  @media screen and (min-width: $md-bp) {
    padding: 0 4rem;
  }
}

.large-media img {
  // position: relative;
  width: 100%;
  height: auto;

  object-fit: cover;
  object-position: center center;
}
</style>
