<template>
	<div id="track-list">
		<div id="wrapper">
			<trackItem v-for="(track) in this.tracks" v-bind:key="track.id" :track="track"></trackItem>
		</div>
	</div>
</template>

<script>
import trackItem from "./trackItem";

export default {
    name:'tracksList',
    props:{
        tracks:Object(),
        updateKey:Number,
    },
    components:{
        trackItem,
    }
}
</script>

<style lang='scss' scoped>

#track-list{
    width: 100%;
    max-height: calc(100% - 75px);
    height: calc(100% - 75px);
	overflow-y: scroll;
	#wrapper{
		width: 100%;
		display: flex;
		flex-direction: row;
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