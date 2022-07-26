<template>
  <div class="blog-cate-container" v-loading="isLoading">
    <h2 v-if="!isLoading">文章分类</h2>
    <RightList :list="list" @changId="handleIdChange" />
  </div>
</template>

<script>
import RightList from "@/components/RightList.vue";
import mixins from "@/mixins/fetchData.js";
import { getblogtype } from "@/api/blog.js";
export default {
  name: "BlogBlogcate",
  mixins: [mixins([])],
  components: { RightList },
  data() {
    return {};
  },
  computed: {
    // 重新定义数组，在数组中添加全部，文章总数，和id选项
    list() {
  
      const articleCount = this.datas.reduce(
        (pre, cur) =>  pre + parseInt(cur.articleCount),
        0
      );
      console.log( articleCount)
      const result = [
        {
          name: "全部",
          articleCount,
          id: -1,
        },
        ...this.datas,
      ];

      const newList = result.map((data) => {
        return {
          isSelect: data.id == this.categoryId,
          asside: data.articleCount + "篇",
          ...data,
        };
      });

      return newList;
    },

    categoryId() {
      return +this.$route.params.categoryid || -1;
    },
  },

  methods: {
    async fetchData() {
      return await getblogtype();
    },

    handleIdChange(item) {
      if (item.id == -1) {
        this.$router.push({ name: "Blog" });
      } else {
        this.$router.push({
          name: "CategorBlog",
          params: { categoryid: item.id },
        });
      }
    },
  },
};
</script>

<style lang="less" scoped>
.blog-cate-container {
  width: 250px;
  height: 100%;
  position: relative;
}
</style>