<template>
  <div class="login-body">
    <div class="title first">实习管理系统</div>
    <div class="title">链接学生、学校、企业</div>
    <div class="title">及时准确地反映学生实习具体情况，提高管理质量，增强工作效率</div>
    <div
      class="loginWarp"
      v-loading="load_data"
      element-loading-text="正在登陆中..."
      @keyup.enter="submit_form"
    >
      <div class="login-title">
        <img :src="require('assets/images/icon_school.jpg')" style="width: 118px;height: 113px;">
        <div style="color: #6bc5a4;font-weight: bold">Practice Management</div>
      </div>
      <div class="login-form">
        <el-form ref="form" :model="form" :rules="rules" label-width="0">
          <el-form-item prop="username" class="login-item">
            <el-input
              v-model="form.username"
              placeholder="请输入账户名："
              class="form-input"
              :autofocus="true"
            ></el-input>
          </el-form-item>
          <el-form-item prop="password" class="login-item">
            <el-input
              type="password"
              v-model="form.password"
              placeholder="请输入账户密码："
              class="form-input"
            ></el-input>
          </el-form-item>
          <el-checkbox v-model="checked" class="checkbox" label="记住我"></el-checkbox>
          <check @change="handleLetterChange"></check>
          <el-form-item class="login-item">
            <el-button size="large" icon="check" class="form-submit" @click="submit_form"></el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>
<script type="text/javascript">
import { mapActions } from "vuex";
import { port_user, port_code } from "common/port_uri";
import { SET_USER_INFO } from "store/actions/type";
import Check from "./check";
//  设置记住我
import { cookieStorage } from "common/storage";
const url = "/api/logserver";
// import "../../../static/loginCanvas.js";
export default {
  components: {
    Check
  },
  data() {
    return {
      flag: false,
      checked: false,
      form: {
        username: null,
        password: null
      },
      rules: {
        username: [
          { required: true, message: "请输入账户名！", trigger: "blur" }
        ],
        password: [
          { required: true, message: "请输入账户密码！", trigger: "blur" }
        ]
      },
      //请求时的loading效果
      load_data: false
    };
  },
  mounted() {
    this.getinit();
    console.log("port_user", port_user);
  },
  methods: {
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    handleLetterChange() {
      this.flag = true;
    },
    //提交
    submit_form() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        if (!this.flag) {
          this.$notify.info({
            title: "温馨提示",
            message: "请完成验证"
          });
          return false;
        }
        this.load_data = true;
        //登录提交
        cookieStorage.set("checked", this.checked);
        this.axios
          .post("/api/login", {
            params: {
              method: "login",
              username: this.form.username,
              password: this.form.password
            }
          })
          .then(res => {
            // console.log(res)
            if (res.data.code != 200) {
              this.load_data = false;
              this.$notify.info({
                title: "温馨提示",
                message: res.data.msg
              });
              return;
            }
            if (this.checked) {
              cookieStorage.set("username", this.form.username);
              cookieStorage.set("password", this.form.password);
            } else {
              cookieStorage.remove("username");
              cookieStorage.remove("password");
            }
            res.data.data.isadmin = true;
            this.set_user_info({
              user: res.data.data,
              login: true,
            });
            this.$message.success(`欢迎回来，${res.data.data.name}`);
            setTimeout(this.$router.push({ path: "/" }), 500);
          })
          .catch(err => {
          });
      });
    },
    getinit() {
      this.checked = cookieStorage.get("checked");
      if (
        typeof cookieStorage.get("password") != "object" &&
        typeof cookieStorage.get("password") != "object"
      ) {
        this.form.username = cookieStorage.get("username");
        this.form.password = cookieStorage.get("password");
      }
    }
  }
};
</script>
<style lang="scss" type="text/scss" rel="stylesheet/scss">
.login-body {
  .title {
    font-size: 32px;
    color: #fff;
    margin: 30px 60px;
    font-weight: 700;
    letter-spacing: 10px;
    width: 66%;
    &.first {
      margin-top: 100px;
      font-size: 52px;
    }
  }
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background-image: url(~assets/images/background.png);
  background-repeat: no-repeat;
  background-position: center;
  background-size: cover;
  .checkbox {
    margin-bottom: 10px;
    color: darkgrey;
  }
  .checkbox:hover {
    color: deepskyblue;
  }
  .loginWarp {
    width: 300px;
    padding: 25px 15px;
    position: fixed;
    top: 100px;
    right: 20px;
    background-color: #fff;
    border-radius: 5px;
    z-index: 2;
    .login-title {
      margin-bottom: 25px;
      text-align: center;
    }
    .login-item {
      .el-input__inner {
        margin: 0 !important;
      }
    }
    .form-input {
      input {
        margin-bottom: 15px;
        font-size: 12px;
        height: 40px;
        border: 1px solid #eaeaec;
        background: #eaeaec;
        border-radius: 5px;
        color: #555;
      }
    }
    .form-submit {
      width: 100%;
      color: #fff;
      border-color: #6bc5a4;
      background: #6bc5a4;
      &:active,
      &:hover {
        border-color: #6bc5a4;
        background: #6bc5a4;
      }
    }
  }
}
</style>
