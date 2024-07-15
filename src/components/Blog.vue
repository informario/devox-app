<script setup>
  import Paragraph from './Paragraph.vue'
  import {fetchParagraphs, pushParagraph, removeParagraph, getUsername} from "@/services/api_blog.js";
  import { ref } from 'vue'
  import { useRouter, useRoute } from 'vue-router'
  const router = useRouter()
  
  const parrafos = ref([])
  const input_content= ref("")
  const input_title=ref("")


  async function add_text() {
    if (input_content.value === "" || input_title.value === "") {
      window.alert("Por favor completar los campos correspondientes")
    }
    else{
      await pushParagraph({id:0, title:input_title.value, content:input_content.value })
          .then()
          .catch(err => console.log(err))
      input_content.value = ""
      input_title.value = ""
    }
    fetch_texts()
  }
  async function fetch_texts() {
    let data;
    parrafos.value = []
    const token = localStorage.getItem('jwt');
    await fetchParagraphs()
      .then(data => {
        for (let i = data.length-1; i >= 0; i--) {
          parrafos.value.push({id: data[i].id, title: data[i].title, author: data[i].author, content: data[i].content})
        }
      })
      .catch(error =>{
        console.log(error.code)
        router.push("/login")
      })
  }

  fetch_texts();


</script>

<template>
  <div class="blog">
      <div class="textarea-button">
        <textarea v-model="input_content"/>
        <input placeholder="title" v-model="input_title">
        <button @click="add_text">intro</button>
      </div>



      <div class="paragraph-container">
        <template v-for="parrafo in parrafos" :key="parrafo.id">
          <div class="paragraph">
            <Suspense>
              <Paragraph :paragraph="parrafo" :username="getUsername()" :paragraphs="parrafos"/>
            </Suspense>
          </div>
        </template>
      </div>

  </div>
</template>

<style scoped>
  @import '../assets/css/styles1.css';

</style>