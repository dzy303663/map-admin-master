<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <router-link :to="{name: 'askAdd'}" tag="span">
        <el-button type="primary" icon="plus" size="small">添加数据</el-button>
      </router-link>
    </panel-title>
    <div class="panel-body">
      <!-- <div style="width: 30%;margin-bottom: 20px">
        <el-input placeholder="请输入内容" v-model="searchkey" class="input-with-select">
          <el-select v-model="searchid" slot="prepend" placeholder="请选择方式" style="width: 130px;">
            <el-option label="按作者查询" value="name"></el-option>
            <el-option label="按标题查询" value="title"></el-option>
          </el-select>
          <el-button slot="append" @click="submit_search">
            <i class="fa fa-search" aria-hidden="true"></i>
          </el-button>
        </el-input>
      </div> -->
      <el-table :data="table_data" v-loading="load_data" element-loading-text="拼命加载中" border
       >
        <el-table-column label="序号" width="50">
          <template scope="scope">
            <span>{{scope.$index+(currentPage - 1) * length + 1}} </span>
          </template>
        </el-table-column>
        <el-table-column prop="title" label="标题">
        </el-table-column>
        <el-table-column prop="createtime" label="请假起止日期" width="300" align='center' sortable>
          <template slot-scope="scope">
            <div>
              {{scope.row.startTime}}--{{scope.row.endTime}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="审批人" width="100">
          <template slot-scope="scope" v-if="scope.row.optionUser">
            <div>
              {{scope.row.optionUser}}
            </div>
          </template>
        </el-table-column>
         <el-table-column prop="createName" label="审批时间" width="100">
          <template slot-scope="scope" v-if="scope.row.optionTime">
            <div>
              {{formatTime(scope.row.optionTime-0)}}
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="createName" label="申请人" width="80">
          <template slot-scope="scope">
            <a @click="$router.push({ path: `/profile/${scope.row.creator.user_id}`,query: {type: 'view'} });" style="color: blue;cursor: pointer">
              <span >{{scope.row.creator.name}}</span>
            </a>
          </template>
        </el-table-column>
        <el-table-column prop="content" label="请假原因" width="300" sortable>
          <template slot-scope="scope">
            <div v-html="scope.row.content">
            </div>
          </template>
        </el-table-column>
        <el-table-column prop="status" label="状态" width="80" sortable>
        </el-table-column>
        <el-table-column label="操作" width="180">
          <template slot-scope="scope">
            <router-link :to="{name: 'askDetail', params: {id:scope.row._id}}" tag="span">
              <el-button type="primary" size="small" icon="edit">查看</el-button>
            </router-link>
            <el-button style="margin-bottom: 5px;" type="primary" size="small" icon="edit" v-if="role != '学生' && scope.row.status == '审批中'" @click="handleClick(scope,true)">同意</el-button>
            <el-button type="error" size="small" icon="edit" v-if="role != '学生' && scope.row.status == '审批中'" @click="handleClick(scope,false)">不同意</el-button>
            <router-link :to="{name: 'askEdit', params: {id:scope.row._id}}" tag="span" v-if="role == '学生'">
              <el-button type="info" size="small" icon="edit" v-if="scope.row.status == '审批中'">修改</el-button>
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
import { panelTitle, bottomToolBar } from 'components'
import axios from 'axios'
import { mapGetters } from 'vuex'
import { GET_USER_INFO } from 'store/getters/type'
const url = "/api/newserver"
export default {
  data() {
    return {
      news_id: null,
      idlist: "",
      searchkey: "",
      searchid: "",
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
  computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    }),
    role() {
      return this.$store.state.user_info.user.role;
    },
  },
  components: {
    panelTitle,
    bottomToolBar,
  },
  created() {
    this.get_table_data()
    this.personid = this.get_user_info.user.personid
    if (!this.get_user_info.user.isadmin) {
      this.$router.replace({ path: '/403' })
    }
  },
  methods: {
    lengthchange() {
      var val = this.$refs.iplength.value
      if (parseInt(this.$refs.iplength.value)) {
        if (val > 40) {
          this.length = 30
        } else if (val < 3) {
          this.length = 3
        } else {
          this.length = val
        }
      } else {
        this.length = 10
      }
      if (this.searchid !== "" && this.searchkey !== "") {
        this.submit_search()
      } else if (this.searchkey === "") {
        this.get_table_data()
      }
    },
    submit_search() {
      if (this.searchkey === "") {
        this.get_table_data()
      } else if (this.searchid === "name") {
        axios.get(url, {
          params: {
            method: "searchByauthor",
            page: this.currentPage,
            length: this.length,
            keyword: this.searchkey
          }
        }).then((res) => {
          // console.log(res)
          this.table_data = res.data.result
          this.page = res.data.page
          this.total = res.data.total
          setTimeout(1000)
          this.load_data = false
        })
      } else if (this.searchid === "title") {
        axios.get(url, {
          params: {
            method: "searchBytitle",
            page: this.currentPage,
            length: this.length,
            title: this.searchkey
          }
        }).then((res) => {
          // console.log(res)
          this.table_data = res.data.result
          this.page = res.data.page
          this.total = res.data.total
          setTimeout(1000)
          this.load_data = false
        })

      }

    },
    on_refresh() {

      this.get_table_data()
    },
    //获取数据
    // $fetch.api_table 等于api/index.js
    get_table_data() {
      let api;
      if (this.role == '学生') {
        api = '/api/user/askfor'
      } else if (this.role == '企业') {
        api = '/api/user/company'
      } else if (this.role == '系管理员') {
        api = '/api/department/askfor'
      } else if (this.role == '企业') {
        api = '/api/user/company'
      }
      this.load_data = true
      axios.get(api, {
        params: {
          method: "newsList",
          page: this.currentPage,
          length: this.length
        }
      }).then((res) => {
        // console.log(res)
        this.table_data = res.data
        this.page = 5
        this.total = 10
        setTimeout(1000)
        this.load_data = false
      })
    },
    handleClick(item, type) {
      if (type) {
        status = '通过'
      } else {
        status = '不通过'
      }
      this.axios.post('/api/askfor/check', { ...item.row,status, 'optionUser': this.$store.state.user_info.user.name,'optionTime': new Date().getTime()}).then(({ data }) => {
        this.$message.success('操作成功')
        this.get_table_data();
      })
    }
  }
}
</script>
