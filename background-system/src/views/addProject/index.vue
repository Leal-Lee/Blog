<template>
  <div class="editProject-container">
    
    <el-form :model="form" ref="form" :rules="rules" class="editBlog-from">
      <!-- 标题 -->
      <el-form-item label="项目名称" label-width="100px" prop="name">
        <el-input v-model="form.name" placeholder="请输入内容" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="项目描述" label-width="100px" prop="description">
        <el-input v-model="form.description" placeholder="请输入内容" maxlength="100" show-word-limit></el-input>
      </el-form-item>
      <!-- github -->
      <el-form-item label="github地址" label-width="100px" prop="github">
        <el-input v-model="form.github" placeholder="请输入内容"  show-word-limit></el-input>
      </el-form-item>
      <!-- url -->
      <el-form-item label="预览地址" label-width="100px" prop="url">
        <el-input v-model="form.url" placeholder="请输入内容"  show-word-limit></el-input>
      </el-form-item>


      <!-- 等级 -->
      <el-form-item label="项目等级" label-width="100px" prop="order">
        <el-select v-model="form.order"  >
          <el-option  :value="item"  v-for="item  in 6" :key="item"></el-option>
        </el-select>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="设置图片" label-width="100px">
        <Upload name="thumb" v-model="form.thumb" :showSubTitle="false" />
      </el-form-item>



      <el-form-item>
      
        <el-button type="danger" @click="addProjectHandle('form')" round>添加</el-button>
        <el-button type="warning" round @click="clearProjectHandle">清空</el-button>
      </el-form-item>
    </el-form>


  </div>
</template>

<script>
import Upload from "@/components/upload";
import {

  addProject,
} from "@/api/project.js";
export default {
  name: "AddProject",

  data() {
    return {
      dialogVisible:false,
      centerDialogVisible: false,

      form: {
        name: "",
        description: "",
        thumb: "",
        github: "",
        url: "",
        order: 1,
      },
      rules: {
        name: [
          { required: true, message: "文章标题不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "文章描述不能为空", trigger: "blur" },
        ],
                url: [
          { required: true, message: "文章描述不能为空", trigger: "blur" },
        ],
                github: [
          { required: true, message: "文章描述不能为空", trigger: "blur" },
        ],


      },
    };
  },
  components: {

    Upload,

  },



  methods: {
// 处理添加
    addProjectHandle(formName) {
     this.$refs[formName].validate(async (valid) => {
        if (valid) {
      const updateInfo={...this.form}
       updateInfo.description=updateInfo.description.split(',')
          await addProject(this.form);
          this.$message.success("增加成功");
         this.$router.push("/projects/projectList");
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
// 清空
clearProjectHandle(){
    this.form= {
        name: "",
        description: "",
        thumb: "",
        github: "",
        url: "",
        order: 1,
      }
}


  },
};
</script>

<style lang="scss" scoped>
.editProject-container {



  .el-input {
    width: 80%;
  }

  .upload-container {
    width: 300px;
    height: 210px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
}
</style>