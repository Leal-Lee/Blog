<template>
  <div class="blog-container">
    <Layout>
      <template #main>
        <BlogList />
      </template>
      <template #right>
        <BlogCate />
      </template>
    </Layout>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";
import BlogList from "./BlogList.vue";
import BlogCate from "./BlogCate.vue";
export default {
  name: "BlogBlog",
  components: {
    Layout,
    BlogList,
    BlogCate,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
.blog-container{
    // width: 100%;
    height: 100%;
  
}
</style>