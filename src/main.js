import Vue from 'vue'
import App from './App.vue'
import store from "./store"
import VueRouter from "vue-router"
import routes from './routes'

Vue.config.productionTip = false

Vue.use(VueRouter)
const router = new VueRouter({
	routes: routes,
	mode: 'history',
})

new Vue({
	store:store,
	router:router,
	render: h => h(App),
}).$mount('#app')
