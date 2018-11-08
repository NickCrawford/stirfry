<template>
    <div></div>
</template>

<script>
// @ is an alias to /src

export default {
  name: "home",
  components: {},
  data() {
    return {
      myScene: null,
      myCamera: null
    };
  },

  mounted() {
    // var pointerDragBehavior = new BABYLON.PointerDragBehavior({
    //   dragAxis: new BABYLON.Vector3(0, 1, 0)
    // });
    // pointerDragBehavior.useObjectOrienationForDragging = false;
    // pointerDragBehavior.onDragStartObservable.add(event => {
    //   console.log("dragStart");
    //   console.log(event);
    // });
    // pointerDragBehavior.onDragObservable.add(event => {
    //   console.log("drag");
    //   console.log(event);
    // });
    // pointerDragBehavior.onDragEndObservable.add(event => {
    //   console.log("dragEnd");
    //   console.log(event);
    // });
  },

  watch: {},
  methods: {
    doThing() {
      // console.log(this.myCamera.position);
    }
  }
};
</script>

<style lang="css" scoped>
</style>
