<template>
	<div id="app">
		<modal></modal>
		<Loader v-if="this.$store.state.isLoad"></Loader>
		<router-view></router-view>
	</div>
</template>

<script>
import Loader from "./components/loader"
import Modal from "./components/Modals/modal"

export default {
	name: 'App',
	components:{
		Loader, 
		'modal':Modal,
	},
  
}
</script>

<style lang="scss">
#app {
	font-family: 'Montserrat',Avenir, Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
}
body {
	font-family: 'Montserrat',Avenir, Helvetica, Arial, sans-serif;
}

html, body, #app{
	margin: 0;
	padding: 0;
	width: 100vw;
	max-width: 100vw;
	height: 100vh;
	max-height: 100vh;
	overflow: hidden;
}
</style>
