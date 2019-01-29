<template>
  <div class="large-media">
    <slot/>
  </div>
</template>

<script>
export default {};
</script>


<style lang="scss">
@import "@/GlobalVars.scss";

.large-media {
  display: flex;
  position: relative;
  width: 100%;
  max-width: 100rem;

  height: 100%;
  max-height: calc(100vh - 8rem);

  padding: 0 2rem;
  margin: 0 auto;

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
