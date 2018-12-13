<template>
  <div id="portfolio-page">
    <div class="space">Try to scroll down! :)</div>

    <section class="portfolio-container">
      <div class="flex-row">
        <div class="portfolio-text-container">
          <div class="text-content" id="itemA">
            <div class="text-content-inner">
              <div>
                <h1 class="heading">Nulla</h1>
                <p
                  class="description"
                >Nulla ac ultrices lectus. Nam lacinia elit sit amet turpis porttitor, in gravida purus consectetur. Praesent viverra nisl nec lobortis facilisis. Nunc nibh mi, tincidunt id tempor vel, aliquam eu urna.</p>
              </div>
            </div>
          </div>
          <div class="text-content" id="itemB">
            <div class="text-content-inner">
              <div>
                <h1 class="heading">Etiam</h1>
                <p
                  class="description"
                >Sed non eleifend orci. Etiam ut quam vitae ligula sagittis sagittis. Duis ac metus at elit convallis lobortis. In hac habitasse platea dictumst. Praesent vel ligula leo.</p>
              </div>
            </div>
          </div>
        </div>

        <div class="image-container">
          <div class="image-offset">
            <div class="portfolio-images">
              <div
                class="portfolio-image-animation"
                style="transform: translate(0%, -100%) matrix(1, 0, 0, 1, 0, 0);"
              ></div>
              <div class="portfolio-image" style="z-index: 1;">
                <img
                  src="https://uploads.codesandbox.io/uploads/user/41ceb113-e589-40de-ae64-60f07fc72bcc/1Y95-2.png"
                  class="img"
                  alt
                >
              </div>
              <div class="portfolio-image" style="z-index: 1;">
                <img
                  src="https://uploads.codesandbox.io/uploads/user/41ceb113-e589-40de-ae64-60f07fc72bcc/WpSi-3.png"
                  class="img"
                  alt
                >
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <div class="space">This is the end of our adventure</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      projects: [{}, {}, {}, {}]
    };
  },
  components: {},
  methods: {}
};
</script>

<style lang="scss">
</style>


<style lang="scss" scoped>
@import "@/GlobalVars.scss";

.portfolio-container {
  margin: 0 auto;
  position: relative;
}

.portfolio-navigation {
  position: absolute;
  top: 150px;
  bottom: 0;
  right: 70px;
  z-index: 2;
}

.navigation-buttons {
  display: none;
}

@media (min-width: 720px) {
  .navigation-buttons {
    display: flex;
    justify-content: flex-start;
    align-items: flex-end;
    flex-direction: column;
    position: sticky;
    top: 150px;
  }
}

.navigation-button {
  padding: 0;
  margin: 0;
  font-family: inherit;
  font-style: inherit;
  font-size: inherit;
  font-weight: inherit;
  line-height: inherit;
  vertical-align: baseline;
  border: 0;
  background: transparent;
  appearance: none;
  margin-bottom: 30px;
  cursor: pointer;
  transition: color 200ms ease-in-out;
}
.navigation-button:focus {
  outline: none;
}
.navigation-button.isActive {
  color: #ab80ff;
}

.flex-row {
  display: flex;
  flex-wrap: wrap;
  align-items: stretch;
  justify-content: flex-start;

  flex-direction: row;
}

.image-container {
  flex: none;
  align-self: stretch;
  // padding-left: 15px;
  // padding-right: 15px;
  width: calc(5 / 12 * 100%);
}

.image-offset {
  position: sticky;
  top: 0;
  height: 100vh;
  overflow: hidden;
}

.portfolio-images {
  position: relative;
  width: 100%;
  height: 100%;
}

.portfolio-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

.portfolio-image img {
  height: 100%;
  width: 100%;
  object-fit: cover;
}

.portfolio-image-animation {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: 3;
  background-color: #ab80ff;
  transform: translateY(-100%);
  will-change: transform;
}

.portfolio-text-container {
  flex: none;
  align-self: stretch;
  padding-left: 15px;
  padding-right: 15px;
  width: calc(7 / 12 * 100%);
}

.text-content {
  position: relative;
  min-height: 100vh;
}
@media (min-width: 720px) {
  .text-content {
    height: 100vh;
  }
}
.text-content-inner {
  position: absolute;
  bottom: 10vh;
  text-align: left;
}

/* For testing */
.space {
  display: flex;
  flex-direction: column;
  height: 400px;
  text-align: center;
  border-bottom: 1px solid red;
}
</style>
