import "./assets/main.css";
import { createApp } from "vue";
import App from "./App.vue";
import router from "./router/index.js";
import { createPinia } from "pinia";
import Echo from "laravel-echo";
import Pusher from "pusher-js";

window.Pusher = Pusher;

window.Echo = new Echo({
  broadcaster: "reverb",
  key: "9876543210",
  wsHost: "192.168.1.16",
  wsPort: 8080,
  wssPort: 8080,
  forceTLS: false,
  enabledTransports: ["ws"],
  disableStats: true,
});

window.Echo.channel("refresh-channel").listen("RefreshChannel", (event) => {
  console.log("Event received:", event);
  // this.refreshCount = event.refresh;
  window.location.reload();
});

window.Echo.channel("setting-update").listen("SettingChannel", (event) => {
  console.log("Event received:", event);
  // this.refreshCount = event.refresh;
  window.location.reload();
});

createApp(App).use(router).use(createPinia()).mount("#app");
