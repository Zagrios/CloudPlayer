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
		playlists:null,
	},
	getters:{
		getToken: state => {return state.token;},
		getUserName: state => {return state.username;},
		getTracks: state => {return state.tracks;},
		getPlaylists: state => {return state.playlists;},
	},
});
export default store;
