<script setup lang="ts">
import { ref } from 'vue';

const isExpanded = ref(localStorage.getItem('is_expanded') === 'true');
const email = ref(localStorage.getItem('email'));

function toggleMenu() {
  isExpanded.value = !isExpanded.value;
  localStorage.setItem('is_expanded', isExpanded.value.toString());
}
</script>

<template>
  <aside class="d-flex flex-column bg-background-lighten overflow-hidden h-screen pa-4"
    :class="`${isExpanded && 'is-expanded'}`">
    <div class="logo mb-4">
      <img src="../assets/img/money.png" alt="Logo">
    </div>

    <div class="menu-toggle-wrap d-flex justify-end mb-4">
      <button class="menu-toggle" @click="toggleMenu()">
        <span class="material-symbols-outlined">keyboard_double_arrow_right</span>
      </button>
    </div>

    <h3 class="mb-2">MENU</h3>
    <div class="menu" v-if="email">
      <router-link class="button" to="/home">
        <span class="material-symbols-outlined">home</span>
        <span class="router-text">Home</span>
      </router-link>
      <router-link class="button" to="/credit-card">
        <span class="material-symbols-outlined">credit_card</span>
        <span class="router-text">Cartão de Crédito</span>
      </router-link>      
    </div>

    <div class="menu" v-if="!email">
      <router-link class="button" to="/">
        <span class="material-symbols-outlined">login</span>
        <span class="router-text">Login</span>
      </router-link>
    </div>
  </aside>
</template>

<style scoped lang="scss">
aside {
  transition: .2s ease-out;
  width: 4rem;

  .logo {
    img {
      width: 2rem;
    }
  }

  .menu-toggle-wrap {
    position: relative;
    top: 0;
    transition: .2s ease-out;

    .menu-toggle {
      transition: .2s ease-out;

      .material-symbols-outlined {
        font-size: 2rem;
        transition: .2s ease-out;
      }

      &:hover {
        .material-symbols-outlined {
          color: rgb(var(--v-theme-primary));
          transform: translateX(.5rem);
        }
      }
    }
  }

  .button .router-text {
    display: none;
    opacity: 0;
    transition: 0.3s ease-out;
  }

  h3 {
    opacity: 0;
    font-size: .875rem;
    transition: 0.3s ease-out;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: .5rem 1rem;
      transition: .2s ease-out;

      .material-symbols-outlined {
        font-size: 2rem;
      }

      .material-symbols-outlined, .router-text {
        transition: .2s ease-out;
        color: rgb(var(--v-theme-text-color));
      }

      &:hover, &.router-link-exact-active {
        background-color: rgb(var(--v-theme-background));

        .material-symbols-outlined, .router-text {
          color: rgb(var(--v-theme-primary));
        }
      }

      &.router-link-exact-active {
        border-right: 5px solid rgb(var(--v-theme-primary));
      }
    }
  }

  &.is-expanded {
    width: 300px;

    .menu-toggle-wrap {
      top: -3rem;

      .menu-toggle {
        transform: rotate(-180deg);
      }
    }

    h3 {
      opacity: 1
    }

    .button {
      .material-symbols-outlined {
        margin-right: 1rem;
      }

      .router-text {
        opacity: 1;
        display: flex;
      }
    }
  }

  @media (max-width: 768px) {
    position: fixed;
    z-index: 99;
  }
}
</style>