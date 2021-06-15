<template>
	<div>
		<Login v-if="!haveToken" v-on:createSession="loginToken"></Login>
	</div>
</template>

<script>
import Login from "./Login/login";
import axios from "axios";

export default {
	name: "Init",
	data(){
		return{
			haveToken:true,
		}
	},
	components: {
		Login,
	},
	methods:{
		getCookie: function(name){
			return this.$func.getCookie(name);
		},
		loginToken:function(token){
			if(token == null){this.haveToken = false; return;}
			let data = new FormData();
			data.append("token", token);
			axios({
				method:'POST',
                url:'http://localhost/cloudmusic_back/user/forms/login.php',
                data
			}).then((response) => {
				if(response.status == 200 && response.data.username != null)
				{
					this.$store.state.token = token;
					this.$store.state.username = response.data.username;
					this.$router.push({path:"/home/tracks"});
				}
				else
				{
					this.$store.state.token = null;
					this.$store.state.username = null;
					this.$func.createCookie("token", "", -1);
				}
			})
			.catch(() =>{
				this.haveToken = false;
			})
			.then(() => {
				this.$store.state.isLoad = false;
			})
			
		}
	},
	created(){
		this.$store.state.isLoad = true;
		if(this.getCookie("token") != null){this.loginToken(this.getCookie("token"))}else{this.haveToken = false; this.$store.state.isLoad = false;}
	}
};
</script>

<style lang="scss"></style>
