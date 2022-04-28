<template>
    <div class="blog-details-container">
       <h1>{{blogDetails.title}}</h1>
        <div class="type">
          <span>{{blogDetails.createDate}}</span>
          <span>浏览量：{{blogDetails.scanNumber}}</span>
          <a href="#comment">评论数：{{blogDetails.commentNumber}}</a>
          <RouterLink :to="{
          name:'CategorBlog',
          params:{
            categoryid:blogDetails.category.id
          }
        }">分类：{{ blogDetails.category.name }}</RouterLink>
        </div>
        <div class="content markdown-body" v-html="blogDetails.htmlContent">
        </div>
    </div>
</template>

<script>
import 'highlight.js/styles/github.css';
import 'github-markdown-css/github-markdown.css'

export default {
    name: 'BlogDetails',
props:{

blogDetails:{
    type:Object,
    required:true,
    
}
},
    data() {
        return {
            
        };
    },


    methods: {
        
    },
};
</script>

<style lang="less" scoped>
    @import "~@/assets/style/common.less";
// @import 'highlight.js/styles/github.css';
  .blog-details-container{
  .flex(space-between,center,column);

//   overflow: auto;
//   scroll-behavior: smooth;
  flex: 1 1 auto;
   .markdown-body {
		box-sizing: border-box;
		min-width: 200px;
		max-width: 980px;
		margin: 0 auto;
		padding: 45px;
        
	}

	@media (max-width: 767px) {
		.markdown-body {
			padding: 15px;
		}
	}
    }

</style>