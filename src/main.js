import { createApp } from 'vue';
import App from './App.vue'
import store from "./store"
import router from './routes'
import {func} from './func'
import mitt from 'mitt';
import VueLazyLoad from 'vue3-lazyload';


const app = createApp(App);
const EventBus = mitt();
app.use(router);
app.use(store);
app.use(VueLazyLoad);

app.config.globalProperties.$func = func;
app.config.globalProperties.EventBus = EventBus;

app.mount("#app");

