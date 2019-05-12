<template>
  <div class="panel">
    <panel-title :title="$route.meta.title">
      <el-button @click.stop="on_refresh" size="small">
        <i class="fa fa-refresh"></i>
      </el-button>
      <el-button type="primary" icon="plus" size="small" @click="dialogVisible = true">添加数据</el-button>
    </panel-title>
    <div class="panel-body">
      <el-table :data="table_data" v-loading="load_data" element-loading-text="拼命加载中" border>
        <el-table-column type="selection" width="55"></el-table-column>
        <el-table-column label="序号" width="80">
          <template scope="scope">
            <span>{{scope.$index+(currentPage - 1) * length + 1}}</span>
          </template>
        </el-table-column>
        <el-table-column prop="name" label="名称"></el-table-column>
        <el-table-column prop="user_id" label="账号" align="center" sortable></el-table-column>
        <el-table-column prop="role" label="角色" sortable></el-table-column>
        <el-table-column prop="tel" label="联系电话" sortable></el-table-column>
        <el-table-column label="操作" width="80">
          <template slot-scope="scope">
            <el-button
              type="primary"
              size="small"
              icon="edit"
              @click="$router.push({ path: `/profile/${scope.row.user_id}`,query: {type: 'view'} });"
            >查看</el-button>
            <el-button
              type="danger"
              size="small"
              icon="edit"
              @click="handleDelClick(scope.row._id)"
            >删除</el-button>
            <!-- <el-button type="danger" size="small" icon="delete" @click="delete_data(props.row.news_id)">删除</el-button> -->
          </template>
        </el-table-column>
      </el-table>
      <bottom-tool-bar></bottom-tool-bar>
    </div>
    <el-dialog title="请选择您要申请的岗位" :visible.sync="dialogVisible" width="50%" center>
      <span>
        <b>角色:</b>
      </span>
      <el-select v-model="currentSelectedRole" placeholder="请选择">
        <el-option value="管理员"></el-option>
        <el-option value="发布人"></el-option>
        <el-option value="用户"></el-option>
      </el-select>
      <span>
        <b>账号:</b>
      </span>
      <el-input type="number" placeholder="请输入内容" v-model="currentInputId" style="width: 200px;"></el-input>
      <span>
        <b>密码:</b>
      </span>
      <el-input placeholder="请输入内容" v-model="currentInputPw" style="width: 200px;"></el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false;this.currentSelected = ''">取 消</el-button>
        <el-button type="primary" @click="handleSubmit()">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>
<script type="text/javascript">
import { panelTitle, bottomToolBar } from "components";
import axios from "axios";
import { mapGetters } from "vuex";
import { GET_USER_INFO } from "store/getters/type";
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
      batch_select: [],
      dialogVisible: false,
      currentSelectedRole: "",
      currentInputId: null,
      currentInputPw: ""
    };
  },
  computed: {
    ...mapGetters({
      get_user_info: GET_USER_INFO
    }),
    role() {
      return this.$store.state.user_info.user.role;
    }
  },
  components: {
    panelTitle,
    bottomToolBar
  },
  created() {
    this.get_table_data();
    this.personid = this.get_user_info.user.personid;
    if (!this.get_user_info.user.isadmin) {
      this.$router.replace({ path: "/403" });
    }
  },
  methods: {
    lengthchange() {
      var val = this.$refs.iplength.value;
      if (parseInt(this.$refs.iplength.value)) {
        if (val > 40) {
          this.length = 30;
        } else if (val < 3) {
          this.length = 3;
        } else {
          this.length = val;
        }
      } else {
        this.length = 10;
      }
      if (this.searchid !== "" && this.searchkey !== "") {
        this.submit_search();
      } else if (this.searchkey === "") {
        this.get_table_data();
      }
    },
    submit_search() {
      if (this.searchkey === "") {
        this.get_table_data();
      } else if (this.searchid === "name") {
        axios
          .get(url, {
            params: {
              method: "searchByauthor",
              page: this.currentPage,
              length: this.length,
              keyword: this.searchkey
            }
          })
          .then(res => {
            // console.log(res)
            this.table_data = res.data.result;
            this.page = res.data.page;
            this.total = res.data.total;
            setTimeout(1000);
            this.load_data = false;
          });
      } else if (this.searchid === "title") {
        axios
          .get(url, {
            params: {
              method: "searchBytitle",
              page: this.currentPage,
              length: this.length,
              title: this.searchkey
            }
          })
          .then(res => {
            // console.log(res)
            this.table_data = res.data.result;
            this.page = res.data.page;
            this.total = res.data.total;
            setTimeout(1000);
            this.load_data = false;
          });
      }
    },
    on_refresh() {
      this.get_table_data();
    },
    //获取数据
    // $fetch.api_table 等于api/index.js
    get_table_data() {
      this.load_data = true;
      let url;
      axios
        .get("/api/user", {
          params: {
            method: "newsList",
            page: this.currentPage,
            length: this.length
          }
        })
        .then(res => {
          // console.log(res)
          this.table_data = res.data;
          this.page = 5;
          this.total = 10;
          setTimeout(1000);
          this.load_data = false;
        });
    },
    handleSubmit() {
      let user = {};
      user.user_id = this.currentInputId;
      user.pw = this.currentInputPw;
      user.role = this.currentSelectedRole;
      this.axios.put("/api/user/add", { ...user }).then(({ data }) => {
        if (data.errMsg) {
          this.$message.error(data.errMsg);
          return;
        }
        this.$message.success(data.msg);
        this.dialogVisible = false;
        this.currentInputId = "";
        this.currentInputPw = "";
        this.currentSelectedRole = "";
        this.get_table_data();
      });
    },
    handleDelClick(_id) {
      this.axios.delete("/api/user/del", {data:{_id}}).then(({ data }) => {
        this.$message.success(data);
        this.get_table_data();
      });
    }
  }
};
</script>
