import Vuex from 'vuex'

const store = Vuex.createStore({
	state: {
		token: null,
		username: null,
		isLoad: false,
		tracks:Array(),
		playlists:Array(),
		artists:Array(),
		albums:Array(),
		currentPlaylist: Array(),
		indexStartToPlay: 0,
	},
	mutations:{
		setTracks(state, tracks){ state.tracks = tracks; },
		setPlaylists(state, playlists){ state.playlists = playlists; },
		addPlaylist(state, playlist){ state.playlists.push(playlist); },
		updatePlaylist(state, playlist){
			var l = state.playlists.length;
			for(var i = 0; i < l; i++){ if(state.playlists[i].id == playlist.id){ state.playlists[i] = playlist; return; } }
		},
		setArtists(state, artists){ state.artists = artists; },
		setAlbums(state, albums){ state.albums = albums; },
		setCurrentPlaylist(state, payload){ state.currentPlaylist = payload.tracks; state.indexStartToPlay = payload.index;}
	},
	getters:{
		getCurrentPlaylist: state => {return state.currentPlaylist;},
		getIndexStartToPlay: state => {return state.indexStartToPlay;},
		getToken: state => {return state.token;},
		getUserName: state => {return state.username;},
		getTracks: state => {return state.tracks;},
		getPlaylists: state => {return state.playlists;},
		getArtists: state => {return state.artists;},
		getAlbums: state => {return state.albums;},
	},
});
export default store;
