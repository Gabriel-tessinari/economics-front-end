<template>
  <TheNavbar/>
  <router-view/>
</template>

<script lang="ts">
import TheNavbar from '@/components/TheNavbar.vue';

export default {
  components: {
    TheNavbar
  }
}
</script>

<style lang="scss">
@charset "utf-8";
@import url('https://fonts.googleapis.com/css2?family=Nunito:wght@400;700&display=swap');
@import '../node_modules/bulma/bulma.sass';

#app {
  font-family: 'Nunito', sans-serif;
}
</style>
