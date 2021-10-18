// import Vue from 'vue';
import Vue from 'vue';
import VueRouter from 'vue-router';
import LoginPage from '../components/LoginPage.vue';
import Customers from '../components/Customers.vue';

Vue.use (VueRouter);

const routes = new VueRouter ({
  mode: 'history',
  routes: [
    {
      path: '/login',
      name: 'loginPage',
      component: LoginPage,
    },
    {
      path: '/customers',
      component: Customers,
    },
  ],
});

export default routes;
