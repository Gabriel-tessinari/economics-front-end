<template>
  <input class="input is-primary" type="text" ref="inputRef">
</template>

<script lang="ts">
import { useCurrencyInput } from "vue-currency-input";

export default {
  name: 'TheCurrencyInput',
  setup() {
    const { inputRef } = useCurrencyInput({
      currency: 'BRL',
      precision: 2,
      valueRange: { min: 0 }
    });

    return { inputRef }
  }
}
</script>

<style lang="scss">

</style>