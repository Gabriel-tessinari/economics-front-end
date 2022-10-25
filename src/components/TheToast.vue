<template>
  <transition name="toast">
    <div class="toast-wrapper" v-if="show">
      <div class="toast" 
      :class="severity == 'error' ? 'toast-error' : severity == 'success' ? 'toast-success' : 'toast-warning'">
        <div class="toast-icon">
          <span class="material-symbols-rounded" v-if="severity == 'error'">error</span>
          <span class="material-symbols-rounded" v-if="severity == 'success'">check_circle</span>
          <span class="material-symbols-rounded" v-if="severity == 'warning'">warning</span>
        </div>
        <div class="toast-message">
          <p>{{message}}</p>
        </div>
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

<style scoped lang="scss">
@import '@/assets/scss/global.scss';

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
    z-index: 100;
  }

  .toast {
    border: 3px solid;
    border-radius: 4px;
    display: flex;
    margin: 0 auto;
    max-width: 40%;
    padding: 20px 20px 20px 0;

    .toast-icon {
      display: inline-block;
      padding: 0 20px;

      span {
        font-size: 2rem;
        vertical-align: middle;
      }
    }

    .toast-message {
      padding-top: 5px;
    }
  }

  .toast-error {
    background: $danger;
    border-color: $danger-dark;
    color: $danger-invert;
  }

  .toast-success {
    background: $success;
    border-color: $success-dark;
    color: $success-invert;
  }

  .toast-warning {
    background: $warning;
    border-color: $warning-dark;
    color: $warning-invert;
  }

  @media screen and (max-width: 768px) {
    .toast {
      max-width: 100%;
    }
  }
</style>