import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import PrismicVue from "prismic-vue";
import VueWaypoint from "vue-waypoint";

import Breakpoints from "./assets/scripts/utility/breakpointsPlugin.js";
import linkResolver from "./assets/scripts/utility/linkResolver.js";

const accessToken =
  "MC5YRV9iVHhBQUFDRUFQV1RO.LH5q77-9Qu-_vT3vv73vv73vv70s77-977-9L1AU77-9PO-_vQfvv73vv73vv71vVkDvv73vv73vv73vv73vv70j";

Vue.use(Breakpoints);

Vue.config.productionTip = false;

Vue.use(PrismicVue, {
  endpoint: window.prismic.endpoint,
  linkResolver: linkResolver,
  apiOptions: { accessToken }
});

// Waypoint plugin
Vue.use(VueWaypoint);

new Vue({
  el: "#app",
  router,
  render: h => h(App)
}).$mount("#app");
