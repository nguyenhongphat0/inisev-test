<template>
  <div class="login">
    <h3 class="login__title">Sign in to your account</h3>
    <form class="login__form" @submit.prevent="login">
      <input class="login__form--input" v-model="username" placeholder="Username" />
      <input class="login__form--input" type="password" v-model="password" placeholder="Password" />
      <span v-if="loginError" class="login__message login__message--invalid">{{ loginError }}</span>
      <button class="login__form--button">Sign in</button>
    </form>
  </div>
</template>

<script setup>
import { useStore } from 'vuex'
import { ref } from 'vue'
import { computed } from '@vue/reactivity';

const store = useStore()
const username = ref('')
const password = ref('')

const loginError = computed(() => store.getters.loginError)

const login = () => {
  store.dispatch('login', { username: username.value, password: password.value })
}
</script>

<style lang="scss">
.login {
  width: 100%;
  height: 100%;
  flex-direction: column;
  display: flex;
  justify-content: center;
  align-items: center;
  &__title {
    text-transform: uppercase;
  }
  &__message {
    &--invalid {
      color: red;
      font-size: x-small;
    }
  }
  &__form {
    display: flex;
    flex-direction: column;
    &--input {
      background: whitesmoke;
      padding: 12px 24px;
      margin: 4px 0;
      width: 200px;
      border-radius: 12px;
      border: none;
      color: gray;
      &:hover,
      &:focus {
        background: #e9e4f0;
      }
    }
    &--button {
      background: #b993d6; /* fallback for old browsers */
      background: -webkit-linear-gradient(
        to right,
        #8ca6db,
        #b993d6
      ); /* Chrome 10-25, Safari 5.1-6 */
      background: linear-gradient(
        to right,
        #8ca6db,
        #b993d6
      ); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
      padding: 12px 24px;
      margin: 18px 0;
      border-radius: 12px;
      border: none;
      color: white;
      font-weight: bold;
      text-transform: uppercase;
      cursor: pointer;
      &:hover {
        background: #8ca6db;
      }
    }
  }
}
</style>