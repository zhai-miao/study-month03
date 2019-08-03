<template>
    <div>
      <el-cascader
        v-model="value"
        :options="options"
        @change="handleChange"></el-cascader>
    </div>
</template>

<script>
    export default {
      name: "JiLian",
      data(){
        return{
          value: [],
          options: [{
            value: 'zhinan',
            label: '指南'
          }]
        }
      },
      mounted(){
        this.getMenuList(1);
      },
      methods: {
        getMenuList(id){
          this.$axios.post("http://localhost:10010/api/zuul1/menuservice/getMenuList",id).then((response)=>{
            this.options = response.data;
          });
        },
        handleChange(value) {
          console.log(value);
        }
      }
    }
</script>

<style scoped>

</style>
