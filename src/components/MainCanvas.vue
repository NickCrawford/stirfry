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

export default {
  name: "MainCanvas",
  props: {},
  data() {
    return {
      app: ""
    };
  },
  mounted() {
    this.app = new WHS.App([
      new WHS.ElementModule({
        container: document.getElementById("main-canvas")
      }),
      new WHS.SceneModule(),
      new WHS.CameraModule({
        position: {
          y: 10,
          z: 25
        }
      }),
      new WHS.RenderingModule(
        {
          bgColor: 0xf7f7dc,
          renderer: {
            antialias: true,
            shadowmap: {
              type: THREE.PCFSoftShadowMap
            }
          }
        }
        // { shadow: true }
      ),
      new WHS.OrbitControlsModule(),
      new WHS.ResizeModule(),
      new PHYSICS.WorldModule({
        gravity: new THREE.Vector3(0, -10, 0),
        ammo:
          "https://cdn.rawgit.com/WhitestormJS/physics-module-ammonext/6ba4f54a/vendor/ammo.js"
      })
    ]);

    this.app.manager.get("camera").native.lookAt({ x: 0, y: 0, z: 0 });

    // loop
    new WHS.Loop(() => {
      // box.rotation.y += 0.02;
    }).start(this.app);

    new WHS.Plane({
      geometry: {
        width: 100,
        height: 100
      },

      modules: [
        new PHYSICS.BoxModule({
          mass: 0
        })
      ],

      material: new THREE.MeshPhongMaterial({ color: 0x447f8b }),

      rotation: {
        x: -Math.PI / 2
      }
    }).addTo(this.app);

    this.addLights();
    this.app.start(); // Run app.
  },
  methods: {
    addLights() {
      // Lights
      new WHS.PointLight({
        intensity: 0.5,
        distance: 100,

        shadow: {
          fov: 90
        },

        position: new THREE.Vector3(0, 10, 10)
      }).addTo(this.app);

      new WHS.AmbientLight({ intensity: 0.4 }).addTo(this.app);
    },

    addBox() {
      // Sphere
      const box = new WHS.Box({
        // Create sphere component.
        geometry: {
          radius: 3,
          widthSegments: 32,
          heightSegments: 32
        },

        material: new THREE.MeshPhongMaterial({
          color: 0xf2f2f2
        }),

        modules: [
          new PHYSICS.BoxModule({
            mass: 1
          })
        ],

        position: [0, 10, 0]
      });

      box.addTo(this.app);
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
