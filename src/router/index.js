
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from 'store'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'

//import components
//view page warp component
import viewPageComponent from 'pages/App'

//home
import homeComponent from 'pages/home'
//404
import noPageComponent from 'pages/error/404'
import Forbidden403 from 'pages/error/403'
//login
import loginComponent from 'pages/user/login'
//base table
import baseTableComponent from 'pages/table/base'

// import profile from 'pages/profile/profile'

import Log from 'pages/table/log'
import saveTableComponent from 'pages/table/save'
import Dept from 'pages/table/dept'
import Job from 'pages/table/job'
import Company from 'pages/company'
import SaveDept from 'pages/table/saveDept'
import SaveJob from 'pages/table/saveJob'
import SaveOrgan from 'pages/table/saveOrgan'

import mapRoad from 'pages/map/road'
import mapHot from 'pages/map/hot'
import mapArea from 'pages/map/area'
import mapSearch from 'pages/map/search'

import News from 'pages/monitor/news'
import Tips from 'pages/monitor/tips'
import NewsDetail from 'pages/monitor/newsDetail'
import TipsDetail from 'pages/monitor/tipsDetail'
import NewsEdit from 'pages/monitor/NewsEdit'
import TipsEdit from 'pages/monitor/tipsEdit'


Vue.use(VueRouter)

//使用AMD方式加载
// component: resolve => require(['pages/home'], resolve),
const routes = [{
  path: '/404',
  name: 'notPage',
  component: noPageComponent
}, {
  path: '*',
  redirect: '/404'
}, {
  path: '/user/login',
  name: 'login',
  component: loginComponent
}, {
  path: '/',
  redirect: '/home',
  component: viewPageComponent,
  children: [{
    path: '/403',
    name: 'Forbidden',
    component: Forbidden403,
    meta: {
      title: "无权限",
      auth: true
    }
  }, {
    path: '/home',
    name: 'home',
    component: homeComponent,
    meta: {
      title: "首页",
      auth: true
    }
  }, {
    path: '/profile/:id',
    name: 'profile',
    component: require('pages/profile/profile'),
    meta: {
      title: "个人主页",
      auth: true
    }
  },{
    path: '/table/base',
    name: 'tableBase',
    component: baseTableComponent,
    meta: {
      title: "基本表格",
      auth: true
    }
  },{
    path:'table/dept',
    name:'tableDept',
    component:Dept,
    meta:{
      title:"部门管理",
      auth:true
    }
  }, {
    path:'table/job',
    name:'tableJob',
    component:Job,
    meta:{
      title:"岗位管理",
      auth:true
    }
  },{
    path:'table/organization',
    name:'tableOrganization',
    component:Company,
    meta:{
      title:"企业列表",
      auth:true
    }
  },{
    path: '/table/Log',
    name: 'Log',
    component: Log,
    meta: {
      title: "日志管理",
      auth: true
    }
  }, {
    path: '/monitor/news',
    name: 'monitorNews',
    component: News,
    meta: {
      title: "新闻管理",
      auth: true
    }
  },/*  {
    path: '/leave/ask',
    name: 'leave',
    component: News,
    meta: {
      title: "申请列表",
      auth: true
    }
  } */,{
    path: '/files/list',
    name: 'files',
    component: require('pages/relativeFile/index'),
    meta: {
      title: "相关文件",
      auth: true
    }
  },{
    path: '/leave/ask',
    name: 'askList',
    component: require('pages/askLeave/index'),
    meta: {
      title: "申请列表",
      auth: true
    }
  },{
    path: '/leave/add',
    name: 'askAdd',
    component: require('pages/askLeave/askEdit'),
    meta: {
      title: "请假申请",
      auth: true
    }
  },{
    path: '/leave/edit/:id',
    name: 'askEdit',
    component: require('pages/askLeave/askEdit'),
    meta: {
      title: "请假申请",
      auth: true
    }
  },{
    path: '/leave/ask/datail/:id',
    name: 'askDetail',
    component: require('pages/askLeave/askDetail'),
    meta: {
      title: "请假详情",
      auth: true
    }
  },{
    path: '/report/index',
    name: 'askList',
    component: require('pages/report/index'),
    meta: {
      title: "报告列表",
      auth: true
    }
  },{
    path: '/report/add',
    name: 'reportAdd',
    component: require('pages/report/reportEdit'),
    meta: {
      title: "实习报告",
      auth: true
    }
  },{
    path: '/report/edit/:id',
    name: 'reportEdit',
    component: require('pages/report/reportEdit'),
    meta: {
      title: "实习报告",
      auth: true
    }
  },{
    path: '/report/datail/:id',
    name: 'reportDetail',
    component: require('pages/report/reportDetail'),
    meta: {
      title: "报告详情",
      auth: true
    }
  },{
    path: '/monitor/newsDetail/:news_id',
    name: 'newsDetail',
    component: NewsDetail,
    meta: {
      title: "新闻详情",
      auth: true
    }
  },{
    path: '/monitor/newsEdit/:news_id',
    name: 'newsEdit',
    component: NewsEdit,
    meta: {
      title: "新闻编辑",
      auth: true
    }
  },{
    path: '/monitor/addNews',
    name: 'addNews',
    component: NewsEdit,
    meta: {
      title: "添加新闻",
      auth: true
    }
  },
    {
    path: '/monitor/tips',
    name: 'monitorTips',
    component: Tips,
    meta: {
      title: "公告管理",
      auth: true
    }
  },{
    path: '/monitor/tipsDetail/:inform_id',
    name: 'tipsDetail',
    component: TipsDetail,
    meta: {
      title: "公告详情",
      auth: true
    }
  },{
      path: '/monitor/tipsEdit/:inform_id',
      name: 'tipsEdit',
      component: TipsEdit,
      meta: {
        title: "公告编辑",
        auth: true
      }
    },{
      path: '/monitor/addTips',
      name: 'addTips',
      component: TipsEdit,
      meta: {
        title: "添加公告",
        auth: true
      }
    },
    {
    path: '/table/update/:personid',
    name: 'tableUpdate',
    component: saveTableComponent,
    meta: {
      title: "数据修改",
      auth: true
    }
  },{
      path: '/table/add',
      name: 'tableAdd',
      component: saveTableComponent,
      meta: {
        title: "添加数据",
        auth: true
      }
    },
    {
      path: '/table/saveDept/:dept_id',
      name: 'saveDept',
      component: SaveDept,
      meta: {
        title: "数据修改",
        auth: true
      }
    },
    {
      path: '/table/addDept',
      name: 'addDept',
      component: SaveDept,
      meta: {
        title: "添加数据",
        auth: true
      }
    },
    {
      path: '/table/saveJob/:job_id',
      name: 'saveJob',
      component: SaveJob,
      meta: {
        title: "数据修改",
        auth: true
      }
    },
    {
      path: '/table/addJob',
      name: 'addJob',
      component: SaveJob,
      meta: {
        title: "添加数据",
        auth: true
      }
    },
    {
      path: '/table/saveOrgan/:organ_id',
      name: 'saveOrgan',
      component: SaveOrgan,
      meta: {
        title: "数据修改",
        auth: true
      }
    },
    {
      path: '/table/addOrgan',
      name: 'addOrgan',
      component: SaveOrgan,
      meta: {
        title: "添加数据",
        auth: true
      }
    },
    {
    path :'/map/road',
    name:'mapRoad',
    component:mapRoad,
    meta:{
      title:"路线导航",
      auth:true
    }
  },{
    path:'/map/hot',
    name:'mapHot',
    component:mapHot,
    meta:{
      title:"热点搜索",
      auth:true
    }
  },{
    path:'/map/area',
    name:'mapArea',
    component:mapArea,
    meta:{
      title:"行政区划",
      auth:true
    }
  },{
    path:'map/search',
    name:"mapSearch",
    component:mapSearch,
    meta:{
      title:"地图查看",
      auth:true
    }
  }]
}]

const router = new VueRouter({
  routes,
  mode: 'hash', //default: hash ,history
  scrollBehavior (to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return {x: 0, y: 0}
    }
  }
})

//全局路由配置
//路由开始之前的操作
router.beforeEach((to, from, next) => {
  NProgress.done().start()
  let toName = to.name
  // let fromName = from.name
  let is_login = store.state.user_info.login

  if (!is_login && toName !== 'login') {
    next({
      name: 'login'
    })
  } else {
    if (is_login && toName === 'login') {
      next({
        path: '/'
      })
    } else {
      next()
    }
  }
})

//路由完成之后的操作
router.afterEach(route => {
  NProgress.done()
})

export default router
