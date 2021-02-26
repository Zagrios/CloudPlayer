<template>
  <form class="form-wrapper">
      <h2>Inscription</h2>
      <div class="input-wrapper">
          <label for="username-input">Nom d'utilisateur</label>
          <input v-model="username" id="username-input" type="text" placeholder="Nom d'utilisateur">
      </div>
      <div class="input-wrapper">
          <label for="email-input">Adresse e-mail</label>
          <input v-model="email" id="email-input" type="email" placeholder="Adresse e-mail">
      </div>
      <div class="input-wrapper">
          <label for="email-cfirm-input">Confirmez votre adresse e-mail</label>
          <input v-model="emailCfrm" id="email-cfirm-input" type="email" placeholder="Confirmez votre adresse e-mail">
      </div>
      <div class="input-wrapper">
          <label for="password-input">Mot de passe</label>
          <input v-model="password" id="password-input" type="password" placeholder="Mot de passe">
      </div>
      <div class="input-wrapper">
          <label for="password-cfrm-input">Confirmez votre mot de passe</label>
          <input v-model="passCfrm" id="password-cfrm-input" type="password" placeholder="Confirmez votre mot de passe">
      </div>
      <span @click="register" id="register-btn" class="full-btn">S'incrire</span>
      <span class="separator-register"></span>
      <span @click="alreadyRegistred" class="full-btn">J'ai déja un compte</span>
  </form>
</template>

<script>

import axios from 'axios';

export default {
    name:"registerform",
    data(){
        return{
            username: '',
            password: '',
            passCfrm: '',
            email:'',
            emailCfrm:'',
        }
    },
    methods:{
        alreadyRegistred:function() {this.$emit("switch");},
        register:function(){
            var data = new FormData();
            data.append('username', this.username);
            data.append('password', this.password);
            data.append('email', this.email);
            axios({
                method:'POST',
                url:'http://localhost/cloudmusic_back/user/forms/register.php',
                data
            })
        },
    }
}
</script>

<style lang="scss">

.form-wrapper{

    #register-btn{
        margin-top: 35px;
    }

    .separator-register{
        display: block;
		margin-top: 35px;
		margin-bottom: 35px;
		border-bottom: 1px solid rgb(177, 177, 177);
    }
    
}

</style>