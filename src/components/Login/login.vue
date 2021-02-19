<template>
	<div id="login-wrapper">
		<h1 class="title">CloudMusic</h1>
		<loginform v-if="isToggle" v-on:switch="toggle()"></loginform>
		<registerform v-else v-on:switch="toggle()"></registerform>
	</div>
</template>

<script>
import loginform from "./forms/loginForm";
import registerform from './forms/registerForm';

export default {
	name: "Login",
	data(){
		return{
			isToggle : true,
		}
	},
	methods:{
		toggle:function(){this.isToggle = !this.isToggle;},
	},
	components: {loginform, registerform}
};
</script>

<style lang="scss">
#login-wrapper {
	text-align: center;
	width: 100%;
	height: 100%;
	.title {
		display: block;
		margin-top: 50px;
		color: black;
		font-weight: 800;
		letter-spacing: 1px;
		font-size: 2.2em;
		margin-bottom: 80px;
	}
}
</style>
