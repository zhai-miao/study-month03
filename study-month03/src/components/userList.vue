<template>
    <div>
      <div>
        <el-form :inline="true" :model="formInline" class="demo-form-inline">
          <el-form-item label="用户名称">
            <el-input v-model="formInline.user" placeholder="请输入用户名称"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">查询</el-button>
            <el-button type="primary" @click="delByIds">批删</el-button>
          </el-form-item>
        </el-form>
        <el-button type="primary" icon="el-icon-circle-plus-outline" circle @click="addUser"></el-button>
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
          prop="name"
          label="姓名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="username"
          label="用户昵称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="gender"
          label="性别"
          width="60">
        </el-table-column>
        <el-table-column
          label="生日"
          width="120">
          <template slot-scope="scope">{{ scope.row.birthday }}</template>
        </el-table-column>
        <el-table-column
          prop="del"
          label="删除状态"
          width="60">
        </el-table-column>
        <el-table-column
          prop="address"
          label="联系地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="home"
          label="户口地址"
          width="120">
        </el-table-column>
        <el-table-column
          prop="photoUrl"
          label="头像路径"
          width="120">
        </el-table-column>
        <el-table-column
          label="操作"
          width="120">
            <template slot-scope="scope">
              <el-button type="primary" icon="el-icon-edit" circle @click="updateUser(scope.row)"></el-button>
              <el-button type="danger" icon="el-icon-delete" circle @click="delById(scope.row.id)"></el-button>
            </template>
        </el-table-column>
      </el-table>
      <div style="margin-top: 20px">
        <el-button @click="toggleSelection()">取消选择</el-button>
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page=currentPage
          :page-sizes="[3, 5, 10, 20]"
          :page-size=pageSize
          layout="total, sizes, prev, pager, next, jumper"
          :total=total>
        </el-pagination>
      </div>
      <!--弹出框-->
      <el-dialog title="用户信息" :visible.sync="dialogFormVisible">
        <el-form :model="form">
          <el-form-item label="用户Id" :label-width="formLabelWidth" hidden>
            <el-input v-model="form.id" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户姓名" :label-width="formLabelWidth">
            <el-input v-model="form.name" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户昵称" :label-width="formLabelWidth">
            <el-input v-model="form.username" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户密码" :label-width="formLabelWidth">
            <el-input v-model="form.password" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户联系地址" :label-width="formLabelWidth">
            <el-input v-model="form.address" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户户口地址" :label-width="formLabelWidth">
            <el-input v-model="form.home" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户生日" :label-width="formLabelWidth">
            <el-input v-model="form.birthday" type="date" autocomplete="off"></el-input>
          </el-form-item>
          <el-form-item label="用户性别" :label-width="formLabelWidth">
            <el-radio v-model="form.gender" label="男">男</el-radio>
            <el-radio v-model="form.gender" label="女">女</el-radio>
          </el-form-item>
          <el-form-item label="删除状态" :label-width="formLabelWidth">
            <el-radio v-model="form.del" label="1">有效</el-radio>
            <el-radio v-model="form.del" label="0">无效</el-radio>
          </el-form-item>
          <el-form-item>
            <el-upload
              class="avatar-uploader"
              action="http://localhost:2015/api/client/userservice/toUpLoad"
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
        return {
          tableData: [],
          multipleSelection: [],
          pageSize: 3,
          currentPage: 1,
          total: 20,
          form: {
            id: '',
            name: '',
            username: '',
            password: '',
            address: '',
            home: '',
            birthday: '',
            gender: '',
            del: '',
            photoUrl: ''
          },
          formInline: {
            user: '',
          },
          formLabelWidth: '120px',
          dialogTableVisible: false,
          dialogFormVisible: false,
          imageUrl: ''
        }
      },
      mounted(){
        let mypage = {}
        mypage.pageSize = this.pageSize
        mypage.currentPage = this.currentPage
        this.getUserList(mypage)
      },
      methods:{
        getUserList(mypage){
          this.$axios.post("http://localhost:2015/api/client/userservice/getUserList",mypage).then((response)=>{
            this.tableData = response.data.list;
            this.pageSize = response.data.pageSize;
            this.currentPage = response.data.pageNum;
            this.total = response.data.total;
          });
        },
        updateUser(fromData){
          this.form = fromData;
          this.imageUrl = fromData.photoUrl
          this.dialogFormVisible = true;
        },
        addUser(){
          this.form = {id:0}
          this.dialogFormVisible = true;
        },
        saveUser(){
          this.dialogFormVisible = false;
          this.$axios.post("http://localhost:2015/api/client/userservice/saveUser",this.form).then((response)=>{
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
              mypage.currentPage = this.currentPage
              this.getUserList(mypage)
            }
          }).catch((error)=>{
            this.$message.error('对不起,后台出错...');
          });
        },
        delById(id){
          this.$axios.post("http://localhost:2015/api/client/userservice/delById?id="+id).then((response)=>{
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
              mypage.currentPage = this.currentPage
              this.getUserList(mypage)
            }
          }).catch((error)=>{
            this.$message.error('对不起,后台出错...');
          });
        },
        delByIds(){
          let Ids = []
          let length = this.multipleSelection.length
          for (let i = 0;i<length;i++){
            Ids.push(this.multipleSelection[i].id)
          }
          alert("要批删的IDS:"+Ids)
          this.$axios.post("http://localhost:2015/api/client/userservice/delByIds?ids="+Ids).then((response)=>{
            if(response.data > 0){
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
              mypage.currentPage = this.currentPage
              this.getUserList(mypage)
            }
          }).catch((error)=>{
            this.$message.error('对不起,后台出错...');
          });

        },
        onSubmit() {
          console.log('submit!');
          let mypage = {}
          mypage.pageSize = this.pageSize
          mypage.currentPage = 1
          mypage.name = this.formInline.user
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
          this.getUserList(mypage)
        },
        handleCurrentChange(val) {
          console.log(`当前页: ${val}`);
          let mypage = {}
          mypage.pageSize = this.pageSize
          mypage.currentPage = val
          this.getUserList(mypage)
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
