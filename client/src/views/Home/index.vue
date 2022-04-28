<template>
  <div class="blog-container" ref="containerHeight" @wheel="handleWheel" v-loading='isLoading'>
    <ul class="carouse-container" :style="{marginTop}" @transitionend="handleTransitionend">
      <li v-for="item in data" :key="item.id">
        <Carouseitem :data="item" :isShow="isShow" @showWords="showWords" />
      </li>
    </ul>

    <div v-show="index !==0" @click="switchTo(index -1)" class="arrowUp">
      <Icon iconType="arrowUp" />
    </div>

    <div v-show="index !== data.length-1" @click="switchTo( index +1 )" class="arrowDown">
      <Icon iconType="arrowDown" />
    </div>

    <div class="indicotar">
      <ul>
        <li
          :class="{acitve:index == i}"
          v-for="(item,i) in data"
          :key="item.id"
          @click="switchTo(i)"
        ></li>
      </ul>
    </div>
  </div>
</template>
   


<script>
import Carouseitem from "./Carouseitem.vue";

import Icon from "@/components/Icon.vue";

import { mapState } from 'vuex'
export default {

  name: "BlogHome",
  components: {
    Carouseitem,
    Icon,
  },
  data() {
    return {
      index: 0,
      containerHeight: 0,
      switching: false,
      isShow: false,
    };
  },
  

   created(){   
      this.$store.dispatch('banners/getBanner');
      
    },

  mounted() {
    this.containerHeight = this.$refs.containerHeight.clientHeight;
    window.addEventListener("resize",this.handleResize );
    

  },
  destroyed() {
    window.removeEventListener("resize",this.handleResize);
  },
  computed: {
    marginTop() {
      return this.index * -this.containerHeight + "px";
    },

    ...mapState('banners',['data','isLoading'])
  },

  methods: {

  //  async fetchData(){
  //     return await getbanners();
  //   },
    
    switchTo(i) {
      if (this.index == i) {
        return;
      }
      this.isShow = false;
      this.index = i;
    },
    handleWheel(e) {
      if (this.switching || (e.deltaY <= 5 && e.deltaY >= -5)) {
        return;
      }
    
      if (e.deltaY > 5 && this.index !== this.data.length - 1) {
        this.switching = true;

        if (this.index == this.data.length - 1) {
          return;
        }
        this.switchTo(this.index + 1);
      }
      if (e.deltaY < -5 && this.index != 0) {
        this.switching = true;
        if (this.index == 0) {
          return;
        }
        this.switchTo(this.index - 1);
      }
    },
    handleTransitionend() {
      this.switching = false;
      this.showWords()
    },
    showWords() {
      this.isShow = true;
    },
    handleResize(){
      this.containerHeight = this.$refs.containerHeight.clientHeight;
      console.log("窗口尺寸变化了", this.containerHeight);
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
@keyframes arrowDown {
  from {
    transform: translate(-50%, 20px);
  }
  50% {
    transform: translate(-50%, -20px);
  }
  to {
    transform: translate(-50%, 20px);
  }
}
@keyframes arrowUp {
  from {
    transform: translate(-50%, -20px);
  }

  50% {
    transform: translate(-50%, 20px);
  }
  to {
    transform: translate(-50%, -20px);
  }
}
.blog-container {
  overflow: hidden;
  .size-auto();
  position: relative;
  .arrowDown,
  .arrowUp {
    font-size: 28px;
    position: absolute;
    width: 50px;
    height: 50px;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
  }
  .arrowDown {
    bottom: 50px;
    animation: arrowUp 3s linear infinite;
  }
  .arrowUp {
    top: 50px;
    animation: arrowDown 3s linear infinite;
  }

  .indicotar {
    position: absolute;
    top: 50%;
    right: 50px;
    transform: translate(-50%, -50%);
    li {
      border-radius: 50%;
      width: 12px;
      height: 12px;
      background: #f3eeef;
      margin: 5px 0;
      &.acitve {
        background: #023a1e;
      }
    }
  }

  .carouse-container {
    .size-auto();
    transition: all 0.5s;

    li {
      .size-auto();
    }
  }
}
</style>