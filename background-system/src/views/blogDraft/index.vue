<template>
  <div class="banner-container">
    <el-table :data="newTableData" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column label="序号" width="60" >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <!-- 标题 -->
      <el-table-column label="标题" width="180" prop="title"></el-table-column>
      <!-- 描述-->
      <el-table-column label="描述" width="260" prop="description"></el-table-column>
      <!-- 浏览量 -->
      <el-table-column label="浏览量" width="80" prop="scanNumber"></el-table-column>
      <!-- 评论数-->
      <el-table-column label="评论数" width="80" prop="commentNumber"></el-table-column>
      <!-- 所属分类 -->
      <el-table-column label="所属分类" width="80" prop="category"></el-table-column>
      <!-- 创建时间-->
      <el-table-column label="创建时间" width="160" prop="createDate"></el-table-column>
      <!-- 图片预览 -->
      <el-table-column label="图片预览" align="center">
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
              @click="handleDelete(scope.$index,scope.row)"
            ></el-button>
          </el-tooltip>
        </template>

      </el-table-column>
    </el-table>

      <el-pagination
        background
       :hide-on-single-page="isSingle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size=" urlQuery.limit"
      layout="sizes,prev, pager, next,total"
      :total="blogs.count"
      next-text='下一页'
      prev-text='上一页'
      >
      
    </el-pagination>

  </div>
</template>

<script>
import { getDraftBlog, deleteBlog } from "@/api/blog.js";

export default {
  name: "BlogDraft",

  data() {
    return {
      isSingle:false,
      currentPage:1,
      urlQuery: {
        page: 1,
        limit: 5,
        keyword: "",
        categoryId: -1,
      },
      tableData: [], //表格数据
      blogs:{}
    };
  },
  components:{

  },
  created() {
    this.fetchData(this.urlQuery);
  },

  computed: {
    // 将表格数据中的图片地址拼接域名
    newTableData() {
      let arr = [];
      this.tableData.forEach((item) => {
        const obj = {};
        obj.id = item.id;
        obj.description = item.description;
        obj.title = item.title;
        obj.thumb = process.env.VUE_APP_SERVERPATH + item.thumb;
        obj.scanNumber = item.scanNumber;
        obj.commentNumber = item.commentNumber;
        obj.createDate = item.createDate;
        obj.category = item.category.name;

        arr.push(obj);
      });

      return arr;
    },
  },
  methods: {

    async fetchData(query) {
      this.blogs = await getDraftBlog(query);

      this.tableData = [...this.blogs.rows];
       

      if(this.blogs.count <=query.limit){
        this.isSingle=true
      }
    },
    // 编辑处理函数
    handleEdit(index, row) {
      this.$router.push( { path: `/editBlog/${row.id}`})
     
    },
     // 删除处理函数
   async handleDelete(index, row){
       
       await deleteBlog(row.id)
     
      if(this.tableData.length==1 && this.currentPage>1){
        this.currentPage--
        this.urlQuery.page=this.currentPage
        
       }
       this.fetchData(this.urlQuery)

    },
      handleSizeChange(val) {
        console.log(`每页 ${val} 条`);
        this.urlQuery.limit=val
        this.fetchData(this.urlQuery)
      },
      handleCurrentChange(val) {
        console.log(`当前页: ${val}`);
        this.currentPage=val
        this.urlQuery.page=val
        this.fetchData(this.urlQuery)
      }
  },
};
</script>

<style lang="scss" scoped>
</style>