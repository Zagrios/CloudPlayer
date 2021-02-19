import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: "AABA",
	},
	getters:{
		getToken: state => {return state.token;},
	},
});
export default store;
