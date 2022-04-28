<template>
  <div class="message-container">
    <DataForm  v-on="$listeners"/>

    <h2>
      {{ title }}
      <span>({{ subTitle }})</span>
    </h2>
    <DataList :commentList='commentList'/>

    <div class="loading"></div>
  </div>
</template>

<script>
import DataList from "./DataList.vue";
import DataForm from "./DataForm.vue";

export default {
  name: "BlogMessage",
  props:{
    commentList:{
      type:Array,
      default:()=>[]
    },
        title:{
      type:String,
      default:''
    },
       subTitle:{
      type:Number,
      default:0
    },
    isListLoading:{
      type:Boolean,
      default:false
    }
  },
  components: {
    DataForm,
    DataList,
  },
  data() {
    return {};
  },

  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
h2{
    margin: 20px  10px 10px 30px;
}
</style>