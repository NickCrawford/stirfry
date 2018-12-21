import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PrismicVue from "prismic-vue";
import VueWaypoint from "vue-waypoint";

import Breakpoints from "./assets/scripts/utility/breakpointsPlugin.js";

Vue.use(Breakpoints);

Vue.config.productionTip = false;

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint
  // linkResolver: linkResolver
});

// Waypoint plugin
Vue.use(VueWaypoint);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount("#app");
