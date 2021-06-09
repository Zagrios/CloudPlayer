import Vuex from 'vuex'

const store = Vuex.createStore({
	state: {
		token: null,
		username: null,
		isLoad: false,
		currentPlaying: null,
		tracks:Array(),
		playlists:Array(),
	},
	mutations:{
		setTracks(state, tracks){ state.tracks = tracks; },
		setPlaylists(state, playlists){ state.playlists = playlists; },
		addPlaylist(state, playlist){ state.playlists.push(playlist); },
		updatePlaylist(state, playlist){
			var l = state.playlists.length;
			for(var i = 0; i < l; i++){ if(state.playlists[i].id == playlist.id){ state.playlists[i] = playlist; return; } }
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
