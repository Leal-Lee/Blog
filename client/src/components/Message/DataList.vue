<template>
  <ul class="data-list-container">
    <li v-for="item in commentList" :key="item.id">
      <Avatar :imgSize="50" :url="item.avatar" />
      <div class="data">
        <div class="nickname">
          <span>{{item.nickname}}</span>
          <span class="createDate">{{item.createDate}}</span>
        </div>
        <div class="content">{{item.content}}</div>
      </div>
    </li>
  </ul>
</template>

<script>
import Avatar from "@/components/Avatar.vue";
export default {
  name: "BlogDatalist",
  props: {
    commentList: {
      type: Array,
      default: () => [],
    },
  },

  components: {
    Avatar,
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.data-list-container {
  li {
    .flex(flex-start,center);
    min-height: 100px;
    border-bottom: 1px dashed @gray;
    margin: 10px 30px;
    position: relative;
    .data {
      margin: 0 10px;
      .nickname {
        font-size: 18px;
        font-weight: 600;
        color: rgb(56, 101, 222);
        margin: 10px 0;
        .createDate {
          position: absolute;
          right: 0;
          color: @gray;
          font-size: 14px;
        }
      }
      .content {
        flex: 1 1 auto;
        font-size: 16px;
        font-weight: 500;
      }
    }
  }
}
</style>