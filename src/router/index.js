import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import CategoriesView from '@/views/CategoriesView.vue'
import SalesView from '@/views/SalesView.vue'
import CartView from '@/views/CartView.vue'
import UserView from '@/views/UserView.vue'
import ProductsView from '@/views/ProductsView.vue'
import ProductPageView from '@/views/ProductPageView.vue'
import SignupLoginView from '@/views/SignupLoginView.vue'
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView
  },
  {
    path: '/categories',
    name: 'categories',
    component: CategoriesView
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    //component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/sales',
    name: 'sales',
    component: SalesView
  },
  {
    path: '/cart',
    name: 'cart',
    component: CartView
  },
  {
    path: '/user',
    name: 'user',
    component: UserView
  },
  {
    path: '/products',
    name: 'products',
    component: ProductsView
  },
  {
    path: '/productpage',
    name: 'productpage',
    component: ProductPageView
  }
  
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
