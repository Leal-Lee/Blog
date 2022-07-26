<template>
  <form class="data-form-container" @submit.prevent="handleSubmit">
    <div class="form-item">
      <div class="input-area">
        <input type="text" maxlength="10" placeholder="用户昵称" v-model="formData.nickname"/>
        <span class="tip">{{formData.nickname.length}}/10</span>
        
      </div>
      <div class="error">{{error.nickname}}</div>
    </div>

    <div class="form-item">
      <div class="text-item" ref="container">
        <textarea placeholder="输入内容" maxlength="300" v-model="formData.content"  />
        <span class="tip">{{formData.content.length}}/300</span>
      </div>
      <div class="error">{{error.content}}</div>
    </div>
    <div class="form-item">
      <div class="button-area">
        <button  :class="{disabled:isSumbmiting}">{{isSumbmiting ? '提交中...':'提交'}}</button>
      </div>
    </div>
  </form>
</template>

<script>
export default {
  name: "BlogDataform",

  data() {
    return {
      formData:{
        nickname:'',
        content:'',
      },
      error:{
        nickname:'',
        content:'',
      },
      isSumbmiting:false
    };
  },

  mounted() {},

  methods: {
    handleSubmit(){
  
      this.error.nickname = this.formData.nickname ?'':'请填写昵称'
      this.error.content = this.formData.content ?'':'请填写内容'
      if(this.error.nickname||this.error.content){
        return
      }

      this.isSumbmiting=true;
      const data={...this.formData}
   
      this.$emit('submit',data, (message)=>{
        this.$showMessage({
          content:message,
          type:'success',
          duration:1000,
          container:this.$refs.container,
          callback:()=>{
             this.formData.nickname = ''
             this.formData.content = ''
             this.isSumbmiting=false
          }
  
        }
          
        )
      });
      
    },
    
  },
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.data-form-container {
  width: 100%;
  input,
  textarea {
    outline-style: none;
    border: none;
    font-size: 16px;

  }
  input {
    height: 40px;
    width: 400px;
  }
  textarea {
    width: 800px;
    height: 300px;
    resize: none;
  }

  button {
    width: 100px;
    height: 30px;
    border: 0;
    font-size: 16px;
    background: #008c8c;
    border-radius: 5px;
    &:hover{
      background: darken(#008c8c,10%);
    }
        &:disabled{
      background: lighten(#008c8c,20%);
      cursor: not-allowed;
    }
  }
  .form-item {
    margin: 10px 30px 10px 30px;
    .input-area,.text-item{
      position: relative;
     border: 1px dashed @gray;
    border-radius: 5px;
          .tip{
      color: @gray;
      margin: 0 10px;
      position: absolute;
      bottom: 0;
      right: 0;
    }
    }
.input-area{
  width: 450px;
  height: 40px;
}
.text-item{
      width: 850px;
    height: 300px;
}
    .error {
      font-size: 14px;
      height: 30px;
      line-height: 30px;
      color: red;
    }
  }
}
</style>