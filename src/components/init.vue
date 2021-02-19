<template>
	<div v-if="isConnected"></div>
	<Login v-else></Login>
</template>

<script>
import Login from "./Login/login";

export default {
	name: "Init",
	data() {
		return {
			isConnected: false,
		};
	},
	methods: {
		add: function() {
			console.log();
		},
	},
	components: {
		Login,
	},
};
</script>

<style lang="scss"></style>
