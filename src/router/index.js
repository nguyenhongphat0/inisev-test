import { createRouter, createWebHashHistory } from 'vue-router'
import store from '../store'
import Home from '../pages/Home.vue'
import Login from '../pages/Login.vue'

const routes = [
    {
        path: '/',
        name: 'Home',
        component: Home,
    },
    {
        path: '/login',
        name: 'Login',
        component: Login,
    },
]

const router = createRouter({
    history: createWebHashHistory('/inisev-test/'),
    routes
})

router.beforeEach(async (to, from) => {
    const isAuthenticated = store.getters.isAuthenticated;
    if (
        // make sure the user is authenticated
        !isAuthenticated &&
        // ❗️ Avoid an infinite redirect
        to.name !== 'Login'
    ) {
        // redirect the user to the login page
        return { name: 'Login' }
    }
    if (
        isAuthenticated &&
        to.name === 'Login'
    ) {
        return { name: 'Home' }
    }
})

export default router
