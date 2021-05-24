<template>
	<div class="modal" v-if="visible">
		<span id="background" @click="$emit('close')"></span>
		<upload v-if="type == 'upload'" v-on:close="$emit('close')"></upload>
	</div>
</template>

<script>

import Upload from './modalType/upload.vue'

export default {
	name:'modal',
	components:{
		'upload':Upload,
	},
	props:{
		visible : Boolean,
		type : String,
	},
}
</script>

<style lang='scss'>

.modal{
	position: fixed;
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