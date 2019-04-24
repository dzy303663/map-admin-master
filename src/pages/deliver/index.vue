<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <!-- <router-link :to="{name: 'addNews'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link> -->
    </panel-title>
    <div class="panel-body">
      <div style="width: 30%;margin-bottom: 20px">
        <el-input placeholder="请输入内容" v-model="searchkey" class="input-with-select">
          <el-select v-model="searchid" slot="prepend" placeholder="请选择方式" style="width: 130px;">
            <el-option label="按发布人查询" value="name"></el-option>
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
       >
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
          prop="_id"
          label="id"
          width="80"
          v-if="false"
          sortable
        >
        </el-table-column>
        <el-table-column
          prop="selectedJob"
          label="岗位名称"
        >
        </el-table-column>
        <el-table-column
          prop="createAt"
          label="投递人"
          width="150"
          sortable
        >
        <template slot-scope="scope">
        <a @click="$router.push({ path: `/profile/${scope.row.user.user_id}`,query: {type: 'view'} });">
          <span >{{scope.row.user.name}}</span>
        </a>
        </template>
        </el-table-column>
        <el-table-column
          prop="name"
          label="投递时间"
        >
        <template slot-scope="scope">
          <span >{{new Date(scope.row.createdTime)}}</span>
        </template>
        </el-table-column>
        <el-table-column
          label="操作"
          >
          <template slot-scope="scope">
            <!-- <router-link :to="{name: 'newsEdit', params: {news_id:props.row.news_id}}" tag="span">
              <el-button type="info" size="small" icon="edit">修改</el-button>
            </router-link>
            <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.news_id)">删除</el-button> -->
            <el-button v-if="!scope.row.status" type="primary" size="small" icon="delete" @click="handleClick(scope,true)">同意</el-button> 
            <el-button  v-if="!scope.row.status" type="danger" size="small" icon="delete" @click="handleClick(scope,false)">不同意</el-button> 
            <span style="color: blue">
              {{scope.row.status}}
            </span>
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
      })
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
        axios.get('/api/deliver',{}).then((res)=>{
          // console.log(res)
          this.table_data=res.data
          this.page = 1
          this.total = 5
          setTimeout(1000)
          this.load_data = false
        })
      },
      //单个删除
      delete_data(news_id){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            axios.get(url,{
              params:{
                method:"delNews",
                newsid:news_id,
              }
            })
              .then((res) => {
                // console.log(res)
                this.$message.success(res.data)
                this.load_data = false
                this.on_refresh()
              })
              .catch((err) => {
                this.load_data = false
                var message =""
                if(err.response.status === 404){
                  message="删除失败！"
                }
                this.$notify.info({
                  title: '温馨提示',
                  message:message,
                })
              })
          })
          .catch(() => {
          })
      },
      handleClick(item,type){
        if(type){
          status = '通过'
        }else{
          status = '不通过'
        }
        console.log(item)
        this.axios.post('/api/deliver/check',{params: {index: item.$index,status,job: item.row.selectedJob,company: this.$store.state.user_info.user.name}}).then(({data}) => {
          this.$message.success('操作成功')
          this.get_table_data();
        })
      }

    }
  }
</script>
