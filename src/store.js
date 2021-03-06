import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: null,
		username: null,
		isLoad: false,
		currentPlaying: null,
	},
	getters:{
		getToken: state => {return state.token;},
		getUserName: state => {return state.username;},
	},
});
export default store;
