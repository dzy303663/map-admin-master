<template>
  <div class="panel">
    <panel-title :title="$route.meta.title"></panel-title>
    <div class="panel-body" v-loading="load_data" element-loading-text="拼命加载中">
      <el-row>
        <el-col :span="8">
          <el-form ref="form" :model="form" :rules="rules" label-width="100px">
            <el-form-item label="头像:" prop="headImg">
              <img class="head_img" :src="form.headImg.replace('/api','')" @click="uploadClick(2)" >
              <input type="file" ref="headImg" @change="uploadHeadImg" style="display: none;">
            </el-form-item>
            <el-form-item label="账号:" prop="user_id">
              <el-input
                :disabled="flag"
                type="number"
                v-model="form.user_id"
                placeholder="请输入ID"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="姓名:" prop="name">
              <el-input
                v-model="form.name"
                :disabled="!flag"
                placeholder="请输入内容"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="角色:" prop="role">
              <el-input
                v-model="form.role"
                :disabled="flag"
                placeholder="请输入内容"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="系:" prop="departName" v-if="form.departName">
              <el-input
                v-model="form.departName"
                :disabled="flag"
                placeholder="请输入内容"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="班级:" prop="class" v-if="form.class">
              <el-input
                v-model="form.class"
                :disabled="flag"
                placeholder="请输入内容"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="密码:" prop="pw">
              <el-input type="password" v-model="form.pw" placeholder="请输入内容" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
              <el-input
                type="password"
                v-model="form.checkPass"
                auto-complete="off"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="性别:">
              <el-radio-group v-model="form.sex" prop="sex" :disabled="flag">
                <el-radio label="男">男</el-radio>
                <el-radio label="女">女</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="联系方式:" prop="tel">
              <el-input placeholder="请输入内容" v-model="form.tel" style="width: 350px;"></el-input>
            </el-form-item>
            <el-form-item label="企业：" prop="company" v-if="form.company">
              <el-input
                :disabled="flag"
                placeholder="请输入内容"
                v-model="form.company"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="岗位：" prop="position" v-if="form.position">
              <el-input
                :disabled="flag"
                placeholder="请输入内容"
                v-model="form.position"
                style="width: 350px;"
              ></el-input>
            </el-form-item>
            <el-form-item label="简历：" prop="resume" v-if="form.role == '学生' ">
              <a v-if="form.resume" :href="form.resume.path.replace('/api','')" target="_blank">{{form.resume.name}}</a>
              <el-button @click="uploadClick(1)" v-if="form.role == '学生'">
                上传简历
              </el-button>
              <input type="file" ref="resume" @change="uploadResume" style="display: none;">
            </el-form-item>
            <el-form-item label="上传资质：" prop="resume" v-if="form.role == '企业'">
              <a v-if="form.file" :href="form.file.replace('/api','')" target="_blank">资质文件</a>
              <el-button @click="uploadClick(1)" v-if="form.role == '企业'">
                上传资质文件
              </el-button>
              <input type="file" ref="resume" @change="uploadResume" style="display: none;">
            </el-form-item>
            <el-form-item label="自我介绍：" prop="introduce">
              <el-input
                type="textarea"
                placeholder="请输入内容"
                v-model="form.introduce"
                style="width: 400px;"
              ></el-input>
            </el-form-item>
            <el-form-item v-if="type != 'view'">
              <el-button type="primary" @click="on_submit_form" :loading="on_submit_loading">确定</el-button>
              <el-button @click="$router.back()">取消</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>
<script type="text/javascript">
import { panelTitle } from "components";
import { mapGetters } from "vuex";
import { mapActions } from "vuex";
import { SET_USER_INFO } from "store/actions/type";
export default {
  data() {
    var checkpass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.form.pw) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    var checkPhone = (rule, value, callback) => {
      if (!value) {
        return callback(new Error("手机号不能为空"));
      } else {
        const reg = /^1[3|4|5|7|8][0-9]\d{8}$/;
        console.log(reg.test(value));
        if (reg.test(value)) {
          callback();
        } else {
          return callback(new Error("请输入正确的手机号"));
        }
      }
    };
    return {
      checkuser: false,
      flag: true,
      form: {
        account: null,
        role: null,
        departName: null,
        class: null,
        password: null,
        checkPass: null,
        name: null,
        company: null,
        position: null,
        introduce: null,
        sex: "男",
        tel: null,
        resume: null,
      },
      route_id: this.$route.params.id,
      load_data: false,
      on_submit_loading: false,
      rules: {
        checkPass: [{ required: true, validator: checkpass, trigger: "blur" }],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" }
        ],
        realname: [
          { required: true, message: "姓名不能为空", trigger: "blur" }
        ],
        sex: [{ required: true, message: "性别不能为空", trigger: "blur" }],
        tel: [{ required: true, validator: checkPhone, trigger: "blur" }],
        tel: [{ required: true, message: "电话号码不能为空", trigger: "blur" }]
      }
    };
  },
  computed: {
    role(){
      return this.$store.state.user_info.user.role;
    },
    type(){
      console.log(this.$route.query)
      return this.$route.query.type;
    }
  },
  created() {
    this.get_form_data();
  },
  methods: {
    ...mapActions({
      set_user_info: SET_USER_INFO
    }),
    get_form_data() {
      this.load_data = true;
      this.axios
        .get("/api/userInfo", { params: { 'user_id': this.route_id } })
        .then(({ data }) => {
          this.form = data;
          data.isadmin = true
          if(this.type != 'view'){
            this.set_user_info({
              user: data,
              login: true,
            });
          }
          this.form.checkPass = this.form.pw;
          this.load_data = false;
        }).catch(err => {
          console.log(err)
        });
    },
    //提交
    on_submit_form() {
      this.$refs.form.validate(valid => {
        if (!valid) return false;
        this.on_submit_loading = true;
        var method = this.flag ? "changePerson" : "addPerson";

        var personid = this.form.personid;
        this.axios
          .post('/api/userInfo/update', {
            params: {
              ...this.form
            }
          })
          .then(res => {
            this.$message.success(res.data);
            this.on_submit_loading = false;
            this.get_form_data();
          }) 
          .catch(err => {
          });
      });
    },
    uploadClick(){
      console.dir(this.$refs.resume)
      this.$refs.resume.click()
    },
    uploadResume(e){
      var file = e.target.files[0];
      var formdata = new FormData();
      console.log(e.target.files)
      formdata.append("file", file, file.name)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
        }
      };
      this.axios.post('/api/upload',formdata,config).then(({data}) => {
        console.log('aaa')
        
        if(this.role == '学生') this.form.resume = {path: data.path,name: data.name};
        if(this.role == '企业') this.form.file = data.path;
        
      })
    },
    uploadClick(type){
      switch(type){
        case 1: this.$refs.resume.click();break;
        case 2: this.$refs.headImg.click();break;
      }
    },
    uploadHeadImg(e){
      var file = e.target.files[0];
      var formdata = new FormData();
      console.log(e.target.files)
      formdata.append("file", file, file.name)
      let config = {
        headers: {
          'Content-Type': 'multipart/form-data'  //以表单传数据的格式来传递fromdata
        }
      };
      this.axios.post('/api/upload',formdata,config).then(({data}) => {
        this.form.headImg = data.path
      })
    }
  },
  components: {
    panelTitle
  }
};
</script>
<style lang="scss" scoped>
.head_img{
  width: 90px;
  height: 90px;
  border-radius: 50%;
  margin-left: 25px;
  cursor: pointer;
}
</style>
