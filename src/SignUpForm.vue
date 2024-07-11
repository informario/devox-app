<script setup>

  import {ref} from "vue";
  import {sendSignUpForm, getAuthToken} from "@/services/api_blog.js";
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()

  const input_email_signup = ref("")
  const input_username_signup = ref("")
  const input_password_signup = ref("")
  const input_username_login = ref("")
  const input_password_login = ref("")

  const signUp = async function (){
    if (input_email_signup.value === "" || input_username_signup.value === "" || input_password_signup.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await sendSignUpForm({email:input_email_signup.value, username:input_username_signup.value, password:input_password_signup.value})
          .then(res => {
            window.alert("usuario creado con exito")
          })
          .catch(err => {
            console.log("SignUpForm.vue: fallo signup: " + err)
            if(err.response.data.error=="Username ya en uso"){
              window.alert(err.response.data.error)
            }
            if(err.response.data.error=="Email ya en uso"){
              window.alert(err.response.data.error)
            }
          })
    }
  }
  const logIn = async function (){
    if (input_username_login.value === "" || input_password_login.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await getAuthToken({username:input_username_login.value, password:input_password_login.value})
        .then(jwt =>{
          localStorage.setItem("jwt", jwt)
          router.push("/blog")
        })
        .catch(error =>{
          if(error.code == 'ERR_BAD_REQUEST'){
            window.alert("usuario o contraseña incorrecto")
          }
          else{
            console.log("Blog.vue, error obteniendo authtoken", error)
          }
        })
    }
  }



</script>

<template>
  <input placeholder="email" v-model="input_email_signup">
  <input placeholder="username" v-model="input_username_signup">
  <input placeholder="password" v-model="input_password_signup">
  <button @click="signUp()">Sign Up</button>
  <input placeholder="username" v-model="input_username_login">
  <input placeholder="password" v-model="input_password_login">
  <button @click="logIn()">Log in</button>
</template>

<style scoped>
  button{
    height: 20px;
    width: 23px;
  }
</style>