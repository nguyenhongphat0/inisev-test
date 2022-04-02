<template>
  <div class="home">
    <div class="sidebar">
      <div class="sidebar__title">
        <h1>INISEV</h1>
      </div>
      <div class="sidebar__menu">
        <router-link class="sidebar__link" to="#">Home</router-link>
        <router-link class="sidebar__link" to="#">About</router-link>
        <router-link class="sidebar__link" to="#">Contact</router-link>
      </div>
      <div class="sidebar__trailing">
        <router-link class="sidebar__link" to="#" @click="logout">Logout</router-link>
      </div>
    </div>
    <div class="content">
      <h1 class="title">Users</h1>
      <div class="grid">
        <div v-if="loading">Loading users...</div>
        <template v-else>
          <Modal v-for="user in users" class="user">
            <template #trigger>
              <div class="user__avatar" :style="{ 'background-image': `url(${user.image})` }"></div>
              <div class="user__info">
                <div class="user__info--email">✉️</div>
                <h3 class="user__info--name">{{ user.name }}</h3>
                <h4 class="user__info--address">{{ user.address.city }}</h4>
              </div>
            </template>
            <div class="user__detail">
              <img class="user__detail--avatar" :src="user.image" :alt="user.name" />
              <div class="user__detail--info">
                <div class="user__detail--info--block">
                  <div class="user__detail--info--icon">👤</div>
                  <div class="user__detail--info--content">{{ user.name }}</div>
                </div>
                <div class="user__detail--info--block">
                  <div class="user__detail--info--icon">✉️</div>
                  <div class="user__detail--info--content">{{ user.email }}</div>
                </div>
                <div class="user__detail--info--block">
                  <div class="user__detail--info--icon">📞</div>
                  <div class="user__detail--info--content">{{ user.phone }}</div>
                </div>
                <div class="user__detail--info--block">
                  <div class="user__detail--info--icon">🏠</div>
                  <div
                    class="user__detail--info--content"
                  >{{ user.address.street }}, {{ user.address.city }}</div>
                </div>
                <div class="user__detail--info--block">
                  <div class="user__detail--info--icon">🌐</div>
                  <div class="user__detail--info--content">{{ user.website }}</div>
                </div>
              </div>
            </div>
          </Modal>
        </template>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue';
import { useStore } from 'vuex';
import Modal from '../components/Modal.vue'

const store = useStore();
const loading = computed(() => store.getters.loadingUsers);
const users = computed(() => store.getters.users);
onMounted(() => {
  store.dispatch('loadUsers');
});

const logout = () => {
  store.dispatch('logout');
};
</script>

<style lang="scss" scoped>
.home {
  display: flex;
  .sidebar {
    flex: none;
    flex-basis: 200px;
    background: #e9e4f0;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 1rem;
    &__title {
      text-transform: uppercase;
    }
    &__link {
      text-transform: uppercase;
      font-size: large;
      padding: 0.5rem;
      text-underline-offset: 4px;
      color: gray;
      &:hover {
        color: #000;
      }
    }
    &__menu {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
    &__trailing {
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      align-items: center;
    }
  }
  .content {
    flex: 1;
    height: 100vh;
    overflow: auto;
    .grid {
      display: flex;
      flex-wrap: wrap;
      justify-content: center;
      align-items: center;
      padding: 0.5rem;
      .user {
        flex: 1 0 21%;
        margin: 5px;
        width: 100%;
        height: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;
        &__info {
          position: absolute;
          top: 0;
          left: 0;
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
          text-align: center;
          border-radius: 12px;
          background-color: rgba($color: #000000, $alpha: 0.5);
          cursor: pointer;
          opacity: 0;
          transition: opacity 0.2s ease-in-out;

          &:hover {
            opacity: 1;
          }

          &--email {
            font-size: 1.5rem;
            position: absolute;
            right: 4px;
            top: 4px;
          }
          &--name {
            font-weight: bold;
            color: white;
            margin: 0;
            margin-bottom: 0.25rem;
          }
          &--address {
            font-weight: normal;
            color: white;
            font-size: small;
            margin: 0;
          }
        }
        &__avatar {
          width: 100%;
          height: 0;
          padding-bottom: calc(100% * 4 / 3);
          border-radius: 12px;
          background-size: cover;
        }
        &__detail {
          height: 50%;
          width: 70%;
          max-width: 800px;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          background-color: white;
          &--avatar {
            width: 30%;
            height: 100%;
            border-radius: 12px;
            object-fit: cover;
          }
          &--info {
            width: 100%;
            display: flex;
            flex-direction: column;
            justify-content: center;
            &--block {
              width: 100%;
              display: flex;
              align-items: center;
              margin: 6px 32px;
            }
            &--icon {
              width: 30px;
              height: 30px;
              border-radius: 100%;
              background-color: whitesmoke;
              box-shadow: 0 0 5px gray;
              display: flex;
              justify-content: center;
              align-items: center;
            }
            &--content {
              padding: 0 12px;
            }
          }
        }
      }
    }
  }
  .title {
    text-align: right;
    text-transform: uppercase;
    font-size: large;
    padding: 0.5rem;
    color: gray;
    position: relative;
    &::after {
      content: "";
      position: absolute;
      right: 0;
      display: block;
      width: 50px;
      height: 3px;
      background: #e9e4f0;
    }
  }
}
</style>