<template>
  <div class="home">
    <h1>Out to lunch!</h1>
    <h2>Startup Stirfry will be back soon :)</h2>
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

h1 {
  margin: 1em;
  color: #f5d6ba;
}

h2 {
  color: #d4b483;
}
</style>
