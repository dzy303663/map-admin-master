<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'offerAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <div style="width: 30%;margin-bottom: 20px">
        <el-input placeholder="请输入内容" v-model="searchkey" class="input-with-select">
          <el-select v-model="searchid" slot="prepend" placeholder="请选择方式" style="width: 130px;">
            <el-option label="按作者查询" value="name"></el-option>
            <el-option label="按标题查询" value="title"></el-option>
          </el-select>
          <el-button slot="append" @click="submit_search"><i class="fa fa-search" aria-hidden="true"></i></el-button>
        </el-input>
      </div>
      <el-table
        :data="table_data"
        v-loading="load_data"
        element-loading-text="拼命加载中"
        border
        @selection-change="on_batch_select">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          label="序号"
          width="80">
          <template scope="scope"><span>{{scope.$index+(currentPage - 1) * length + 1}} </span></template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="岗位名称"
        >
        </el-table-column>
        <el-table-column
          prop="desc"
          label="岗位描述"
          align='center'
          sortable
        >
        <template slot-scope="scope">
          <div v-html="scope.row.desc">
            
          </div>
        </template>
        </el-table-column>
        <el-table-column
          prop="createTime"
          label="创建时间"
          width="150"
        >
        </el-table-column>
        <el-table-column
          prop="people"
          label="需求人数"
          width="300"
          sortable
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="180">
          <template scope="props">
            <router-link :to="{name: 'offerDetail', params: {id:props.row._id}}" tag="span" >
              <el-button type="primary" size="small" icon="edit">查看</el-button>
            </router-link>
            <router-link :to="{name: 'offerEdit', params: {id:props.row._id}}" tag="span" v-if="role == '学生'">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <!-- <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.news_id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import axios from 'axios'
  import {mapGetters} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  const url ="/api/newserver"
  export default{
    data(){
      return {
        news_id:null,
        idlist:"",
        searchkey:"",
        searchid:"",
        table_data: null,
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 10,
        //请求时的loading效果
        load_data: true,
        //批量选择数组
        batch_select: []
      }
    },
    computed:{
      ...mapGetters({
        get_user_info: GET_USER_INFO
      }),
      role(){
        return this.$store.state.user_info.user.role;
      },
    },
    components: {
      panelTitle,
      bottomToolBar,
    },
    created(){
      this.get_table_data()
      this.personid=this.get_user_info.user.personid
      if(!this.get_user_info.user.isadmin){
        this.$router.replace({path:'/403'})
      }
    },
    methods: {
      lengthchange(){
        var  val =this.$refs.iplength.value
        if(parseInt(this.$refs.iplength.value)){
          if(val>40){
            this.length=30
          }else if(val<3){
            this.length=3
          }else{
            this.length=val
          }
        }else{
          this.length=10
        }
        if(this.searchid !== ""&& this.searchkey!==""){
          this.submit_search()
        }else if (this.searchkey === ""){
          this.get_table_data()
        }
      },
      submit_search() {
        if (this.searchkey === ""){
          this.get_table_data()
        }else if(this.searchid === "name"){
          axios.get(url,{
            params:{
              method:"searchByauthor",
              page: this.currentPage,
              length: this.length,
              keyword:this.searchkey
            }
          }).then((res)=>{
            // console.log(res)
            this.table_data=res.data.result
            this.page=res.data.page
            this.total = res.data.total
            setTimeout(1000)
            this.load_data = false
          })
        }else if(this.searchid === "title"){
          axios.get(url,{
            params:{
              method:"searchBytitle",
              page: this.currentPage,
              length: this.length,
              title:this.searchkey
            }
          }).then((res)=>{
            // console.log(res)
            this.table_data=res.data.result
            this.page=res.data.page
            this.total = res.data.total
            setTimeout(1000)
            this.load_data = false
          })

        }

      },
      on_refresh(){

        this.get_table_data()
      },
      //获取数据
      // $fetch.api_table 等于api/index.js
      get_table_data(){
        this.load_data = true
        axios.get('/api/company/open-offer',{
          params:{
            method:"newsList",
            page: this.currentPage,
            length: this.length
          }
        }).then((res)=>{
          // console.log(res)
          this.table_data=res.data
          this.page=5
          this.total = 10
          setTimeout(1000)
          this.load_data = false
        })
      },
    }
  }
</script>
