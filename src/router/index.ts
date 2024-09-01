import {createRouter, createWebHashHistory, Router} from 'vue-router';
import MainPage from '../views/MainPage.vue';

const router: Router = createRouter({
    history: createWebHashHistory('/web'),
    routes: [
        {
            path: '/',
            name: 'Main',
            component: MainPage
        }
    ]
});

export default router;
