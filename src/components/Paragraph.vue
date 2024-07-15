<script setup>
  const props = defineProps(['paragraph', 'username', "paragraphs"])
  import LikeButton from '/src/components/LikeButton.vue'
</script>

<template>
  <div>
    <h2>{{paragraph.title}}</h2>
    <p>{{ paragraph.content }}</p>
      <h3>{{ paragraph.author }}</h3>
      <Suspense>
        <LikeButton :id="paragraph.id" :username="username" :paragraphs="paragraphs"/>
      </Suspense>



  </div>

</template>

<style scoped>
  @import "/src/assets/css/styles1.css";
  p{
    overflow-y:auto;
    overflow-x:hidden;
    max-height:400px;
  }



</style>