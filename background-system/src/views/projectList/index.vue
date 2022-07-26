<template>
  <div class="project-container">
    <el-table :data="newTableData" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <!-- 项目名称 -->
      <el-table-column label="项目名称" prop="name"></el-table-column>
      <!-- 项目描述-->
      <el-table-column label="项目描述">
        <template slot-scope="scope">{{ scope.row.description }}</template>
      </el-table-column>
      <!-- 缩略图 -->
      <el-table-column label="缩略图" width="120" prop="thumb">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            fit="fit"
            :src="scope.row.thumb"
            :preview-src-list="[scope.row.thumb]"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
          <!-- github -->
          <el-tooltip class="item" effect="dark" content="github地址" placement="top">
            <el-button type="primary" icon="el-icon-edit" circle @click="toGithub(scope.row)"></el-button>
          </el-tooltip>

          <!-- 编辑 -->
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index,scope.row)"
            ></el-button>
          </el-tooltip>

          <!-- 删除 -->

          <el-tooltip class="item" effect="dark" content="删除" placement="top">
            <el-button
              type="danger"
              icon="el-icon-delete"
              circle
              @click="open(scope.$index,scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑修改内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <!-- 项目名称 -->
        <el-form-item label="项目名称" prop="name">
          <el-input v-model="form.name" autocomplete="off" ref="name" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 项目描述 -->
        <el-form-item label="项目描述(每一项描述以英文逗号分隔)" prop="description">
          <el-input
            v-model="form.description"
            autocomplete="off"
            ref="description"
            placeholder="请输入内容"
          ></el-input>
        </el-form-item>

        <!-- GitHub地址 -->
        <el-form-item label="GitHub地址" prop="github">
          <el-input v-model="form.github" autocomplete="off" ref="github" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 项目链接 -->
        <el-form-item label="项目链接" prop="url">
          <el-input v-model="form.url" autocomplete="off" ref="url" placeholder="请输入内容"></el-input>
        </el-form-item>
        <!-- 缩略图 -->
        <Upload subTitle="设置中图" name="thumb" v-model="form.thumb" v-if="dialogFormVisible"/>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="danger" @click="handleSbumit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { putProject, getProjects, deleteProject } from "@/api/project.js";
import Upload from "@/components/upload";
export default {
  name: "projectList",

  data() {
    return {
      orginInfo: {},
      projects: [],
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "",
        description: "",
        url: "",
        github: "",
        thumb: "",
        order: "",
        id: "",
      },
    };
  },
  components: { Upload },
  created() {
    this.fetchData();
  },
  computed: {
    // 将表格数据中的图片地址拼接域名
    newTableData() {
      let arr = [];
      this.projects.forEach((item) => {
        const obj = {};

        obj.name = item.name;
        obj.description = JSON.parse(item.description).toString();
        obj.id = item.id;
        obj.url = item.url;
        obj.order = item.order;
        obj.github = item.github;
        obj.thumb = process.env.VUE_APP_SERVERPATH + item.thumb;

        arr.push(obj);
      });

      return arr;
    },
  },

  methods: {
    async fetchData() {
      this.projects = await getProjects();
    },

    toGithub(row) {
      window.open(row.github);
    },

    // 编辑处理函数
    handleEdit(index, row) {
      // 弹出表单
      this.dialogFormVisible = true;
      this.orginInfo = { ...row };
      // 回填表单

      this.form = { ...row };
      console.log(this.form);
    },
    // 删除处理函数

    async open(index, row) {
      try {
        await this.$confirm(
          "此操作将永久删除该分类,该分类下面的所有文章将变成未分类， 是否继续?",
          "提示",
          {
            confirmButtonText: "确定",
            cancelButtonText: "取消",
            project: "warning",
          }
        );

        await deleteProject(row.id);
        this.fetchData();
        this.$message({
          project: "success",
          message: "删除成功!",
        });
      } catch {
        this.$message({
          project: "info",
          message: "已取消删除",
        });
      }
    },

    //提交处理函数
    async handleSbumit() {
      const updataForm = {};
      updataForm.id = this.form.id;
      console.log(this.form);
      for (let key in this.form) {
        if (this.form[key] != this.orginInfo[key]) {
          updataForm[key] = this.form[key];
        }
      }

      if (updataForm.description) {
        updataForm.description = updataForm.description.split(",");
      }
      console.log(updataForm, Object.keys(updataForm).length);
      if (Object.keys(updataForm).length == 1) {
        this.$message.warning("数据为改变");
      } else {
        await putProject(updataForm);
        this.fetchData();
        this.$message.success("修改成功");
      }
      // 关闭编辑
      this.dialogFormVisible = false;
    },
  },
};
</script>


<style lang="scss" scoped>
.upload-container {
  width: 300px;
  height: 210px;
  overflow: hidden;
  border-radius: 4px;
  border: 1px solid #dcdfe6;
}
</style>