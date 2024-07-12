<script setup>
  const props = defineProps(['paragraph', 'username'])
  import '/src/assets/css/main.css';
  import LikeButton from '/src/components/LikeButton.vue'
</script>

<template>
  <div>
    <h2>{{paragraph.title}}</h2>
    <p>{{ paragraph.content }}</p>
    <div class="mismo-renglon">

      <h3>{{ paragraph.author }}</h3>
      <Suspense>
        <LikeButton :id="paragraph.id" :username="username"/>
      </Suspense>
    </div>



  </div>

</template>

<style scoped>
  @import '/src/assets/css/main.css';
  .mismo-renglon{
    text-align: right;
    display: flex;
  }
  .button{
    float: right;
  }

</style>