<template>
  <header>
    <nav>
      <ul>
        <router-link :to="{ name: 'home' }" tag="li" id="home-logo">
          <img src="@/assets/images/logos/logo-pan.svg" alt="home">
        </router-link>
        <router-link :to="{ name: 'portfolio' }" tag="li">Our work</router-link>
        <router-link to="/#selection" tag="li">Services</router-link>
        <router-link :to="{ name: 'about' }" tag="li">About</router-link>
        <router-link :to="{ name: 'contact' }" tag="li">Contact Us</router-link>
      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderBar"
};
</script>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;

  z-index: 99;
}

nav ul {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
}

nav li {
  display: inline-block;
  padding: 0.5em 1em;
  font-size: 1.25em;

  cursor: pointer;
}

@for $i from 1 through 5 {
  nav li:nth-of-type(#{$i}) {
    order: $i;
  }
}

#home-logo {
  order: 4;
  margin: 0.5em 0 0;
}

#home-logo img {
  height: 3rem;
  width: auto;
}
</style>
