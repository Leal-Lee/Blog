<template>
  <div class="message-container">
    <el-table :data="newTableData" style="width: 100%" border>
      <!-- 序号 -->
      <el-table-column label="序号" width="60" >
        <template slot-scope="scope">
          {{ scope.$index+1 }}
        </template>
      </el-table-column>
      <!-- 头像 -->
      <el-table-column label="头像" width="100" >
        <template slot-scope="scope">
          <el-image
            style="width: 100px"
            fit="fit"
            :src="scope.row.avatar"
            :preview-src-list="[scope.row.avatar]"
          ></el-image>
        </template>
      </el-table-column>
      <!-- 昵称-->
      <el-table-column label="昵称" width="180" prop="nickname"></el-table-column>

      <!-- 留言内容-->
      <el-table-column label="留言内容"  prop="content"></el-table-column>

      <!-- 创建时间-->
      <el-table-column label="创建时间" width="160" prop="createDate"></el-table-column>


      <!-- 操作 -->
      <el-table-column label="操作" width="180" align="center">
        <template slot-scope="scope">
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

      <el-pagination
       background
       :hide-on-single-page="isSingle"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[5, 10, 20, 30]"
      :page-size="urlQuery.limit"
      layout="sizes,prev, pager, next,total"
      :total="message.count"
      next-text='下一页'
      prev-text='上一页'
      >
      
    </el-pagination>

  </div>
</template>

<script>
import { getMessages, deleteMessage } from "@/api/message.js";

export default {
  name: "Message",

  data() {
    return {
      isSingle:false,
      currentPage:1,
      urlQuery: {
        page: 1,
        limit:5,
        keyword: "",
        blogId: null,
      },
      tableData: [], //表格数据
      message:{}
    };
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
        obj.avatar = process.env.VUE_APP_SERVERPATH +item.avatar;
        obj.nickname = item.nickname;
        obj.content = item.content;
        obj.createDate = item.createDate;
        arr.push(obj);
      });
   
      return arr;
    },
  },
  methods: {

    async fetchData(query) {
      this.message = await getMessages(query);
      if(typeof this.message =='string')return this.tableData=[]
      this.tableData = this.message.rows;
      if(this.message.count <=query.limit){
        this.isSingle=true
      }
    },

     // 删除处理函数

    async open(index, row) {
      try {
        await this.$confirm("此操作将永久删除该文章，并一并删除对应评论, 是否继续?", "提示", {
          confirmButtonText: "确定",
          cancelButtonText: "取消",
          type: "warning",
        });
        
       await deleteMessage(row.id)
     
      if(this.tableData.length==1 && this.currentPage>1){
        this.currentPage--
        this.urlQuery.page=this.currentPage
        
       }
       this.fetchData(this.urlQuery)
       
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