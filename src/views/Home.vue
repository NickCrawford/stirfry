<template>
  <div class="home">
    <div class="debug-container">
    </div>
    <canvas id="renderCanvas"></canvas>
  </div>
</template>

<script>
// @ is an alias to /src
import "cannon";
import * as BABYLON from "babylonjs";

export default {
  name: "home",
  components: {},
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      currentMesh: null
    };
  },

  mounted() {
    this.initEngine();
    this.scene = this.initScene();
    this.initPan();
    this.initIngredients();
    this.initPointerEvents();

    this.engine.runRenderLoop(() => {
      this.scene.render();
    });

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  },

  watch: {},
  methods: {
    initEngine() {
      // Get the canvas DOM element
      this.canvas = document.getElementById("renderCanvas");

      // Load the 3D engine
      this.engine = new BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });
    },

    initScene() {
      let scene = new BABYLON.Scene(this.engine);

      scene.clearColor = BABYLON.Color3.Purple();

      var camera = new BABYLON.FreeCamera(
        "Camera",
        new BABYLON.Vector3(0, 10, -15),
        scene
      );
      // camera.attachControl(this.canvas, true);
      camera.checkCollisions = true;
      camera.applyGravity = true;
      camera.setTarget(new BABYLON.Vector3(0, 0, 0));

      var light = new BABYLON.DirectionalLight(
        "dir02",
        new BABYLON.Vector3(0.2, -1, 0),
        scene
      );
      light.position = new BABYLON.Vector3(0, 80, 0);

      // Material
      var materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
      var materialAmiga2 = new BABYLON.StandardMaterial("amiga", scene);

      // Shadows
      var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

      // Physics
      scene.enablePhysics(null, new BABYLON.CannonJSPlugin());

      // Spheres
      var y = 0;
      for (var index = 0; index < 100; index++) {
        var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 3, scene);
        sphere.material = materialAmiga;

        sphere.position = new BABYLON.Vector3(
          Math.random() * 20 - 10,
          y,
          Math.random() * 10 - 5
        );

        shadowGenerator.addShadowCaster(sphere);

        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
          sphere,
          BABYLON.PhysicsImpostor.SphereImpostor,
          { mass: 1 },
          scene
        );

        y += 2;
      }

      // Link
      var spheres = [];
      for (index = 0; index < 10; index++) {
        sphere = BABYLON.Mesh.CreateSphere("Sphere0", 16, 1, scene);
        spheres.push(sphere);
        sphere.material = materialAmiga2;
        sphere.position = new BABYLON.Vector3(
          Math.random() * 20 - 10,
          y,
          Math.random() * 10 - 5
        );

        shadowGenerator.addShadowCaster(sphere);

        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
          sphere,
          BABYLON.PhysicsImpostor.SphereImpostor,
          { mass: 1 },
          scene
        );
      }

      for (index = 0; index < 9; index++) {
        spheres[index].setPhysicsLinkWith(
          spheres[index + 1],
          new BABYLON.Vector3(0, 0.5, 0),
          new BABYLON.Vector3(0, -0.5, 0)
        );
      }

      // Box
      var box0 = BABYLON.Mesh.CreateBox("Box0", 3, scene);
      box0.position = new BABYLON.Vector3(3, 30, 0);
      var materialWood = new BABYLON.StandardMaterial("wood", scene);

      materialWood.emissiveColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      box0.material = materialWood;

      shadowGenerator.addShadowCaster(box0);

      // Compound
      var part0 = BABYLON.Mesh.CreateBox("part0", 3, scene);
      part0.position = new BABYLON.Vector3(3, 30, 0);
      part0.material = materialWood;

      var part1 = BABYLON.Mesh.CreateBox("part1", 3, scene);
      part1.parent = part0; // We need a hierarchy for compound objects
      part1.position = new BABYLON.Vector3(0, 3, 0);
      part1.material = materialWood;

      shadowGenerator.addShadowCaster(part0);
      shadowGenerator.addShadowCaster(part1);
      shadowGenerator.useBlurExponentialShadowMap = true;
      shadowGenerator.useKernelBlur = true;
      shadowGenerator.blurKernel = 32;

      // Playground
      var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
      ground.scaling = new BABYLON.Vector3(100, 1, 100);
      ground.position.y = -5.0;
      ground.checkCollisions = true;

      var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
      border0.scaling = new BABYLON.Vector3(1, 100, 100);
      border0.position.y = -5.0;
      border0.position.x = -50.0;
      border0.checkCollisions = true;

      var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
      border1.scaling = new BABYLON.Vector3(1, 100, 100);
      border1.position.y = -5.0;
      border1.position.x = 50.0;
      border1.checkCollisions = true;

      var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
      border2.scaling = new BABYLON.Vector3(100, 100, 1);
      border2.position.y = -5.0;
      border2.position.z = 50.0;
      border2.checkCollisions = true;

      var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
      border3.scaling = new BABYLON.Vector3(100, 100, 1);
      border3.position.y = -5.0;
      border3.position.z = -50.0;
      border3.checkCollisions = true;

      var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
      groundMat.diffuseColor = new BABYLON.Color3(0.5, 0.5, 0.5);
      groundMat.emissiveColor = new BABYLON.Color3(0.2, 0.2, 0.2);
      groundMat.backFaceCulling = false;
      ground.material = groundMat;
      border0.material = groundMat;
      border1.material = groundMat;
      border2.material = groundMat;
      border3.material = groundMat;
      ground.receiveShadows = true;

      // Physics
      box0.physicsImpostor = new BABYLON.PhysicsImpostor(
        box0,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 2, friction: 0.4, restitution: 0.3 },
        scene
      );
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, friction: 0.5, restitution: 0.7 },
        scene
      );
      border0.physicsImpostor = new BABYLON.PhysicsImpostor(
        border0,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );
      border1.physicsImpostor = new BABYLON.PhysicsImpostor(
        border1,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );
      border2.physicsImpostor = new BABYLON.PhysicsImpostor(
        border2,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );
      border3.physicsImpostor = new BABYLON.PhysicsImpostor(
        border3,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        scene
      );

      part0.physicsImpostor = new BABYLON.PhysicsImpostor(
        part0,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 2, friction: 0.4, restitution: 0.3 },
        scene
      );

      return scene;
    },

    initPointerEvents() {
      this.canvas.addEventListener("pointermove", this.onPointerMove, false);
      this.canvas.addEventListener("pointerdown", this.onPointerDown, false);
      this.canvas.addEventListener("pointerup", this.onPointerUp, false);

      this.scene.onDispose = function() {
        this.canvas.removeEventListener("pointerdown", this.onPointerDown);
        this.canvas.removeEventListener("pointerup", this.onPointerUp);
        this.canvas.removeEventListener("pointermove", this.onPointerMove);
      };
    },

    onPointerDown(evt) {
      console.log("pointer down", evt);
      if (evt.button !== 0) {
        return;
      }

      // check if we are under a mesh
      var pickInfo = this.scene.pick(
        this.scene.pointerX,
        this.scene.pointerY,
        function(mesh) {
          // console.log("mesh", mesh);
          // return mesh !== ground;
          return mesh;
        }
      );
      if (pickInfo.hit) {
        this.currentMesh = pickInfo.pickedMesh;
        console.log("currentMesh", this.currentMesh);
      }
    },

    onPointerMove(evt) {
      if (!this.currentMesh) {
        return;
      }

      this.currentMesh.physicsImpostor.applyForce(
        new BABYLON.Vector3(0, 0, -20),
        new BABYLON.Vector3(0, 0, 0)
      );

      // this.mouse
      //         .project()
      //         .multiply(new THREE.Vector3(1, 1, 0)) // Remove z index movement
      //         .sub(this.selectedObject.position)
      //         .multiplyScalar(3);
    },

    onPointerUp(evt) {
      this.currentMesh = null;
    },

    initPan() {},

    initIngredients() {}
  }
};
</script>

<style lang="css" scoped>
.home {
  width: 100%;
  height: 100%;
}

#renderCanvas {
  width: 100%;
  height: 100%;
  touch-action: none;
}

.debug-container {
  position: absolute;
  top: 0;
  left: 0;
  padding: 1em;
  background: black;
  color: white;
}
</style>
