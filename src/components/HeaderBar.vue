<template>
  <header :class="colorPalette">
    <nav>
      <ul>
        <router-link :to="{ name: 'home' }" tag="li" id="home-logo">
          <img src="@/assets/images/logos/logo-pan.svg" alt="home" :class="colorPalette">
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
  name: "HeaderBar",
  props: {
    colorPalette: {
      // Options: 'transparent', 'gray',
      type: String,
      default: "transparent",
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";

$transition-duration: 0.5s;

header {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;

  width: 100%;
  transition-duration: $transition-duration;

  z-index: 99;
  &.gray {
    background: $black;
    color: $skin;
  }
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
  transition-duration: 0.2s;
  cursor: pointer;
  &:hover {
    padding: 0.3em 1em 0.7em;
  }
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
  height: 2rem;
  width: auto;
  transition-duration: $transition-duration;
  &.gray {
    filter: brightness(250%);
  }
}
</style>
