<template>
  <div
    class="collapse navbar-collapse w-auto h-auto h-100"
    id="sidenav-collapse-main"
  >
    <ul class="navbar-nav">
      <li class="nav-item">
        <sidenav-item
          url="/dashboard"
          :class="getRoute() === 'dashboard' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'لوحة القيادة' : 'Dashboard'"
        >
          <template v-slot:icon>
            <i class="ni ni-tv-2 text-primary text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/dashboard/todo"
          :class="getRoute() === 'tables' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'الجداول' : 'List Todo'"
        >
          <template v-slot:icon>
            <i
              class="ni ni-calendar-grid-58 text-warning text-sm opacity-10"
            ></i>
          </template>
        </sidenav-item>
      </li>
  
      <li class="mt-3 nav-item">
        <h6
          v-if="this.$store.state.isRTL"
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          صفحات المرافق
        </h6>
        <h6
          v-else
          class="text-xs ps-4 text-uppercase font-weight-bolder opacity-6"
          :class="this.$store.state.isRTL ? 'me-4' : 'ms-2'"
        >
          ACCOUNT PAGES
        </h6>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/profile"
          :class="getRoute() === 'profile' ? 'active' : ''"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Profile'"
        >
          <template v-slot:icon>
            <i class="ni ni-single-02 text-dark text-sm opacity-10"></i>
          </template>
        </sidenav-item>
      </li>
      <li class="nav-item">
        <sidenav-item
          url="/"
          @click="logout()"
          :navText="this.$store.state.isRTL ? 'حساب تعريفي' : 'Logout'"
        >
          <template v-slot:icon>
            <i class="ni ni-fat-remove text-warning text-sm opacity-10"></i>
          </template>
        </sidenav-item>
        
      </li>
    </ul>
  </div>
  
</template>
<script>
import SidenavItem from "./SidenavItem.vue";
import SidenavCard from "./SidenavCard.vue";
import { mapActions } from "pinia";
import { d$auth } from "@/store/auth";

export default {
  name: "SidenavList",
  props: {
    cardBg: String
  },
  data() {
    return {
      title: "My ToDo List App",
      controls: "dashboardsExamples",
      isActive: "active"
    };
  },
  components: {
    SidenavItem,
    SidenavCard
  },
  methods: {
    getRoute() {
      const routeArr = this.$route.path.split("/");
      return routeArr[1];
    },
    ...mapActions(d$auth, ["a$logout"]),
    logout() {
      try {
        if (confirm("Are you sure you want to leave?") == true) {
          this.a$logout();
          this.$router.go(this.$router.currentRoute); 
        } else {
          this.$router.replace(this.$router.currentRoute);
        }
      } catch (error) {
        console.log(error);
      }
    },
  },   
};
</script>
