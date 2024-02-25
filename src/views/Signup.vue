<template>
  <div class="container top-0 position-sticky z-index-sticky">
    <div class="row">
      <div class="col-12">
        <navbar isBtn="bg-gradient-light" />
      </div>
    </div>
  </div>
  <main class="main-content mt-0">
    <div
      class="page-header align-items-start min-vh-50 pt-5 pb-11 m-3 border-radius-lg"
      style="background-image: url('https://raw.githubusercontent.com/creativetimofficial/public-assets/master/argon-dashboard-pro/assets/img/signup-cover.jpg'); background-position: top;"
    >
      <span class="mask bg-gradient-dark opacity-6"></span>
      <div class="container">
        <div class="row justify-content-center">
            <h1 class="text-white mb-2 text-center" >Welcome to My TodoList App!</h1>
      
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row mt-lg-n10 mt-md-n11 mt-n10 justify-content-center">
        <div class="col-xl-4 col-lg-5 col-md-7 mx-auto">
          <div class="card z-index-0">
            <div class="card-header text-center pt-4">
              <h5>Register</h5>
            </div>
            <div class="card-body">
              <form role="form" @submit.prevent="registerr">
                <argon-input v-model="this.input.name" type="text" placeholder="Name" aria-label="Name" />
                <argon-input v-model="this.input.username" type="text" placeholder="Username" aria-label="Username" />
                <argon-input v-model="this.input.password" type="password" placeholder="Password" aria-label="Password" />
                
                <div class="text-center">
                  <argon-button 
                  type="submit"
                  fullWidth color="dark" 
                  variant="gradient" 
                  class="my-4 mb-2">Sign up</argon-button>
                </div>
                <p class="text-sm mt-3 mb-0">
                  Already have an account?
                  <router-link :to="{ name: 'Signin' }">
                    <a
                    href="javascript:;"
                    class="text-dark font-weight-bolder"
                  >Sign in</a>
                  </router-link>
                  
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import ArgonInput from "@/components/ArgonInput.vue";
import ArgonButton from "@/components/ArgonButton.vue";
const body = document.getElementsByTagName("body")[0];

import { mapActions } from "pinia";
import { d$auth } from "@/store/auth";

export default {
  name: "signup",
  components: {
    ArgonInput,
    ArgonButton,
  },
  data() {
    return {
      //input
      input: {
        name: "",
        email: "",
        password: "",
      },
    };
  },
  methods: {
    ...mapActions(d$auth, ["a$register"]),
    async registerr() {
      try {
        await this.a$register({ ...this.input });
        alert("Register Successfully");
        this.$router.push("signin");
      } catch (error) {
        console.error("method addlist error", error);
      }
    },
  },
  created() {
    this.$store.state.hideConfigButton = true;
    this.$store.state.showNavbar = false;
    this.$store.state.showSidenav = false;
    this.$store.state.showFooter = false;
    body.classList.remove("bg-gray-100");
  },
  beforeUnmount() {
    this.$store.state.hideConfigButton = false;
    this.$store.state.showNavbar = true;
    this.$store.state.showSidenav = true;
    this.$store.state.showFooter = true;
    body.classList.add("bg-gray-100");
  },
};
</script>
