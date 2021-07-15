<template>
	<div id="profil-page">
		<div id="nav-bar">
            <h1>Profil</h1>
        </div>
		<div id="infos">
			<div class="input-wrapper account-level">
				<label>Type de compte</label>
				<span id="level-text">Newbie</span>
				<span id="upgrade-btn">évoluer</span>
			</div>
			<div class="input-wrapper storage-level">
				<label>Stockage</label>
					<div id="wrapper">
						<div id="progress-wrapper">
						<span id="progress-back"></span>
						<span id="progress-front" v-bind:style="{width:storagePercent()+'%'}"></span>
						<span id="progress-value">{{usedStorage+"GO/"+totalStorage+"GO"}}</span>
					</div>
					<div id="upgrade-btn">évoluer</div>
				</div>
				
			</div>
			<div class="input-wrapper hidden" v-bind:class="{close: !usernameHasChange(), open:usernameHasChange()}">
				<label for="edit-username">Nom d'utilisateur</label>
				<span class="status" v-bind:class="{error:usernameStatus.error, valid:!usernameStatus.error}">{{usernameStatus.msg}}</span>
				<input v-model="username" id="edit-username" type="text" placeholder="Nom d'utilisateur" />
				<input type="password" placeholder="Ancien mot de passe" v-model="verifyPasswordUsername"/>
				<div class="btn-wrapper">
					<span class="btn save" @click="editUsername">Enregister</span>
					<span class="btn cancel">Annuler</span>
				</div>
			</div>
			<div class="input-wrapper hidden" v-bind:class="{close: !emailHasChange(), open:emailHasChange()}">
				<label for="edit-email">E-mail</label>
				<span class="status" v-bind:class="{error:emailStatus.error, valid:!emailStatus.error}">{{emailStatus.msg}}</span>
				<input v-model="email" id="edit-email" type="email" placeholder="Adresse e-mail" />
				<input type="password" placeholder="Ancien mot de passe" v-model="verifyPasswordEmail"/>
				<div class="btn-wrapper">
					<span class="btn save" @click="editEmail">Enregister</span>
					<span class="btn cancel">Annuler</span>
				</div>
			</div>
			<div class="input-wrapper hidden" v-bind:class="{close2: !passwordHasChange(), open2:passwordHasChange()}">
				<label>Mot de passe</label>
				<span class="status" v-bind:class="{error:passwordStatus.error, valid:!passwordStatus.error}">{{passwordStatus.msg}}</span>
				<input id="edit-new-password" type="password" placeholder="Nouveau mot de passe" v-model="newPassword"/>
				<input id="edit-new-password-cfrm" type="password" placeholder="Comfirmer le nouveau mot de passe" v-model="newPasswordCfrm"/>
				<input type="password" placeholder="Ancien mot de passe" v-model="verifyPasswordPass"/>
				<div class="btn-wrapper">
					<span class="btn save" @click="editPassword">Enregister</span>
					<span class="btn cancel">Annuler</span>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import axios from 'axios';
export default {
	name:'profil',
	data(){
		return{
			username:this.$store.getters.getUserName,
			previousEmail:"",
			email:"",
			verifyPasswordUsername:"",
			verifyPasswordEmail:"",
			verifyPasswordPass:"",
			newPassword:"",
			newPasswordCfrm:"",
			totalStorage:2.0,
			usedStorage:0.0,
			usernameStatus: {error:false, msg:""},
			emailStatus: {error:false, msg:""},
			passwordStatus: {error:false, msg:""},
		}
	},
	methods:{
		usernameHasChange:function(){ return !(this.username == this.$store.getters.getUserName); },
		storagePercent:function(){ return this.usedStorage*100/this.totalStorage; },
		emailHasChange:function(){ return this.email != this.previousEmail && this.validateEmail(this.email); },
		passwordHasChange:function(){ return this.newPassword == this.newPasswordCfrm && this.validPassword(this.newPassword)},
		validPassword:function(pass){ const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/; return re.test(pass); },
		resetStatus:function(){ 
			this.usernameStatus = {error:false, msg:""};
			this.emailStatus = {error:false, msg:""}; 
			this.passwordStatus = {error:false, msg:""};
			[this.verifyPasswordUsername , this.verifyPasswordEmail , this.verifyPassword] = ""; 
		},
		validateEmail:function(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
		getInfos:function(){
			axios.get(this.$store.getters.getApiUrl+"get/getUserInfo.php?token="+this.$store.getters.getToken).then((response) => {
				if(response.status == 200 && response.data.status == 0){
					var data = response.data.data;
					this.email = data.email;
					this.previousEmail = data.email;
					this.totalStorage = data.max_storage;
					this.usedStorage = Number(this.totalStorage - data.free_storage).toFixed(1);
				}
			});
		},
		editUsername:function(){
			var data = new FormData();
			data.append("token", this.$store.getters.getToken);
			data.append("password", this.verifyPasswordUsername);
			data.append("newUsername", this.username);
			this.editProfil(data, 'username', {2:"Mauvais mot de passe", 3:"Nom d'utilisateur déjà utilisé", 4:"Nom d'utilisateur invalide"});
		},
		editEmail:function(){
			var data = new FormData();
			data.append("token", this.$store.getters.getToken);
			data.append("password", this.verifyPasswordEmail);
			data.append("newEmail", this.email);
			this.editProfil(data, 'email', {2:"Mauvais mot de passe", 3:"E-mail déjà utilisé", 4:"E-mail invalide"});
		},
		editPassword:function(){
			var data = new FormData();
			data.append("token", this.$store.getters.getToken);
			data.append("password", this.verifyPasswordPass);
			data.append("newPassword", this.newPassword);
			this.editProfil(data, 'password', {2:"Mauvais mot de passe", 4:"Nouveau mot de passe invalide"});
		},
		editProfil:function(data, type, errors){
			this.resetStatus();
			axios.post("http://localhost/cloudmusic_back/user/actions/editUserProfil.php", data).then((response) => {
				console.log(response);
				if(type == 'username'){
					if(response.status != 200 || response.data == 1 || response.data.length > 1){ this.usernameStatus = {error:true, msg:"Une erreur c'est produite"}; return; }
					if(response.data == 0){ this.usernameStatus = {error:false, msg:"Enregistré"}; this.$store.commit('setUsername', this.username); return; }
					this.usernameStatus = {error:true, msg:errors[response.data]}; return;
				}
				if(type == 'email'){
					if(response.status != 200 || response.data == 1 || response.data.length > 1){ this.emailStatus = {error:true, msg:"Une erreur c'est produite"}; return; }
					if(response.data == 0){ this.emailStatus = {error:false, msg:"Enregistré"}; this.previousEmail = this.email; return; }
					this.emailStatus = {error:true, msg:errors[response.data]}; return;
				}
				if(type == 'password'){
					if(response.status != 200 || response.data == 1 || response.data.length > 1){ this.passwordStatus = {error:true, msg:"Une erreur c'est produite"}; return; }
					if(response.data == 0){ this.passwordStatus = {error:false, msg:"Enregistré"}; [this.verifyPassword, this.newPassword, this.newPasswordCfrm] = ""; return; }
					this.passwordStatus = {error:true, msg:errors[response.data]}; return;
				}
			});
		}
	},
	created(){
		this.getInfos();
	},
}
</script>

<style lang="scss">
#profil-page{
	width: 100%;
	#nav-bar{
        display: flex;
        align-content: center;
        align-items: center;
        height: 70px;
        width: 100%;
        padding-top: 6px;
        h1{
            float: left;
            letter-spacing: 1px;
            font-weight: 700;
            margin-top: 0;
            margin-bottom: 5px;
            margin-right: 20px;
        }
    }
	#infos{
		margin-top: 50px;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		
	}
}

#infos{
	.hidden{overflow: hidden;}
	.input-wrapper {
		width: 80%;
		min-width: 300px;
		max-width: 500px;
		text-align: left;
		margin-bottom: 20px;
		padding: 0 7px 0 7px;
		position: relative;
		transition: height .2s ease;
		label {
			font-weight: bold;
			letter-spacing: 1px;
			margin-bottom: 5px;
			display: block;
		}
		input {
			height: 30px;
			width: 100%;
            margin-top: 4px;
			font-size: 1.05em;
			vertical-align: middle;
			letter-spacing: 1px;
			background-color: #414141;
			border: 0px solid rgb(184, 184, 184);
			color: white;
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
		.input-form-error{
			color: rgb(248, 50, 0);
			font-size: .85em;
			font-weight: 600;
		}
		.btn-wrapper{
			margin-top: 15px;
			.save{
				border: solid rgb(58, 212, 65) 2px;
				&:hover{background-color: rgb(58, 212, 65);}
			}
			.cancel{
				border: solid rgb(151, 151, 151) 2px;
				&:hover{background-color: rgb(151, 151, 151);}
			}
			.btn{
				margin-right: 10px;
				font-size: .95em;
				letter-spacing: 1px;
				border-radius: 5px;
				padding: 2px 5px 2px 5px;
				cursor: pointer;
				transition: all .1s ease;
			}
		}
		.status{
			position: absolute;
			top: 0;
			right: 0;
			font-weight: 500;
			letter-spacing: 1px;
		}
		.error{color: crimson;}
		.valid{color: rgb(58, 212, 65)}

	}
	.close{height: 62px;}
	.open{height: 140px;}
	.close2{height: 100px;}
	.open2{height: 170px;}

	.account-level{
		#level-text{
			letter-spacing: 1px;
			font-weight: 500;
			margin-right: 10px;
		}
		#upgrade-btn{
			text-transform: uppercase;
			font-size: .9em;
			color: black;
			background-color: #23eb66;
			border: solid black 0;
			border-radius: 5px;
			padding: 2px 5px 2px 5px;
			font-weight: 600;
			letter-spacing: 1px;
			cursor: pointer;
			box-shadow: 0px 0px 18px -3px #23eb66;
			transition: box-shadow .1s;
			&:hover{ box-shadow: 0px 0px 18px 0px #23eb66; }
		}
	}

	.storage-level{
		position: relative;
		#wrapper{
			display: flex;
			flex-direction: row;
			justify-content: space-between;
			flex-wrap: wrap;
		}
		#progress-wrapper{
			width: 80%;
			height: 25px;
			position: relative;
			#progress-back{
				position: absolute;
				background-color: rgb(112, 112, 112);
				border: solid black 0;
				border-radius: 5px;
				width: 100%;
				height: 7px;
			}
			#progress-front{
				position: absolute;
				background-color: #23eb66;
				border: solid black 0;
				border-radius: 5px;
				height: 7px;
			}
			#progress-value{
				position: absolute;
				bottom: 0;
				right: 0;
				font-size: .8em;
			}
			
		}
		#upgrade-btn{
			text-transform: uppercase;
			display: flex;
			justify-content: center;
			align-content: center;
			align-items: center;
			font-size: .9em;
			color: black;
			background-color: #23eb66;
			border: solid black 0;
			border-radius: 5px;
			padding: 2px 5px 2px 5px;
			font-weight: 600;
			letter-spacing: 1px;
			cursor: pointer;
			box-shadow: 0px 0px 18px -3px #23eb66;
			transition: box-shadow .1s;
			&:hover{ box-shadow: 0px 0px 18px 0px #23eb66; }
		}
	}

}
</style>