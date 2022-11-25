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
          <MainViewCategoryList @error="(error) => toastRequest.appear(error)"
          @update="(categories) => subcategoryRequest.setCategories(categories)"/>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <p class="title">Subcategorias</p>
          <MainViewSubcategoryList :request="subcategoryRequest"
          @error="(error) => toastRequest.appear(error)"
          @update="(category) => 
          subcategoryRequest.setSubcategories(category.subcategories, category._id)"/>
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
import MainViewSubcategoryList from "@/components/MainViewSubcategoryList.vue";
import ToastRequest from '@/types/ToastRequest';
import SubcategoryListRequest from '@/types/SubcategoryListRequest';

export default defineComponent({
  name: 'MainView',
  inheritAttrs: false,
  components: {
    TheToast,
    MainViewAccountList,
    MainViewCategoryList,
    MainViewSubcategoryList
  },
  setup() {
    const toastRequest = ref<ToastRequest>(
      new ToastRequest()
    );
    const subcategoryRequest = ref<SubcategoryListRequest>(
      new SubcategoryListRequest()
    );

    return { subcategoryRequest, toastRequest }
  }
});
</script>

<style scoped lang="scss">
  
</style>