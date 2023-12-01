<script setup lang="ts">
import { onMounted, PropType, ref, watch } from 'vue';
import { shared } from '../../stores/shared.store';
import Account from '../../models/account';

const props = defineProps({
  accounts: Object as PropType<Account[]>
});

const emit = defineEmits(['select']);

const accountSearch = ref('');
const filteredAccounts = ref<Account[]>([]);

onMounted(() => {
  if(props.accounts) {
    filteredAccounts.value = props.accounts;
  }
});

watch(() => props.accounts, () => {
  if(props.accounts) {
    filteredAccounts.value = props.accounts;
  }
});

function search() {
  if(accountSearch.value == '') filteredAccounts.value = props.accounts || [];
  else filteredAccounts.value = props.accounts?.filter(account => 
    account.name.toLowerCase().includes(accountSearch.value.toLowerCase())) || [];  
}

function selectAccount(account: Account) {
  emit('select', account);
}
</script>

<template>
  <v-card variant="tonal" class="bg-background-lighten" width="25%" height="100%">
    <div class="pa-5">
      <v-text-field v-model="accountSearch" label="Pesquisar" variant="outlined"
      v-on:keyup="search()">
      </v-text-field>
    </div>
    <div class="account d-flex flex-column pa-5" v-for="account in filteredAccounts"
    @click="selectAccount(account)">
      <p class="name">{{ account.name }}</p>
      <p class="total">{{ shared.maskReal(account.total) }}</p>
    </div>
  </v-card>
</template>

<style lang="scss">
.account {
  border-bottom: 1px solid rgb(var(--v-theme-text-color));
  cursor: pointer;
  font-weight: 300;
  height: 90px;
  max-width: 100%;
  width: 100%;

  .name {
    display: flex;
    flex-wrap: nowrap;
    font-size: larger;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .total {
    display: flex;
    justify-content: end;
  }

  &:hover {
    background-color: rgb(var(--v-theme-background));
  }
}
</style>