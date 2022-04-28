<template>
<img class="avatar-container" :src="url" alt="" :style="{width:imgSize+'px',height:imgSize+'px'}">
</template>

<script>

export default {

  name: 'BlogAvatar',
props:{
  url:String,
  imgSize:{
    type:Number,
    default:150
  }
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
.avatar-container{
width: 100%;
display: block;
border-radius: 50%;
object-fit: cover;
}
</style>