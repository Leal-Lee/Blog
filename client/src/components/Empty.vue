<template>
    <div class="empty-container">
        <Icon iconType='empty'/>
        <p>{{text}}</p>
    </div>
</template>

<script>
import Icon from "@/components/Icon.vue";
export default {
    name: 'BlogEmtpy',
    props:{
        text:{
            type:String,
            default:'空空如也'
        }
    },
components:{
    Icon
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
@import "~@/assets/style/common.less";
.empty-container{
    font-size: 16px;
    text-align: center;
    color: @lightWords;
   .self-center();
    .icon-container{
        font-size: 100px;
        color: #707070;
    }
}
</style>