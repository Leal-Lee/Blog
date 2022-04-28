<template>
  <div class="img-loader-container">
      <img class="placeholder" :src="placeholder" alt="" v-if="everthingDone"  >
      <img @load="handleLoad" class="origin" :src="src" :style="{opacity:opacity,transition: duration +'ms'}" alt="">
  </div>
</template>

<script>
export default {
  name: "BlogImgLoader",
  props: {
    src: {
      type: String,
    },
    placeholder: {
      type: String,
    },
    duration:{
        type:Number,
        default:1
    }
  },

  data() {
    return {
        everthingDone:false,
        originLoaded:false
    };
  },

  mounted() {},
  computed:{
    opacity(){
        return this.originLoaded ? 1 : 0
    }
  },
  methods: {
      handleLoad(){
          this.originLoaded=true

          setTimeout(()=>{
           this.$emit('load');   

          this.everthingDone = false
          },this.duration)
      }
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";

.img-loader-container{
    .size-auto();
    position: relative;
    overflow: hidden;
    img{
    .self-fill();
        object-fit: cover;
    }
    .origin{
        opacity: 0;
    }
    .placeholder{
       filter: blur(10px);
       
    }
}
</style>