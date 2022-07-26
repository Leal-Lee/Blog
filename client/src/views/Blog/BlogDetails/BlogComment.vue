<template>
  <div class="blog-comment-container" id='comment' ref="comment" >
    <Message
      :commentList="datas.rows"
      title="全部评论"
      :subTitle="datas.count"
      :isListLoading="isLoading"
      @submit="handleSbumit"
    />
    <div class="loading" v-loading='isLoading'></div>
  </div>
</template>

<script> 
import Message from "@/components/Message";
import mixins from "@/mixins/fetchData.js";
import { getComment,postComment } from "@/api/blog.js";

export default {
  name: "BlogBlogcomment",

  mixins: [mixins({ count: 0, rows:[] })],
  components: {
    Message,
  },
  data() {
    return {

      options :{
        page: 1,
        limit: 10,
        blogId: +this.$route.params.blogId,
      }
    };
  },
 computed:{
  hasMore(){
  
    if(!this.datas.rows){
    return
    }
    return this.datas.rows.length < this.datas.count
  }
 },
  mounted() {
  
  this.$bus.$on('mainscroll',this.handlScroll)
   
  },
  destroyed() {
    this.$off('mainscroll',this.handlScroll);
  },
  methods: {
    async fetchData() {
     
    const data =  await getComment(this.options);
   
    if(typeof data == 'string'){
      return this.datas

    }
    data.rows.forEach(item => {
      item.avatar=process.env.VUE_APP_SERVERPATH+item.avatar
    });
      return data
    },
    handlScroll(dom){
      if(this.isLoading ||!dom){
        return
      }
      const range= 100
      const dec = Math.abs(dom.scrollTop+dom.clientHeight-dom.scrollHeight)
      if(range>dec){
      this.fetchMore()

      }
    },

    async fetchMore(){
      if(!this.hasMore){
       
        return
      }
    this.options.page++
    this.isLoading=true
    const res= await getComment(this.options);
    this.datas.count=res.count
    this.isLoading=false
    return this.datas.rows = this.datas.rows.concat(res.rows)

    },

  async  handleSbumit(formData,callback){
         
       const resp= await  postComment({
            blogId:+this.$route.params.blogId,
            ...formData
            })

         resp.avatar=process.env.VUE_APP_SERVERPATH + resp.avatar   
     
        this.datas.rows.unshift(resp)
        this.datas.count++
        callback('评论成功')
    }
  },
};
</script>

<style lang="less" scoped>
.blog-comment-container {
  width: 100%;
  .loading{
    position: relative;
  }
}
</style>