<template>
  <div class="columns">
    <div class="column is-full" v-if="categories.length > 0">
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
    <div class="column is-full" v-if="categories.length == 0">
      <article class="message is-info">
        <div class="message-body">
          Não há categorias cadastradas.
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from 'vue';
import Category from '@/types/Category';
import categoriesService from '@/services/categories.service';

export default defineComponent ({
  name: "MainViewCategoryList",
  setup(props, { emit }) {
    const categories = ref<Category[]>([]);

    //functions
    const loadCategories = async () => {
      await categoriesService.getCategories()
      .then(response => {
        categories.value = response.data;
      })
      .catch(err => {
        console.log(err);
        emit('error', {
          severity: 'error',
          message: 'Algo de errado ocorreu. Tente novamente.'
        });
      })
    };
    
    const deleteCategory = (category: Category) => {
      alert('Deleta categoria: ' + category._id + ' ' + category.description);
    };

    return { categories, deleteCategory, loadCategories }
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