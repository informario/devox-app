<script setup>
  import { defineProps, ref } from "vue";
  import {toggleLike, getLikes} from '/src/services/api_blog.js'
  const props = defineProps(['id', 'username'])

  let likeCount = ref(0)
  let isLiked = ref(false)
  likeCount.value = (await getLikes({id:props.id})).value
  

  const clickLike = async function(id, username){
    await toggleLike({id:id, username:username})
    likeCount.value = (await getLikes({id:props.id})).value
  }

  
</script>

<template>
  <button :class="['like-button', { liked:isLiked }]" @click="clickLike(props.id, props.username)">
    <span class="like-icon">👍</span> {{ likeCount }}
  </button>
</template>

<style scoped>
.like-button {
  width: 40px;
  height: 15px;
  background-color: #12212b;
  border: 0px;
  border-radius: 5px;
  font-size: 7px;
  cursor: pointer;
  display: flex;
  align-items: center;
  transition: background-color 0.3s, border-color 0.3s;
}

.like-button:hover {
  background-color: #ccc;
}

.like-button.liked {
  background-color: #004bf8;
}

.like-icon {
  margin-right: 10px;
}
</style>