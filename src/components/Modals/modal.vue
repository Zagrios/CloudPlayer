<template>
	<div class="modal" v-if="visible">
		<span id="background" @click="closeModal"/>
		<upload v-if="type == 'upload'" v-on:close="closeModal"/>
		<deleteTrack v-else-if="type == 'deleteTrack'" v-bind:track="passData" v-on:close="closeModal"/>
		<createPlaylist v-else-if="type == 'createPlaylist'" v-on:close="closeModal"/>
		<editPlaylist v-else-if="type == 'editPlaylist'" v-on:close="closeModal" v-bind:playlist="passData"/>
		<removeFromPlaylist v-else-if="type == 'removeFromPlaylist'" v-on:close="closeModal" v-bind:playlist="passData.playlist" v-bind:track="passData.track"/>
		<deletePlaylist v-else-if="type == 'deletePlaylist'" v-on:close="closeModal" v-bind:playlist="passData.playlist"/>
	</div>
</template>

<script>

import upload from './modalType/upload.vue'
import deleteTrack from './modalType/deleteTrack.vue'
import createPlaylist from './modalType/createPlaylist.vue'
import editPlaylist from './modalType/editPlaylist.vue'
import removeFromPlaylist from './modalType/removeFromPlaylist.vue'
import deletePlaylist from './modalType/deletePlaylist.vue';

export default {
	name:'modal',
	data(){
		return{
			visible: false,
			type: "",
			passData:null,
		}
	},
	methods:{
		openModal:function(data){
			this.type = data.type;
			if(data.parms){ this.passData = data.parms; }
			this.visible = true;
		},
		closeModal:function(){
			this.type = "";
			this.visible = false;
			this.passData = null;
		}
	},
	components:{
		upload,
		deleteTrack,
		createPlaylist,
		editPlaylist,
		removeFromPlaylist,
		deletePlaylist,
	},
	created(){
		this.EventBus.on('openModal', (data) => {
			this.openModal(data);
		})
	},
	
}
</script>

<style lang='scss'>

.modal{
	position: fixed;
	z-index: 50;
    top: 0;
    bottom: 0;
    right: 0;
    left: 0;
    display: flex;
    align-content: center;
    align-items: center;
	justify-content: center;
	background-color: rgba(0, 0, 0, 0.596);
	#background{
		position: fixed;
		top: 0;
		bottom: 0;
		right: 0;
		left: 0;
		z-index: 0;
	}
}

</style>