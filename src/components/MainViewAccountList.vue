<template>
  <div class="columns">
    <div class="column is-one-third">
      <label class="label">Nome</label>
      <input class="input is-primary" type="text" v-model="description"
      placeholder="Informe">
    </div>
    <div class="column is-one-third">
      <label class="label">Valor</label>
      <input class="input is-primary" type="text" ref="inputRef" v-model="total"
      placeholder="Informe">
    </div>
    <div class="column is-one-third">
      <label class="label is-invisible">*</label>
      <button class="button is-primary is-fullwidth" @click="createAccount()"
      :disabled="!description || total <= 0">Adicionar</button>
    </div>
  </div>
  <div class="columns">
    <div class="column is-half-desktop" v-for="account in accounts" :key="account._id">
      <div class="card" v-if="!loading">
        <header class="card-header">
          <p class="card-header-title">{{account.description}}</p>
          <button class="card-header-icon" @click="deleteAccount(account)">
            <span class="icon material-symbols-rounded">delete</span>
          </button>
        </header>
        <div class="card-content">
          <div class="content">
            <p>Último relatório gerado em 07/2022.</p>
          </div>
        </div>
        <footer class="card-footer" style="border-top: none">
          <p :class="account.total < 0 ? 'is-red-color' : 'is-green-color'">
            {{totalFormat(account.total)}}
          </p>
        </footer>
      </div>
    </div>
    <div class="column is-full" v-if="!loading && accounts.length == 0">
      <article class="message is-primary">
        <div class="message-body">
          Não há contas cadastradas.
        </div>
      </article>
    </div>
    <div class="column is-full" v-if="loading">
      <progress class="progress is-danger" max="100"></progress>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useCurrencyInput } from "vue-currency-input";
import accountService from "@/services/accounts.service";
import Account from '@/types/Account';
import ToastRequest from '@/types/ToastRequest';

export default defineComponent ({
  name: "MainViewAccountList",
  emits: ['error', 'change', 'update:modelValue'],
  setup(props, { emit }) {
    const loading = ref(false);
    const accounts = ref<Account[]>([]);
    const description = ref('');
    const total = ref(0);

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
    const loadAccounts = async () => {
      toggleLoading();
      await accountService.getAccounts()
      .then(response => {
        accounts.value = response.data;
        toggleLoading();
      })
      .catch(err => {
        console.log(err);
        emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };

    const createAccount = async () => {
      toggleLoading();
      await accountService.saveAccount(mapperRequest())
      .then(() => {
        description.value = '';
        total.value = 0;
        toggleLoading();
        loadAccounts();
      })
      .catch(err => {
        console.log(err);
        emit('error', new ToastRequest(err.response.status, err.response.data));
        toggleLoading();
      })
    };

    const mapperRequest = (): Account => {
      total.value = parseFloat(total.value.toString().split('$')[1].replace(',', '.'));
      
      return {
        description: description.value,
        total: total.value
      }
    };

    const totalFormat = (total: number) => {
      return 'R$' + total.toFixed(2).replace('.', ',');
    }

    const deleteAccount = async (account: Account) => {
      if(account._id) {
        toggleLoading();
        await accountService.deleteAccount(account._id)
        .then(() => {
          deleteFromList(account);
          toggleLoading();
        })
        .catch(err => {
          console.log(err);
          emit('error', new ToastRequest(err.response.status, err.response.data));
          toggleLoading();
        })
      }
    };

    const deleteFromList = (account: Account) => {
      const aux: Account[] = accounts.value.filter(item => {
        return item._id != account._id;
      });

      accounts.value = aux;
    };

    const toggleLoading = () => {
      loading.value = !loading.value;
    };

    return { accounts, createAccount, deleteAccount, description, inputRef, 
    loadAccounts, loading, total, totalFormat }
  },
  mounted() {
    this.loadAccounts();
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

  .columns {
    flex-wrap: wrap;
  }

  .card {
    border: 1px solid $white;

    header {
      background: $cyan;
      box-shadow: none;
      color: currentColor;
    }

    .card-header-title {
      font-size: 1rem;
    }

    .card-header-icon .icon {
      color: currentColor;
    }

    .card-content {
      padding: .5rem;

      p {
        font-size: 1rem;
        font-style: italic;
        font-weight: 400;
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
</style>