<template>
  <div class="four-oh-four">
    <h1>Oh no!</h1>
    <h3>This page doesn't exist.</h3>

    <router-link :to="{ name: 'home' }">Go home</router-link>
  </div>
</template>

<style lang="css">
.four-oh-four {
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;

  color: white;
}
</style>

