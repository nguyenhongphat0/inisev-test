<template>
    <div class="modal">
        <div @click="visible = true" class="modal__trigger">
            <slot name="trigger"></slot>
        </div>
        <transition name="slide-fade">
            <div v-if="visible" class="modal__overlay" @click="visible = false">
                <slot></slot>
            </div>
        </transition>
    </div>
</template>

<script setup>
import { ref } from 'vue';

const visible = ref(false);
</script>

<style lang="scss" scoped>
.modal {
    &__trigger {
        width: 100%;
        height: 100%;
    }
    .modal__overlay {
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        z-index: 100;
        display: flex;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        .modal__content {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            padding: 1rem;
        }
    }
}
.slide-fade-enter-active,
.slide-fade-leave-active {
    transition: all 0.3s ease-out;
}

.slide-fade-enter-from,
.slide-fade-leave-to {
    transform: translateX(20px);
    opacity: 0;
}
</style>