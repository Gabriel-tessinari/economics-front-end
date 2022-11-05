<template>
  <div class="columns" v-if="!loading">
    <div class="column is-full" v-if="!hasTabs()">
      <article class="message is-link">
        <div class="message-body">
          Não há subcategorias cadastradas.
        </div>
      </article>
    </div>
    <div class="column is-full" v-if="hasTabs()">
      <div class="tabs is-boxed">
        <ul>
          <li v-for="tab in tabs" :key="tab.category._id"
          :class="isActive ? 'is-active' : ''">
            <a>
              <span>{{tab.category.description}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="columns">
    <div class="column is-full" v-if="loading">
      <progress class="progress is-warning" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import categoriesService from "@/services/categories.service";
import subcategoriesService from "@/services/subcategories.service";
import Category from "@/types/Category";
import Subcategory from "@/types/Subcategory";

export default defineComponent ({
  name: "MainViewSubcategoryList",
  setup() {
    const loading = ref(false);
    const tabs = ref<TabContent[]>([]);
    const subcategories = ref<Subcategory[]>([]);
    const categories = ref<Category[]>([]);

    //functions
    const loadCategories = async () => {
      toggleLoading();
      await categoriesService.getCategories()
      .then(response => {
        categories.value = response.data;
        toggleLoading();
        loadSubcategories();
      })
      .catch(err => {
        console.log(err);
        //emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };

    const loadSubcategories = async () => {
      toggleLoading();
      await subcategoriesService.getSubcategories()
      .then(response => {
        subcategories.value = response.data;
        setTabs();
        toggleLoading();
      })
      .catch(err => {
        console.log(err);
        //emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };

    const setTabs = () => {
      setTabsCategories();
    };

    const setTabsCategories = () => {
      categories.value.forEach(item => {
        let tab = new TabContent();
        tab.setCategory(item);
        tabs.value.push(tab);
      });
    };

    const hasTabs = () => {
      return tabs.value.length > 0;
    };

    const toggleLoading = () => {
      loading.value = !loading.value;
    };

    return { hasTabs, loading, loadCategories, loadSubcategories, tabs }
  },
  mounted() {
    this.loadCategories();
  }
});

class TabContent {
  category: Category;
  subcategories: Subcategory[];
  isActive: boolean;

  constructor() {
    this.category = new Category();
    this.subcategories = [];
    this.isActive = false;
  }

  setCategory(category: Category) {
    this.category = category;
  }

  push(subcategory: Subcategory) {
    this.subcategories.push(subcategory);
  }

  toggleIsActive() {
    this.isActive = !this.isActive;
  }
}
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

  .tabs {
    a {
      text-decoration: none !important;
    }

    &.is-boxed {
      a:hover {
       background: $success-dark;
      }

      li.is-active a {
        background: $success;
      }
    }
  }
</style>