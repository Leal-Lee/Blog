<template>
  <div class="icon-container " >
    <svg class="icon" aria-hidden="true">
      <use :xlink:href="iconStyle" />
    </svg>
  </div>
</template>

<script>
import "@/assets/icon/iconfont.js";
import {iconMap} from "@/assets/icon/iconmap.js";
export default {
  name: "BlogIcon",
  props: {

    iconType: {
      style: String,
      required: true,
    },
  },
  data() {
    return {};
  },
  computed: {
    iconStyle() {
      return iconMap[this.iconType];
    },
  },
  mounted() {},
  methods: {},
};
</script>

<style lang="less" scoped>

</style>