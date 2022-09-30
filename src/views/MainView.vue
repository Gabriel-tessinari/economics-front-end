<template>
  <TheToast :show="toastShow" :severity="toastSeverity" :message="toastMessage"/>
  <div class="columns">
    <div class="column is-half">
      <div class="title">
        <p style="margin-bottom: 24px">Contas</p>
        <div class="columns" style="padding: 0;">
          <div class="column is-one-quarter" v-for="account in accounts" :key="account._id">
            <div class="card">
              <div class="card-content">
                <div class="content">
                  <p>{{account.description}}</p>
                </div>
              </div>
              <footer class="card-footer" style="border-top: none">
                <p :class="account.total < 0 ? 'red' : 'green'">
                  R${{account.total}}
                </p>
              </footer>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import TheToast from "@/components/TheToast.vue";
import accountService from "@/services/accounts.service";
import Account from '@/types/Account';

export default defineComponent({
  name: 'MainView',
  components: {
    TheToast
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
@import '../assets/scss/global.scss';

  .card {
    border: 1px solid black;

    .card-content {
      padding: .5rem;

      p {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }
  }

  .card-footer {
    justify-content: end;
    padding: .5rem;

    p {
      font-size: 1rem;
      font-weight: bold;
    }
  }

  .green {
    color: $green;
  }

  .red {
    color: $red;
  }
</style>