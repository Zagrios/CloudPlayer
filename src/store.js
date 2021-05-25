import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = new Vuex.Store({
	state: {
		token: null,
		username: null,
		isLoad: false,
		currentPlaying: null,
		tracks:null,
	},
	getters:{
		getToken: state => {return state.token;},
		getUserName: state => {return state.username;},
		getTracks: state => {return state.tracks;},
	},
});
export default store;
