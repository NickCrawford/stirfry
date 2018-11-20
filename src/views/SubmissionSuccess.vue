<template>
  <div class="success">
    <h1>You're Awesome!</h1>
    <h3>Thank you for your submission. We'll be in touch soon</h3>
    <router-link to="/">
      <button class="stirfry-button">Back to home</button>
    </router-link>
  </div>
</template>

<script>
export default {
  name: "SubmissionSuccess"
};
</script>

<style lang="scss" scoped>
@import "~@/GlobalVars.scss";

.success {
  position: relative;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr minmax(1fr, 1040px) 1fr;
  align-content: center;
  align-items: start;

  padding: 2rem 5vw;
  min-height: 100vh;

  background: $skin;
}
</style>
