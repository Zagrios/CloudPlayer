<template>
	<div id="app">
		<Loader v-if="this.$store.state.isLoad"></Loader>
		<router-view></router-view>
	</div>
</template>

<script>
import Loader from "./components/loader"


export default {
	name: 'App',
	components:{
		Loader,
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
	width: 100%;
	height: 100%;
}
</style>
