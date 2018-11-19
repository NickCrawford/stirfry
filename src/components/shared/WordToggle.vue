<template>
  <div class="toggle">
    <input type="checkbox" id="toggle--pepper" class="toggle--checkbox" v-model="toggleValue">
    <label class="toggle--btn" for="toggle--pepper">{{ textValue }}</label>
  </div>
</template>

<style lang="scss" scoped>
$textColor--active: #f1f1f1;
$textColor--inactive: #333;
.toggle--neon {
  background-color: #222;
  margin-top: 0;
  padding: 50px 0;
  & .toggle--btn {
    font-family: Audiowide;
    text-transform: uppercase;
    font-size: 6.2em;
    color: $textColor--inactive;
    // text-shadow: -1px -1px 1px #111, 1px 1px 1px #444;
    text-shadow: 0 0 10px transparent, 0 0 15px transparent,
      0 0 25px transparent, 0 0 40px transparent, 0 0 70px transparent,
      0 0 90px transparent, 0 0 90px transparent;
    &:before,
    &:after {
      display: inline-block;
      margin: 0 20px;
      transition: all 220ms ease-in-out;
    }
    &:before {
      content: attr(data-label-off);
      animation: neon 1.5s ease-in-out infinite alternate;
      animation-delay: 90ms;
      color: $textColor--active;
    }
    &:after {
      content: attr(data-label-on);
    }
  }
  & .toggle--checkbox {
    &:checked {
      & + .toggle--btn {
        &:before {
          animation: none;
          color: $textColor--inactive;
        }
        &:after {
          animation: neon 1.5s ease-in-out infinite alternate;
          animation-delay: 90ms;
          color: $textColor--active;
        }
      }
    }
  }
}
</style>

<script>
export default {
  name: "WordToggle",
  props: ["toggleValue", "textValue"]
};
</script>

