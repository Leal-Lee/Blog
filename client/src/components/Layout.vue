<template>
  <div class="layout-container">
    <div class="left">
      <slot name="left"></slot>
    </div>

    <div class="middle">
      <slot name="main"></slot>
    </div>

    <div class="right">
      <slot name="right"></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "BlogLayout",

  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.layout-container {
  .flex(flex-start,flex-start);
  .size-auto();
  .left,.right {
    height: 100%;
     flex: 0 0 auto;
  }
  .middle {
   
    .size-auto();
  

      flex:1 1 auto

  }

}
</style>