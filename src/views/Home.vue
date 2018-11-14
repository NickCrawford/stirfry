<template>
  <div class="home" :class="{ 'show-cursor': showCursor }">
    <div id="scroll-container" @scroll="handleScroll">
      <div class="debug-container">
        <p>{{ selectedItems }}</p>
        <p>{{ isClick }}, {{ startingClickPoint }}</p>
      </div>
      <canvas id="renderCanvas"></canvas>
      
      <div id="overlay-view">
        <div id="heading-section">
          <h1>Startup Stirfry</h1>
          <h2>We create delicious designs</h2>
        </div>
        <div id="selection-section">
          <h3>Let's get cooking!</h3>
          <h4>Click on the ingredients you need for your project</h4>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="css" scoped>
.home {
  width: 100%;
  height: 100%;
  cursor: unset;

  overflow-y: auto;
}

#scroll-container {
  height: 100%;
  overflow-y: auto;
}

.home.show-cursor {
  cursor: pointer;
}

#renderCanvas {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  touch-action: none;
}

#overlay-view {
  position: relative;
  top: 0;
  left: 0;

  width: 100%;
  height: auto;

  pointer-events: none;
}

#heading-section {
  height: 50vh;
}

#selection-section {
  height: 100vh;
}

#heading-section *,
#selection-section * {
  pointer-events: auto;
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

<script>
// @ is an alias to /src
import "cannon";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";

let colors = {
  highlightColor: BABYLON.Color3.FromHexString("#FFFFFF"),
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

let materials = {
  blue: null,
  green: null,
  yellow: null,
  red: null,
  black: null
};

let cameraPosition1 = new BABYLON.Vector3(0, 15, -0.001),
  cameraPosition2 = new BABYLON.Vector3(0, 10, -15);

export default {
  name: "home",
  components: {},
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      cameraTargetPosition: null, // Where we want to camera to be in relation to the scroll
      currentMesh: null,
      assetsManager: null,
      hl: null,
      highlightedMesh: null,
      showCursor: false, // Show the cursor as a pointer
      isClick: false, // Helps determine if the user is clicking or dragging an object
      startingClickPoint: null,
      selectedItems: {
        pepper: false
      }, // The selected items a user has clicked on
      //World Objects
      veggies: {
        pepper: null
      }
    };
  },

  mounted() {
    this.initEngine();
    this.scene = this.initScene();
    this.initAssetsManager();
    this.initPan();
    this.initIngredients();
    this.initPointerEvents();
    this.initPhysicsGravityField();
    // this.handleScroll();

    // Init materials
    for (const mat in materials) {
      if (materials.hasOwnProperty(mat)) {
        const element = materials[mat];
        materials[mat] = new BABYLON.StandardMaterial(`${mat}`, this.scene);
        materials[mat].ambientColor = colors[mat];
      }
    }

    console.log(materials);

    // Can now change loading background color:
    this.engine.loadingUIBackgroundColor = "#F5D6BA";

    // Just call load to initiate the loading sequence
    this.assetsManager.load();

    this.assetsManager.onFinish = tasks => {
      this.engine.runRenderLoop(() => {
        this.handleDragging();
        this.scene.render();
      });
    };

    // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
    this.assetsManager.onTaskError = function(task) {
      console.log("error while loading " + task.name);
    };

    window.addEventListener("resize", () => {
      this.engine.resize();
    });
  },

  watch: {},
  methods: {
    handleScroll(e) {
      let scrollTop = 0;
      if (e) {
        scrollTop = e.target.scrollTop;
      }

      // Get height of overlay container
      let scrollContainer = document.getElementById("overlay-view");

      let totalAnimationFrames = 100;
      let progress =
        scrollTop / (window.innerHeight - scrollContainer.clientHeight);
      console.log("progress", progress);

      var alphaAnim = new BABYLON.Animation(
        "alphaAnim",
        "position",
        200,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      var betaAnim = new BABYLON.Animation(
        "betaAnim",
        "rotation",
        200,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      var alphaKeys = [
        { frame: 0, value: this.scene.activeCamera.position },
        { frame: totalAnimationFrames, value: cameraPosition2 }
      ];
      var betaKeys = [
        { frame: 0, value: this.scene.activeCamera.rotation },
        {
          frame: totalAnimationFrames,
          value: new BABYLON.Vector3(0.588002620078922, 0, 0)
        }
      ];

      alphaAnim.setKeys(alphaKeys);
      betaAnim.setKeys(betaKeys);

      this.scene.activeCamera.animations.push(alphaAnim);
      this.scene.activeCamera.animations.push(betaAnim);
      this.scene.beginAnimation(
        this.scene.activeCamera,
        0,
        totalAnimationFrames,
        false
      );

      // setTimeout(() => {
      //   console.log("moving camera");
      //   // this.camera.position = cameraPosition2;

      //   var animationPlane = new BABYLON.Animation(
      //     "anim",
      //     "position",
      //     30,
      //     BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
      //     BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      //   );
      //   var keys = [];
      //   keys.push({ frame: 0, value: this.camera.position });
      //   keys.push({ frame: 30, value: cameraPosition2 });
      //   animationPlane.setKeys(keys);
      //   this.camera.animations.push(animationPlane);
      //   this.scene.beginAnimation(this.camera, 0, 30, false);
      // }, 1000);
    },

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
      scene.clearColor = colors.blue;

      var camera = new BABYLON.FreeCamera("Camera", cameraPosition1, scene);
      // camera.attachControl(this.canvas, true);
      camera.setTarget(new BABYLON.Vector3(0, 0, 0));
      console.log(camera.rotation);

      // Highlight layer for selecting items
      let hl = new BABYLON.HighlightLayer("hl", scene);
      hl.innerGlow = false;
      hl.blurHorizontalSize = 2;
      hl.blurVerticalSize = 2;
      this.hl = hl;

      // Light direction is up and left
      // var light = new BABYLON.HemisphericLight(
      //   "hemiLight",
      //   new BABYLON.Vector3(-1, 1, 0),
      //   scene
      // );
      // light.diffuse = new BABYLON.Color3(0.5, 0.5, 0.5);
      // light.specular = new BABYLON.Color3(1, 1, 1);
      // light.groundColor = new BABYLON.Color3(1, 1, 1);

      // var light = new BABYLON.PointLight(
      //   "pointLight",
      //   new BABYLON.Vector3(1, 10, 1),
      //   scene
      // );

      // var light1 = new BABYLON.DirectionalLight(
      //   "dir02",
      //   new BABYLON.Vector3(0.2, -1, 0),
      //   scene
      // );
      // light1.position = new BABYLON.Vector3(0, 80, 0);

      // Material
      var materialAmiga = new BABYLON.StandardMaterial("amiga", scene);
      var materialAmiga2 = new BABYLON.StandardMaterial("amiga", scene);

      // Shadows
      // var shadowGenerator = new BABYLON.ShadowGenerator(2048, light);

      // Physics
      scene.enablePhysics();
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

      // Center indicator
      let centSph = BABYLON.Mesh.CreateSphere("SphereCenter", 8, 6, scene);
      let centSphMat = new BABYLON.StandardMaterial("centerMat", scene);
      centSphMat.ambientColor = colors.red;
      centSph.material = centSphMat;
      centSph.position = new BABYLON.Vector3(0, 0.5, 0);
      centSph.visibility = false;
      // Playground
      var groundWidth = 30, // X
        groundDepth = 20; // z

      var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
      ground.scaling = new BABYLON.Vector3(groundWidth, 1, groundDepth);
      ground.position.y = 0;
      ground.checkCollisions = true;

      var border0 = BABYLON.Mesh.CreateBox("border0", 1, scene);
      border0.scaling = new BABYLON.Vector3(1, 100, 100);
      border0.position.y = -5.0;
      border0.position.x = -groundWidth / 2;
      border0.checkCollisions = true;
      border0.alpha = 0;

      var border1 = BABYLON.Mesh.CreateBox("border1", 1, scene);
      border1.scaling = new BABYLON.Vector3(1, 100, 100);
      border1.position.y = -5.0;
      border1.position.x = groundWidth / 2;
      border1.checkCollisions = true;
      border1.alpha = 0;

      var border2 = BABYLON.Mesh.CreateBox("border2", 1, scene);
      border2.scaling = new BABYLON.Vector3(100, 100, 1);
      border2.position.y = -5.0;
      border2.position.z = groundDepth / 2;
      border2.checkCollisions = true;
      border2.alpha = 0;

      var border3 = BABYLON.Mesh.CreateBox("border3", 1, scene);
      border3.scaling = new BABYLON.Vector3(100, 100, 1);
      border3.position.y = -5.0;
      border3.position.z = -groundDepth / 2;
      border3.checkCollisions = true;
      border3.alpha = 0.1;

      var groundMat = new BABYLON.StandardMaterial("groundMat", scene);
      groundMat.ambientColor = colors.skin;
      groundMat.backFaceCulling = false;
      ground.material = groundMat;
      ground.receiveShadows = true;

      border0.visibility = false;
      border1.visibility = false;
      border2.visibility = false;
      border3.visibility = false;

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

    initAssetsManager() {
      this.assetsManager = new BABYLON.AssetsManager(this.scene);
      console.log("assets manager", this.assetsManager);
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
      if (evt.button !== 0) {
        // Make sure we're left clicking
        return;
      }

      // check if we are under a mesh
      var pickInfo = this.scene.pick(
        this.scene.pointerX,
        this.scene.pointerY,
        mesh => {
          return mesh == this.veggies.pepper; // Only let veggies be selected
        }
      );
      if (pickInfo.hit) {
        this.currentMesh = pickInfo.pickedMesh;
        this.hl.addMesh(this.currentMesh, colors.highlightColor);
      }

      //Determine if it'll be a click or drag; see more in onPointerMove
      this.isClick = true;
      this.startingClickPoint = new BABYLON.Vector2(
        this.scene.pointerX,
        this.scene.pointerY
      );
    },

    onPointerMove(evt) {
      // if the cursor moves far enough away from the starting point,
      //we need to determine that the user is dragging the object instead of clicking
      if (this.startingClickPoint) {
        let currentPoint = new BABYLON.Vector2(
          this.scene.pointerX,
          this.scene.pointerY
        ); // Set the current mouse point as a vector

        if (
          BABYLON.Vector2.Distance(currentPoint, this.startingClickPoint) > 25 // If the mouse has moved 25 pixles from where we originally moused down, we then know that the user is dragging
        ) {
          this.isClick = false;
        }
      }

      if (!this.currentMesh) {
        // check if we are under a mesh
        var pickInfo = this.scene.pick(
          this.scene.pointerX,
          this.scene.pointerY,
          mesh => {
            return mesh == this.veggies.pepper; // Only let veggies be selected
          }
        );
        if (pickInfo.hit && pickInfo.pickedMesh) {
          pickInfo.pickedMesh.outlineColor = colors.highlightColor;
          pickInfo.pickedMesh.outlineWidth = 0.04;
          pickInfo.pickedMesh.renderOutline = true;
          this.highlightedMesh = pickInfo.pickedMesh;
          this.showCursor = true;
        } else {
          if (this.highlightedMesh) {
            this.highlightedMesh.renderOutline = false;
            this.highlightedMesh = null;
            this.showCursor = false;
          }
        }

        return;
      }
    },

    onPointerUp(evt) {
      if (this.currentMesh && !this.isClick) {
        // If there is a selected mesh and the user is dragging (not just clicking the object)
        this.hl.removeMesh(this.currentMesh); // Remove the highlight from the object
        this.currentMesh = null;
      } else if (this.currentMesh && this.isClick) {
        // If clicking on the mesh...
        // Throw into pan
        this.throwObjectIntoPan(this.currentMesh);

        // Add to selected items
        this.addItemToList(this.currentMesh.name);

        // Remove from selection like normal
        this.hl.removeMesh(this.currentMesh); // Remove the highlight from the object
        this.currentMesh = null;
      }

      this.isClick = false;
      this.startingClickPoint = null;
    },

    addItemToList(itemName) {
      this.selectedItems[itemName] = true;
    },

    throwObjectIntoPan(babylonObject) {
      babylonObject.physicsImpostor.setLinearVelocity(
        new BABYLON.Vector3(10, 10, 10)
      );
    },

    handleDragging() {
      if (this.currentMesh && !this.isClick) {
        var pickResult = this.scene.pick(
          this.scene.pointerX,
          this.scene.pointerY,
          mesh => {
            return mesh.name != "border3";
          }
        );

        let pickedPoint = new BABYLON.Vector3(
          pickResult.pickedPoint.x,
          pickResult.pickedPoint.y,
          pickResult.pickedPoint.z
        );

        // if (pickedPoint.z > 0) {
        //   pickedPoint = pickedPoint.multiplyByFloats(1, pickedPoint.z / 2, 0.5);
        //   // pickedPoint.y = pickResult.pickedPoint.z / 2;
        // }
        // this.zScalar = pickedPoint.z / 3;

        this.currentMesh.physicsImpostor.setLinearVelocity(
          pickedPoint

            .subtract(
              new BABYLON.Vector3(
                this.currentMesh.position.x,
                this.currentMesh.position.y,
                this.currentMesh.position.z
              )
            )
            .multiplyByFloats(3, 3, 3)
        );
      }
    },

    initPan() {
      // Assets manager

      var meshTask = this.assetsManager.addMeshTask(
        "Pan Loading task",
        "",
        "./assets/models/",
        "pan.obj"
      );

      // You can handle success and error on a per-task basis (onSuccess, onError)
      meshTask.onSuccess = function(task) {
        // task.loadedMeshes.forEach(mesh => {
        //   mesh.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        //   mesh.position = new BABYLON.Vector3(0, 0.5, -3);
        // });

        console.log(
          "aM-loaded pan... task.loadedMeshes.length: ",
          task.loadedMeshes.length
        );
        let pan = task.loadedMeshes[1];
        let handle = task.loadedMeshes[0];
        handle.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);
        handle.position = new BABYLON.Vector3(0, 0.5, -3);

        // let pan = BABYLON.Mesh.MergeMeshes([...task.loadedMeshes[0]]);
        pan.position = new BABYLON.Vector3(0, 0.5, -3);
        pan.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

        pan.physicsImpostor = new BABYLON.PhysicsImpostor(
          pan,
          BABYLON.PhysicsImpostor.CylinderImpostor,
          {
            mass: 0,
            friction: 2,
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
    },

    initIngredients() {
      var veggieTask = this.assetsManager.addMeshTask(
        "Veggie Loading task",
        "",
        "./assets/models/",
        "pepper.obj"
      );

      // You can handle success and error on a per-task basis (onSuccess, onError)
      veggieTask.onSuccess = task => {
        console.log(
          "aM-loaded pepper... task.loadedMeshes.length: ",
          task.loadedMeshes.length
        );
        // let pan = task.loadedMeshes[0];
        let pepper = BABYLON.Mesh.MergeMeshes([...task.loadedMeshes]);
        pepper.position = new BABYLON.Vector3(0, 10, 0);
        // pepper.rotation = new BABYLON.Vector3(0, Math.PI / 2, 0);

        // task.loadedMeshes[0].material = pepperMat;

        pepper.physicsImpostor = new BABYLON.PhysicsImpostor(
          pepper,
          BABYLON.PhysicsImpostor.CylinderImpostor,
          { mass: 1, restitution: 0.2 },
          this.scene
        );

        this.veggies.pepper = pepper;

        // var pepperMat = new BABYLON.StandardMaterial("pepperMat", this.scene);
        // pepperMat.ambientColor = new BABYLON.Color3(0.64, 0.046113, 0.079105);
        // // panMat.backFaceCulling = false;
        pepper.material = materials.green;
      };
    },

    initPhysicsGravityField() {
      // Gravity field for ingredients in the pan
      var physicsViewer = new BABYLON.Debug.PhysicsViewer();
      var physicsHelper = new BABYLON.PhysicsHelper(this.scene);

      var origin = new BABYLON.Vector3(0, 0.5, 0);
      var radius = 4;
      var strength = 8;
      var falloff = BABYLON.PhysicsRadialImpulseFalloff.Linear; // or BABYLON.PhysicsRadialImpulseFalloff.Constant

      var gravitationalFieldEvent = physicsHelper.gravitationalField(
        origin,
        radius,
        strength,
        falloff
      );
      gravitationalFieldEvent.enable(); // need to call, if you want to activate the gravitational field.
    }
  }
};
</script>
