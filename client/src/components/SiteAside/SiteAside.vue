<template>
  <div class="site-aside-container" v-if="data">
    <template >
      <Avatar  :url="data.avatar"/>
      <h1 class="title">{{ data.siteTitle}}</h1>
    </template >
    <Menu />
    <Contact />
    <p class="footer">
      {{ data.icp }}
    </p>
  </div>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
import Menu from "./Menu.vue";
import Contact from "./Contact.vue";
import { mapState } from 'vuex'
export default {
 name:'BlogAside',
  components: {
    Avatar,
    Menu,
    Contact,
  },

computed:mapState('setting',['data']),
};
</script>

<style scoped lang="less">
@import "~@/assets/style/common.less";
.site-aside-container {
  position: relative;
  width: 100%;
  height: 100%;
  background: @dark;
  padding: 20px 0;
  box-sizing: border-box;
  overflow-x: hidden;
  overflow-y: auto;
  .flex(space-around,center,column);
}
.avatar-container {
  margin: 0 auto;
}
.footer {
  text-align: center;
  font-size: 12px;
}
.title {
  font-size: 1.2em;
  color: #fff;
  text-align: center;
}
</style>
