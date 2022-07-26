<template>
  <div class="about-container">
    <el-form :model="form" ref="form" :rules="rules" class="editBlog-from">
      <!-- 标题 -->
      <el-form-item label="关于我"  prop="url">
        <el-input v-model="form.url" placeholder="请输入内容"  :disabled='isEidt'></el-input>
      </el-form-item>

      <el-form-item>
        <el-button type="danger" @click="setHandle('form')" round>{{isEidt?'编辑':'完成'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
 setAbout,
 getAbout
} from "@/api/about.js";
export default {
    name: 'prosonalCenter',
  data() {
    return {    
      isEidt:true,
      form: {
        url: "",
      },
      rules: {
        url: [{ required: true, message: "内容不能为空", trigger: "blur" }],
      },
    };
  },


  created() {
    this.fetchData();
  },
  methods: {
   setHandle(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
         this.isEidt=!this.isEidt
         if(this.isEidt){
          await setAbout(this.form);
          this.$message.success("编辑成功");
          this.fetchData()
         }

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

     async fetchData() {
      this.form.url = await getAbout();
    },
  },

};
</script>

<style lang="scss" scoped>
  .el-input {
    width: 80%;
  }
</style>