<template>
	<div class="modal" v-if="visible">
		<span id="background" @click="closeModal"></span>
		<upload v-if="type == 'upload'" v-on:close="closeModal"></upload>
		<deleteTrack v-if="type == 'deleteTrack'" v-bind:track="passData" v-on:close="closeModal"></deleteTrack>
	</div>
</template>

<script>

import upload from './modalType/upload.vue'
import deleteTrack from './modalType/deleteTrack.vue'

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
			this.visible = false;
			this.type = "";
			this.passData = null;
		}
	},
	components:{
		upload,
		deleteTrack,
	},
	created(){
		this.EventBus.on('openModal', (data) => {
			this.openModal(data);
		})
	}
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