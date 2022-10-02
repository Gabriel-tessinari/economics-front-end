<template>
  <nav class="navbar is-dark is-transparent is-expanded">
    <div class="navbar-brand">
      <a class="navbar-item" href="">
        <img src="@/assets/img/money.png" alt="Money image" height="28">
      </a>
      <div class="navbar-burger" data-target="menu">
        <span></span>
        <span></span>
        <span></span>
      </div>
    </div>

    <div class="navbar-menu" id="menu">
      <div class="navbar-start">
        <router-link class="navbar-item" to="/account">
          Extrato Contas
        </router-link>
        <router-link class="navbar-item" to="/card">
          Fatura Cartões
        </router-link>
      </div>
    </div>
  </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
  name: 'TheNavbar'
});

document.addEventListener('DOMContentLoaded', () => {
  const $navbarBurgers = Array.prototype.slice.call(
    document.querySelectorAll('.navbar-burger'), 0);

  $navbarBurgers.forEach( el => {
    el.addEventListener('click', () => {
      const target = el.dataset.target;
      const $target = document.getElementById(target);
      
      el.classList.toggle('is-active');
      $target?.classList.toggle('is-active');
    });
  });
});
</script>

<style lang="scss">
  .navbar {
    margin-bottom: 1rem;
  }
</style>