<template>
	<div id="playlist-list">
		<div id="wrapper">
			<playlistItem v-for="(playlist, index) in playlists" v-bind:key="index" :playlistP="playlist" v-on:openFolder="openFolder" @clickDeleteButton="clickDeleteButton" @download="download"></playlistItem>
		</div>
	</div>
</template>

<script>
import playlistItem from './playlistItem.vue';

export default {
    name:'playlistList',
    props:['playlists'],
    methods:{
      openFolder:function(playlist){
        this.$emit('openFolder', playlist);
      },
      clickDeleteButton:function(data){
        this.$emit('clickDeleteButton', data);
      },
      download:function(data){
        this.$emit('download', data);
      }
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