<template>
  <div class="columns" v-if="!loading">
    <div class="column is-full" v-if="!request.hasCategories()">
      <article class="message is-link">
        <div class="message-body">
          Não há categorias cadastradas.
        </div>
      </article>
    </div>
    <div class="column is-full" v-if="request.hasCategories()">
      <div class="tabs is-boxed">
        <ul>
          <li v-for="(category, index) in request.categories" :key="category._id"
          :class="index == activeTab ? 'is-active' : ''" @click="changeTab(index)">
            <a>
              <span>{{category.description}}</span>
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
  <div class="columns" v-if="!loading && request.hasCategories()">
    <div class="column is-half">
      <label class="label">Descrição</label>
      <input class="input is-warning" type="text" v-model="description" placeholder="Informe">
    </div>
    <div class="column is-half">
      <label class="label is-invisible">*</label>
      <button class="button is-warning is-fullwidth" @click="createSubcategory()"
      :disabled="!description">Adicionar</button>
    </div>
  </div>
  <div class="columns" v-if="!loading">
    <div class="column is-full" v-if="request.hasCategories() && !activeTabHasSubcategory()">
      <article class="message is-info">
        <div class="message-body">
          Não há subcategorias cadastradas.
        </div>
      </article>
    </div>
    <div class="column is-full" v-if="request.hasCategories() && activeTabHasSubcategory()">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control" v-for="(subcategory, index) in activeCategory.subcategories" 
        :key="subcategory._id">
          <div class="tags has-addons">
            <span class="tag is-medium" :class="index % 2 == 0 ? 'is-primary' : 'is-warning'">
              {{subcategory.description}}
            </span>
            <a class="tag is-delete is-medium"></a>
          </div>
        </div>
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
import { defineComponent, PropType, ref } from "vue";
import subcategoriesService from "@/services/subcategories.service";
import Subcategory from "@/types/Subcategory";
import SubcategoryListRequest from "@/types/SubcategoryListRequest";
import ToastRequest from "@/types/ToastRequest";
import Category from "@/types/Category";

export default defineComponent ({
  name: "MainViewSubcategoryList",
  emits: ['error', 'update'],
  props: {
    request: {
      require: true,
      type: Object as PropType<SubcategoryListRequest>
    }
  },
  setup(props, { emit }) {
    const loading = ref(false);
    const activeTab = ref(0);
    const description = ref('');
    const activeCategory = ref<Category>(
      new Category()
    );

    //functions
    const createSubcategory = async () => {
      let categoryId = activeCategory.value._id;

      if(categoryId) {
        toggleLoading();
        let subcategory: Subcategory = new Subcategory();
        subcategory.description = description.value;
        subcategory.categoryId = categoryId;
  
        await subcategoriesService.saveSubcategory(subcategory)
        .then(response => {
          description.value = '';
          addToList(response.data);
          toggleLoading();
        })
        .catch(err => {
          console.log(err);
          emit('error', new ToastRequest(err.response.status, err.response.data));
          toggleLoading();
        })
      }
    };

    const addToList = (subcategory: Subcategory) => {
      activeCategory.value.subcategories.push(subcategory);
      activeCategory.value.subcategories.sort((a, b) => a.compare(b));
      emit('update', activeCategory.value);
    };

    const activeTabHasSubcategory = () => {
      return activeCategory.value.subcategories.length > 0;
    };

    const changeTab = (index: number) => {
      activeTab.value = index;
      const category = props.request?.categories[activeTab.value];

      if(category) activeCategory.value = category;
      else activeCategory.value = new Category();
    };

    const toggleLoading = () => {
      loading.value = !loading.value;
    };

    return { activeCategory, activeTab, activeTabHasSubcategory, changeTab, createSubcategory, 
    description, loading }
  }
});
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