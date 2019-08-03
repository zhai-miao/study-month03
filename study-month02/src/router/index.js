import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import userList from '../components/userList'
import login from '../components/login'
import JiLian from '../components/JiLian'
import treeShu from '../components/treeShu'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'JiLian',
      component: JiLian,
      /*children:[
        {path: '/userList',name: 'userList',component: userList}
      ]*/
    }
  ]
})
