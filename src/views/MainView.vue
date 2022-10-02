<template>
  <TheToast :show="toastShow" :severity="toastSeverity" :message="toastMessage"/>
  <div class="columns">
    <div class="column is-half">
      <div class="title">
        <p style="margin-bottom: 24px">Contas</p>
        <MainViewAccountsCards :accounts="accounts"/>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import MainViewAccountsCards from "@/components/MainViewAccountsCards.vue";
import accountService from "@/services/accounts.service";
import Account from '@/types/Account';

export default defineComponent({
  name: 'MainView',
  components: {
    TheToast,
    MainViewAccountsCards
  },
  setup() {
    const accounts = ref<Account[]>([]);
    const toastMessage = ref('');
    const toastSeverity = ref('');
    const toastShow = ref(false);

    //functions
    const showToast = (severity: string, message: string) => {
      toastMessage.value = message;
      toastSeverity.value = severity;
      toastShow.value = true;
      setTimeout(() => toastShow.value = false, 5000);
    }

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

    return { accounts, loadAccounts, showToast, toastMessage, toastSeverity, toastShow }
  },
  mounted() {
    this.loadAccounts();
  }
});
</script>

<style lang="scss">

</style>