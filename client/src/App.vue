
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
         <RouterView/>
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


