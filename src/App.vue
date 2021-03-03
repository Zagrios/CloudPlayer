<template>
	<div id="app">
		<router-view></router-view>
	</div>
</template>

<script>

export default {
	name: 'App',
	methods:{
		
		test:function(){
			console.log("test")
		}
	}
  
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
</style>
