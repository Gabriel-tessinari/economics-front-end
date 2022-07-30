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

</style>