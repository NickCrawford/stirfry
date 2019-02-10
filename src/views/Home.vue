<template>
  <div class="home" :class="{ 'show-cursor': showCursor }">
    <header-bar :colorPalette="headerColorPalette"></header-bar>
    <div id="scroll-container">
      <canvas
        id="renderCanvas"
        :class="{
          'faded-canvas': scrollProgress >= scrollBreakPoint.about &&
                          scrollProgress <= scrollBreakPoint.selection        }"
      ></canvas>

      <!-- Hints users to continue scrolling -->
      <a class="scroll-indicator" href="#selection">
        <transition name="fade">
          <p
            v-if="scrollProgress >= scrollBreakPoint.headline && scrollProgress <= scrollBreakPoint.selection"
          >Keep scrolling</p>
        </transition>
        <transition name="fade">
          <div class="scroll-arrow" v-if="scrollProgress <= scrollBreakPoint.selection"></div>
        </transition>
      </a>

      <div id="overlay-view">
        <section id="headline" :class="{ 'hidden': scrollProgress >= scrollBreakPoint.headline }">
          <h1>
            <img
              src="@/assets/images/logos/logo-wordmark.svg"
              alt="Startup Stirfry"
              class="logo"
              :style="{ left: `${logoPosition.x}px`, top: `${logoPosition.y}px` }"
            >
          </h1>
          <h2>A creative agency &mdash; with taste.</h2>
        </section>

        <section id="about" :class="{ 'hidden': scrollProgress <= scrollBreakPoint.about  }">
          <div id="promo-text">
            <h1>Delicious Design</h1>

            <div class="subheader">
              <h4>
                Whether you’re a fresh entrepreneur or an established business,
                <b>your brand matters.</b>
              </h4>
              <h4 style="max-width:65%;">
                Our team will design with
                <b>your style,</b> whether it's a new look for your website, app, or promotional material.
              </h4>
              <router-link :to="{ name: 'portfolio' }" class="link-style">Check out our work here »</router-link>
            </div>

            <img
              src="/assets/home_assets/pepper_filled.svg"
              id="pepper-filled"
              :style="{
                  bottom: (scrollProgress * 100) - 80 + 'px'
                }"
            >
          </div>

          <div id="nerd-text">
            <h1>Tasty Tech</h1>

            <div class="subheader">
              <h4>
                Our team has plenty of experience coding
                <b>iOS and Android apps,</b> developing
                <b>responsive websites,</b> and more.
              </h4>

              <h4>Already using a specific tech stack? We'll learn it!</h4>
              <!--<router-link :to="{ name: 'about' }" class="link-style">Learn more about us »</router-link>-->
            </div>

            <img
              src="/assets/home_assets/carrots.svg"
              id="carrot"
              :style="{
                  bottom: (scrollProgress * 100) - 80 + 'px'
                }"
            >
          </div>
        </section>

        <section id="selection" :class="{ hidden: scrollProgress <= scrollBreakPoint.selection }">
          <h3 class="heading">Let's Get Cooking!</h3>
          <div class="prompt">
            <h4>What can we help you with?</h4>
            <!-- <p>(Add items to the pan by clicking on them)</p> -->
          </div>

          <!--
          <checkbox-item v-model="selectedItems.web">Web Design & Development</checkbox-item>
          <checkbox-item v-model="selectedItems.branding">Branding & Creative Design</checkbox-item>
          <checkbox-item v-model="selectedItems.app">iOS or Android Development</checkbox-item>
          <checkbox-item v-model="selectedItems.marketing">Marketing Strategy</checkbox-item>
          <checkbox-item v-model="selectedItems.social">Social Media Marketing</checkbox-item>
          <checkbox-item v-model="selectedItems.other">Something Else...</checkbox-item>
          -->
          <div id="checkbox-container">
            <ingredient-checkbox
              v-model="selectedItems.branding"
              :icon="'./assets/icons/pepper_icon.png'"
            >Branding & Creative Design</ingredient-checkbox>

            <ingredient-checkbox
              v-model="selectedItems.marketing"
              :icon="'./assets/icons/brocc_icon.png'"
              :marginTop="10"
            >Marketing & Social Media</ingredient-checkbox>

            <ingredient-checkbox
              v-model="selectedItems.web"
              :icon="'./assets/icons/tofu_icon.png'"
              :marginTop="-10"
            >Web Design & Development</ingredient-checkbox>

            <ingredient-checkbox
              v-model="selectedItems.app"
              :icon="'./assets/icons/carrot_icon.png'"
              :marginTop="-10"
            >iOS or Android Development</ingredient-checkbox>
          </div>

          <div class="finish-container">
            <transition name="fade" duration="800">
              <router-link
                :to="{ name: 'contact', params: { selectedItems: selectedItems }}"
                tag="button"
                class="stirfry-button"
                v-if="isItemSelected"
              >contact us »</router-link>
            </transition>
          </div>
        </section>
      </div>
    </div>
  </div>
</template>


<style lang="scss" scoped>
@import "~@/GlobalVars.scss";

.home {
  width: 100%;
  // height: 100%;
  cursor: unset;
}

.home.show-cursor {
  cursor: pointer;
}

#scroll-container {
  position: relative;
  width: 100%;
  // height: 100%;
  // overflow-y: visible;
  overflow-x: hidden;
  -webkit-overflow-scrolling: touch;
}

#scroll-container .scroll-indicator {
  position: fixed;
  bottom: 0;
  left: 50%;

  width: auto;

  margin: 0 auto;
  padding: 1em;

  text-align: center;

  z-index: 10;

  transform: translateX(-50%);

  cursor: pointer;
  text-decoration: none;
  color: black;
}

.scroll-indicator .scroll-arrow {
  margin: 0 auto;

  animation: hover-vertical 1s ease-in-out infinite;

  &:after {
    content: "";
    display: block;
    border: 2px solid black;
    border-left: none;
    border-top: none;
    transform: scaleY(0.66) rotate(45deg);
    width: 1.5em;
    height: 1.5em;
    margin: 0 auto;
  }
}

#renderCanvas {
  position: fixed;
  top: 0;
  left: 0;

  width: 100%;
  height: 100%;
  touch-action: none;

  transition-duration: 1s;
}

.faded-canvas {
  opacity: 0.5;
}

#overlay-view {
  position: relative;
  top: 0;
  left: 0;

  width: 100%;
  height: auto;
  pointer-events: none;
}

section {
  padding: 0 1rem;
}

section * {
  pointer-events: auto;
}

#headline {
  position: relative;
  height: 100%;
  min-height: 100vh;

  display: grid;
  grid-template-rows: 3fr auto;
  grid-template-columns: 1fr;

  align-items: center;

  color: $text-color;
}

#headline .logo {
  position: absolute;
  top: 50%;
  left: 50%;
  /* transform: translate(77.5%, 44.6%); */
  transform: translate(-55%, -130%);

  width: auto;
  height: 4.4vh;
  margin: 0;

  @media screen and (min-width: $md-bp) {
    height: 6.8vh;
  }
}

#headline h2 {
  position: relative;
  margin-top: 0;
  font-size: 2rem;

  grid-row-start: 2;
  background: $black;
  color: $skin;
  margin: 0px 1rem 2rem;

  @media screen and (min-width: $md-bp) {
    font-size: 3rem;
    margin: 0px 30vw 2rem;
    width: 40vw;
  }
}

// Animations
#headline {
  .logo,
  h2 {
    transition: 0.2s opacity ease-out;
    opacity: 1;
    pointer-events: all;
  }

  h2 {
    transition-delay: 0.1s;
  }
}

#headline.hidden {
  .logo,
  h2 {
    opacity: 0;
    pointer-events: none;
  }
}

#promo-text {
  max-width: 700px;
  background: $lid;
  padding: 50px;
  grid-row: 1/2;
  color: white;
  .link-style {
    color: white;
  }
  @media screen and (min-width: $md-bp) {
    grid-column: 1/4;
  }
}

#nerd-text {
  width: 100%;
  max-width: 700px;
  background: $green;
  padding: 50px;
  color: white;
  grid-row: 2/3;

  .link-style {
    color: white;
  }
  @media screen and (min-width: $md-bp) {
    grid-column: 3/6;
  }
}

//
// Selection Section

#selection {
  display: grid;
  grid-template-areas:
    "heading"
    "prompt"
    "option1"
    "option2"
    "option3"
    "option4"
    "option5"
    "option6"
    "finish";
  grid-template-rows: auto;
  grid-template-columns: 1fr;

  justify-items: center;
  align-items: start;

  min-height: 100vh;
  padding: 4rem 5vw 5vh;

  @media screen and (min-width: $md-bp) {
    grid-template-areas:
      "heading heading heading"
      "prompt prompt prompt"
      "option1 pan option2"
      "option3 pan option4"
      "finish finish finish";
    grid-template-rows: auto auto 1fr 1fr 1fr;
    grid-template-columns: 1fr 1fr 1fr;

    align-items: center;
  }
}

#checkbox-container {
  grid-area: finish;

  display: grid;
  grid-template-rows: 1fr 1fr 1fr 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 20px;

  @media screen and (min-width: $md-bp) {
    grid-template-rows: 1fr 1fr;
    grid-template-columns: 1fr 1fr;
    grid-column-gap: 300px;
  }

  align-self: top;
}

#selection h3 {
  grid-area: heading;
}

#selection .prompt {
  grid-area: prompt;
}

#selection .finish-container {
  grid-area: finish;
  align-self: end;

  animation: hover-vertical 1.8s ease-in-out infinite;
}

#selection h4 {
  color: black;
  width: auto;
  display: inline-block;
}

@for $i from 1 through 6 {
  .checkbox-item:nth-of-type(#{$i}) {
    grid-area: option + $i;
  }
}

#selection {
  * {
    transition: 0.4s opacity ease, 0.8s transform ease;
    transform: translateY(0em);
    opacity: 1;
  }

  .heading,
  .prompt {
    transition-delay: 0.5s;
  }

  @for $i from 1 through 6 {
    .checkbox-item:nth-of-type(#{$i}) {
      transition-delay: 0.5s + ((($i + 1) % 2) / 10 + ($i / 10)) / 2;
      // This looks crazy, but its simply a way for us to fluidly animation the list items from top left to bottom right
    }
  }
}

#selection.hidden {
  * {
    opacity: 0;
    transform: translateY(0.5em);
  }

  .heading,
  .prompt,
  .checkbox-item {
    transition-delay: 0s;
  }
}

//
// About Section
#about {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr;
  grid-row-gap: 8rem;
  justify-items: start;
  align-content: start;

  min-height: 100vh;

  text-align: left;
  color: $text-color;

  padding: 0 5vw;

  font-size: 0.75em;

  @media screen and (min-width: $md-bp) {
    grid-template-columns: 1fr 1fr 1fr 1fr 1fr;

    font-size: unset;
  }
}

#about h1 {
  margin-bottom: 0;
}

#about .subheader {
  grid-column-start: 1;
}

// Animations
#about {
  * {
    transition: 0.4s opacity ease, 0.8s transform ease;
    transform: translateY(0em);
    opacity: 1;
  }
}

#about.hidden {
  * {
    opacity: 0;
    transform: translateY(0.5em);
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

#pepper-filled {
  width: 30%;
  position: absolute;
  right: 20px;
}
#carrot {
  width: 30%;
  position: absolute;
  right: 20px;
}

@keyframes wipein {
  from {
    min-height: 0px;
  }
}
</style>

<script>
// @ is an alias to /src
import "cannon";
import * as BABYLON from "babylonjs";
import "babylonjs-loaders";
import HeaderBar from "@/components/HeaderBar";

import IngredientCheckbox from "@/components/shared/IngredientCheckbox";

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
let cameraPosition1 = new BABYLON.Vector3(0, 20, 0),
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
  components: { IngredientCheckbox, HeaderBar },
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
      currentScrollFrame: 0, // Used to determine which animation frame on the camera corresponds to the scroll position
      scrollProgress: 0, // progress (float between 0.00 and 1.00) at which we've scrolled through the overlay-view
      //World Objects
      veggies: {
        pepper: null
      },

      // Clickable, draggable objects:
      ingredients: {
        redPepper: null,
        greenPepper: null,
        tofu1: null,
        tofu2: null,
        tofu3: null,
        tofu4: null
      },

      // Immobile objects
      staticObjects: {
        table: null,
        backWall: null
      },

      //// The selected items/services a user has clicked on
      selectedItems: {
        web: false,
        branding: false,
        app: false,
        marketing: false,
        social: false,
        other: false
      },
      itemsLoaded: false, // Keeps track of whether we've added items yet

      //Logo position
      logoPosition: {
        x: 0,
        y: 0
      },

      // Scrolling breakpoints used in HTML Template
      scrollBreakPoint: {
        headline: 0.05,
        about: 0.2,
        selection: 0.9
      },

      headerColorPalette: "transparent"
    };
  },

  computed: {
    // Checks to see if any checkboxes have be selected
    isItemSelected() {
      for (const item in this.selectedItems) {
        if (this.selectedItems.hasOwnProperty(item)) {
          const value = this.selectedItems[item];
          if (value) return true;
        }
      }

      return false;
    }
  },

  mounted() {
    if (window.navigator.userAgent.includes("Headless")) {
      return;
    }

    this.initEngine(); // Loads canvas & render engine
    this.initScene(); // Loads assets, calls other functions on completion

    // Loading background color: Disabled for now
    this.engine.loadingUIBackgroundColor = "#F5D6BA";
    this.engine.hideLoadingUI();

    // Add event listeners for determining scroll position and logo positioning
    window.addEventListener("resize", e => {
      this.engine.resize();
      this.handleMobileCameraView(window.innerWidth);
    });
    this.handleMobileCameraView(window.innerWidth);

    window.addEventListener("scroll", this.handleScroll);

    // this.initAssetsManager();
    // this.initPan();
    //this.initIngredients(); // TODO: Uncomment when we readd ingredients

    // this.initPointerEvents(); // Done in initScene() now
    // this.handleMobileCameraView(window.innerWidth);
    /*
    // Just call load to initiate the loading sequence
    this.assetsManager.load();

    this.assetsManager.onFinish = tasks => {
      // These actions can only be handled after the scene has loaded
      // this.initPhysicsGravityField();  // TODO: Uncomment when we readd ingredients

      this.engine.runRenderLoop(() => {
        // this.handleDragging();  // TODO: Uncomment when we readd ingredients
        this.scene.render();
        this.setLogoPosition(); // Find the position of the pan so we can transform the wordmark over it
      });
    }; 

    // But you can also do it on the assets manager itself (onTaskSuccess, onTaskError)
    this.assetsManager.onTaskError = function(task) {
      console.log("error while loading " + task.name);
    };*/
  },
  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
    window.removeEventListener("resize", () => {});
  },

  watch: {},
  methods: {
    handleMobileCameraView(windowWidth) {
      // Adjust for mobile sized screens
      if (windowWidth < 768) {
        cameraPosition1.y = 35;
      } else {
        cameraPosition1.y = 22;
      }
    },

    handleScroll(e) {
      let scrollTop =
        document.documentElement.scrollTop || document.body.scrollTop;
      // if (e) {
      //   scrollTop = e.target.scrollTop;
      // }

      // Get height of overlay container
      let scrollContainer = document.getElementById("overlay-view");

      let totalAnimationFrames = 100;
      this.scrollProgress = Math.abs(
        scrollTop / (window.innerHeight - scrollContainer.clientHeight)
      ); // (Decimal) the progress at which we've scrolled through the overlay-view

      // Changes header color palette depending on where we are on the page
      if (this.scrollProgress <= 0.2) {
        this.headerColorPalette = "transparent";
      } else if (this.scrollProgress > 0.2) {
        this.headerColorPalette = "gray";
      }

      // Loading in items, if relevant:
      if (this.scrollProgress >= 0.9 && !this.itemsLoaded) {
        // this.initItems(); // Uncomment this to load items!
      }

      if (!this.scene) return; // If the camera hasn't loaded yet, we dont need to worry about the stuff below.

      let targetScrollFrame = this.scrollProgress * 100; // The frame (integer) we want to go to based on scroll position

      if (targetScrollFrame >= totalAnimationFrames) {
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
      const startTime = performance.now();

      // Get the canvas DOM element
      this.canvas = document.getElementById("renderCanvas");

      //
      this.assetsManager = new BABYLON.AssetsManager(this.scene);

      // Load the 3d engine
      this.engine = new BABYLON.Engine(this.canvas, true, {
        preserveDrawingBuffer: true,
        stencil: true
      });

      const duration = performance.now() - startTime;
      console.log(`initEngine took ${duration}ms`);
    },

    initScene() {
      const startTime = performance.now();
      var vm = this; // This is important! Using `this` in the following callback function won't work,
      // use `vm` instead.
      //   <link
      //   rel="prefetch"
      //   href="<%= BASE_URL %>assets/models/pan_scene/pan_scene.babylon"
      // />
      // here the doc for Load function: http://doc.babylonjs.com/api/classes/babylon.sceneloader#load
      // BABYLON.SceneLoader.loggingLevel = BABYLON.SceneLoader.detailed_logging;
      BABYLON.SceneLoader.Load(
        "./assets/models/pan_scene/",
        "pan_scene.babylon",
        this.engine,
        function(scene) {
          vm.scene = scene;

          var camera = scene.activeCamera; // Fetching camera from our blender file

          //camera.attachControl(vm.canvas, false); // Allows user to move camera with mouse

          vm.scene.clearColor = colors.skin; // Scene bg color
          vm.scene.ambientColor = new BABYLON.Color3(1, 1, 1); // Makes our flat colors appear brightly
          vm.scene.autoClear = false; // Color buffer

          vm.engine.runRenderLoop(function() {
            scene.render();
            vm.setLogoPosition();
          });

          // Highlight layer for selecting items
          // let hl = new BABYLON.HighlightLayer("hl", vm.scene);
          // hl.innerGlow = false;
          // hl.blurHorizontalSize = 2;
          // hl.blurVerticalSize = 2;
          // vm.hl = hl;

          // Physics
          // vm.scene.enablePhysics();

          // Let's add physics properties to all our objects!

          // const ingredientIds = [
          //   'redPepper',
          //   'greenPepper',
          //   'tofu1',
          //   'tofu2',
          //   'tofu3',
          //   'tofu4',
          // ];

          // for (var id in ingredientIds) {
          //   vm.addIngredientPhysics(ingredientIds[id]);
          // }

          // const staticObjectIds = [
          //   'table',
          //   'backWall',
          //   'pan',
          //   'cuttingBoard',
          // ];
          // vm.addStaticPhysics('table');
          // vm.addStaticPhysics('backWall');
          // vm.addStaticPhysics('pan');
          // vm.addStaticPhysics('cuttingBoard');

          // Adding ability to select things
          // vm.initPointerEvents();

          // scene.debugLayer.show({
          //   overlay: false,
          //   globalRoot: document.getElementById("#babylonDebugger")
          // });

          // setting up scroll handler
          // vm.handleScroll(0);
        },
        vm.updateSceneProgress
      );

      const duration = performance.now() - startTime;
      console.log(`initScene took ${duration}ms`);

      return;

      // let scene = new BABYLON.Scene(this.engine);

      // scene.ambientColor = new BABYLON.Color3(1, 1, 1);
      // scene.clearColor = colors.skin;

      // var camera = new BABYLON.UniversalCamera(
      //   "Camera",
      //   cameraPosition1,
      //   scene
      // );
      //new BABYLON.FreeCamera("Camera", cameraPosition1, scene);
      // camera.attachControl(this.canvas, true);
      // camera.lockedTarget = new BABYLON.Vector3(0, 0, 0);
      // camera.rotation.x = cameraRotation1.x;
      // camera.rotation.y = cameraRotation1.y;

      // Light direction is up and left
      // var light = new BABYLON.HemisphericLight(
      //   "hemiLight",
      //   new BABYLON.Vector3(-1, 1, 0),
      //   scene
      // );
      // light.diffuse = new BABYLON.Color3(0.5, 0, 0.5);
      // light.specular = new BABYLON.Color3(0.5, 0.5, 0.5);
      // light.groundColor = new BABYLON.Color3(0.5, 0.5, 0.5);

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

    updateSceneProgress(progress) {
      console.log("progress", progress);
      document.querySelector(
        "#stirfry-loading-indicator .progress"
      ).style.width = `${(progress.loaded / 21256177) * 100}%`;
    },

    initItems() {
      this.itemsLoaded = true;

      this.assetsManager.useDefaultLoadingScreen = false;
      this.engine.hideLoadingUI();

      console.log("err here?");
      var vm = this;
      setTimeout(() => {
        BABYLON.SceneLoader.Append(
          "./assets/models/pan_scene/",
          "pan_scene_items.babylon",
          this.scene,
          function(scene) {
            console.log("here?");
            vm.scene.ambientColor = new BABYLON.Color3(1, 1, 1); // Makes our flat colors appear brightly
          }
        );
      }, 300);
    },

    // Adds physics to an ingredient. This will allow the user to select the ingredient
    // and move it around!
    addIngredientPhysics(id) {
      this.ingredients[id] = this.scene.getMeshByID(id);

      this.ingredients[id].physicsImpostor = new BABYLON.PhysicsImpostor(
        this.ingredients[id],
        BABYLON.PhysicsImpostor.CylinderImpostor,
        { mass: 1, restitution: 0.2 },
        this.scene
      );
    },

    // Adds solid, static physics to an object
    addStaticPhysics(id) {
      this.staticObjects[id] = this.scene.getMeshByID(id);

      this.staticObjects[id].physicsImpostor = new BABYLON.PhysicsImpostor(
        this.staticObjects[id],
        BABYLON.PhysicsImpostor.BoxImpostor,
        { mass: 0 },
        this.scene
      );
    },

    // No longer used!
    initAssetsManager() {
      this.assetsManager = new BABYLON.AssetsManager(this.scene);
      this.engine.loadingUIText = "Loading Startup Stirfry...";
      // this.assetsManager.useDefaultLoadingScreen = false;
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
          // Only lets us select from our ingredients
          for (var index in this.ingredients) {
            if (mesh == this.ingredients[index]) {
              return true;
            }
          }
          return false;
        }
      );
      if (pickInfo.hit) {
        this.currentMesh = pickInfo.pickedMesh;
        console.log(this.currentMesh);
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
      // we need to determine that the user is dragging the object instead of clicking
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
            // Only lets us select from our ingredients
            for (var index in this.ingredients) {
              if (mesh == this.ingredients[index]) {
                return true;
              }
            }
            return false;
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

    // No longer used!
    initIngredients() {
      // BABYLON.SceneLoader.Append(
      //   "./assets/models/",
      //   "pepper.babylon",
      //   this.scene,
      //   scene => {
      //     console.log("Found!");
      //   }
      // );

      //       BABYLON.SceneLoader.Append("./", "duck.gltf", scene, function (scene) {
      //     // do something with the scene
      // });

      var pepperTask = this.assetsManager.addMeshTask(
        "Pepper task",
        "",
        "./assets/models/",
        "pepper.babylon"
      );

      // You can handle success and error on a per-task basis (onSuccess, onError)
      pepperTask.onSuccess = task => {
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

        var simpleMaterial = new BABYLON.StandardMaterial(
          "texture2",
          this.scene
        );

        // simpleMaterial.diffuseColor = new BABYLON.Color3(0, 1, 0); //Green
        // pepper.material = simpleMaterial;

        // var pepperMat = new BABYLON.StandardMaterial("pepperMat", this.scene);
        // pepperMat.ambientColor = new BABYLON.Color3(0.64, 0.046113, 0.079105);
        // // panMat.backFaceCulling = false;
        // pepper.material = materials.green;
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
      let scrollContainer = document.getElementById("scroll-container"); //document.documentElement.scrollTop || document.body.scrollTop;

      if (scrollContainer) {
        this.logoPosition.x = p.x;
        this.logoPosition.y = p.y + scrollContainer.scrollTop; // uncomment to lock in place
      }
    }
  }
};
</script>
