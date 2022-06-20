
<template>
  <div id="app">
    <Layout>
      <template #left>
        <div class="aside">
          <SiteAside/>
        </div> 
      </template>

      <template #main>
        <div class="main">
         <RouterView :key="key"/>
        </div>
      </template>
    </Layout>

<ToTop/>
  </div>
</template>

<script>
import Layout from "@/components/Layout.vue";
import ToTop from "@/components/ToTop.vue";
import SiteAside  from "@/components/SiteAside/SiteAside.vue";
export default {
  name: "App",
  components: {
    Layout,
    SiteAside,
    ToTop
  },
  data() {
    return {

    };
  },
computed: {
    key() {
        return this.$route.name !== undefined? this.$route.name + +new Date(): this.$route + +new Date()
    }
 },


  mounted() {

  },

  methods: {
  
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";

#app{
.size-auto();
  .aside{
      width: 250px;
      height: 100%;
    }
.main{
  width: 100%;
  height: 100%;

}
}
</style>


