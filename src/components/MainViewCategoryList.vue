<template>
  <div class="columns">
    <div class="column is-half">
      <label class="label">Descrição</label>
      <input class="input is-info" type="text" v-model="description" placeholder="Informe">
    </div>
    <div class="column is-half">
      <label class="label is-invisible">*</label>
      <button class="button is-info is-fullwidth" @click="createCategory()"
      :disabled="!description">Adicionar</button>
    </div>
  </div>
  <div class="columns">
    <div class="column is-full" v-if="!loading && categories.length > 0">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control" v-for="(category, index) in categories" :key="category._id">
          <div class="tags has-addons">
            <span class="tag is-medium" :class="index % 2 == 0 ? 'is-link' : 'is-info'">
              {{category.description}}
            </span>
            <a class="tag is-delete is-medium" @click="deleteCategory(category)"></a>
          </div>
        </div>
      </div>
    </div>
    <div class="column is-full" v-if="!loading && categories.length == 0">
      <article class="message is-info">
        <div class="message-body">
          Não há categorias cadastradas.
        </div>
      </article>
    </div>
    <div class="column is-full" v-if="loading">
      <progress class="progress is-danger" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import Category from '@/types/Category';
import categoriesService from '@/services/categories.service';
import ToastRequest from '@/types/ToastRequest';

export default defineComponent ({
  name: "MainViewCategoryList",
  emits: ['error'],
  setup(props, { emit }) {
    const loading = ref(false);
    const categories = ref<Category[]>([]);
    const description = ref('');

    //functions
    const loadCategories = async () => {
      toggleLoading();
      await categoriesService.getCategories()
      .then(response => {
        categories.value = response.data;
        toggleLoading();
      })
      .catch(err => {
        console.log(err);
        emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };

    const createCategory = async () => {
      toggleLoading();
      let category: Category = {
        description: description.value
      };

      await categoriesService.saveCategory(category)
      .then(() => {
        description.value = '';
        toggleLoading();
        loadCategories();
      })
      .catch(err => {
        console.log(err);
        emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };
    
    const deleteCategory = async (category: Category) => {
      if(category._id) {
        toggleLoading();
        await categoriesService.deleteCategory(category._id)
        .then(() => {
          deleteFromList(category);
          toggleLoading();
        })
        .catch(err =>{
          console.log(err);
          emit('error', new ToastRequest(err.response.status, err.response.data));
          toggleLoading();
        })
      }
    };

    const deleteFromList = (category: Category) => {
      const aux: Category[] = categories.value.filter(item => {
        return item._id != category._id;
      });

      categories.value = aux;
    };

    const toggleLoading = () => {
      loading.value = !loading.value;
    };

    return { categories, createCategory, deleteCategory, description, loadCategories,
    loading }
  },
  mounted() {
    this.loadCategories();
  }
})
</script>

<style scoped lang="scss">
  .columns {
    flex-wrap: wrap;
  }
</style>