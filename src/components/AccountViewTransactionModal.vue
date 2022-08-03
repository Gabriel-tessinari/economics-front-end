<template>
  <div :class="{'is-active': isActive}" class="modal">
    <div class="modal-background"></div>
    <div class="modal-content">
    <p>Modal</p>
    </div>
    <button class="modal-close is-large" aria-label="close"
    @click="close()"></button>
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
    const account = ref<Account>({
      _id: '',
      description: '',
      total: 0
    });
    const isActive = toRef(props, 'showModal');

    //functions
    const close = () => {
      emit('close');
    };

    return { account, close, isActive }
  }
});
</script>

<style>

</style>