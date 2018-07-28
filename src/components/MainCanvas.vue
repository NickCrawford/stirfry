<template>
  <div id="main-canvas">
    <div id="debug">
      <p>debug:</p>
      <button @click="addBox()">Add A Block</button>
    </div>
  </div>
</template>

<script>
import * as WHS from "whs";
import * as PHYSICS from "physics-module-ammonext";
import * as THREE from "three";

import DragModule from "whs/modules/DragModule";

let colors = {
  blue: "#4281A4",
  green: "#48A9A6",
  background: "#D0CBC7",
  ground: "#E4DFDA",
  yellow: "#D4B483",
  red: "#C1666B",
  lid: "#B05D62",
  skin: "#F5D6BA"
};

export default {
  name: "MainCanvas",
  props: {},
  data() {
    return {
      app: "",
      mouse: "",
      camera: "",
      dragging: new DragModule()
    };
  },
  mounted() {
    this.mouse = new WHS.VirtualMouseModule();
    this.camera = new WHS.PerspectiveCamera({
      // Apply a camera.
      fov: 90,
      position: new THREE.Vector3(0, 10, 5)
    });

    var el = document.getElementById("main-canvas");
    this.app = new WHS.App([
      new WHS.ElementModule(el),
      new WHS.DefineModule("camera", this.camera),
      new WHS.SceneModule(),
      new WHS.RenderingModule(
        {
          bgColor: 0x9dedfd,
          renderer: {
            antialias: true,
            shadowmap: {
              type: THREE.PCFSoftShadowMap
            }
          }
        },
        { shadow: true }
      ),
      new WHS.OrbitControlsModule(),
      new WHS.ResizeModule(),
      new PHYSICS.WorldModule({
        gravity: new THREE.Vector3(0, -10, 0),
        ammo:
          "https://cdn.rawgit.com/WhitestormJS/physics-module-ammonext/6ba4f54a/vendor/ammo.js"
      }),
      this.mouse,
      this.dragging
    ]);

    // How to set default outline parameters
    // new THREE.OutlineEffect(renderer, {
    //   defaultThickNess: 0.01,
    //   defaultColor: new THREE.Color(0x888888),
    //   defaultAlpha: 0.8,
    //   defaultKeepAlive: true // keeps outline material in cache even if material is removed from scene
    // });

    this.app.manager.get("camera").native.lookAt({ x: 0, y: 0, z: 0 });

    // loop
    new WHS.Loop(() => {
      // box.rotation.y += 0.02;
    }).start(this.app);

    // Fitting plane to viewport
    // https://stackoverflow.com/questions/13350875/three-js-width-of-view/13351534#13351534

    var vFOV = THREE.Math.degToRad(this.camera.native.fov); // convert vertical fov to radians
    var dist = 10;
    var planeHeight = 2 * Math.tan(vFOV / 2) * dist; // visible height

    var planeWidth = planeHeight * this.camera.native.aspect; // visible width
    console.log("plane: ", planeWidth, planeHeight, this.camera.native);
    new WHS.Plane({
      geometry: {
        width: planeWidth * 2,
        height: planeHeight
      },

      modules: [
        new PHYSICS.BoxModule({
          mass: 0
        })
      ],

      // material: new THREE.MeshLambertMaterial({
      //   color: 0xf7f7dc,
      //   emissive: 0xf7f7dc
      //   // side: THREE.DoubleSide
      // }),
      material: new THREE.MeshLambertMaterial({
        color: 0xf7f7dc
        // emissive: 0xf7f7dc
      }),

      rotation: {
        x: -Math.PI / 2
      }
    }).addTo(this.app);

    this.addLights();
    this.app.start(); // Run app.

    // this.addBox();
  },
  methods: {
    addLights() {
      // Lights
      new WHS.PointLight({
        intensity: 0.8,
        distance: 10,

        shadow: {
          fov: 90
        },

        position: new THREE.Vector3(0, 10, 0)
      }).addTo(this.app);

      new WHS.AmbientLight({ color: 0xffffff, intensity: 0.9 }).addTo(this.app);
    },

    addBox() {
      // Sphere
      const box = new WHS.Box({
        // Create sphere component.
        geometry: {
          width: 2,
          height: 2,
          depth: 2
        },

        material: new THREE.MeshToonMaterial({
          color: colors.red
        }),

        modules: [
          new PHYSICS.BoxModule({
            mass: 1
          }),
          this.dragging.mesh()
        ],

        position: [0, 10, 0]
      });

      this.mouse.track(box);

      box.addTo(this.app);

      // this.mouse.on("move", () => {
      //   console.log(box);
      //   box
      //     .use("physics")
      //     .setLinearVelocity(this.mouse.project().sub(box.position));
      // });
      // box.on("mouseover", () => {
      //   box.material.color.set(0xffff00);
      //   console.log("mouseover");
      // });

      // box.on("mousemove", () => {
      //   console.log("mousemove");
      //   //box.use("physics").setLinearVelocity(this.mouse.project().sub(box.position));
      // });

      // box.on("mouseout", () => {
      //   box.material.color.set(0xf2f2f2);
      //   console.log("mouseout");
      // });

      // box.on("mousedown", () => {
      //   console.log("click!");
      // });
    }
  }
};
</script>

<style scoped>
#debug {
  position: fixed;
  top: 0;
  right: 0;
  background: rgba(0, 0, 0, 0.5);
  padding: 0.25rem 0.5rem 0.5rem;
  z-index: 10;
  color: white;
}
</style>
