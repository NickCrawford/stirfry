<template>
  <!-- Note: The styling for this page is in _buttons.scss -->
  <label class="ingredient-checkbox">
    <input type="checkbox" :checked="value"
          @change="$emit('input', $event.target.checked)"
          class="checkbox-input">
    <img :src="icon" v-if="icon" :style="{ 'margin-top': (-marginTop - 10) + 'px' }">
    <!--<img src="@/assets/img/icons/tofu_icon.png">-->
    <span class="checkbox-label" :class="{
      'checked-ingredient': value
    }">
      <slot></slot>
    </span>
  </label>
</template>

<script>
export default {
  name: "CheckboxItem",
  props: {
    value: {
      type: Boolean,
      required: true
    },
    icon: {
      type: String,
      required: false
    },
    marginTop: {
      type: Number,
      required: false,
      default: 0
    }
  }
};
</script>