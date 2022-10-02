<template>
  <TheToast :show="toastShow" :severity="toastSeverity" :message="toastMessage"/>
  <div class="columns">
    <div class="column is-half">
      <div class="title">
        <div class="columns">
          <div class="column is-full">
            <p>Contas</p>
          </div>
        </div>
        <div class="columns">
          <div class="column is-one-third">
            <label class="label">Nome</label>
            <input class="input is-primary" type="text" v-model="accountForm.description">
          </div>
          <div class="column is-one-third">
            <label class="label">Valor</label>
            <TheCurrencyInput v-model="accountForm.total"/>
          </div>
          <div class="column is-one-third">
            <label class="label is-invisible">*</label>
            <button class="button is-primary is-fullwidth" @click="createAccount()">
              Adicionar
            </button>
          </div>
        </div>
        <div class="columns">
          <div class="column is-full">
            <MainViewAccountsCards :accounts="accounts"/>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheCurrencyInput from "@/components/TheCurrencyInput.vue";
import TheToast from "@/components/TheToast.vue";
import MainViewAccountsCards from "@/components/MainViewAccountsCards.vue";
import accountService from "@/services/accounts.service";
import Account from '@/types/Account';

export default defineComponent({
  name: 'MainView',
  components: {
    TheToast,
    TheCurrencyInput,
    MainViewAccountsCards
  },
  setup() {
    const accounts = ref<Account[]>([]);
    const accountForm = ref({
      description: '',
      total: 0
    });
    const toastMessage = ref('');
    const toastSeverity = ref('');
    const toastShow = ref(false);

    //functions
    const clean = () => {
      accountForm.value = {
        description: '',
        total: 0
      };
    };

    const showToast = (severity: string, message: string) => {
      toastMessage.value = message;
      toastSeverity.value = severity;
      toastShow.value = true;
      setTimeout(() => toastShow.value = false, 5000);
    };

    const createAccount = () => {
      alert('Conta: ' + accountForm.value.description + ' Valor: ' + accountForm.value.total);
      clean();
    };

    const loadAccounts = async () => {
      await accountService.getAccounts()
      .then(response => {
        accounts.value = response.data;
      })
      .catch(err => {
        console.log(err);
        showToast('error', 'Algo de errado ocorreu. Tente novamente.');
      })
    };

    return { accounts, accountForm, clean, createAccount, loadAccounts, showToast, toastMessage, toastSeverity, toastShow }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>

<style lang="scss">

</style>