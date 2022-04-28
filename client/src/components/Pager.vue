<template>
  <div class="pager-container" v-if="pageNumber > 1">
    <a @click="click(1)" v-show="current!==1">首页</a>
    <a @click="click(current -1)" v-show="current > 1" >上一页</a>
    <a
      v-for="(n,i) in visibleNumber"
      :key="i"
      :class="{ active : current == min + i }"
      @click="handleClick(i)"
    >{{  min + i }}</a>
    <a v-show="current < pageNumber" @click="click(current +1)">下一页</a>
    <a v-show="current!= pageNumber" @click="click(pageNumber)">尾页</a>
  </div>
</template>

<script>
export default {
  name: "BlogPager",
  props: {
    current: {
      type: Number,
      default: 1,
    },
    total: {
      type: Number,
      default: 0,
    },
    limit: {
      type: Number,
      default: 10,
    },
    visibleNumber: {
      type: Number,
      default: 10,
    },
  },

  data() {
    return {
      min:1,
      midle:Math.floor(this.visibleNumber/2) ,
      // index:0,
      newPage:1
    };
  },

  computed: {
    //总页码
    pageNumber() {
      return Math.ceil(this.total / this.limit);
    },

  },

  methods: {
    // 最小页，让当前页出现在中间
    minNumber(page){
      // 当前页小于中间数时，按顺序激活当前页
    if(page <= this.midle){
      this.min = 1
    }else if(page > this.pageNumber - this.midle){
        // 当前页小于中间数时，按顺序激活当前页
      this.min= this.pageNumber-this.visibleNumber + 1 
    }
    else {
      // 让当前页出现在中间
      this.min = page - this.midle
    }
    return this.min
    },

    handleClick(i) {
      
      if(this.current == this.min + i ){
        return
      }
      //点击之后，i变化了就会重新渲染，newPage更新
    this.newPage = this.min + i 
    this.minNumber(this.newPage)
   
    this.$emit("pageChange", this.newPage);
    },

    click(page){
      this.minNumber(page)
      this.$emit('pageChange',page)
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.pager-container {
  .flex();
  a {
    width: 45px;
    height: 45px;
    margin: 5px;
    border-radius: 5px;
    background: @primary;
    line-height: 45px;
    text-align: center;
    font-size: 14px;
    font-weight: 500;
    cursor: pointer;
    color: @font;
    &.active {
      color: @words;
      background: @warn;
    }
  }
}
</style>