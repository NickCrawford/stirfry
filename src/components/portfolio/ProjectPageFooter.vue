<template>
  <div class="project-page-footer">
    <div class="footer-content container">
      <router-link :to="{name: 'portfolio'}" class="link-style">« View more projects</router-link>

      <h3>Let's get cooking!</h3>
      <router-link :to="{name: 'contact'}" tag="button" class="stirfry-button">Contact us »</router-link>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss">
@import "@/GlobalVars.scss";

.project-page-footer {
  background-color: $black;
}

.project-page-footer .footer-content {
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: auto;
  grid-template-areas:
    "project-heading contact-heading"
    "projects contact-button";

  grid-column-gap: 4rem;

  justify-content: start;
  justify-items: space-between;
  align-items: center;
}

.project-page-footer .link-style {
  grid-row: 1 / -1;
  grid-column: 1 / span 1; /* This is temporary for now. Ideally we'll use grid-area */
  color: $skin;
  text-align: left;
}

.project-page-footer h3 {
  margin-top: 0;
  text-align: right;
  grid-area: contact-heading;
}

.project-page-footer button.stirfry-button {
  text-align: left;
  // margin-left: 0;
  margin-right: 0;
  grid-area: contact-button;
}
</style>
