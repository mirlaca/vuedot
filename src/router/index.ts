import { createRouter, createWebHashHistory } from 'vue-router'
import GameView from '@/views/GameView.vue'
import HomeView from '@/views/HomeView.vue'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      component: HomeView,
    },
    {
      path: '/game',
      component: GameView,
    },
  ],
})

export default router
