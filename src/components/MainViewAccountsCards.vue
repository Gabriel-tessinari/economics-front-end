<template>
  <div class="columns" style="padding: 0;">
    <div class="column is-one-quarter" v-for="account in accounts" :key="account._id">
      <div class="card">
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
    <div class="column is-full">
      <article class="message is-warning" v-if="accounts.length == 0">
        <div class="message-body">
          Não há contas cadastradas.
        </div>
      </article>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import Account from '@/types/Account';

export default defineComponent ({
  name: "MainViewAccountsCards",
  props: {
    accounts: {
      require: true,
      type: Array
    }
  },
  setup() {
    //functions
    const totalFormat = (total: number) => {
      return 'R$' + total.toFixed(2);
    }

    const deleteAccount = (account: Account) => {
      alert('Deleta conta: ' + account._id);
    };

    return { deleteAccount, totalFormat }
  }
})
</script>

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

  .card {
    border: 1px solid $black;

    .card-header-title {
      font-size: 1rem;
    }

    .card-header-icon .icon {
      color: $red;
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