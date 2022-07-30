import { createApp } from "vue";
import App from "./App.vue";
import { socket } from "@/api/socket";

const app = createApp(App);
app.use(socket);
app.mount("#app");
