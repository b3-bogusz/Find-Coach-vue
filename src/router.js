import { createRouter, createWebHistory } from 'vue-router';

import CoachesList from './pages/coaches/CoachesList.vue'
import CoachDetails from './pages/coaches/CoachDetails.vue'
import CoachRegistration from './pages/coaches/CoachRegistration.vue'
import ContactCoach from './pages/requests/ContactCoach.vue'
import RequestsReceived from './pages/requests/RequestsReceived.vue'
import UserAuth from './pages/auth/UserAuth.vue'
import NotFound from './pages/NotFound.vue'
import store from './store/index.js'

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: '/',
            redirect: '/coaches',
        },
        {
            path: '/coaches',
            component: CoachesList,
        },
        {
            path: '/coaches/:id',
            component: CoachDetails,
            props: true,
            children: [
                {
                    path: 'contact',
                    component: ContactCoach,
                }
            ],
        },
        {
            path: '/register',
            component: CoachRegistration,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/requests',
            component: RequestsReceived,
            meta: {
                requiresAuth: true
            }
        },
        {
            path: '/auth',
            component: UserAuth,
            meta: {
                requiresUnAuth: true
            }
        },
        {
            path: '/:notFound(.*)',
            component: NotFound,
        }
    ]
});

router.beforeEach(function(to, _, next) {
    if (to.meta.requiresAuth && !store.getters.isAthenticated) {
        next('/auth');
    } else if (to.meta.requiresUnAuth && store.getters.isAthenticated) {
        next('/coaches');
    } else {
        next();
    }
})

export default router;