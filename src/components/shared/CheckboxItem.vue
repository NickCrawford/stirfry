<template>
  <label class="checkbox-item">
    <input type="checkbox" :checked="value"
          @change="$emit('input', $event.target.checked)"
          class="checkbox-input">
    <span class="checkbox-label">
      <slot></slot>
    </span>
  </label>
  <!-- <div class="toggle">
    <input type="checkbox" id="toggle--pepper" class="toggle--checkbox" v-model="toggleValue">
    <label class="toggle--btn" for="toggle--pepper">{{ textValue }}</label>
  </div> -->
</template>

<script>
export default {
  name: "CheckboxItem",
  props: ["value"]
};
</script>