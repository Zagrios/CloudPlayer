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
				<input v-model="username" id="edit-username" type="text" placeholder="Nom d'utilisateur" />
				<input id="edit-password" type="password" placeholder="Ancien mot de passe" v-model="verifyPassword"/>
				<span v-if="usernameError != ''" class="input-form-error">{{}}</span>
				<div class="btn-wrapper">
					<span class="btn save" @click="editUsername">Enregister</span>
					<span class="btn cancel">Annuler</span>
				</div>
			</div>
			<div class="input-wrapper hidden" v-bind:class="{close: !emailHasChange(), open:emailHasChange()}">
				<label for="edit-email">E-mail</label>
				<input v-model="email" id="edit-email" type="email" placeholder="Adresse e-mail" />
				<input id="edit-password" type="password" placeholder="Ancien mot de passe" v-model="verifyPassword"/>
				<span v-if="usernameError != ''" class="input-form-error">{{}}</span>
				<div class="btn-wrapper">
					<span class="btn save">Enregister</span>
					<span class="btn cancel">Annuler</span>
				</div>
			</div>
			<div class="input-wrapper hidden" v-bind:class="{close2: !passwordHasChange(), open2:passwordHasChange()}">
				<label for="edit-password">Mot de passe</label>
				<input id="edit-new-password" type="password" placeholder="Nouveau mot de passe" v-model="newPassword"/>
				<input id="edit-new-password-cfrm" type="password" placeholder="Comfirmer le nouveau mot de passe" v-model="newPasswordCfrm"/>
				<input id="edit-password" type="password" placeholder="Ancien mot de passe" v-model="verifyPassword"/>
				<div class="btn-wrapper">
					<span class="btn save">Enregister</span>
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
			verifyPassword:"",
			newPassword:"",
			newPasswordCfrm:"",
			totalStorage:2.0,
			usedStorage:0.0,
		}
	},
	methods:{
		usernameHasChange:function(){ return !(this.username == this.$store.getters.getUserName); },
		storagePercent:function(){ return this.usedStorage*100/this.totalStorage; },
		emailHasChange:function(){ return this.email != this.previousEmail && this.validateEmail(this.email); },
		passwordHasChange:function(){ return this.newPassword == this.newPasswordCfrm && this.validPassword(this.newPassword)},
		validPassword:function(pass){ 
			const re = /(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,}/;
			return re.test(pass); 
		},
		validateEmail:function(email){
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
            return re.test(String(email).toLowerCase());
        },
		getInfos:function(){
			axios.get("http://localhost/cloudmusic_back/user/actions/getUserInfo.php?token="+this.$store.getters.getToken).then((response) => {
				if(response.status == 200 && response.data.status == 0){
					var data = response.data.data;
					this.email = data.email;
					this.previousEmail = data.email;
					this.usedStorage = data.used_storage;
				}
			});
		},
		editUsername:function(){
			var data = new FormData();
			data.append("token", this.$store.getters.getToken);
			data.append("password", this.verifyPassword);
			data.append("newUsername", this.username);
			axios.post("http://localhost/cloudmusic_back/user/actions/editUserProfil.php", data).then((response) => {
				console.log(response);
				if(response.status != 200 || response.data == 1){ /* something wrong */ return; }
				if(response.data == 0){ /* All good */ return; }
				if(response.data == 2){ /* Wrong password */ return; }
				if(response.data == 3){ /* username not available */ return; }
				if(response.data == 4){ /* username invalid */ return; }
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