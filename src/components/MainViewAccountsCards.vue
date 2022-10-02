<template>
  <div class="columns" style="padding: 0;">
    <div class="column is-one-quarter" v-for="account in accounts" :key="account._id">
      <div class="card">
        <div class="card-content">
          <div class="content">
            <p>{{account.description}}</p>
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

    return { totalFormat }
  }
})
</script>

<style lang="scss">
@import '@/assets/scss/global.scss';

  .card {
    border: 1px solid $black;

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
</style>