<template>
	<div id="playlist-list">
		<div id="wrapper">
			<playlistItem v-for="(playlist) in playlists" v-bind:key="playlist.id" :playlistP="playlist" v-on:openFolder="openPlaylist"></playlistItem>
		</div>
	</div>
</template>

<script>
import playlistItem from './playlistItem.vue';

export default {
    name:'playlistList',
    props:['playlists'],
    methods:{
      openPlaylist:function(playlist){
        this.$router.push("/home/playlists/"+playlist.name);
      },
    },
    components:{
        playlistItem,
    },
}
</script>

<style lang='scss' scoped>

#playlist-list{
    width: 100%;
    max-height: calc(100% - 75px);
    height: calc(100% - 75px);
    overflow-y: scroll;
	#wrapper{
		width: fit-content;
		display: flex;
		flex-flow: row wrap;
		overflow-x: hidden;
	}
}

/* #region scrollbar*/

::-webkit-scrollbar {
  width: 8px;
}

::-webkit-scrollbar-track {
  background: #838383;
  border: solid black 0;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb {
  background: rgb(75, 75, 75);
  border: solid black 0;
  border-radius: 20px;
}

::-webkit-scrollbar-thumb:hover {
  background: #555;
}

/* #endregion */

</style>