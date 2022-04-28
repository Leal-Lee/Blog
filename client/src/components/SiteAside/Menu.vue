<template>
  <nav class="menu-container">
    <RouterLink 
    :to="{name:item.name}" 
    v-for="item in items" 
    :exact='item.exact'
    :key="item.name">
      <Icon :iconType="item.icon" />
      <span>{{item.title}}</span>
    </RouterLink>
  </nav>
</template>

<script>
import Icon from "@/components/Icon.vue";

export default {
  name: "BlogMenu",
  components: {
    Icon,
  },
  data() {
    return {
      isSelect: false,
      index:0,
      items: [
        {
          name: "Home",
          title: "首页",
          icon: "home",
          exact: true, 
        },
        {
          name: "Blog",
          title: "文章",
          icon: "blog",
          exact: false, 
        },
        {
          name: "About",
          title: "关于我",
          icon: "about",
          exact: true, 
        },
        {
          name: "Project",
          title: "项目&效果",
          icon: "code",
          exact: false, 
        },
        {
          name: "Message",
          title: "留言板",
          icon: "chat",
          exact: true, 
        },
      ],
    };
  },

  mounted() {},
  
  
  methods: {
      handleClick(i){
          this.index = i
          
          console.log(location.pathname)
      }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.menu-container {
  width: 100%;
  a {
  padding-left: 20px;

      cursor: pointer;
    .flex(flex-start);
    vertical-align: middle;
    text-align: center;
    .icon-container {
      font-size: 25px;
      margin-right: 10px;
    }
    span {
      font-size: 16px;
      color: @gray;
    }
    &.router-link-active {
      background: darken(@lightWords, 10%);
    }
  }
}
</style>