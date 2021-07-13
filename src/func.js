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
	hash:function(s){
		return s.split("").reduce(function(a,b){a=((a<<5)-a)+b.charCodeAt(0);return a&a},0);
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
	shuffle:function(array){
		var currentIndex = array.length,  randomIndex;
		while (0 !== currentIndex) {
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex--;
			[array[currentIndex], array[randomIndex]] = [array[randomIndex], array[currentIndex]];
		}
		return array;
	},
	sortPlaylistBySearch:function(playlists, search){
		search = search.toLowerCase();
		var arrContain = Array();
		var arrNotContain = Array();
		search;
		playlists.forEach(playlist => {
			if(playlist.name.toLowerCase().includes(search)){arrContain.push(playlist);}
			else if(playlist.tracks && playlist.tracks.length > 0){
				var finded = false;
				for(var i = 0; i < playlist.tracks.length; i++){
					if(playlist.tracks[i].filename.toLowerCase().includes(search)){finded = true; break;}
				}
				if(finded){ arrContain.push(playlist); } else { arrNotContain.push(playlist); }
			}
			else{arrNotContain.push(playlist);}
		})
		return [...arrContain, ...arrNotContain];
	},

//#region Compare Functions	
	compare: (a, b, reverse = false) => {
		return reverse ? b.localeCompare(a) : a.localeCompare(b);
	},
	compareName:(a, b, reverse = false) => {
		var titleA = a.title && a.title != "" ? a.title : a.filename;
		var titleB = b.title && b.title != "" ? b.title : b.filename;
		return func.compare(titleA, titleB, reverse);
	},
	compareNameReverse:(a, b) => {return func.compareName(a, b, true)},

	comparePlaylist:(a, b, reverse = false) => {
		return func.compare(a.name, b.name, reverse);
	},
	comparePlaylistReverse:(a, b) => {return func.comparePlaylist(a, b, true)},
//#endregion

 }