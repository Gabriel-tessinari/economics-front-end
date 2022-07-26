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
          <div class="column is-12">
            <p><strong>{{request.account.description}}</strong></p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-3">
            <label class="label">Dia /{{request.month}}/{{request.year}}</label>
            <input class="input is-primary" type="number" placeholder="01"
            min="1" max="31" v-model="form.day">
          </div>
          <div class="column is-9">
            <label class="label">Descrição</label>
            <input class="input is-primary" type="text" v-model="form.description">
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
            <input class="input is-primary" type="text" ref="inputRef" v-model="form.value"
            placeholder="Informe">
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
import { useCurrencyInput } from "vue-currency-input";
import categoriesService from "@/services/categories.service";
import transactionsService from "@/services/transactions.service";
import AccountViewTransactionModalRequest from "@/types/AccountViewTransactionModalRequest";
import Category from "@/types/Category";
import Transaction from "@/types/Transaction";
import ToastRequest from "@/types/ToastRequest";

export default defineComponent({
  name: 'AccountViewTransactionModal',
  emits: ['change', 'close', 'error', 'update', 'update:modelValue'],
  props: {
    request: {
      required: true,
      type: Object as PropType<AccountViewTransactionModalRequest>
    },
    showModal: {
      required: true,
      type: Boolean
    }
  },
  setup(props, { emit }) {
    const categories = ref<Category[]>([]);
    const form = ref<Form>(new Form());

    const { inputRef } = useCurrencyInput({
      currency: 'BRL',
      precision: 2,
      valueRange: { min: 0 },
      hideCurrencySymbolOnFocus: false,
      hideGroupingSeparatorOnFocus: false,
      hideNegligibleDecimalDigitsOnFocus: false,
      useGrouping: true
    });

    //functions
    const clean = () => {
      form.value = new Form();
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
      return (form.value.day != '' && form.value.categoryId != '' &&
      form.value.description != '' && form.value.value);
    };

    const saveTransaction = async () => {
      await transactionsService.saveTransaction(mapperRequest())
      .then(response => {
        emit('update', response.data);
        close();
      })
      .catch(err => {
        console.log(err);
        emit('error', new ToastRequest(err.response.status, err.response.data));
      })
    };

    const mapperRequest = (): Transaction => {
      let subcategoryId: string | undefined = undefined;
      let accountId = '';
      let date = '';

      form.value.formatValue();

      if(props.request.account._id) {
        accountId = props.request.account._id;
      }

      if(form.value.subcategoryId != '') {
        subcategoryId = form.value.subcategoryId;
      }

      if(!isNaN(parseInt(form.value.day))) {
        parseInt(form.value.day) < 10 ? 
        date = '0' + parseInt(form.value.day) + '/' + props.request.month + '/' + props.request.year :
        date = form.value.day + '/' + props.request.month + '/' + props.request.year
      }

      return {
        date: date,
        description: form.value.description,
        value: form.value.value,
        type: form.value.type,
        accountId: accountId,
        categoryId: form.value.categoryId,
        subcategoryId: subcategoryId
      }
    };

    return { categories, close, form, inputRef, isReadyToSave, loadCategories, 
    saveTransaction }
  },
  mounted() {
    this.loadCategories();
  }
});

class Form {
  day: string;
  description: string;
  categoryId: string;
  subcategoryId: string;
  type: string;
  value: number;

  constructor() {
    this.day = '';
    this.description = '';
    this.categoryId = '';
    this.subcategoryId = '';
    this.type = 'DEBIT';
    this.value = 0;
  }

  formatValue() {
    this.value = parseFloat(this.value.toString().split('$')[1].replace(',', '.'));
  }
}
</script>

<style lang="scss">

</style>