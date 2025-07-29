<template>
  <div>
    <Navbar />
    <router-view />
  </div>
</template>

<script>
import { Api } from "./api/api";
import Navbar from "./components/Navbar.vue";
import axios from "axios";
import { useAuthStore } from "./store/auth";

export default {
  name: "App",
  components: {
    Navbar,
  },
  data() {
    return {
      faviconUrl: "",
    };
  },
  async mounted() {
    try {
      const response = await Api.get("/api/get_settings");
      const data = JSON.parse(response.data.data.fields);

      const store = useAuthStore();

      store.setgeneralSettings(data);

      const appTitle = data["app_title"];

      document.title = appTitle;
      // console.log(response.data, "backend data");
      this.faviconUrl = response.data.data.favicon;
      this.setFavicon(this.faviconUrl);
    } catch (error) {}
  },
  methods: {
    setFavicon(faviconUrl) {
      let link = document.querySelector("link[rel~='icon']");
      if (!link) {
        link = document.createElement("link");
        link.rel = "icon";
        document.head.appendChild(link);
      }
      link.href = faviconUrl;
    },
  },
};
</script>
