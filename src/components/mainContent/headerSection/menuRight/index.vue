<template>
  <div class="menu-right" v-if="get_user_info.login">
    <div class="notification-menu">
      <el-dropdown trigger="click" class="notification-list">
        <div class="notification-btn">
          <i class="fa fa-user"></i>
          <span v-text="get_user_info.user.realname"></span>
          <span class="icon"></span>
        </div>
        <el-dropdown-menu slot="dropdown" class="dropdown-menu">
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(1)">
              <i class="icon fa fa-user"></i>
              <span>个人信息</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-cog"></i>
              <span>设置</span>
            </a>
          </el-dropdown-item>
          <el-dropdown-item class="dropdown-list">
            <a href="javascript:" class="dropdown-btn" @click="user_click(0)">
              <i class="icon fa fa-sign-out"></i>
              <span>安全退出</span>
            </a>
          </el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapGetters, mapActions } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
import { SET_USER_INFO } from "store/actions/type";
import axios from "axios";

const USER_OUT = 0;
const USER_INFO = 1;
const USER_SETTING = 2;
const url = "/api/logserver";

export default {
  computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    })
  },
  methods: {
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    //退出
    user_out() {
      this.$confirm("此操作将退出登录, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning"
      })
        .then(() => {
          /* axios
            .get(url, {
              params: {
                method: "logout"
              }
            })
            .then(res => { */
              this.$message.success('已退出');
              this.set_user_info(null);
              setTimeout(this.$router.replace({ name: "login" }), 500);
           /*  }); */
        })
        .catch(() => {});
    },
    user_info() {
      //个人信息
      console.log(this.get_user_info)
      this.$router.push({ path: `/profile/${this.get_user_info.user.user_id}`});
    },
    user_setting() {
      //设置
    },
    user_click(type) {
      switch (type) {
        case USER_OUT:
          //退出
          this.user_out();
          break;
        case USER_INFO:
          this.user_info();
          //个人信息
          break;
        case USER_SETTING:
          //设置
          break;
      }
    }
  }
};
</script>
