

import {cookieStorage,localStorage} from 'common/storage'

export default {
  //用户信息和是否登录
  user_info: localStorage.get('user_info')
}
