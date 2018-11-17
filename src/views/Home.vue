<template>
  <div class="home" :class="{ 'show-cursor': showCursor }">
    <div id="scroll-container" @scroll="handleScroll" tabindex="0">
      <div class="debug-container" v-if="false">
        <p>{{ selectedItems }}</p>
        <p>{{ scrollProgress }}</p>
      </div>
      <canvas id="renderCanvas"></canvas>
      
      <div id="overlay-view">
        <div id="heading-section" :class="{ 'hidden': scrollProgress >= 0.05 }">
          <img src="@/assets/img/stirfry-wordmark.svg" class="logo" :style="{ left: `${logoPosition.x}px`, top: `${logoPosition.y}px` }"/>
          <h2>We create delicious designs</h2>
        </div>
        <div id="selection-section" :class="{ hidden: scrollProgress <= 0.90 }">
          <h3>Let's get cooking!</h3>
          <h4>What ingredients do you need for your project?</h4>
          <p>(Add items to the pan by clicking on them)</p>
        </div>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  cursor: unset;
}

.home.show-cursor {
  cursor: pointer;
}

#scroll-container {
  width: 100%;
  height: 100%;
  overflow-y: scroll;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
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
  position: relative;
  height: 100%;
  min-height: 100vh;

  display: grid;
  grid-template-rows: 3fr 1fr;
  grid-template-columns: 1fr;

  align-items: center;

  color: #545454;
}

#heading-section .logo {
  position: absolute;
  /* transform: translate(77.5%, 44.6%); */
  transform: translate(-83.5%, -40%);

  width: auto;
  height: 7vh;
  margin: 0;
}

#heading-section h2 {
  position: relative;
  margin-top: 0;
  font-size: 3rem;

  grid-row-start: 2;
}

// Animations
#heading-section {
  .logo,
  h2 {
    transition: 0.2s opacity ease-out;
    opacity: 1;
  }

  h2 {
    transition-delay: 0.1s;
  }
}

#heading-section.hidden {
  .logo,
  h2 {
    opacity: 0;
  }
}

//
// Selection Section

#selection-section {
  display: grid;
  grid-template-rows: auto auto 1fr 1fr;
  grid-auto-columns: 1fr 1fr 1fr;

  justify-items: center;
  align-items: start;

  min-height: 100vh;
  /* padding-top: 4.5rem; */
}

#selection-section h3 {
  font-weight: 800;
}

#selection-section h4 {
  color: black;
  width: auto;
  display: inline-block;
}

#heading-section,
#selection-section {
  padding: 0 1rem;
}

#heading-section *,
#selection-section * {
  pointer-events: auto;
}

#selection-section {
  * {
    transition: 0.4s opacity ease, 0.8s transform ease;
    transform: translateY(0em);
    opacity: 1;
  }

  h4,
  p {
    transition-delay: 0.5s;
  }
}

#selection-section.hidden {
  * {
    opacity: 0;
    transform: translateY(0.5em);
  }

  h4,
  p {
    transition-delay: 0s;
  }
}

.debug-container {
  position: absolute;
  top: 2rem;
  left: 0;
  padding: 1em;
  background: black;
  color: white;
  z-index: 999;
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
  black: BABYLON.Color3.FromHexString("#545454")
};

let materials = {
  blue: null,
  green: null,
  yellow: null,
  red: null,
  black: null
};

// Define the camera positions for the animation
let cameraPosition1 = new BABYLON.Vector3(0, 22, -4.5),
  cameraPosition2 = new BABYLON.Vector3(0, 10, -15);

// Define the rotations
let cameraRotation1 = new BABYLON.Vector3(
    Math.PI / 2 - 0.00001,
    (-Math.PI * 3) / 8,
    0
  ),
  cameraRotation2 = new BABYLON.Vector3(0.588002620078922, 0, 0);

export default {
  name: "home",
  components: {},
  data() {
    return {
      canvas: null,
      engine: null,
      scene: null,
      cameraTargetPosition: null, // Where we want to camera to be in relation to the scroll
      currentMesh: null, // Currently selected mesh with mouse
      assetsManager: null, // Loads Babylon assets
      hl: null, // Highlight Layer
      highlightedMesh: null, // The current highlighted mesh (on hover)
      showCursor: false, // Show the cursor as a pointer
      isClick: false, // Helps determine if the user is clicking or dragging an object
      startingClickPoint: null, // Point where user started clicking/dragging
      selectedItems: {
        pepper: false
      }, // The selected items a user has clicked on
      currentScrollFrame: 0, // Used to determine which animation frame on the camera corresponds to the scroll position
      scrollProgress: 0, // progress (float between 0.00 and 1.00) at which we've scrolled through the overlay-view
      //World Objects
      veggies: {
        pepper: null
      },

      //Logo position
      logoPosition: {
        x: 0,
        y: 0
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

    // Init materials
    for (const mat in materials) {
      if (materials.hasOwnProperty(mat)) {
        const element = materials[mat];
        materials[mat] = new BABYLON.StandardMaterial(`${mat}`, this.scene);
        materials[mat].ambientColor = colors[mat];
      }
    }

    // Can now change loading background color:
    this.engine.loadingUIBackgroundColor = "#F5D6BA";

    // Just call load to initiate the loading sequence
    this.assetsManager.load();

    this.assetsManager.onFinish = tasks => {
      // These actions can only be handled after the scene has loaded
      this.initPhysicsGravityField();

      this.engine.runRenderLoop(() => {
        this.handleDragging();
        this.scene.render();
      });
    };

    // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
    this.assetsManager.onTaskError = function(task) {
      console.log("error while loading " + task.name);
    };

    this.scene.afterRender = () => {
      this.setLogoPosition(); // Find the position of the pan so we can transform the wordmark over it
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
      this.scrollProgress = Math.abs(
        scrollTop / (window.innerHeight - scrollContainer.clientHeight)
      ); // (Decimal) the progress at which we've scrolled through the overlay-view

      let targetScrollFrame = this.scrollProgress * 100; // The frame (integer) we want to go to based on scroll position

      if (targetScrollFrame > totalAnimationFrames) {
        targetScrollFrame = totalAnimationFrames;
      }

      var alphaAnim = new BABYLON.Animation(
        "alphaAnim",
        "position",
        100,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );
      var betaAnim = new BABYLON.Animation(
        "betaAnim",
        "rotation",
        100,
        BABYLON.Animation.ANIMATIONTYPE_VECTOR3,
        BABYLON.Animation.ANIMATIONLOOPMODE_CONSTANT
      );

      var alphaKeys = [
        { frame: 0, value: cameraPosition1 },
        { frame: totalAnimationFrames, value: cameraPosition2 }
      ];
      var betaKeys = [
        {
          frame: 0,
          value: cameraRotation1
        },
        {
          frame: totalAnimationFrames,
          value: cameraRotation2
        }
      ];

      alphaAnim.setKeys(alphaKeys);
      betaAnim.setKeys(betaKeys);

      this.scene.activeCamera.animations = [alphaAnim, betaAnim];

      this.scene.beginAnimation(
        this.scene.activeCamera,
        this.currentScrollFrame,
        targetScrollFrame,
        true, // Loop?
        1, // Speed ratio
        false, // onAnimationEnd,
        false, // animatable?
        true // Stop Current?
      );

      this.currentScrollFrame = targetScrollFrame;
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
      scene.clearColor = colors.skin;

      var camera = new BABYLON.UniversalCamera(
        "Camera",
        cameraPosition1,
        scene
      );
      //new BABYLON.FreeCamera("Camera", cameraPosition1, scene);
      // camera.attachControl(this.canvas, true);
      // camera.lockedTarget = new BABYLON.Vector3(0, 0, 0);
      camera.rotation.x = cameraRotation1.x;
      camera.rotation.y = cameraRotation1.y;

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

      // Center indicator
      let centSph = BABYLON.Mesh.CreateSphere("SphereCenter", 8, 6, scene);
      let centSphMat = new BABYLON.StandardMaterial("centerMat", scene);
      centSphMat.ambientColor = colors.red;
      centSph.material = centSphMat;
      centSph.position = new BABYLON.Vector3(0, 0.5, 0);
      centSph.visibility = false;
      // Playground
      var groundWidth = 30, // X
        groundDepth = 30; // z

      var ground = BABYLON.Mesh.CreateBox("Ground", 1, scene);
      ground.scaling = new BABYLON.Vector3(groundWidth, 1, groundDepth * 2);
      ground.position.y = 0;
      ground.position.z = -groundDepth / 2;
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
        handle.material = panMat;
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
        pepper.position = new BABYLON.Vector3(5, 10, 5);
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
    },

    setLogoPosition() {
      var p = BABYLON.Vector3.Project(
        new BABYLON.Vector3(0, 0.5, 0),
        BABYLON.Matrix.Identity(),
        this.scene.getTransformMatrix(),
        this.scene.activeCamera.viewport.toGlobal(this.engine)
      );
      let scrollContainer = document.getElementById("scroll-container");

      this.logoPosition.x = p.x;
      this.logoPosition.y = p.y + scrollContainer.scrollTop; // uncomment to lock in place
    }
  }
};
</script>
