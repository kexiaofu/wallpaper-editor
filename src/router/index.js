import Vue from 'vue'
import Router from 'vue-router'
import wallpaper from '@/components/wallpaper'
import standard from '@/components/standard'

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/wallpaper/:wid',
      name: 'wallpaper',
      component: wallpaper
    },
    {
      path: '/standard',
      name: 'standard',
      component: standard
    }
  ]
})
