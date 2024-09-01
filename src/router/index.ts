import {createRouter, createWebHashHistory, Router} from 'vue-router';
import MainPage from '../views/MainPage.vue';
import ImageViewPage from '../views/ImageViewPage.vue';
import AboutPage from '../views/AboutPage.vue';
import SupportPage from '../views/SupportPage.vue';
import SkylandPage from '../views/additional/SkylandPage.vue';

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
