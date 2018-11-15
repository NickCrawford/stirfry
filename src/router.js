import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
<<<<<<< HEAD
import FourOhFour from "./views/FourOhFour.vue";
=======
import Portfolio from "./views/Portfolio.vue";
>>>>>>> master

Vue.use(Router);

export default new Router({
  mode: 'history',
  routes: [
    {
<<<<<<< HEAD
      path: "/home",
=======
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio
    },
    {
      path: "/",
>>>>>>> master
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/*",
      name: "404",
      component: FourOhFour
    }
  ]
});
