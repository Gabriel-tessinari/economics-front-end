<template>
  <div :class="{'is-active': showModal}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-card">
      <header class="modal-card-head">
        <p class="modal-card-title">Transação</p>
        <button class="delete" aria-label="close" @click="close()"></button>
      </header>
      <section class="modal-card-body">
        <div class="columns">
          <div class="column is-one-half">
            <label class="label">Conta</label>
            <div class="select is-primary is-fullwidth">
              <select v-model="form.accountId">
                <option v-for="element in accounts" :key="element._id" :value="element._id">
                  {{element.description}}
                </option>
              </select>
              <small v-if="accounts.length == 0">Erro ao carregar lista de contas.</small>
            </div>
          </div>
          <div class="column is-one-half">
            <label class="label">Data</label>
            <input class="input is-primary" type="text" placeholder="DD/MM/AAAA"
            v-model="form.date">
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-half">
            <label class="label">Categoria</label>
            <div class="select is-primary is-fullwidth">
              <select v-model="form.categoryId">
                <option v-for="element in categories" :key="element._id" :value="element._id">
                  {{element.description}}
                </option>
              </select>
              <small v-if="categories.length == 0">Erro ao carregar lista de categorias.</small>
            </div>
          </div>
          <div class="column is-one-half">
            <label class="label">Subcategoria</label>
            <input class="input is-primary" type="text" placeholder="Select Subcategoria">
          </div>
        </div>
        <div class="columns">
          <div class="column is-one">
            <label class="label">Descrição</label>
            <input class="input is-primary" type="text" v-model="form.description">
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-half">
            <label class="label">Tipo</label>
            <div class="select is-primary is-fullwidth">
              <select v-model="form.type">
                <option value="DEBIT">Despesa</option>
                <option value="CREDIT">Renda</option>
              </select>
            </div>
          </div>
          <div class="column is-one-half">
            <label class="label">Valor</label>
            <TheCurrencyInput v-model="form.value"/>
          </div>
        </div>
      </section>
      <footer class="modal-card-foot" style="justify-content: end">
        <button class="button is-danger" @click="close()">Cancelar</button>
        <button class="button is-success" @click="saveTransaction()"
        :disabled="!isReadyToSave()">Salvar</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref } from "vue";
import TheCurrencyInput from "./TheCurrencyInput.vue";
import categoriesService from "@/services/categories.service";
import transactionsService from "@/services/transactions.service";
import Account from "@/types/Account";
import Category from "@/types/Category";
import Transaction from "@/types/Transaction";

export default defineComponent({
  name: 'AccountViewTransactionModal',
  components: {
    TheCurrencyInput
  },
  props: {
    accounts: {
      required: true,
      type: Array as PropType<Account[]>
    },
    showModal: {
      required: true,
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const categories = ref<Category[]>([]);
    const form = ref({
      accountId: '',
      date: '',
      categoryId: '',
      subcategoryId: '',
      description: '',
      type: 'DEBIT',
      value: 0
    });

    //functions
    const clean = () => {
      form.value = {
        accountId: '',
        date: '',
        categoryId: '',
        subcategoryId: '',
        description: '',
        type: 'DEBIT',
        value: 0
      };
    };

    const close = () => {
      clean();
      emit('close');
    };

    const loadCategories = async () => {
      await categoriesService.getCategories()
      .then(response => {
        categories.value = response.data;
      })
      .catch(err => {
        console.log(err);
      })
    };

    const isReadyToSave = () => {
      return (form.value.accountId != '' && form.value.date != '' && form.value.categoryId != '' &&
      form.value.description != '' && form.value.value > 0);
    };

    const saveTransaction = async () => {
      await transactionsService.saveTransaction(mapperRequest())
      .then(() => {
        alert('Salvo com sucesso.');
        close();
      })
      .catch(err => {
        console.log(err);
        emit('error');
      })
    };

    const mapperRequest = (): Transaction => {
      let subcategoryId: string | undefined = undefined;

      if(form.value.subcategoryId != '') {
        subcategoryId = form.value.subcategoryId;
      }

      return {
        date: form.value.date,
        description: form.value.description,
        value: form.value.value,
        type: form.value.type,
        accountId: form.value.accountId,
        categoryId: form.value.categoryId,
        subcategoryId: subcategoryId
      }
    };

    return { categories, close, form, isReadyToSave, loadCategories, saveTransaction }
  },
  mounted() {
    this.loadCategories();
  }
});
</script>

<style lang="scss">

</style>