<script setup>
  import Paragraph from './components/Paragraph.vue'
  import {fetchParagraphs, pushParagraph, removeParagraph, getAuthToken} from "@/services/api_blog.js";
  import { ref } from 'vue'
  import './assets/css/main.css';

  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  const route = useRoute()
  
  const parrafos = ref([])
  const input_content= ref("")
  const input_author=ref("")
  const input_title=ref("")

  function getHeader(){
    const token = localStorage.getItem('jwt');
    return {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }
  }
  async function add_text() {
    if (input_content.value === "" || input_title.value === "" || input_author.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await pushParagraph({id:0, title:input_title.value, author:input_author.value, content:input_content.value }, getHeader())
          .then()
          .catch(err => console.log(err))
      input_content.value = ""
      input_title.value = ""
      input_author.value = ""
    }
    fetch_texts()
  }
  async function fetch_texts() {
    let data;
    parrafos.value = []
    const token = localStorage.getItem('jwt');
    await fetchParagraphs(getHeader())
      .then(data => {
        for (let i = data.length-1; i >= 0; i--) {
          parrafos.value.push({id: data[i].id, title: data[i].title, author: data[i].author, content: data[i].content})
        }
      })
      .catch(error =>{
        console.log(error.code)
        router.push("/signup")
      })
  }
  async function remove_text(text_id){
    await removeParagraph({id: text_id}, getHeader())
      .then(_ => {
        parrafos.value = parrafos.value.filter(
          (t) => t.id !== text_id
        )
      })
      .catch(error =>{
        this.error = 'Error al eliminar ';
      })
  }
  async function get_auth_token(username, password){
    await getAuthToken(username, password)
      .then(jwt =>{
        localStorage.setItem("jwt", jwt)
      })
      .error(error =>{
        console.log("Blog.vue, error obteniendo authtoken", error)
      })
  }

  fetch_texts();


</script>

<template>
  <header>
    <div class="wrapper">
    </div>
  </header>

  <main>
    <div class="text-button-container">
      <textarea v-model="input_content" v-on:keyup.enter="add_text"/>
      <button @click="add_text">intro</button>
    </div>
    <div class="double-input">
      <input placeholder="titulo" v-model="input_title">
      <input placeholder="nombre" v-model="input_author">
    </div>

      <template v-for="parrafo in parrafos" :key="parrafo.id">
        <div class="text-button-container">
          <Paragraph :paragraph="parrafo"/>
          <button @click="remove_text(parrafo.id)">x</button>
        </div>
      </template>
  </main>
</template>

<style scoped>
  @import './assets/css/main.css';

</style>