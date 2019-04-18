<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
    </panel-title>
    <div class="panel-body">
      <div style="width: 30%;margin-bottom: 20px">
        <el-input placeholder="请输入内容" v-model="searchkey" class="input-with-select">
          <el-select v-model="searchid" slot="prepend" placeholder="请选择方式" style="width: 130px;">
            <el-option label="按组织名查询" value="organname"></el-option>
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
          :selectable="selectable"
          width="80">
        </el-table-column>
        <el-table-column
          label="序号"
          width="200">
          <template scope="scope"><span>{{scope.$index+(currentPage - 1) * length + 1}} </span></template>
        </el-table-column>
        <el-table-column
          prop="user_id"
          label="企业ID"
          width="200"
        >
        </el-table-column>
        <el-table-column
          prop="name"
          label="企业名称"
        >
        </el-table-column>
        <el-table-column
          prop="company_link"
          label="企业官网"
        >
        </el-table-column>
        <el-table-column
          prop="open_offer"
          label="岗位"
        >
        </el-table-column>
        <el-table-column
          prop="tel"
          label="联系电话"
        >
        </el-table-column>
        <el-table-column
          label="操作"
          width="165">
          <template scope="props">
              <el-button type="info" size="small" icon="edit">申请</el-button>
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar>
        <el-button
          type="danger"
          icon="delete"
          size="small"
          :disabled="batch_select.length === 0"
          @click="on_batch_del"
          slot="handler">
          <span>批量删除</span>
        </el-button>
        <div slot="page">
          <div style="width: 120px;transform: translate(-110px,26px);color:#48576a;font-size: 14px">
            每页显示
            <el-input ref="iplength" v-model="length" max="99" min="3" size="mini" @blur="lengthchange" style="width:40px;"></el-input>
            条
          </div>
          <el-pagination
            @current-change="handleCurrentChange"
            :current-page="currentPage"
            :page-size="length"
            layout="total, prev, pager, next"
            :total="total">
          </el-pagination>
        </div>
      </bottom-tool-bar>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle, bottomToolBar} from 'components'
  import {mapGetters} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  const url="/api/organserver"

  export default{
    data(){
      return {
        idlist:"",
        searchkey:"",
        searchid:"",
        //当前页码
        currentPage: 1,
        //数据总条目
        total: 0,
        //每页显示多少条数据
        length: 4,
        //请求时的loading效果
        load_data: false,
        //批量选择数组
        batch_select: [],
        // table_data: null,
        table_data:[]
      }
    },
    components: {
      panelTitle,
      bottomToolBar,
    },
    computed:{
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    created(){
      this.get_table_data()
      if(!this.get_user_info.user.isadmin){
        this.$router.replace({path:'/403'})
      }
      console.log(this.get_user_info.organ_id)
    },
    methods: {
      selectable(row){
        if(row.organ_id!=this.get_user_info.organ_id){
          return true
        }else{
          return false
        }
      },
      lengthchange(){
        var  val =this.$refs.iplength.value
        if(parseInt(this.$refs.iplength.value)){
          if(val>10){
            this.length=10
          }else if(val<3){
            this.length=3
          }else{
            this.length=val
          }
        }else{
          this.length=3
        }
        this.get_table_data()
      },
      submit_search() {
        if (this.searchkey === ""){
          this.get_table_data()
        }else if(this.searchid === "organname"){
          this.load_data = true
          this.axios.get(url,{
            params:{
              method:"searchorgan",
              page: this.currentPage,
              length: this.length,
              organ_name:this.searchkey
            }
          }).then((res)=>{
            setTimeout(2000)
            this.table_data=res.data.result
            this.currentPage=res.data.page
            this.total = res.data.total
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
        this.axios.get('/api/company',{

        }).then(({data})=>{
            this.table_data=data
            /* this.currentPage=res.data.page
            this.total = res.data.total */
            setTimeout(this.load_data = false,2000)
          })
      },
      delete_dept(deptid){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.axios.get("/api/deptserver",{
              params:{
                method:"delDept",
                dept_id:deptid ,
              }
            }).then((res) => {
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
      delete_organ(organid){
        this.$confirm('此操作将删除该数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data=true
            this.axios.get(url, {
              params: {
                method: "delOrgan",
                organ_id: organid
              }
            }).then((res) => {
              this.$message.success(res.data)
              this.on_refresh()
              setTimeout(1000)
              this.load_data = false
            })
          })
      },
      handleCurrentChange(val) {
        this.currentPage = val
        if(this.searchid !== ""&& this.searchkey!==""){
          this.submit_search()
        }else if (this.searchkey === ""){
          this.get_table_data()
        }
      },
      //批量选择
      on_batch_select(val){
        this.batch_select = val
      },
      //批量删除
      on_batch_del(){
        this.$confirm('此操作将批量删除选择数据, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            this.load_data = true
            this.batch_select.forEach ((item)=>{
              this.idlist+=item.organ_id+","
            })
            this.axios.get(url, {
              params: {
                method: "delOrganlist",
                list: this.idlist,
              }
            })
              .then((res) => {
                // console.log(res)
                this.$message.success(res.data)
                this.load_data = false
                this.on_refresh()
                this.idlist=[]
              })
              .catch((err) => {
                this.load_data = false
                var message = ""
                if (err.response.status === 404) {
                  message = "删除失败！"
                }
                this.$notify.info({
                  title: '温馨提示',
                  message: message,
                })
              })

          })
          .catch(() => {
          })
      }
    }
  }
</script>
