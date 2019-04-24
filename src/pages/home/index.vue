<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body">
      <el-card class="box-card">
        <div slot="header" class="clearfix">
          <i class="fa fa-bell-o fa-lg" aria-hidden="true" ></i>
          <span>最新消息</span>
          <el-button style="float: right;" @click.stop="on_refreshtips" size="small">
            <i class="fa fa-refresh"></i>
          </el-button>
        </div>
        <div class="post" v-for="item in tipList">
          <el-button class="btn upvote" type="primary" plain >
            <i class="fa fa-arrow-up" aria-hidden="true"></i>
          </el-button>
          <div class="postcontent">
            <h3>
              <router-link :to="{name: 'tipsDetail', params: {inform_id:item.inform_id}}" tag="a">
                {{item.infotitle}}
              </router-link>
            </h3>
            <hr>
            <p>
              <span class="author">
                {{item.infoname}}
              </span>
              <span style="float: right">
                {{item.infotime}}
              </span>
            </p>
          </div>
        </div>
        <div style="clear: both"></div>
        <bottom-tool-bar>
          <div slot="page" class="pagination">
            <el-pagination
              @current-change="handletipChange"
              :current-page="tipcurrentPage"
              :page-size="tiplength"
              layout="total, prev, pager, next"
              :total="tiptotal">
            </el-pagination>
          </div>
        </bottom-tool-bar>
      </el-card>

      <el-card class="box-card" style="margin:40px 3% 0 0;width: 25%;float: left">
        <div slot="header" class="clearfix">
          <i class="fa fa-newspaper-o fa-lg" aria-hidden="true" ></i>
          <span>最新文件下载</span>
          <el-button style="float: right;" @click.stop="on_refreshnews" size="small">
            <i class="fa fa-refresh"></i>
          </el-button>
        </div>
        <div v-for="(item,key) in newsList" :key="key" v-if="key<=3" class="text item" style="font-size: 16px;cursor: pointer">
          <a :href="item.path">
            {{item.name }}
          </a>
          <span style="font-weight: 500; color: dimgrey;font-size: 12px;" >{{item.meta.createAt}}</span>
          <i class="fa fa-fire" aria-hidden="true"  style="color:darkred;float: right;"></i>
          <hr>
        </div>
        <bottom-tool-bar>
          <div slot="page" class="pagination">
            <el-pagination
              @current-change="handlenewsChange"
              :current-page="newscurrentPage"
              :page-size="newslength"
              layout="total, prev, pager, next"
              :total="newstotal">
            </el-pagination>
          </div>
        </bottom-tool-bar>
      </el-card>
      <el-card class="box-card" style="margin: 40px 3% 0 0;max-width: 358px;float: left">
        <div slot="header" class="clearfix">
          <i class="fa fa-list fa-lg" aria-hidden="true"></i>
          <span>签到</span>
          <el-button style="float: right;" @click="$refs.checkin.getCheck()" size="small">
            <i class="fa fa-refresh"></i>
          </el-button>
        </div>
        <!-- <todo-list></todo-list> -->
        <checkin ref="checkin"></checkin>
      </el-card>
      <el-card class="box-card" style="margin-top:40px;width: 36%;float: left" :body-style="{ padding: '0px' }">
        <!-- <div slot="header" class="clearfix">
          <i class="fa fa-map-marker fa-lg" aria-hidden="true"></i>
          <span>地图定位</span>
        </div>
        <baidu-map id="map" :center="{lng: 114.361675, lat: 30.480878}" :zoom="15" :scroll-wheel-zoom="true">
          <bm-geolocation anchor="BMAP_ANCHOR_TOP_LEFT" :showAddressBar="true" :autoLocation="true"></bm-geolocation>
        </baidu-map> -->
        <div class="chatRoom" @mouseover="showInput = true" @mouseleave="showInput = false">
          <transition
            name="fade"
          >
          <el-input
            placeholder="in this ..."
            v-model="msg"
            clearable
            style="position: fixed;margin:0 0 0 0;width:16%"
            @keyup.native.enter="sendMessage()"
            v-show="showInput"
            @mouseover="showInput = true"
            >
          </el-input>
          </transition>
          <transition
            name="fade"
            enter-active-class="fadeInRight"
            leave-active-class="fadeOutLeft"
          >
            <div >
              <div v-for="item in msgList" :key="item.$index" class="firstLine text item"   >
                <img :src="item.name==name? 'http://localhost:5200'+headImg.replace('/api',''):'http://localhost:5200'+item.headImg.replace('/api','')" class="user-img">
                <div style="min-height:80px;display:block;float: left;">
                  <span class="userName" :class="item.name==name? 'blueColor':''">{{item.name}}&nbsp; &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;   {{now}}</span>
                  <div class="userMsg">
                    {{item.msg}}
                  </div>
                </div>
              </div>
            </div>
          </transition>
        </div>
      </el-card>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import axios from 'axios'
  import TodoList from './TodoList'
  import Checkin from 'components/sign/checkin';
  import io from 'socket.io-client'

  export default{
    data(){
      return {
        msg: '',
        showInput: false,
        activeName:"1",
        tipcurrentPage:1,
        newscurrentPage:1,
        tiptotal:15,
        newstotal:15,
        tiplength:4,
        newslength:7,
        newsList:[],
        tipList:[],
        msgList: [
          {
            name: "shangshang",
            msg: "你好",
            headImg: "../../assets/user.jpg"
          },
          {
            name: "wangwang",
            msg: "你好a",
            headImg: "../../assets/user.jpg"
          },
          {
            name: "yangyang",
            msg: "你好b",
            headImg: "../../assets/user.jpg"
          },
          {
            name: "shangshang",
            msg: "你好",
            headImg: "../../assets/user.jpg"
          },
          {
            name: "wangwang",
            msg: "你好a",
            headImg: "../../assets/user.jpg"
          },
          {
            name: "yangyang",
            msg: "你好b",
            headImg: "../../assets/user.jpg"
          }
        ],
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
      TodoList,
      Checkin
    },
    computed: {
      name(){
        return this.$store.state.user_info.user.name;
      },
      now(){
        return this.formatDate(new Date(),'hh:mm:ss');
      },
      headImg(){
        return this.$store.state.user_info.user.headImg;
      }
    },
    created(){
      this.get_tips()
      this.get_news()
    },
    mounted() {
       const that = this
        // 连接websocket地址
        this.socket = io.connect('http://localhost:5200')
        this.socket.on('message', function(obj) {
          console.log(that.msgList)
            that.msgList.unshift(obj);
        })
    },
    methods:{
      on_refreshtips(){
        this.get_tips()
      },
      on_refreshnews(){
        this.get_news()
      },
      get_tips(){
        this.load_data = true
        axios.get("/api/infoserver",{
          params:{
            method:"infoList",
            page: this.tipcurrentPage,
            length: this.tiplength
          }
        }).then((res)=>{
          // console.log(res)
          this.tipList=res.data.result
          this.tipcurrentPage=res.data.page
          this.tiptotal = res.data.total
          setTimeout(1000)
          this.load_data = false
        })
      },
      get_news(){
        this.load_data = true
        axios.get("/api/file/relative",{
          params:{
            method:"newsList",
            page: this.newscurrentPage,
            length: this.newslength
          }
        }).then((res)=>{
          this.newsList=res.data
          this.newscurrentPage=1
          this.newstotal = 5
          setTimeout(1000)
          this.load_data = false
        })
      },
      handletipChange(val){
        this.tipcurrentPage=val
        this.get_tips()
      },
      handlenewsChange(val){
        this.newscurrentPage=val
        this.get_news()
      },
      sendMessage(){
        let obj = {
          name: this.name,
          msg: this.msg,
          headImg: this.headImg
        };
        // 传递消息信息
        this.socket.emit('message', obj);
        this.msg = ''
      }
    }
  }
</script>

<style>
  #map{
    width: 100%;
    height: 300px;
  }
  .el-pager li.active{
    border-color: dimgrey;
    background-color: dimgrey;
  }
  .text {
    font-size: 14px;
  }
  .item {
    margin-bottom: 18px;
  }

  .clearfix:before,
  .clearfix:after {
    display: table;
    content: "";
  }
  .clearfix:after {
    clear: both
  }

  .box-card {
    width: 99%;
  }
  .pagination{

    margin: 0 auto;
  }
  .post{
    float: left;
    width: 40%;
    margin: 0  50px 10px 10px;
    position: relative;
  }
  .post .upvote{
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    color: darkgrey;
    pointer-events: none;
  }
  .postcontent{
    padding-left: 60px;
  }
  .postcontent h3{
    margin:0;
    line-height: 1.4;
    font-size: 18px;
    white-space:nowrap;
    text-overflow:ellipsis;
    overflow: hidden;
  }
  .postcontent h3 a{
    margin-left: 5px;
    text-decoration: none;
    color:dimgrey;
  }
  hr{
    margin:5px 0 5px 0;
    border-top: 2px dashed rgba(0,0,0,.15);
  }
  .postcontent p{
    margin: 5px 0 0;
    color: dimgrey;
  }
  .post .author{
    font-weight: 500;
    color:dimgrey;
  }
  
</style>
<style lang="scss" scoped>
.chatRoom {
  position: absolute;
  float: right;
  width: 35%;
  height: 41%;
  overflow: auto;
  display: inline-block;
  border: 1px solid #ebeef5;
  background-color: #fff;
  border-radius: 4px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  //transform:translate(0,0);
  &::-webkit-scrollbar {
    display: none;
  }

  .firstLine:nth-child(1) {
    padding-top: 45px !important;
  }
  .blueColor{
    color: blue;
  }
}

.user-img {
  // background-image: url("~assets/images/background.png");
  display: block;
  height: 35px;
  width: 35px;
  background-size: contain;
  background-position: top;
  background-repeat: no-repeat;
  border-radius: 50%;
  float: left;
  clear: both;
}
.userName {
  font-size: 10px;
  display: block;
  height: 20px;
  max-width: 150px;
  padding-left: 5px;
}
.userMsg {
  display: block;
  min-height: 14px;
  max-height: 500px;
  max-width: 233%;
  width: 220px;
  overflow: auto;
  border-radius: 6px;
  box-shadow: 0 2px 12px 0 rgba(0, 0, 0, 0.1);
  border: 1px solid #ebeef5;
  margin: 3px 0 0 3px;
  padding: 5px;
  font-size: 13px;
  text-align: center;
}
</style>
