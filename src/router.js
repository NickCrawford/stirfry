import Vue from "vue";
import Router from "vue-router";
import Home from "./views/Home.vue";
import About from "./views/About.vue";
import Contact from "./views/Contact.vue";
import SubmissionSuccess from "./views/SubmissionSuccess";
import FourOhFour from "./views/FourOhFour.vue";

import Portfolio from "./views/Portfolio/Portfolio.vue";
import SelloutTop from "./views/Portfolio/Sellout/SelloutTop.vue";
import TheronTop from "./views/Portfolio/Theron/TheronTop.vue";

Vue.use(Router);

export default new Router({
  mode: "history",
  routes: [
    {
      path: "/portfolio",
      name: "portfolio",
      component: Portfolio,
      redirect: "/portfolio/sellout",
      children: [
        {
          path: "sellout",
          name: "sellout",
          components: {
            top: SelloutTop
          }
        },
        {
          path: "theron",
          name: "theron",
          components: {
            top: TheronTop
          }
        }
      ]
    },
    {
      path: "/",
      name: "home",
      component: Home
    },
    {
      path: "/about",
      name: "about",
      component: About
    },
    {
      path: "/contact",
      name: "contact",
      component: Contact,
      props: true
    },
    {
      path: "/thanks",
      name: "success",
      component: SubmissionSuccess
    },
    { path: "/404", component: FourOhFour },
    { path: "*", redirect: "/404" }
  ]
});
