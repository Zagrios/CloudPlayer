<template>
  <form class="form-wrapper">
      <h2>Inscription</h2>
      <div class="input-wrapper">
          <label for="username-input">Nom d'utilisateur</label>
          <input id="username-input" type="text" placeholder="Nom d'utilisateur">
      </div>
      <div class="input-wrapper">
          <label for="email-input">Adresse e-mail</label>
          <input id="email-input" type="email" placeholder="Adresse e-mail">
      </div>
      <div class="input-wrapper">
          <label for="email-cfirm-input">Confirmez votre adresse e-mail</label>
          <input id="email-cfirm-input" type="email" placeholder="Confirmez votre adresse e-mail">
      </div>
      <div class="input-wrapper">
          <label for="password-input">Mot de passe</label>
          <input id="password-input" type="password" placeholder="Mot de passe">
      </div>
      <div class="input-wrapper">
          <label for="password-cfrm-input">Confirmez votre mot de passe</label>
          <input id="password-cfrm-input" type="password" placeholder="Confirmez votre mot de passe">
      </div>
      <span id="register-btn" class="full-btn">S'incrire</span>
      <span class="separator-register"></span>
      <span @click="alreadyRegistred" class="full-btn">J'ai déja un compte</span>
  </form>
</template>

<script>
export default {
    name:"registerform",
    methods:{
        alreadyRegistred:function() {this.$emit("switch");}
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