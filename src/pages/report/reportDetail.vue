<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="20" :offset="2">
          <h1 style="text-align: center">{{this.form.newstitle}}</h1>
          <div style="margin:50px 0 30px 0;padding-bottom: 60px;border-bottom: 1px solid rgba(100,100,100,.2)">
            <div style="float: left;margin-right: 10px">
              <img style="border-radius: 50%;height: 40px; width: 40px" :src="form.creator.headImg">
            </div>
            <div style="float: left;height: 40px;">
              <div style="font-size: 18px">
                {{form.creator.name}}
              </div>
              <div class="boot">
                <span style="margin-right: 30px;color: #aaa">
                  {{form.meta.createAt}}
                </span>

                <span style="color:#d93a3a;">
                  标题:
                  &nbsp;
                  {{this.form.title}}
                </span>
              </div>
              
            </div>
          </div>
          <div>
                <img class="head_img" :src="'http://localhost:80'+form.img.replace('/api','')">
              </div>
          <div style="clear:both"></div>
          <div style="line-height: 30px;font-size: 17px;font-family: 'Microsoft YaHei'; border-bottom: 1px solid rgba(100,100,100,.2);padding-bottom: 40px">
            <div v-html="this.form.content" class="ql-editor"></div>
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  const url ="/api/newserver"
  import {mapGetters} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import axios from 'axios'

  export default{
    components:{
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    data(){
      return {
        form:{
          context:null,
          createtime:null,
          hot:false,
          keyword: null,
          news_id: null,
          newstitle: null,
          newsauthor:null,
        },
        route_id: this.$route.params.id,
        load_data: false,
      }
    },
    created(){
      this.route_id && this.get_form_data()
    },
    methods: {
      //获取数据
     get_form_data(){
        this.load_data = true
        axios.get('/api/user/news/detail',{
          params:{
            id:this.route_id
          }
        }).then(({data})=>{
          // console.log(data)
          this.form=data
          this.value1 = [data.startTime,data.endTime];
          this.load_data = false
        })
      },
    },
    components: {
      panelTitle
    }
  }
</script>
<style scoped>
.head_img{
    width: 300px;
    
    /* border-radius: 50%; */
    /* cursor: pointer; */
  }
</style>
