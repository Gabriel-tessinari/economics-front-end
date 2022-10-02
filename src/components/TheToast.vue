<template>
  <transition name="toast">
    <div class="toast-wrapper" v-if="show">
      <div class="toast" :class="severity == 'error' ? 'toast-error' : 'toast-success'">
        {{message}}
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import { defineComponent } from "vue";

export default defineComponent({
  name: 'TheToast',
  props: {
    show: {
      require: true,
      type: Boolean
    },
    message: {
      require: true,
      type: String
    },
    severity: {
      require: true,
      type: String
    }
  }
});
</script>

<style lang="scss">
@import '../assets/scss/global.scss';

  .toast-enter-active {
    animation: wobble 0.5s ease;
  }

  .toast-leave-to {
    opacity: 0;
    transform: translateY(-60px);
  }

  .toast-leave-from {
    opacity: 1;
    transform: translateY(0);
  }

  .toast-leave-active {
    transition: all 0.3s ease;
  }

  @keyframes wobble {
    0% { opacity: 0; transform: translateY(-60px) }
    50% { opacity: 1; transform: translateY(0) }
    60% { transform: translateX(8px) }
    70% { transform: translateX(-8px) }
    80% { transform: translateX(4px) }
    90% { transform: translateX(-4px) }
    100% { transform: translateX(0px) }
  }

  .toast-wrapper {
    position: fixed;
    width: 100%;
    z-index: 10;
  }

  .toast {
    padding: 20px;
    color: white;
    border-radius: 4px;
    box-shadow: 1px 3px 5px rgba(0,0,0,0.2);
    max-width: 400px;
    margin: 0 auto;
  }

  .toast-error {
    background: $red;
  }

  .toast-success {
    background: $green;
  }
</style>