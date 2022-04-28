<template>
  <div class="right-list-container">
    <ul>
      <li
        v-for="item in list"
        :key="item.id"
        :class="{active:item.isSelect}"
        @click.stop="handleClick(item)"
      >
        <span>{{ item.name}}</span>
        <span v-if="item.asside">{{ item.asside}}</span>
        <BlogRightlist v-if="item.children" :list="item.children" @changId="handleClick" />
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  name: "BlogRightlist",
  props: {
    list: {
      type: Array,
      default: function () {
        return [];
      },
    },
  },
  data() {
    return {
      id: 0,
    };
  },

  mounted() {},

  methods: {
    handleClick(item) {
      console.log(item)
      this.$emit("changId", item);

    },
  },
};
</script>

<style lang="less" scoped>
.right-list-container {
  ul {
    li {
      line-height: 30px;
      font-size: 16px;
      &.active>span{
        color: rgb(255, 38, 0);
        font-weight: 600;
      }
      span {
        margin: 0 10px;
      }
      .right-list-container {
        padding: 10px;
      }
    }
  }
}
</style>