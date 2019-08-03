<template>
    <div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="审批人">
            <el-input v-model="formInline.name" placeholder="审批人"></el-input>
          </el-form-item>
          <el-form-item label="生日区间查询">
            <el-input v-model="formInline.startDate" type="date"></el-input>
          </el-form-item>
          <el-form-item label="==>>">
            <el-input v-model="formInline.stopDate" type="date"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="info" @click="onSubmit">查询</el-button>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addUser" style="margin-right: -150px">添加</el-button>
            <el-button type="primary" @click="delAll" style="margin-left: 150px">批删</el-button>
          </el-form-item>
        </el-form>
      </div>
      <el-table
        ref="multipleTable"
        :data="tableData"
        tooltip-effect="dark"
        style="width: 100%"
        @selection-change="handleSelectionChange">
        <el-table-column
          type="selection"
          width="55">
        </el-table-column>
        <el-table-column
          prop="id"
          label="编号"
          width="60">
        </el-table-column>
        <el-table-column
          label="用户头像"
          width="60">
          <template slot-scope="scope">
            <el-avatar :src="scope.row.photoUrl"></el-avatar>
          </template>
        </el-table-column>
        <el-table-column
          prop="birthday"
          label="生日"
          type="date"
          width="120">
        </el-table-column>
        <el-table-column
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="昵称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="120">
        </el-table-column>
        <el-table-column
          prop="del"
          label="删除状态"
          width="120">
        </el-table-column>
        <el-table-column
          prop="home"
          label="户口地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="address"
          label="地址"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          label="操作"
          width="260">
          <template slot-scope="scope">
            <el-button type="warning" @click="updateById(scope.row)">修改</el-button>
            <el-button type="danger" @click="delById(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <div style="float: left">
          <el-button @click="toggleSelection()">取消选择</el-button>
        </div>
        <div style="float: left;margin-left: 350px">
          <el-pagination
            @size-change="handleSizeChange"
            @current-change="handleCurrentChange"
            :page-sizes="[3, 5, 10, 20]"
            :current-page=currentPage
            :page-size=pageSize
            layout="total, sizes, prev, pager, next, jumper"
            :total=total>
          </el-pagination>
        </div>
      </div>
      <!--弹出框-->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户ID" :label-width="formLabelWidth" hidden>
            <el-input v-model="form.id" autocomplete="off" style="column-width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="用户名称" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off" style="column-width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off" style="column-width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off" style="column-width: 200px;"></el-input>
          </el-form-item>

          <el-form-item>
            <el-form :model="form" status-icon :rules="rules" ref="form" label-width="100px" class="demo-ruleForm">
              <el-form-item label="密码" prop="password">
                <el-input type="password" v-model="form.password" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model="form.checkPass" autocomplete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button @click="resetForm('form')">重置</el-button>
              </el-form-item>
            </el-form>
          </el-form-item>

          <el-form-item label="用户联系地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off" style="column-width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="用户籍贯" :label-width="formLabelWidth">
            <el-input v-model="form.home" autocomplete="off" style="column-width: 200px;"></el-input>
          </el-form-item>
          <el-form-item label="用户性别">
            <el-radio v-model="form.gender" label="男"  style="margin-left: -500px">男</el-radio>
            <el-radio v-model="form.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="用户生日">
            <el-date-picker
              style="margin-left: -500px"
              v-model="form.birthday"
              type="date"
              placeholder="选择日期">
            </el-date-picker>
          </el-form-item>
          <el-form-item label="用户头像">
            <el-upload
              class="avatar-uploader"
              action="http://localhost:10010/api/zuul1/userservice/toUpload"
              :show-file-list="false"
              :on-success="handleAvatarSuccess"
              :before-upload="beforeAvatarUpload">
              <img v-if="imageUrl" :src="imageUrl" class="avatar">
              <i v-else class="el-icon-plus avatar-uploader-icon"></i>
            </el-upload>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">取 消</el-button>
          <el-button type="primary" @click="saveUser">确 定</el-button>
        </div>
      </el-dialog>
    </div>
</template>

<script>
    export default {
      name: "userList",
      data() {
        var validatePass = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请输入密码'));
          } else {
            if (this.form.checkPass !== '') {
              this.$refs.form.validateField('checkPass');
            }
            callback();
          }
        };
        var validatePass2 = (rule, value, callback) => {
          if (value === '') {
            callback(new Error('请再次输入密码'));
          } else if (value !== this.form.password) {
            callback(new Error('两次输入密码不一致!'));
          } else {
            callback();
          }
        };
        return {
          tableData: [],
          delarr: [],
          multipleSelection: [],
          total: 20,
          pageSize:3,
          currentPage:1,
          imageUrl: '',
          formInline: {
            name: "",
            startDate: "",
            stopDate: ""
          },
          dialogTableVisible: false,
          dialogFormVisible: false,
          form: {
            id: '',
            name: '',
            username: '',
            password: '',
            checkPass: '',
            home: '',
            address: '',
            gender: '',
            birthday: '',
            photoUrl: '',
            delivery: false
          },
          formLabelWidth: '120px',
          rules: {
            pass: [
              { validator: validatePass, trigger: 'blur' }
            ],
            checkPass: [
              { validator: validatePass2, trigger: 'blur' }
            ]
          }
        }
      },
      mounted(){
        let mypage = {}
        mypage.pageSize = 3
        mypage.currentPage = 1
        this.getUserList(mypage);
      },
      methods: {
        getUserList(mypage){
          this.$axios.post("http://localhost:10010/api/zuul1/userservice/userList",mypage).then((response)=>{
            this.tableData = response.data.list;
            this.total = response.data.total;
            this.pageSize = response.data.pageSize;
            this.currentPage = response.data.pageNum;
          });
        },
        updateById(fromData){
          this.form = fromData
          this.imageUrl = fromData.photoUrl
          this.dialogFormVisible = true
        },
        addUser(){
          this.form = {id:0}
          this.dialogFormVisible = true
        },
        saveUser(){
          this.dialogFormVisible = false
          this.$axios.post("http://localhost:10010/api/zuul1/userservice/saveUser",this.form).then((response)=>{
            if(response.data == 1){
              this.$message({
                message: '恭喜你,操作成功...',
                type: 'success'
              });
              let mypage = {}
              mypage.pageSize = this.pageSize
              mypage.currentPage = 1
              this.getUserList(mypage);
            }else {
              this.$message.error('对不起,操作失败...');
              let mypage = {}
              mypage.pageSize = this.pageSize
              mypage.currentPage = 1
              this.getUserList(mypage);
            }
          }).catch((error)=>{
            alert("保存操作有误...")
          });
        },
        delAll() {
          this.delarr = []
          let length = this.multipleSelection.length;
          for (let i = 0; i < length; i++) {
            this.delarr.push(this.multipleSelection[i].id)
          }
          alert(this.delarr)
          this.$axios.post("http://localhost:10010/api/zuul1/userservice/delByIds?ids="+this.delarr).then((response)=>{
            if(response.data >= 1){
              this.$message({
                message: '恭喜你,删除成功...',
                type: 'success'
              });
              let mypage = {}
              mypage.pageSize = this.pageSize
              mypage.currentPage = 1
              this.getUserList(mypage);
            }else {
              this.$message.error('对不起,删除失败...');
              let mypage = {}
              mypage.pageSize = this.pageSize
              mypage.currentPage = 1
              this.getUserList(mypage);
            }
          }).catch((error)=>{
            alert("删除操作有误...")
          });
        },
        delById(id){
          this.$axios.post("http://localhost:10010/api/zuul1/userservice/delById?id="+id).then((response)=>{
            if(response.data == 1){
              this.$message({
                message: '恭喜你,删除成功...',
                type: 'success'
              });
              let mypage = {}
              mypage.pageSize = this.pageSize
              mypage.currentPage = 1
              this.getUserList(mypage);
            }else {
              this.$message.error('对不起,删除失败...');
              let mypage = {}
              mypage.pageSize = this.pageSize
              mypage.currentPage = 1
              this.getUserList(mypage);
            }
          }).catch((error)=>{
            alert("删除操作有误...")
          });
        },
        onSubmit(){
          let mypage = {}
          mypage.pageSize = this.pageSize
          mypage.currentPage = 1
          mypage.name = this.formInline.name
          mypage.startDate = this.formInline.startDate
          mypage.stopDate = this.formInline.stopDate
          this.getUserList(mypage);
        },
        toggleSelection(rows) {
          if (rows) {
            rows.forEach(row => {
              this.$refs.multipleTable.toggleRowSelection(row);
            });
          } else {
            this.$refs.multipleTable.clearSelection();
          }
        },
        handleSelectionChange(val) {
          this.multipleSelection = val;
        },
        handleSizeChange(val) {
          console.log(`每页 ${val} 条`);
          let mypage = {}
          mypage.pageSize = val
          mypage.currentPage = 1
          this.getUserList(mypage);
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          let mypage = {}
          mypage.pageSize = this.pageSize
          mypage.currentPage = val
          this.getUserList(mypage);
        },
        resetForm(formName) {
          this.$refs[formName].resetFields();
        },
        handleAvatarSuccess(res, file) {
          this.imageUrl = URL.createObjectURL(file.raw);
        },
        beforeAvatarUpload(file) {
          const isJPG = file.type === 'image/jpeg';
          const isLt2M = file.size / 1024 / 1024 < 2;

          if (!isJPG) {
            this.$message.error('上传头像图片只能是 JPG 格式!');
          }
          if (!isLt2M) {
            this.$message.error('上传头像图片大小不能超过 2MB!');
          }
          return isJPG && isLt2M;
        }
      }
    }
</script>

<style scoped>
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409EFF;
    }
    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
</style>
