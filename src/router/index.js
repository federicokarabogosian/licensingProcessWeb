import Vue from 'vue'
import Router from 'vue-router'
import Hello from '@/components/Hello'
import Track from '@/components/Track'
import Licensing from '@/components/Licensing'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Hello',
      component: Hello
    },
    {
      path: '/track',
      name: 'Track',
      component: Track
    },
    {
      path: '/licensing',
      name: 'Licensing Process',
      component: Licensing
    }
  ]
})
