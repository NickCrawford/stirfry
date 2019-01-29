<template>
  <div class="two-column-sticky container">
    <div class="description-container">
      <slot name="description"/>
    </div>
    <div class="image-container">
      <slot/>
    </div>
  </div>
</template>

<style lang="scss">
@import "@/GlobalVars.scss";

.two-column-sticky {
  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: auto;

  align-items: start;

  @media screen and (min-width: $md-bp) {
    grid-template-columns: 1fr 2fr;
  }
}

.two-column-sticky .description-container {
  text-align: left;

  @media screen and (min-width: $md-bp) {
    position: sticky;
    top: 25vh;

    margin-right: 4rem;
  }
}

.two-column-sticky .image-container {
  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
}
</style>