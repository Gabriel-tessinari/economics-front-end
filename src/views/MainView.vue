<template>
  <TheToast :show="toastShow" :severity="toastSeverity" :message="toastMessage"/>
  <div class="tile is-ancestor">
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-link">
          <p class="title">Contas</p>
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
              <button class="button is-primary is-fullwidth" @click="createAccount()"
              :disabled="!accountForm.description || !accountForm.total">
                Adicionar
              </button>
            </div>
          </div>
          <MainViewAccountsCards :accounts="accounts"/>
        </article>
      </div>
    </div>
    <div class="tile is-vertical is-6">
      <div class="tile is-parent">
        <article class="tile is-child notification is-warning">
          <p class="title">Categorias</p>
          <MainViewCategoryList @error="(error) => showToast(error.severity, error.message)"/>
        </article>
      </div>
      <div class="tile is-parent">
        <article class="tile is-child notification is-success">
          <p class="title">Subcategorias</p>
        </article>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheCurrencyInput from "@/components/TheCurrencyInput.vue";
import TheToast from "@/components/TheToast.vue";
import MainViewAccountsCards from "@/components/MainViewAccountsCards.vue";
import MainViewCategoryList from "@/components/MainViewCategoryList.vue";
import accountService from "@/services/accounts.service";
import Account from '@/types/Account';

export default defineComponent({
  name: 'MainView',
  components: {
    TheToast,
    TheCurrencyInput,
    MainViewAccountsCards,
    MainViewCategoryList
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

    return { accounts, accountForm, createAccount, loadAccounts,
    toastMessage, toastSeverity, toastShow, showToast }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>

<style scoped lang="scss">
  .tile.is-ancestor {
    margin: -12px 0 0;
  }
</style>