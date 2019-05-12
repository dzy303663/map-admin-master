<template>
  <div class="left-side">
    <div class="left-side-inner">
      <router-link to="/" class="logo block">
        <img src="./images/logo.svg" alt="AdminX">
      </router-link>
      <div>
        <img class="head_img" :src="'http://localhost:80'+headImg.replace('/api','')" alt="请先完善头像">
        <div class="head_title">
          <p>{{name}}</p>
          <p><i v-if="role == '学生'" class="el-icon-location" style="color: green;margin-right:5px;cursor: pointer;" @click="sign()"></i>在线</p>
        </div>
      </div>
      <el-menu class="menu-box" theme="dark" router :default-active="$route.path">
        <div v-for="(item, index) in nav_menu_data" :key="index">
          <el-menu-item
            class="menu-list"
            v-if="typeof item.child === 'undefined'"
            :index="item.path"
          >
            <i class="icon fa" :class="item.icon"></i>
            <span v-text="item.title" class="text"></span>
          </el-menu-item>
          <el-submenu :index="item.path" v-else>
            <template slot="title">
              <i class="icon fa" :class="item.icon"></i>
              <span v-text="item.title" class="text"></span>
            </template>
            <el-menu-item
              class="menu-list"
              v-for="(sub_item, sub_index) in item.child"
              :index="sub_item.path"
              :key="sub_index"
            >
              <!--<i class="icon fa" :class="sub_item.icon"></i>-->
              <span v-text="sub_item.title" class="text"></span>
            </el-menu-item>
          </el-submenu>
        </div>
      </el-menu>
    </div>
  </div>
</template>
<script type="text/javascript">
import MenuList from "common/menu";
export default {
  props:['showName'],
  name: "slide",
  data() {
    return {
      nav_menu_data: []
    };
  },
  computed: { 
    role(){
        return this.$store.state.user_info.user.role;
    },
    headImg(){
      return this.$store.state.user_info.user.headImg;
    },
    name(){
      return this.$store.state.user_info.user.name;
    },
    position(){
      return this.$store.state.user_info.user.position;
    }
  },
  created() {
    this.nav_menu_data = MenuList[this.role];
  },
  methods: {
    sign(){
      this.axios.post('/api/sign',{signTime: new Date()}).then(({data}) => {
        this.$message.success(data.msg)
      })
    }
  },
};
</script>
<style lang="scss" scoped>
.head_img{
    width: 60px;
    height: 60px;
    border-radius: 50%;
    margin-left: 17px;
    margin-bottom: 15px;
    box-shadow: 0 0 5px #0c0d0d;
}
.head_title{
  display: inline-block;
  height: 60px;
  float: right;
  margin-right: 57px;
  color: #cef7a9;
  >p:nth-child(1){
    margin-top: 5px;
    margin-bottom: 10px;
  }
  >p:nth-child(2){
    font-size: 13px;
  }
}
</style>
