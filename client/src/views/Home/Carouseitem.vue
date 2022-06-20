<template>
  <div class="carouseitem-container" ref="container" @mousemove="handleMove" @mouseleave="handleLeave">
    <div class="carouse-img" :style="styles" >
      <ImgLoader ref="img" :src="data.bigImg" :placeholder="data.midImg" @load="load" />
    </div>
    <Transition name="title" :duration="{ leave: 0 }">
      <div class="title" v-show="isShow">{{ data.title }}</div>
    </Transition>
    <Transition name="description" :duration="{ leave: 0 }">
      <div class="description" v-show="isShow">{{ data.description}}</div>
    </Transition>
  </div>
</template>

<script>
import ImgLoader from "@/components/ImgLoader";
export default {
  name: "BlogCarouseitem",
  props: ["data", "isShow"],
  components: {
    ImgLoader,
  },

  data() {
    return {
      x:0,
      y:0,
      imgSize: {
        width: 0,
        height: 0,
      },
      containerSize: {
        width: 0,
        height: 0,
      },
      distance: {
        x: 0,
        y: 0,
      },
      mouse:{
        x:0,
        y:0
      }
    };
  },

  mounted() {
    this.setSize()
    this.x= this.distance.x/2
    this.y= this.distance.y/2
    window.addEventListener("resize",this.setSize)
   
  },
    destroyed() {
    window.removeEventListener("resize",this.setSize);
  },
 computed:{
   styles(){
     return {
       transform:`translate(-${this.x}px,-${this.y}px)`
     }
   },

 },

  methods: {
    load() {
    
      this.$emit("showWords");
    },
 
    setSize(){
    this.containerSize.width = this.$refs.container.clientWidth;
    this.containerSize.height = this.$refs.container.clientHeight;
    this.imgSize.width = this.$refs.img.$el.clientWidth;
    this.imgSize.height = this.$refs.img.$el.clientHeight;
    this.distance.x= this.imgSize.width-this.containerSize.width
    this.distance.y= this.imgSize.height-this.containerSize.height 

    },

    handleMove(e){

      this.mouse.x= e.clientX -this.$refs.container.getBoundingClientRect().left
      this.mouse.y=e.clientY-this.$refs.container.getBoundingClientRect().top
      this.x= this.distance.x * (this.mouse.x / this.$refs.container.clientWidth) 
      this.y= this.distance.y * (this.mouse.y / this.$refs.container.clientHeight) 

    },
    handleLeave(){
    this.x= this.distance.x/2
    this.y= this.distance.y/2
    }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.carouseitem-container {
  position: relative;
  overflow: hidden;

  .size-auto();
 
  .carouse-img {
    position: absolute;
    left: 0;
    top: 0;
    width: 110%;
    height: 110%;
     transition: all 0.3s;
  }

  .title,
  .description {
    position: absolute;
    left: 20px;
    color: white;
    white-space: nowrap;
    overflow: hidden;
    text-shadow: 2px 0px 0 rgba(0, 0, 0, 0.5), 0 2px 0 rgba(0, 0, 0, 0.5);
  }

  .title {
    top: calc(50% - 30px);
    font-size: 2rem;
    width: 300px;
  }
  .description {
    top: calc(50% + 30px);
    text-indent: 2rem;
    font-size: 1.1rem;
    color: lighten(@gray, 20%);
    width: 600px;
    transition-delay: 2s;
    transition: all 3s;
  }

  .description-enter,
  .description-leave-to {
    width: 0;
  }
  .description-enter-active,
  .description-leave-active {
    transition: all 3s 500ms;
  }
  .description-leave,
  .description-enter-to {
    width: 300px;
  }

  .title-enter,
  .title-leave-to {
    width: 0;
  }
  .title-enter-active,
  .title-leave-active {
    transition: all 4s;
  }
  .title-leave,
  .title-enter-to {
    width: 600px;
  }
}
</style>