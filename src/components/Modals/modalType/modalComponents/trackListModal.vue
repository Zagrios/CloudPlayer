<template>
	<span>{{title}}</span>
	<div class="tracks-list">
		<trackItemModal v-for="(track) in tracks" :key="track.id" :trackP="track" v-on:clickTrack="listener" :selectedP="track.id == preselectId"></trackItemModal>
	</div>
</template>

<script>
import trackItemModal from './trackItemModal.vue';

export default {
	data(){
		return{
			tracks: [...this.tracksP],
			selectedTrack: this.modelValue,
		}
	},
	methods:{
		listener:function(id, selected){
			if(selected){ this.selectedTrack.push([id]); }
			else
			{
				var i;
				var len = this.selectedTrack.length;
				for(i = 0; i < len; i++)
				{
					if(this.selectedTrack[i] == id){this.selectedTrack.splice(i, 1);return;}
				}
			}
			this.$emit('update:modelValue', this.selectedTrack);
		},
	},
	props:['title', 'tracksP', 'modelValue', 'preselectId'],
	components:{trackItemModal},
}
</script>

<style lang='scss' scoped>
span{
	display: flex;
	align-content: center;
	align-items: center;
	height: 40px;
	margin-left: 10px;
}

.tracks-list{
	max-height: 500px;
	overflow-y: scroll;
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