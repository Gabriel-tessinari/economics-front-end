<template>
  <TheToast :request="toastRequest"/>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-link">
          <p class="title">Contas</p>
          <MainViewAccountList @error="(error) => showToast(error)"/>
        </article>
      </div>
    </div>
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning">
          <p class="title">Categorias</p>
          <MainViewCategoryList @error="(error) => showToast(error)"/>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <p class="title">Subcategorias</p>
        </article>
      </div>
    </div>
    <div class="tile is-12">
      <div class="tile is-parent">
        <article class="tile is-child notification is-danger">
          <p class="title">Cartões</p>
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
import ToastRequest from '@/types/ToastRequest';

export default defineComponent({
  name: 'MainView',
  components: {
    TheToast,
    MainViewAccountList,
    MainViewCategoryList
  },
  setup() {
    const toastRequest = ref<ToastRequest>(
      new ToastRequest()
    );

    //functions
    const showToast = (request: ToastRequest) => {
      request.config();
      request.toggleShow();
      toastRequest.value = request;
      setTimeout(() => toastRequest.value.toggleShow(), 5000);
    };

    return { showToast, toastRequest }
  }
});
</script>

<style scoped lang="scss">
  .tile.is-ancestor {
    margin: -12px 0 0;
    flex-wrap: wrap;
  }
</style>