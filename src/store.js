import Vuex from 'vuex'

const store = Vuex.createStore({
	state: {
		token: null,
		username: null,
		isLoad: false,
		currentPlaying: null,
		tracks:Array(),
		playlists:null,
	},
	mutations:{
		setTracks(state, tracks){
			state.tracks = tracks;
		},
	},
	getters:{
		getToken: state => {return state.token;},
		getUserName: state => {return state.username;},
		getTracks: state => {return state.tracks;},
		getPlaylists: state => {return state.playlists;},
	},
});
export default store;
