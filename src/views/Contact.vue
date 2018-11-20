<template>
  <div class="contact">
    <div class="contact-form">
      <h1>Let's get in touch</h1>
      <h3>We're really excited to work with you. We just need a few more details...</h3>
      <form
        name="client-interest-form"
        method="post"
        data-netlify="true"
        data-netlify-honeypot="bot-field"
        @submit.prevent="handleSubmit">
        <input type="hidden" name="form-name" value="client-interest-form" />
        <label class="stirfry-input">
          <span>Your Full Name:</span>
          <input type="text" name="clientName" v-model="form.clientName" placeholder="Tony Stark" required>
        </label>

        <label class="stirfry-input">
          <span>Your Email:</span>
          <input type="email" name="clientEmail" v-model="form.clientEmail" placeholder="tony@starkindustries.com" required>
        </label>

        <p class="section-label">Services Needed:</p>
        <label v-for="(service, key, index) in services" :key="index" class="checkbox">
          <input
            type="checkbox"
            name="service"
            :value="service"
            :checked="services[service]"
            v-model="services[key]"
          />
          <span>{{ key }}</span>
        </label>

        <label class="stirfry-input">
          <span>Leave Us a Note:</span>
          <textarea v-model="form.note" name="note" rows="4" placeholder="This is a good place to tell us a little about you and your project..."></textarea>
        </label>

        <input type="submit" class="stirfry-button" value="Submit »">
        
      </form>
    </div>

    <!-- <div class="ingredient-list">
      <h4>{{ this.form.clientName || 'My New'}} Project</h4>
      <ul>
        <li></li>
      </ul>
    </div> -->
    
  </div>
</template>

<script>
export default {
  name: "Contact",

  data() {
    return {
      form: {
        clientName: "",
        clientEmail: "",
        note: "",
        services: ""
      },
      services: {
        "Web Design & Development": false,
        "Branding & Creative Design": false,
        "iOS or Android Development": false,
        "Marketing Strategy": false,
        "Social Media Marketing": false,
        Other: false
      }
    };
  },

  computed: {
    servicesString() {
      return Object.keys(this.services)
        .map(key => {
          if (this.services[key]) return key;
        })
        .join(",");
    }
  },

  methods: {
    encode(data) {
      return Object.keys(data)
        .map(
          key => `${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`
        )
        .join("&");
    },

    handleSubmit() {
      this.form.services = this.servicesString;
      fetch("/", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: this.encode({
          "form-name": "client-interest-form",
          ...this.form
        })
      })
        .then(() => {
          this.$router.push("thanks");
        })
        .catch(() => {
          this.$router.push("404");
        });
    }
  }
};
</script>

<style lang='scss' scoped>
@import "~@/GlobalVars.scss";

.contact {
  position: relative;
  display: grid;
  grid-template-rows: auto;
  grid-template-columns: 1fr;
  align-items: start;

  padding: 2rem 5vw;
  min-height: 100vh;

  background: $skin;
}

.ingredient-list,
form {
  width: 100%;
  max-width: 520px;

  margin: 0 auto;
  padding: 0.25rem 1.5rem 0;

  background-color: white;
}

form {
  text-align: left;
}

.stirfry-button {
  width: 100%;
  margin-top: 1rem;
}

.stirfry-input input,
.stirfry-input textarea {
  width: 100%;
  max-width: 100%;
  padding: 0.5em 1em;
  font-size: 16px;
}

.section-label,
.stirfry-input span {
  display: block;
  font-size: 1.25em;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 1rem;
}

.checkbox {
  display: inline-block;
  width: 100%;
  height: 100%;
  padding: 0.5em 1em 0.5em 0;
  font-size: 1.25em;

  input[type="checkbox"] {
    margin-right: 1em;
  }

  cursor: pointer;
}
</style>
