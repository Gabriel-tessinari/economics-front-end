<template>
  <div class="columns">
    <div class="column is-full" v-if="categories.length > 0">
      <div class="field is-grouped is-grouped-multiline">
        <div class="control" v-for="category in categories" :key="category._id">
          <div class="tags has-addons">
            <span class="tag is-link is-medium">{{category.description}}</span>
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
import { defineComponent, PropType } from 'vue';
import Category from '@/types/Category';

export default defineComponent ({
  name: "MainViewCategoryList",
  props: {
    categories: {
      require: true,
      type: Array as PropType<Category[]>
    }
  },
  setup(props, { emit }) {
    //functions
    const deleteCategory = (category: Category) => {
      alert('Deleta categoria: ' + category._id + ' ' + category.description);

      emit('error', {
        severity: 'error',
        message: category.description
      });
    };

    return { deleteCategory }
  }
})
</script>

<style scoped lang="scss">
  .columns {
    flex-wrap: wrap;
  }
</style>