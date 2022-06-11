<template>
  <div class="banner-container" >
    <el-table :data="newTableData" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column label="序号" width="60" prop="id"></el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="180" prop="title"></el-table-column>
      <!-- 描述-->
      <el-table-column label="描述" width="260" prop="description"></el-table-column>
      <!-- 中图 -->
      <el-table-column label="中图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            fit="fit"
            :src="scope.row.midImg"
            :preview-src-list="[scope.row.midImg]"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 大图 -->
      <el-table-column label="大图预览" align="center">
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            fit="fit"
            :src="scope.row.bigImg"
            :preview-src-list="[scope.row.bigImg]"
          ></el-image>
        </template>
      </el-table-column>

      <!-- 操作 -->
      <el-table-column label="操作" width="80" align="center">
        <template slot-scope="scope">
          <el-tooltip class="item" effect="dark" content="编辑" placement="top">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="handleEdit(scope.$index,scope.row)"
            ></el-button>
          </el-tooltip>
        </template>
      </el-table-column>
    </el-table>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑修改内容" :visible.sync="dialogFormVisible">
      <el-form :model="form">
        <el-form-item label="标题" :label-width="formLabelWidth">
          <el-input v-model="form.title" autocomplete="off" ref="title"></el-input>
        </el-form-item>

        <el-form-item label="描述" :label-width="formLabelWidth">
          <el-input v-model="form.description" autocomplete="off" ref="description"></el-input>
        </el-form-item>
      </el-form>

      <el-row :gutter="0">
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <Upload subTitle="设置中图" name="banner"  v-model="form.midImg"  v-if="dialogFormVisible"/>
          </div>
        </el-col>
        <el-col :span="12">
          <div class="grid-content bg-purple">
            <Upload subTitle="设置大图" name="banner"   v-model="form.bigImg"  v-if="dialogFormVisible"/>
          </div>
        </el-col>
      </el-row>

      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleSbumit" >提交</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import { getBanner, setBanner } from "@/api/banner.js";
import Upload from "@/components/upload";

export default {
  name: "Banner",

  data() {
    return {
      tableData: [], //表格数据
      dialogFormVisible: false,
      form: {
        //表单
        id: "",
        title: "",
        description: "",
        midImg: "",
        bigImg: "",
      },
      formLabelWidth: "120px",
    };
  },
  components: {
    Upload,
  },
  created() {
    
    
    this.fetchData();
  },
  computed: {
    // 将表格数据中的图片地址拼接域名
    newTableData() {
      // 这样做会导致图片加载不出来，每次加载都会拼接域名，原因是数组中的每一项是一个对象，这里只是新创建了一个数组，但是对象还是指向原来的地址
      // let arr = [...this.tableData];
      // arr.forEach((item) => {
      //   item.midImg = process.env.VUE_APP_SERVERPATH + item.midImg;
      //   item.bigImg = process.env.VUE_APP_SERVERPATH + item.bigImg;
      // });

      let arr = [];
      this.tableData.forEach((item) => {
        const obj = {};
        obj.id = item.id;
        obj.description = item.description;
        obj.title = item.title;
        obj.midImg = process.env.VUE_APP_SERVERPATH + item.midImg;
        obj.bigImg = process.env.VUE_APP_SERVERPATH + item.bigImg;
        arr.push(obj);
      });

      return arr;
    },
  },
  methods: {
    handleUpload(){

    },
    async fetchData() {
      const banners = await getBanner();
      this.tableData = [...banners];
    },
    // 编辑处理函数
    handleEdit(index, row) {
      // 弹出表单
      this.dialogFormVisible = true;
      // 回填表单

      this.form.description = row.description;
      this.form.title = row.title;
      this.form.id = row.id;
    },
//提交处理函数
    async handleSbumit() {
  
      const updataForm = {};
      for (let item in this.form) {
        if (this.form[item]) {
          updataForm[item] = this.form[item];
        }
      }
 
      // 请求修改banner
      const data = await setBanner(updataForm);

      const index = data.id - 1;

      this.tableData.splice(index, 1, data);

      // 关闭编辑
      this.dialogFormVisible = false;
      this.$message.success('修改成功')
    },
  },
};
</script>
<style lang="scss" >
.upload-container {
  .avatar-uploader {
    .el-upload {
      width: 100%;
      height: 50px;
      border: none;
      .el-upload-dragger {
        width: 100%;
        height: 100%;
        border: none;
        line-height: 50px;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
</style>