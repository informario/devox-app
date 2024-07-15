<script setup>
  import { defineProps, ref } from "vue";
  import {toggleLike, getLikes, removeParagraph} from '/src/services/api_blog.js'
  const props = defineProps(['id', 'username', 'paragraphs'])
  let likeCount = ref(0)
  import { isProxy, toRaw } from 'vue';

  let isLiked = ref(false)

  likeCount.value = (await getLikes({id:props.id})).value
  const clickLike = async function(id, username){
    await toggleLike({id:id, username:username})
    likeCount.value = (await getLikes({id:props.id})).value
  }

  const clickDelete = async function(text_id, parrafosProxy){
    let parrafos = toRaw(parrafosProxy)
    console.log(parrafos)
    await removeParagraph({id: text_id})
        .then(res => {
          if(res==="notauth"){
            window.alert("You can only delete your own paragraphs")
          }
          else{
            parrafos = parrafos.filter(
                (t) => t.id !== text_id
            )
            location.reload()
          }
        })
        .catch(error =>{
          console.log(error)
        })
  }

  
</script>
<template>
  <div class="buttons">



    <div class="like-container">
      <button class="like" @click="clickLike(props.id, props.username)">
        <img class="icon" src="/src/components/icons/heart.svg" alt="Like">
      </button>
      {{likeCount}}
    </div>


    <button class="delete" @click="clickDelete(props.id, props.paragraphs)">
      <img class="delete-icon" src="/src/components/icons/cross.svg" alt="Like">
    </button>
  </div>
</template>

<style scoped>

.buttons{
  display: flex;
  justify-content: right;
  flex-direction: row;
}
.like-container{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
}
.icon{
  width: 20px;
}

.delete-icon{
  width: 17px;
  margin: 0 0 13px 0;

}
.like{
  padding: 0;
  background: none;
  border: none;
  color: white; /*#f0f1f3*/;
  justify-content: center;
}
.delete{
  width: 40px;
  height: 40px;
  padding: 0;
  background: none;
  border: none;
  color: white; /*#f0f1f3*/;
}
</style>