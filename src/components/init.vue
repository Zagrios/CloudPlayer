<template>
	<div>
		<Login v-if="!haveToken" v-on:createCookie="createCookie" v-on:createSession="loginToken"></Login>
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
		createCookie: function(name,value,days){
			var expires = "";
			if (days) {
				var date = new Date();
				date.setTime(date.getTime() + (days*24*60*60*1000));
				expires = "; expires=" + date.toUTCString();
			}
			document.cookie = name + "=" + (value || "")  + expires + "; path=/";
		},
		getCookie: function(name){
			var nameEQ = name + "=";
			var ca = document.cookie.split(';');
			for(var i=0;i < ca.length;i++){
				var c = ca[i];
				while (c.charAt(0)==' ') c = c.substring(1,c.length);
				if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
			}
			return null;
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
				console.log("AA")
				if(response.status == 200 && response.data.username != null)
				{
					this.$store.state.token = token;
					this.$store.state.username = response.data.username;
					this.$router.push({path:"/home"});
				}
				else
				{
					console.log("erreur")
					this.$store.state.token = null;
					this.$store.state.username = null;
					this.createCookie("token", "", -1);
				}
			})
			.catch(() =>{
				console.log("BB")
				this.haveToken = false;
			})
			.then(() => {
				this.$store.state.isLoad = false;
			})
			
		}
	},
	mounted(){
		this.$store.state.isLoad = true;
		if(this.getCookie("token") != null){this.loginToken(this.getCookie("token"))}else{this.haveToken = false; this.$store.state.isLoad = false;}
	}
};
</script>

<style lang="scss"></style>
