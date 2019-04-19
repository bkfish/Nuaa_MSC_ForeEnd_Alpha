import Vue from 'vue'
import Router from 'vue-router'

// in development-env not use lazy-loading, because lazy-loading too many pages will cause webpack hot update too slow. so only in production use lazy-loading;
// detail: https://panjiachen.github.io/vue-element-admin-site/#/lazy-loading

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
* hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
* alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
*                                if not set alwaysShow, only more than one route under the children
*                                it will becomes nested mode, otherwise not show the root menu
* redirect: noredirect           if `redirect:noredirect` will no redirect in the breadcrumb
* name:'router-name'             the name is used by <keep-alive> (must set!!!)
* meta : {
    title: 'title'               the name show in subMenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar
    breadcrumb: false            if false, the item will hidden in breadcrumb(default is true)
  }
**/
export const constantRouterMap = [
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },

  { name: 'departmentUser', path: '/departmentUser/:id', component: () => import('@/views/departmentUser/index'),
    hidden: true, props: true },
  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    name: 'Dashboard',
    hidden: true,
    children: [{
      path: 'dashboard',
      component: () => import('@/views/dashboard/index')
    }]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: '部门-人员管理', icon: 'user' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: '人员管理', icon: 'user' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: '部门管理', icon: 'tree' }
      },
      {
        path: 'relate',
        name: 'relate',
        component: () => import('@/views/departmentUser/index'),
        meta: { title: '人员部门关系管理', icon: 'tree' }
      },
    ]
  },
  {
    path: '/article',
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/article/index'),
        meta: { title: '文章管理', icon: 'form' }
      }
    ]
  },
  {
    path: '/notification',
    component: Layout,
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/notification/index'),
        meta: { title: '发布通知管理', icon: 'user' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: '备用表单', icon: 'form' }
      }
    ]
  },
  {
    path: 'home',
    component: Layout,
    children: [
      {
        path: '/',
        meta: { title: '网站主页（待建）', icon: 'link' }
      }
    ]
  },
  {
    path: 'NUAA-MSC-GayHub',
    component: Layout,
    children: [
      {
        path: 'https://github.com/nuaaMSC',
        meta: { title: 'NUAA-MSC-GayHub', icon: 'link' }
      }
    ]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})
