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
            <div class="select is-success is-fullwidth">
              <select v-model="form.accountId">
                <option v-for="element in accounts" :key="element._id" :value="element._id">
                  {{element.description}}
                </option>
              </select>
            </div>
          </div>
          <div class="column is-one-half">
            <label class="label">Data</label>
            <input class="input is-success" type="text" placeholder="DD/MM/AAAA"
            v-model="form.date">
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-half">
            <label class="label">Categoria</label>
            <input class="input is-success" type="text" placeholder="Select Categoria">
          </div>
          <div class="column is-one-half">
            <label class="label">Subcategoria</label>
            <input class="input is-success" type="text" placeholder="Select Subcategoria">
          </div>
        </div>
        <div class="columns">
          <div class="column is-one">
            <label class="label">Descrição</label>
            <input class="input is-success" type="text" v-model="form.description">
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-half">
            <label class="label">Tipo</label>
            <div class="select is-success is-fullwidth">
              <select v-model="form.type">
                <option value="DEBIT">Despesa</option>
                <option value="CREDIT">Renda</option>
              </select>
            </div>
          </div>
          <div class="column is-one-half">
            <label class="label">Valor</label>
            <input class="input is-success" type="text" v-model="form.value">
          </div>
        </div>
      </section>
      <footer class="modal-card-foot">
        <button class="button is-success" @click="saveTransaction()">Salvar</button>
        <button class="button is-danger" @click="close()">Cancelar</button>
      </footer>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType, ref, toRef } from "vue";
import Account from "@/types/Account";

export default defineComponent({
  name: 'AccountViewTransactionModal',
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

    const saveTransaction = () => {
      alert('Salvar');
    }

    return { clean, close, form, saveTransaction }
  }
});
</script>

<style lang="scss">

</style>