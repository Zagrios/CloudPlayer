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