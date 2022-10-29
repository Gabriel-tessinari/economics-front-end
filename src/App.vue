<template>
  <TheNavbar/>
  <router-view/>
  <footer class="footer">
    <div class="content has-text-centered">
      <p><strong>Economics</strong> by Gabriel Tessinari.</p>
    </div>
  </footer>
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
@import '@/assets/scss/global.scss';

</style>