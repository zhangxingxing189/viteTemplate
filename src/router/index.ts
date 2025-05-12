import { createRouter, createWebHistory } from 'vue-router';
import type { RouteRecordRaw } from 'vue-router';
import WorkshopList from '@/pages/WorkshopList.vue';
import StoreList from '@/pages/StoreList.vue';
import EmployeeList from '@/pages/EmployeeList.vue';
import ProductList from '@/pages/ProductList.vue';
import PartList from '@/pages/PartList.vue';
import FactoryList from '@/pages/FactoryList.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/factories',
    name: 'FactoryList',
    component: FactoryList
  },
  {
    path: '/workshops',
    name: 'WorkshopList',
    component: WorkshopList
  },
  {
    path: '/stores',
    name: 'StoreList',
    component: StoreList
  },
  {
    path: '/employees',
    name: 'EmployeeList',
    component: EmployeeList
  },
  {
    path: '/products',
    name: 'ProductList',
    component: ProductList
  },
  {
    path: '/parts',
    name: 'PartList',
    component: PartList
  }
];

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});

export default router;