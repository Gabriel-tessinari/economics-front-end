<script setup lang="ts">
import { ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import MainViewAccountList from "@/components/MainViewAccountList.vue";
import MainViewCategoryList from "@/components/MainViewCategoryList.vue";
import ToastRequest from '@/types/ToastRequest';

const toastRequest = ref<ToastRequest>(
  new ToastRequest()
);
</script>

<template>
  <TheToast :request="toastRequest"/>

  <div class="tile is-ancestor">
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-link">
          <p class="title">Contas</p>
          <MainViewAccountList @error="(error) => toastRequest.appear(error)"/>
        </article>
      </div>
    </div>
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning">
          <p class="title">Categorias</p>
          <MainViewCategoryList @error="(error) => toastRequest.appear(error)"/>
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

<style scoped lang="scss" src="./main-view.scss"></style>