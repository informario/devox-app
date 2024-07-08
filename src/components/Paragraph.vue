<script setup>
  const props = defineProps(['paragraph'])
  import '/src/assets/css/main.css';
</script>

<template>
  <div>

    <h2>{{paragraph.title}}</h2>
    <p>{{ paragraph.content }}</p>
    <h3>{{ paragraph.author }}</h3>

  </div>

</template>

<style scoped>
  @import '/src/assets/css/main.css';

</style>