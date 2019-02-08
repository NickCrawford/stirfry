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
  grid-template-areas:
    "text"
    "image";

  align-items: start;

  @media screen and (min-width: $md-bp) {
    grid-template-columns: 1fr 2fr;
    grid-template-areas: "text image";
    grid-column-gap: 2rem;

    &.right-align {
      grid-template-columns: 2fr 1fr;
      grid-template-areas: "image text";
    }
  }
}

.two-column-sticky .description-container {
  grid-area: text;
  text-align: left;

  @media screen and (min-width: $md-bp) {
    position: sticky;
    top: 25vh;

    margin-right: 4rem;
  }
}

.two-column-sticky .image-container {
  grid-area: image;

  width: 100%;

  img {
    width: 100%;
    height: auto;
  }
}
</style>