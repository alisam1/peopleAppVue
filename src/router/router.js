import Vue from 'vue'
import Router from 'vue-router'

import MainPage from '../pages/MainPage'
import Card from '../pages/Card'

Vue.use(Router)

const router = new Router({
    mode: 'history',
    routes: [
        {
            path: '/',
            component: MainPage,
        },
        {
            path: '/:id', 
            name: 'card',
            component: Card
        }
    ]
})

export default router;