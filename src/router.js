import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import FourOhFour from "./views/FourOhFour.vue";

import Portfolio from "./views/Portfolio/Portfolio.vue";
import SelloutTop from "./views/Portfolio/Sellout/SelloutTop.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/",
      redirect: "/home",
    },
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
      redirect: '/portfolio/sellout',
      children: [{
        path: 'sellout',
        components: {
          top: SelloutTop
        }
      }]
    },
    {
      path: "/home",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    { path: "/404", component: FourOhFour },
    { path: "*", redirect: "/404" }
  ]
});
