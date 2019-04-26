
import * as type from 'store/mutations/type'
import {localStorage} from 'common/storage'

export default {
  //设置用户信息和是否登录
  [type.SET_USER_INFO](state, userinfo){
    state.user_info = userinfo || {}
    if (userinfo === null) {
      localStorage.remove('user_info')
    } else {
      localStorage.set('user_info', userinfo)
    }
  }
}
