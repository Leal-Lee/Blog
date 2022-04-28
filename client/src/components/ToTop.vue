<template>
    <div class="to-top-container" v-show="show" @click="handleClick"  ref="lll">
      <Icon iconType="top"/>
    </div>
</template>

<script>
import Icon from '@/components/Icon'
export default {
    name: 'BlogTotop',
    components:{
        Icon
    },
    data() {
        return {
            show:false
        };
    },

  mounted() {

  this.$bus.$on('mainscroll',this.handlScroll)
   
  },

  destroyed() {
      
    this.$bus.$off('mainscroll',this.handlScroll);
  },

    methods: {
        handleClick(){
            
            this.$bus.$emit('setmainscroll',0)
        },
        handlScroll(dom){
          
            if(!dom){
           
                this.show=false
                return
            }

              if(dom.scrollTop>100){
                  this.show=true
              }  else{
                  this.show=false
              }
        },

    },
};
</script>

<style lang="less" scoped>
.to-top-container{
    font-size: 58px;
    position: fixed;
    bottom: 25px;
    right: 25px;
    color: aquamarine;
}
</style>