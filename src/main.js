
//导入样式
import 'normalize.css'
import 'font-awesome/scss/font-awesome.scss'

//导入Vue框架
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';

import 'echarts'

// import 'echarts/lib/component/dataZoom';

import ECharts from 'vue-echarts/components/ECharts.vue'
//导入组件
import router from './router'
//导入状态管理器
import store from 'store'
//导入请求框架
import api from './api'
//导入自定义插件
import Plugins from 'plugins'
//导入主视图文件
import App from './App'
//导入axios
import axios from 'axios'
//导入mock数据
// import './mock'
import $ from 'jquery'
import BaiduMap from 'vue-baidu-map'

Vue.use(BaiduMap, {
  // ak 是在百度地图开发者平台申请的密钥
  ak: '6YgDBZwDGgopmLbFje1zpiZBfa10pcAl'
})
import  VueQuillEditor from 'vue-quill-editor'
// require styles 引入样式
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'

Vue.use(VueQuillEditor)
//使用element-ui
Vue.use(ElementUI)

//使用自定义插件
Vue.use(Plugins)

Vue.component('chart', ECharts)

//使用api
Vue.use(api)

//使用axios
Vue.prototype.axios = axios

//发布后是否显示提示
Vue.config.productionTip = false

//是否开启工具调试
Vue.config.devtools = process.env.NODE_ENV === 'development'

new Vue({
  router,
  store,
  ...App
}).$mount('mainbody')
