import { createRouter, createWebHistory } from '@ionic/vue-router';
import { RouteRecordRaw } from 'vue-router';
import HomePage from '../views/HomePage.vue'
import SignUpPage from '@/views/SignUpPage.vue';
import GeolocationPage from '@/views/GeolocationPage.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home'
  },
  {
    path: '/home',
    name: 'Home',
    component: HomePage
  },
  {
    path: '/signup', 
    name: 'SignUp',
    component: SignUpPage
  },
  {
    path: '/geolocation',
    name: 'Geolocation',
    component: GeolocationPage
  },

]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})

export default router
