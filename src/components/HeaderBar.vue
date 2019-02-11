<template>
  <header :class="[colorPalette, {'fixed' : fixed }]">
    <nav>
      <ul :class="{ expanded: expanded }">
        <router-link :to="{ name: 'home', hash: '#headline' }" tag="li" id="home-logo">
          <img src="@/assets/images/logos/logo-pan.svg" alt="home" :class="colorPalette">
        </router-link>
        <div class="menu-title" @click=" expanded = !expanded">Menu</div>
        <router-link :to="{ name: 'portfolio' }" tag="li">Our Work</router-link>
        <router-link to="/#selection" tag="li">Services</router-link>
        <router-link :to="{ name: 'about' }" tag="li">About</router-link>
        <router-link :to="{ name: 'contact' }" tag="li">Contact Us</router-link>

        <li class="close-option" @click=" expanded = !expanded">Close</li>

      </ul>
    </nav>
  </header>
</template>

<script>
export default {
  name: "HeaderBar",
  data() {
    return {
      expanded: false,
    }
  },
  watch:{
    // Un-expands the menu bar, even when you stay on the same page
    $route (to, from){
        this.expanded = false;
    }
  },
  props: {
    colorPalette: {
      // Options: 'transparent', 'gray', 'light'
      type: String,
      default: "transparent",
      required: false
    },
    fixed: {
      type: Boolean,
      default: true,
      required: false
    }
  }
};
</script>

<style lang="scss" scoped>
@import "@/GlobalVars.scss";

$transition-duration: 0.5s;

header {
  position: relative;

  width: 100%;
  transition-duration: $transition-duration;

  z-index: 99;

  &.gray {
    background: $black;
    color: $skin;
  }

  &.light {
    color: $light-background;
  }
}

header.fixed {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}

.close-option {
  font-weight: bold;
  text-decoration: underline;
  order: 7;
  display: none;
}
.menu-title {
  display: none;
  order: 3;
  font-weight:bold;
  text-decoration: underline;
}

nav ul {
  display: flex;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  @media screen and (max-width: 900px) {
    justify-content: space-between;
    padding-right: 20px;
    &.expanded {
      background: $black;
      color: $skin;
      flex-direction: column;
      img {
        filter: brightness(250%);
      }
      .close-option {
        display: block;
      }
    }
    &:not(.expanded) {
      .menu-title {
        
        display: block;
      }
      li {
        display: none;
      }
    }
  }
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
  @media screen and (max-width: 900px) {
    display: block;
    order: 1;
  }
}
.menu-title {
  order: 2;
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
