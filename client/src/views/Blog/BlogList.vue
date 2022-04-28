<template>
  <div class="blog-list-container" v-loading="isLoading" ref="container">
    <div class="blog-list" v-for="data in datas.rows" :key="data.id">
              <RouterLink :to="{
          name:'BlogDetails',
          params:{
            blogId:data.id
          }
        }">
      <div class="thumbnail" v-if="data.thumb">

        <!-- <ImgLoader :duration="1000" :src="data.thumb" :placeholder="data.thumb" @load="load" /> -->
        <img v-lazy='data.thumb' :title="data.title" :alt="data.title">
      </div>
      <div class="des" >
        <div class="title">{{data.title}}</div>
        <div class="type">
          <span>{{data.createDate}}</span>
          <span>浏览量：{{data.scanNumber}}</span>
          <span>评论数：{{data.commentNumber}}</span>
          <RouterLink :to="{
          name:'CategorBlog',
          params:{
            categoryid:data.category.id
          }
        }">分类：{{data.category.name}}</RouterLink>
        </div>
        
        <p>{{data.description}}</p>
      </div>
      </RouterLink>
    </div>
 <Empty v-if="datas.length === 0 && !loading" />
    <div class="pager">
      <Pager v-if="datas.total" :current="routInfo.page" :total="datas.total" :limit='routInfo.limit' :visibleNumber="pageVisibleNumber" @pageChange="handlePageChange" />
    </div>
  </div>
</template>

<script>
// import ImgLoader from "@/components/ImgLoader.vue";
import Pager from "@/components/Pager.vue";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll.js";
import { getBlogs } from "@/api/blog.js";
import Empty from "@/components/Empty";
export default {
  mixins: [fetchData({total:0,rows:[]}),mainScroll('container')],
  name: "BlogBloglist",
  components: {
    // ImgLoader,
    Pager,
    Empty
    
  },
  data() {
    return {

    

      
    };
  },

  async mounted() {

  },
 computed:{
  routInfo(){
    const limit=+this.$route.query.limit || 6
    const categoryid=+this.$route.params.categoryid || -1
    const page=+this.$route.query.page || 1
    return  {
      limit,
      categoryid,
      page
    }
   },
   pageVisibleNumber(){
     const num = Math.ceil(this.datas.total/this.routInfo.limit) 
    
     if(num <10){
       return num
     }
     return 10
   }
 },
  methods: {
    handleIdChange(){
     
    },

    async fetchData() {

      return await getBlogs(this.routInfo);
    },
    load() {},
   async handlePageChange(newPage) {
     this.$refs.container.scrollTop= 0;

      const query ={
        page:newPage,
        limit:this.routInfo.limit
      }
      if( this.routInfo.categoryid ==-1){
    
      this.$router.push({ name: 'Blog', query })
     
      }else{
      this.$router.push({ name: 'CategorBlog', params: { categoryid: this.routInfo.categoryid }, query })

      }
      
    },
  },
  watch:{
    $route:{
      handler:async function () { 
      
      this.isLoading=true
      this.datas = await this.fetchData()
      this.isLoading=false
      },
    }
  }
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";

.blog-list-container {
  
  .flex(space-between,center,column);
  .size-auto();
  overflow: auto;
  scroll-behavior: smooth;

  .blog-list {

    padding-left: 40px;
    width: 100%;
    box-sizing: border-box;
    border-bottom: 1px solid @gray;
    a{
    .flex(flex-start,center);
      width: 100%;
    .thumbnail {
      width: 300px;
      height: 250px;
      flex: 0 1 auto;
      margin-right: 20px;
      border-radius: 5px;
      overflow: hidden;
      // img{
      //   width: 100%;
      //   height: 100%;
      // }
    }
    .des {
      width: 300px;
      flex: 1 1 auto;
      min-height: 300px;
     
      .flex(center,flex-start,column);
      .title {
        margin-top: -100px;
      font-weight: 300;
      font-size: 2rem;
      color: #333;
        width: 100%;
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
      }
      .type {
        .flex(flex-start,flex-start);
        span,a {
          flex:0 0 auto;
          margin: 10px 10px 10px 0;
          color: @lightWords;
          font-size: 1rem;
        }
      }
      p {
        margin: 10px 0;
        overflow: hidden;
        font-size: 1.1rem;
        font-weight: 200;
            color: #666;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
    }
    }

  }


}
</style>