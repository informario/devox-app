import { createRouter, createMemoryHistory } from 'vue-router';
import Blog from '@/components/Blog.vue'
import LogInForm from '@/components/LogInForm.vue'
import SignUpForm from '@/components/SignUpForm.vue'

const routes = [
    {
      path: '/login',
      name: 'LogInForm',
      component: LogInForm
    },
    {
        path: '/signup',
        name: 'SignUpForm',
        component: SignUpForm
    },
    {
      path: '/blog',
      name: 'Blog',
      component: Blog,
      meta: { requiresAuth: true }
    },
    {
      path: '/',
      name: 'Home',
      component: Blog // Puedes redirigir a cualquier componente que desees como página principal
    },
  ];


const router = createRouter({
  history: createMemoryHistory(),
  routes
});


export default router;