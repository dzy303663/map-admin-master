<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body"
         v-loading="load_data"
         element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="岗位名称:" prop="name">
              <el-input v-model="form.name" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
             <el-form-item label="需求人数:" prop="people">
              <el-input v-model="form.people" placeholder="请输入内容" style="width: 250px;"></el-input>
            </el-form-item>
            <el-form-item label="报告内容:" prop="desc">
              <quill-editor
                id="QE"
                v-model="form.desc"
                :options="editorOption">
              </quill-editor>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">立即提交</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
  import {panelTitle} from 'components'
  import { quillEditor } from 'vue-quill-editor'
  const url ="/api/newserver"
  import {mapGetters} from 'vuex'
  import {GET_USER_INFO} from 'store/getters/type'
  import axios from 'axios'
  Date.prototype.Format = function (fmt) {
    var o = {
      "M+": this.getMonth() + 1, // 月份
      "d+": this.getDate(), // 日
      "h+": this.getHours(), // 小时
      "m+": this.getMinutes(), // 分
      "s+": this.getSeconds(), // 秒
      "q+": Math.floor((this.getMonth() + 3) / 3), // 季度
      "S": this.getMilliseconds() // 毫秒
    };
    if (/(y+)/.test(fmt))
      fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
      if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
  }
  export default{
    components:{
      quillEditor
    },
    computed: {
      ...mapGetters({
        get_user_info: GET_USER_INFO
      })
    },
    data(){
      return {
        editorOption:{},
        flag:true,
        form: {
          desc:null,
          name: null,
          people: null
        },
        route_id: this.$route.params.id,
        load_data: false,
        on_submit_loading: false,
        rules: {
          name: [{required: true, message: '请输入岗位名称', trigger: 'blur'}],
          desc: [{required: true, message: '请输入岗位描述', trigger: 'blur'}],
          // keyword: [{required: true, message: '请输入关键词', trigger: 'blur'}]
        }
      }
    },
    created(){
      this.route_id && this.get_form_data()
      if(typeof (this.route_id)==="undefined"){
        this.flag=false
      }
      if(!this.flag){
        this.form.newsauthor=this.get_user_info.user.realname
      }
    },
    methods: {
      //获取数据
      get_form_data(){
        this.load_data = true
        axios.get('/api/user/askFor/detail',{
          params:{
            id:this.route_id
          }
        }).then(({data})=>{
          // console.log(data)
          this.form=data
          this.load_data = false
        })
      },
      //提交
      on_submit_form(){
        this.$refs.form.validate((valid) => {
          if (!valid) return false
          this.on_submit_loading = true
          // this.form.createtime=new Date().Format("yyyy-MM-dd   hh:mm:ss");
          axios.post('/api/company/open-offer/add',{
              ...this.form,
              'createTime': new Date().getTime()
          })
            .then((res) => {
              this.$message.success(res.data)
              setTimeout(this.$router.back(), 500)
            })
            .catch((err) => {
              this.load_data = false
              this.on_submit_loading = false
              var message =""
              if(err.response.status === 404){
                message="信息有误，添加失败！"
              }
              this.$notify.info({
                title: '温馨提示',
                message:message,
              })
            })
        })
      },
      handleDatePick(val){
        console.log(val)
      }
    },
    components: {
      panelTitle
    }
  }
</script>
<style>
  #QE{
    width:1300px;
    height: 400px;
    margin-bottom: 60px ;
  }
</style>
