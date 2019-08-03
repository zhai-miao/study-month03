<template>
    <div>
      <div style="background-color: #1c94c4;width: 300px;height:500px;" align="center">
        <el-form :label-position="labelPosition" label-width="80px" :model="formLabelAlign" align="center">
          <el-form-item label="姓名">
            <el-input v-model="formLabelAlign.name"></el-input>
          </el-form-item>
          <el-form-item label="密码">
            <el-input type="password" v-model="formLabelAlign.pwd"></el-input>
          </el-form-item>
          <el-form-item label="登陆">
            <el-input @click="login"></el-input>
          </el-form-item>
        </el-form>
        <template>
          <router-view/>
        </template>
      </div>
    </div>
</template>

<script>
    export default {
        name: "login",
      data() {
        return {
          labelPosition: 'right',
          formLabelAlign: {
            name: '',
            pwd: ''
          }
        };
      },
      methods:{
        login(){

        }
      }
    }
</script>

<style scoped>

</style>
