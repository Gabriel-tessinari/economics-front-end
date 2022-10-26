<template>
  <TheToast :show="toastShow" :severity="toastSeverity" :message="toastMessage"/>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-link">
          <p class="title">Contas</p>
          <MainViewAccountList @error="(error) => showToast(error.severity, error.message)"/>
        </article>
      </div>
    </div>
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning">
          <p class="title">Categorias</p>
          <MainViewCategoryList @error="(error) => showToast(error.severity, error.message)"/>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <p class="title">Subcategorias</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import MainViewAccountList from "@/components/MainViewAccountList.vue";
import MainViewCategoryList from "@/components/MainViewCategoryList.vue";

export default defineComponent({
  name: 'MainView',
  components: {
    TheToast,
    MainViewAccountList,
    MainViewCategoryList
  },
  setup() {
    const toastMessage = ref('');
    const toastSeverity = ref('');
    const toastShow = ref(false);

    //functions
    const showToast = (severity: string, message: string) => {
      toastMessage.value = message;
      toastSeverity.value = severity;
      toastShow.value = true;
      setTimeout(() => toastShow.value = false, 5000);
    };

    return { showToast, toastMessage, toastSeverity, toastShow }
  }
});
</script>

<style scoped lang="scss">
  .tile.is-ancestor {
    margin: -12px 0 0;
  }
</style>