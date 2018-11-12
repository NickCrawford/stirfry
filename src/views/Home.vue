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
import "babylonjs-loaders";

let colors = {
  blue: BABYLON.Color3.FromHexString("#4281A4"),
  green: BABYLON.Color3.FromHexString("#48A9A6"),
  background: BABYLON.Color3.FromHexString("#D0CBC7"),
  ground: BABYLON.Color3.FromHexString("#E4DFDA"),
  yellow: BABYLON.Color3.FromHexString("#D4B483"),
  red: BABYLON.Color3.FromHexString("#C1666B"),
  lid: BABYLON.Color3.FromHexString("#B05D62"),
  skin: BABYLON.Color3.FromHexString("#F5D6BA"),
  black: BABYLON.Color3.FromHexString("#162129")
};

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

      scene.ambientColor = new BABYLON.Color3(1, 1, 1);
      scene.clearColor = BABYLON.Color3.White();

      var camera = new BABYLON.FreeCamera(
        "Camera",
        new BABYLON.Vector3(0, 10, -15),
        scene
      );
      camera.attachControl(this.canvas, true);
      camera.checkCollisions = true;
      camera.applyGravity = true;
      camera.setTarget(new BABYLON.Vector3(0, 0, 0));

      // Light direction is up and left
      // var light = new BABYLON.HemisphericLight(
      //   "hemiLight",
      //   new BABYLON.Vector3(-1, 1, 0),
      //   scene
      // );
      // light.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
      // light.specular = new BABYLON.Color3(1, 1, 1);
      // light.groundColor = new BABYLON.Color3(1, 1, 1);

      // var light = new BABYLON.DirectionalLight(
      //   "dir02",
      //   new BABYLON.Vector3(0.2, -1, 0),
      //   scene
      // );
      // light.position = new BABYLON.Vector3(0, 80, 0);

      // Material
      var materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
      var materialAmiga2 = new BABYLON.StandardMaterial("amiga", scene);

      // Shadows
      // var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

      // Physics
      scene.enablePhysics(null, new BABYLON.CannonJSPlugin());
      // scene.getPhysicsEngine().setTimeStep(1 / 200);
      // scene.autoClear = false; // Color buffer
      // scene.autoClearDepthAndStencil = false; // Depth and stencil, obviously

      // Spheres
      var y = 0;
      for (var index = 0; index < 10; index++) {
        var sphere = BABYLON.Mesh.CreateSphere("Sphere0", 8, 1, scene);
        sphere.material = materialAmiga;

        sphere.position = new BABYLON.Vector3(
          Math.random() * 20 - 10,
          y,
          Math.random() * 10 - 5
        );

        // shadowGenerator.addShadowCaster(sphere);

        sphere.physicsImpostor = new BABYLON.PhysicsImpostor(
          sphere,
          BABYLON.PhysicsImpostor.SphereImpostor,
          { mass: 1 },
          scene
        );

        y += 2;
      }

      // Playground
      var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
      ground.scaling = new BABYLON.Vector3(100, 1, 100);
      ground.position.y = 0;
      ground.checkCollisions = true;

      var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
      border0.scaling = new BABYLON.Vector3(1, 100, 100);
      border0.position.y = -5.0;
      border0.position.x = -50.0;
      border0.checkCollisions = true;
      border0.alpha = 0;

      var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
      border1.scaling = new BABYLON.Vector3(1, 100, 100);
      border1.position.y = -5.0;
      border1.position.x = 50.0;
      border1.checkCollisions = true;
      border1.alpha = 0;

      var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
      border2.scaling = new BABYLON.Vector3(100, 100, 1);
      border2.position.y = -5.0;
      border2.position.z = 50.0;
      border2.checkCollisions = true;
      border2.alpha = 0;

      var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
      border3.scaling = new BABYLON.Vector3(100, 100, 1);
      border3.position.y = -5.0;
      border3.position.z = -50.0;
      border3.checkCollisions = true;
      border3.alpha = 0.1;

      var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
      groundMat.ambientColor = colors.skin;
      groundMat.backFaceCulling = false;
      ground.material = groundMat;
      // border0.material = groundMat;
      // border1.material = groundMat;
      // border2.material = groundMat;
      // border3.material = groundMat;
      ground.receiveShadows = true;

      // Physics
      ground.physicsImpostor = new BABYLON.PhysicsImpostor(
        ground,
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0, friction: 0.9, restitution: 0.2 },
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

    initPan() {
      // Assets manager
      var assetsManager = new BABYLON.AssetsManager(this.scene);

      var meshTask = assetsManager.addMeshTask(
        "Pan Loading task",
        "",
        "./assets/models/",
        "pan.obj"
      );

      // You can handle success and error on a per-task basis (onSuccess, onError)
      meshTask.onSuccess = function(task) {
        // task.loadedMeshes.forEach(mesh => {
        //   mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        //   mesh.position = new BABYLON.Vector3(0, 1, -4);
        // });

        console.log(
          "aM-loaded pan... task.loadedMeshes.length: ",
          task.loadedMeshes.length
        );
        // let pan = task.loadedMeshes[0];
        let pan = BABYLON.Mesh.MergeMeshes([...task.loadedMeshes]);
        pan.position = new BABYLON.Vector3(0, 1, -4);
        pan.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

        pan.physicsImpostor = new BABYLON.PhysicsImpostor(
          pan,
          BABYLON.PhysicsImpostor.MeshImpostor,
          {
            mass: 0,
            friction: 1,
            restitution: 0.1
            // ignoreParent: true
            // disableBidirectionalTransformation: true
          },
          this.scene
        );

        var panMat = new BABYLON.StandardMaterial("panMat", this.scene);
        panMat.ambientColor = colors.black;
        panMat.backFaceCulling = false;
        pan.material = panMat;
      };

      // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
      assetsManager.onTaskError = function(task) {
        console.log("error while loading " + task.name);
      };

      // assetsManager.onFinish = (tasks) => {
      //   this.engine.runRenderLoop(function() {
      //     this.scene.render();
      //   });
      // };

      // Can now change loading background color:
      this.engine.loadingUIBackgroundColor = "#F5D6BA";

      // Just call load to initiate the loading sequence
      assetsManager.load();
    },

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
