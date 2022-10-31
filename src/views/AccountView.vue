<template>
  <TheToast :request="toastRequest"/>
  <div class="tile is-ancestor content-height">
    <div class="tile is-12">
      <div class="tile is-parent">
        <article class="tile is-child notification is-info">
          <AccountViewHeader @error="(error) => showToast(error)"/>
        </article>
      </div>
    </div>
    <div class="tile is-12">
      <div class="tile is-parent">
        <article class="tile is-child notification is-cyan">
          <p class="title">Transações</p>
        </article>
      </div>
    </div>
  </div>
  <!-- <div class="columns">
    <div class="column is-one-quarter">
      <label class="label">Conta</label>
      <div class="select is-primary is-fullwidth">
        <select v-model="account">
          <option v-for="element in accounts" :key="element._id" :value="element">
            {{element.description}}
          </option>
        </select>
      </div>
    </div>
    <div class="column is-one-quarter">
      <label class="label">Mês</label>
      <div class="select is-primary is-fullwidth">
        <select v-model="month">
          <option value="01">Janeiro</option>
          <option value="02">Fevereiro</option>
          <option value="03">Março</option>
          <option value="04">Abril</option>
          <option value="05">Maio</option>
          <option value="06">Junho</option>
          <option value="07">Julho</option>
          <option value="08">Agosto</option>
          <option value="09">Setembro</option>
          <option value="10">Outubro</option>
          <option value="11">Novembro</option>
          <option value="12">Dezembro</option>
        </select>
      </div>
    </div>
    <div class="column is-one-quarter">
      <label class="label">Ano</label>
      <input class="input is-primary" type="text" v-model="year" placeholder="Ex.: 2022">
    </div>
    <div class="column is-one-quarter">
      <label class="label is-invisible">*</label>
      <button class="button is-primary is-fullwidth"
      :disabled="account._id == '' || month == '' || year == ''"
      @click="loadTransactions()">
        Carregar
      </button>
    </div>
  </div>
  
  <div class="container">
    <h1 class="title has-text-centered">
      <div class="columns">
        <div class="column is-one">
          {{title}}
        </div>
      </div>
      <div class="columns">
        <div class="column is-half">
          <button class="button is-primary is-fullwidth"
          :disabled="accounts.length == 0"
          @click="toggleAddModal()">
            Adicionar Transação
          </button>
        </div>
        <div class="column is-half">
          <button class="button is-primary is-fullwidth"
          :disabled="title == 'Tabela Vazia' || transactions.length == 0"
          @click="generateReport()">
            Gerar Relatório
          </button>
        </div>
      </div>
    </h1>
    
    <TransactionTable :transactions="transactions"
    v-if="transactions.length > 0"/>
  </div>

  <AccountViewTransactionModal :accounts="accounts" :showModal="showAddModal"
  @close="toggleAddModal()" @error="showToast('error', 'Algo de errado ocorreu. Tente novamente.')"/> -->
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import AccountViewHeader from "@/components/AccountViewHeader.vue";
import ToastRequest from '@/types/ToastRequest';

export default defineComponent({
  name: 'AccountView',
  inheritAttrs: false,
  components: {
    TheToast,
    AccountViewHeader
  },
  setup() {
    const showAddModal = ref(false);
    const toastRequest = ref<ToastRequest>(
      new ToastRequest()
    );

    //functions
    const showToast = (request: ToastRequest) => {
      request.config();
      request.toggleShow();
      toastRequest.value = request;
      setTimeout(() => toastRequest.value.toggleShow(), 5000);
    };

    const toggleAddModal = () => {
      showAddModal.value = !showAddModal.value;
    };

    const generateReport = () => {
      alert('Gera relatório.');
    }

    return { generateReport, showToast, toastRequest, toggleAddModal }
  }
});
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

  .notification.is-cyan {
    background-color: $cyan;
    color: $black-bis;
  }

  .tile.content-height {
    flex-direction: column;
  }
</style>