<script setup>
  import Paragraph from './components/Paragraph.vue'
  import {fetch, push, remove} from "@/services/api.js";
  import { ref } from 'vue'
  import './assets/css/main.css';

  const parrafos = ref([])
  const input_content= ref("")
  const input_author=ref("")
  const input_title=ref("")


  async function add_text() {
    if (input_content.value === "" || input_title.value === "" || input_author.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await push({id:0, title:input_title.value, author:input_author.value, content:input_content.value })
          .then(res => console.log("App.vue: recibido:" + res))
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
    await fetch()
      .then(data => {
        for (let i = data.length-1; i >= 0; i--) {
          parrafos.value.push({id: data[i].id, title: data[i].title, author: data[i].author, content: data[i].content})
          console.log(parrafos.value[parrafos.value.length-1])
        }
      })
      .catch(error =>{
        this.error = 'Error al cargar los datos';
      })
  }
  async function remove_text(text_id){
    await remove(text_id)
      .then(_ => {
        console.log(text_id)
        parrafos.value = parrafos.value.filter(
          (t) => t.id !== text_id
        )
      })
      .catch(error =>{
        this.error = 'Error al cargar los datos';
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