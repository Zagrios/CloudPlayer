export const func = {
	createCookie: (name,value,days) =>{
		var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "")  + expires + "; path=/";
	},
	getCookie: (name) => {
		var nameEQ = name + "=";
		var ca = document.cookie.split(';');
		for(var i=0;i < ca.length;i++){
			var c = ca[i];
			while (c.charAt(0)==' ') c = c.substring(1,c.length);
			if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
		}
		return null;
	},
	arrayMove:(arr, fromIndex, toIndex) => {
		var el = arr[fromIndex];
		arr.splice(fromIndex, 1);
		arr.splice(toIndex, 0, el);
	},
	sortArrayBySearch:(arr, search) => {
		search = search.toLowerCase();
		var arrContain = Array();
		var arrNotContain = Array();
		const size = arr.length;
		for(var i = 0; i < size; i++){
			var el = arr[i];
			var contain = el.title.toLowerCase().includes(search) || el.filename.toLowerCase().includes(search) || el.album.toLowerCase().includes(search) || el.artist.toLowerCase().includes(search) || el.type.toLowerCase().includes(search);
			if(contain){ arrContain.push(el); }
			else{ arrNotContain.push(el); }
		}
		return [...arrContain, ...arrNotContain];
	},
	asignTrackToPlaylist:(tracks, playlist) => {
		if(!playlist){return;}
		if(!playlist.tracks){return;}
		if(playlist.tracks.length <= 0){return;}
        if(playlist.tracks[0].filename){return;}
		var len = playlist.tracks.length;
		var globalTracks = tracks;
		var globalLen = globalTracks.length;
        var finalTracks = Array();
		for(var i = 0; i < len; i++){
			var trackId = playlist.tracks[i];
			for(var j = 0; j < globalLen; j++){
				if(trackId == globalTracks[j].id){finalTracks.push(globalTracks[j])}
			}
		}
        playlist.tracks = finalTracks;
	},
	asignArtist: function(tracks){
		if(!tracks){return new Array()}
		if(tracks.length <= 0){return new Array()}
		var artists = new Array();
		tracks.forEach(track => {
			if(track.artist && track.artist != "")
			{
				var index = artists.map(e => e.name).indexOf(track.artist)
				if(index != -1){ artists[index].tracks.push(track); }
				else { var artist = {'name':track.artist, 'tracks':[track]}; artists.push(artist); }
			}
		})
		return artists;
	},
	asignAlbum:function(tracks){
		if(!tracks){return new Array()}
		if(tracks.length <= 0){return new Array()}
		var albums = new Array();
		tracks.forEach(track => {
			if(track.album && track.album != "")
			{
				var index = albums.map(e => e.name).indexOf(track.album);
				if(index != -1){ albums[index].tracks.push(track); }
				else { var album = {'name':track.album, 'tracks':[track]}; albums.push(album); }
			}
		})
		return albums;
	},

//#region Compare Functions	
	compare: (a, b, reverse = false) => {
		if(!reverse){
			if ( a < b ){ return -1; }
			if ( a > b ){ return 1; }
		}
		else{
			if ( a > b ){ return -1; }
			if ( a < b ){ return 1; }
		}
		return 0;
	},
	compareName:(a, b, reverse = false) => {
		var titleA = a.title && a.title != "" ? a.title : a.filename;
		var titleB = b.title && b.title != "" ? b.title : b.filename;
		return func.compare(titleA, titleB, reverse);
	},
	compareNameReverse:(a, b) => {return func.compareName(a, b, true)}
//#endregion

 }