<template>
  <div class="blog-message-container" id='message' ref="message" >
    <Message
      :commentList="datas.rows"
      title="全部留言"
      :subTitle="datas.total"
      :isListLoading="isLoading"
      @submit="handleSbumit"
    />
    <div class="loading" v-loading='isLoading'></div>
  </div>
</template>

<script> 
import Message from "@/components/Message";
import mixins from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll.js";
import { getMessage,postMessage } from "@/api/message.js";

export default {
  name: "BlogBlogmessage",

  mixins: [mixins({ total: 0, rows: [] }),mainScroll('message')],
  components: {
    Message,
  },
  data() {
    return {

      options :{
        page: 1,
        limit: 10,
      }
    };
  },

  mounted() {
  
  this.$bus.$on('mainscroll',this.handlScroll)
   
  },
  destroyed() {
    this.$off('mainscroll',this.handlScroll);
  },
  methods: {
    async fetchData() {

      return await getMessage(this.options);
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
      if(this.datas.rows.length > this.datas.total){
        return
      }
    this.options.page++
    this.isLoading=true
    const res= await getMessage(this.options);
    this.datas.total=res.total
    this.isLoading=false
    return this.datas.rows = this.datas.rows.concat(res.rows)

    },

  async  handleSbumit(formData,callback){
         
       const resp= await  postMessage({
            ...formData
            })
        this.datas.rows.unshift(resp)
        this.datas.total++
        callback('评论成功')
    }
  },
};
</script>

<style lang="less" scoped>
.blog-message-container {
  width: 100%;
  height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
  .loading{
    position: relative;
  }
}
</style>