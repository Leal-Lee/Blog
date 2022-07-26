<template>
  <div class="type-container">
    <div class="add-type">
      <span>新增分类:</span>
      <el-input v-model="typeName" placeholder="请输入内容" :maxlength="10" show-word-limit></el-input>
                <el-select v-model="typeOrder" placeholder="请选择">
            <el-option :value="item" v-for="item in 6" :key="item"></el-option>
          </el-select>
      <el-button type="primary" @click="handleAdd">新增</el-button>
    </div>

    <el-table :data="types" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column label="序号" width="60">
        <template slot-scope="scope">{{ scope.$index+1 }}</template>
      </el-table-column>
      <!-- 类别 -->
      <el-table-column label="博客类别" width="180" prop="name"></el-table-column>
      <!-- 文章数量-->
      <el-table-column label="文章数量" width="260" prop="articleCount"></el-table-column>
      <!-- 文章级别 -->
      <el-table-column label="文章级别" width="80" prop="order"></el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
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
              v-if="scope.row.name=='未分类'? false:true"
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
        <!-- 文章级别 -->
        <el-form-item label="文章级别" label-width="100px" prop="order">
          <el-select v-model="form.order" placeholder="请选择">
            <el-option :value="item" v-for="item in 6" :key="item"></el-option>
          </el-select>
        </el-form-item>
        <!-- 文章分类 -->
        <el-form-item label="文章分类" label-width="100px" prop="name">
          <el-input
            v-model="form.name"
            autocomplete="off"
            ref="name"
            placeholder="请输入内容"
            :maxlength="10"
            show-word-limit
            :disabled="disabled"
          ></el-input>
        </el-form-item>
      </el-form>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSbumit">提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import {
  addBlogType,
  putBlogType,
  getBlogType,
  deleteBlogType,
} from "@/api/blogType.js";

export default {
  name: "BlogType",

  data() {
    return {
      types: [],
      typeName: "",
      typeOrder: 1,
      disabled: false,
      formLabelWidth: "120px",
      dialogFormVisible: false,
      form: {
        name: "",
        articleCount: "",
        order: "",
        id: "",
      },
    };
  },
  components: {},
  created() {
    this.fetchData();
  },

  methods: {
    async fetchData() {
      this.types = await getBlogType();
    },
     // 添加分类处理函数
     async handleAdd(){
      const  data= await addBlogType({
        name:this.typeName,
        order:this.typeOrder
       })

       console.log(typeof data)
        if(typeof data =='string'){
          this.$message.warning(data);
          return
        }
       
       this.$message.success("增加成功");
       this.fetchData()
     },
    // 编辑处理函数
    handleEdit(index, row) {
      // 弹出表单
      this.dialogFormVisible = true;
      this.disabled = false;
      // 回填表单
      this.form.name = row.name;
      this.form.order = row.order;
      this.form.id = row.id;
      this.form.articleCount = row.articleCount;
      if (this.form.name == "未分类") {
        this.disabled = true;
      }
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
            type: "warning",
          }
        );
        const type = this.types.find((item) => {
          //找到未分类的类别
          return item.name == "未分类";
        });

        type.articleCount =
          parseInt(row.articleCount) + parseInt(type.articleCount);
        type.order = +type.order;

        await putBlogType(type);
        await deleteBlogType(row.id);

        this.fetchData();
        this.$message({
          type: "success",
          message: "删除成功!",
        });
      } catch {
        this.$message({
          type: "info",
          message: "已取消删除",
        });
      }
    },

    //提交处理函数
    async handleSbumit() {
      const updataForm = {};
      for (let item in this.form) {
        if (this.form[item]) {
          updataForm[item] = this.form[item];
        }
      }

      updataForm.order = +updataForm.order;
      updataForm.articleCount = +updataForm.articleCount;

      const data = await putBlogType(updataForm);

      if (typeof data =='string') {
        this.$message.warning(data);
      } else {
        this.fetchData();
        this.$message.success("修改成功");
      }

      // 关闭编辑
      this.dialogFormVisible = false;
    },
  },
};
</script>

<style>
.el-input {
  width: 180px;
}
.add-type {
  margin: 10px;
}
.add-type .el-input {
  width: 260px;
}
.add-type .el-select .el-input  {
  width: 90px;
}

.add-type span {
  font-weight: 600;
  margin-right: 10px;
}
</style>
