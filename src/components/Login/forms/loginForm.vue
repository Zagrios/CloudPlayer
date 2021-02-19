<template>
		<form class="form-wrapper">
			<h2>Connexion</h2>
			<div class="input-wrapper">
				<label for="login-username">Nom d'utilisateur</label>
				<input v-model="username" id="login-username" type="text" placeholder="Nom d'utilisateur" />
			</div>
			<div class="input-wrapper">
				<label for="login-password">Mot de passe</label>
				<input v-model="password" id="login-password" type="password" placeholder="Mot de passe" />
			</div>
			<div class="input-wrapper">
				<span id="forgot-password">Mot de passe oublié ?</span>
			</div>
			<div class="button-wrapper">
				<span class="toggle-wrapper">
					<input type="checkbox" name="" id="remember-me" />
					<label for="remember-me">Rester connecté</label>
				</span>
				<span class="loggin-btn">Se connecter</span>
			</div>
			<span class="separator"></span>
			<span @click="noAccountClick" id="no-account-btn" class="full-btn">Je n'ai pas de compte</span>
		</form>
</template>

<script>
export default {
    name:"loginform",
	data(){
		return{
			username:'',
			password:'',
		}
	},
    methods:{
        noAccountClick:function(){console.log(this.$store.getters.getToken);this.$emit("switch");},
		login:function(){},
    }
}
</script>

<style lang="scss">
	.form-wrapper {
		margin: auto;
		max-width: 450px;
		h2 {
			letter-spacing: 1px;
			font-size: 1.7em;
			margin-bottom: 30px;
		}
		.input-wrapper {
			text-align: left;
			margin-bottom: 20px;
			label {
				font-weight: bold;
				letter-spacing: 1px;
				margin-bottom: 5px;
			}
			input {
				height: 30px;
				width: 100%;
                margin-top: 4px;
				font-size: 1.05em;
				vertical-align: middle;
				letter-spacing: 1px;
				border: 1px solid rgb(184, 184, 184);
                border-radius: 3px;
			}
			#forgot-password {
				display: block;
				width: fit-content;
				margin-top: 30px;
				text-decoration: underline;
				cursor: pointer;
				color: rgb(68, 68, 68);
				margin-bottom: 30px;
			}
		}
		.button-wrapper {
			display: flex;
			justify-content: space-between;
			align-items: center;
			width: 100%;
			height: 50px;
			.toggle-wrapper {
				label {
					cursor: pointer;
				}
				input {
					cursor: pointer;
				}
			}
			.loggin-btn {
				display: flex;
				align-items: center;
				justify-content: center;
				width: 156px;
				height: 46px;
				vertical-align: middle;
				color: white;
				background-color: black;
				border-radius: 400px;
				font-weight: bold;
				letter-spacing: 1px;
				cursor: pointer;
			}
		}

		.separator{
			display: block;
			margin-top: 50px;
			margin-bottom: 50px;
			border-bottom: 1px solid rgb(177, 177, 177);
		}

		.full-btn{
			display: flex;
			align-items: center;
			justify-content: center;
			color: white;
			background-color: black;
			height: 46px;
			font-weight: bold;
			letter-spacing: 1px;
			border-radius: 400px;
			cursor: pointer;
		}
	}

</style>