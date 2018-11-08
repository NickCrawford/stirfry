<template>
  <div class="home">
    <h2>Out to lunch!</h2>
    <h1>Startup Stirfry</h1>
    <h3>will be back soon</h3>
  </div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {}
};
</script>

<style lang="css" scoped>
.home {
  width: 100%;
  height: 100%;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: white;
}

h2,
h3 {
  color: #f5d6ba;
  font-weight: lighter;
}

h1 {
  margin: 1em;
  color: #d4b483;
}
</style>
