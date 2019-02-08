// breakpointsPlugin.js
const BREAKPOINTS = {
  MD_BP: 768
};

let Breakpoints = {};

Breakpoints.install = function(Vue, options) {
  Vue.prototype.$breakpoint = key => {
    return BREAKPOINTS[key];
  };
};

export default Breakpoints;
