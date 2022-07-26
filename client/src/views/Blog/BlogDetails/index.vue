<template>
  <div class="details-container">
    <Layout>
      <template #main>
        <div class="details" v-loading="isLoading" ref="details">
          <BlogDetails :blogDetails="datas" v-if="datas" />
          <BlogComment v-if="!isLoading" />
        </div>
      </template>
      <template #right>
        <BlogToc :list="datas.toc" v-if="datas" />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";
import BlogDetails from "./BlogDetails";
import BlogToc from "./BlogToc.vue";
import BlogComment from "./BlogComment.vue";
import fetchData from "@/mixins/fetchData.js";
import mainScroll from "@/mixins/mainScroll.js";
import { getBlog } from "@/api/blog.js";
import {setRouterTitle} from '../../../../../utils/setTtile.js'
export default {
  name: "BlogBlogdetails",
  mixins: [fetchData(null),mainScroll("details")],
  components: {
    Layout,
    BlogDetails,
    BlogToc,
    BlogComment,
  },
  data() {
    return {};
  },
 



  watch:{
    datas(){
    const hash = location.hash;
    location.hash = "";
    setTimeout(() => {
      location.hash = hash;
    }, 50);
    }
  },

  methods: {
    async fetchData() {
      const resp= await getBlog(this.$route.params.blogId);
     
      if(!resp){
        this.$router.push('/404')
        return
      }
      setRouterTitle(resp.title)
      return resp
    },

  },
};
</script>

<style lang="less" scoped>
.details-container {
  height: 100%;
  .details {
    height: 100%;
    overflow: auto;
    scroll-behavior: smooth;
  }
}
</style>