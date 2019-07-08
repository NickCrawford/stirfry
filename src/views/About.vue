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
      <div class="image-holder">
        <img src="@/assets/images/about_page/nick_profile.png">
        <div class="image-caption">
          Nick Crawford has always had a passion for design.  Favorite activities include coming up with creative, ambitious ideas, and following through with them.
        </div>
      </div>
    </section> 

    <section class="bio-section reverse-order">
      <div class="image-holder">
        <img src="@/assets/images/about_page/ben_profile.png" style="max-height:  300px">
        <div class="image-caption">
          Ben Holland plays drums and is obsessed with numbers and patterns. Oh, and Super Mario 64. Best game ever. 
        </div>
      </div>
      <div >
        <p>
          After several successful projects, they finally realized how powerful they would be if they teamed up.
        </p>

        <p>
          In 2018, they decided to go freelance, helping companies in their community with design, marketing, and development. So they founded Startup Stirfry. 
        </p>
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
  margin-top: 100px;
  padding: 2rem 5vw;
  max-width: 1040px;
  display: flex;
  flex-flow: row wrap;
  justify-content:space-around;
  div {
    width: 48%;
    min-width: 350px;
    p {
      padding: 0px 5%;
      font-size: 20px;
    }
    img {
      width: 100%;
      max-width: 300px;
      display: block;
      
    }
  }
}
/* Ensures the right frame will go first on a mobile browser */
.reverse-order {
  @media screen and (max-width: 900px) {
    .image-holder {
      order: 3;
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
  margin-top: 0px;

}

.image-holder {
  display: flex;
  flex-direction: column;
  align-items: center;
  align-items: flex-start;
  div {
    background: $black;
    margin-top: 30px;
    padding: 1rem;
    color: $skin;
        align-self: center;

  }
  img {
    align-self: center;
    max-height: 350px;
  }
}
</style>

