<template>
  <div class="about">
    <header-bar colorPalette="gray"/>
    <section id="about-header">
      <h2 style="font-weight:bold;">About</h2>
      <h1>Stirfry Design</h1>
      <p style="opacity:.5;font-style:italic;margin-top:-20px;margin-bottom:100px;">
        Who are we? And why do we like stirfry so much?
      </p>
    </section>
    <section class="bio-section">
      <div>
        <h2 class="outlined-header">Origin Story</h2>
        <p>
          Ben and Nick met at a hackathon at Kent State, and quickly became vicious rivals, competing ruthlessly to be better than the other at design & programming. 
        </p>
        <p>
          For the next 4 years, they worked together leading Hacksu, Kent State's programming club, and organizing KSU's hackathon.
        </p>
      </div>
      <div>
      
      </div>
    </section> 
  </div>
</template>

<script>
import HeaderBar from "@/components/HeaderBar.vue";
export default {
  components: { HeaderBar }
};
</script>


<style scoped lang="scss">
@import "@/GlobalVars.scss";

.about {
  padding-bottom: 300px;
}

#about-header {
  background: $black;
  margin-top: 30px;
  padding: 2rem 5vw;
  color: white;
  text-align: center;

}

section {
  width: 100%;
  margin: 0 auto;
  text-align: left;
}

.bio-section {
  width: 100%;
  padding: 2rem 5vw;
  max-width: 1040px;
  display: flex;
  justify-content:space-around;
  div {
    width: 48%;
    p {
      padding: 0px 5%;
      font-size: 20px;
    }
  }
}

.outlined-header {
  background: $black;
  font-weight: bold;
  color: #f5d6ba;
  font-size: 3rem;
  display: block;
  padding: 0rem 2rem;

}
</style>

