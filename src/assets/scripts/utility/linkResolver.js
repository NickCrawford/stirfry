// For Prismic
export default function(doc) {
  if (doc.isBroken) {
    return "/404";
  }

  // Used for single page types
  // if (doc.type === 'home') {
  //   return '/';
  // }

  if (doc.type === "project") {
    return "/portfolio/" + doc.uid;
  }

  return "/404";
}
