<template>
  <div class="login-container">
    
    <el-form
      ref="loginForm"
      :model="loginForm"
      :rules="loginRules"
      class="login-form"
      auto-complete="on"
      label-position="left"
    >
      <div class="title-container">
        <h3 class="title">个人博客后台管理系统</h3>
      </div>
      <!-- 用户账号 -->
      <el-form-item prop="loginId">
        <span class="svg-container">
          <svg-icon icon-class="user" />
        </span>
        <el-input
          ref="loginId"
          v-model="loginForm.loginId"
          placeholder="管理员账号"
          name="loginId"
          type="text"
          tabindex="1"
          auto-complete="on"
        />
      </el-form-item>
      <!-- 密码 -->
      <el-form-item prop="loginPwd">
        <span class="svg-container">
          <svg-icon icon-class="password" />
        </span>
        <el-input
          :key="passwordType"
          ref="loginPwd"
          v-model="loginForm.loginPwd"
          :type="passwordType"
          placeholder="管理员密码"
          name="loginPwd"
          tabindex="2"
          auto-complete="on"
          @keyup.enter.native="handleLogin"
        />
        <span class="show-pwd" @click="showPwd">
          <svg-icon :icon-class="passwordType === 'password' ? 'eye' : 'eye-open'" />
        </span>
      </el-form-item>
      <!-- 错误提示 -->

      <span class="tip-wrong " v-if="wrong">{{msg}}</span>
      <!-- 7天内免登陆 -->
      <div>
          <el-checkbox v-model="checked">7天内免登陆</el-checkbox>
      </div>
      <!-- 登录按钮 -->
      <el-button
        :loading="loading"
        type="primary"
        style="width:100%;margin-bottom:30px;"
        @click.native.prevent="handleLogin"
      >登录</el-button>




    </el-form>

          <!-- 滑块验证码 -->
      <div class="slide-verify-container"  v-if="showCapctha">
        <div class="slide-verify-close" @click="handSlide">
          <el-button icon="el-icon-close" circle></el-button>
          </div> 
        <slide-verify 
        :l="42"
        :r="10"
        :w="310"
        :h="155"
        slider-text="向右滑动"
        @success="onSuccess"
        @fail="onFail"
        @refresh="onRefresh"
      ></slide-verify>

      <div class="slide-verify-mes">{{msg}}</div>
      </div>
  </div>
</template>

<script>
import { validUsername } from "@/utils/validate";
import axios from 'axios'
export default {
  name: "Login",
  data() {
    // 验证用户名
    const validateUsername = (rule, value, callback) => {
      if (!validUsername(value)) {
        callback(new Error("请输入用户名"));
      } else {
        callback();
      }
    };
    // 验证密码
    const validatePassword = (rule, value, callback) => {
      if (value.length < 5) {
        callback(new Error("密码不能少于5位"));
      } else {
        callback();
      }
    };

    return {
      msg: "",
      loginForm: {
        loginId: "admin",
        loginPwd: "admin",
      },
      // 表单验证规则
      loginRules: {
        loginId: [
          { required: true, trigger: "blur", validator: validateUsername },
        ],
        loginPwd: [
          { required: true, trigger: "blur", validator: validatePassword },
        ],
      },
      checked: true, //是否选择7天登录
      loading: false,
      passwordType: "password",
      showCapctha: false, //显示滑块验证
      wrong:false,
      redirect: undefined,
    };
  },
  watch: {
    $route: {
      handler: function (route) {
        this.redirect = route.query && route.query.redirect;
      },
      immediate: true,
    },
  },


  methods: {
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "";
      } else {
        this.passwordType = "password";
      }
      this.$nextTick(() => {
        this.$refs.loginPwd.focus();
      });
    },
    handleLogin() {
      this.$refs.loginForm.validate( (valid) => {
        if (valid) {
          this.loading = true;
          if (this.checked) {
            this.loginForm.remember = 7;
          }
          this.showCapctha=true

        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    handSlide(){
      this.showCapctha=false
      this.loading = false;
    },
   async onSuccess() {
     this.msg = "验证成功";
     const data= await  this.$store.dispatch("user/login", this.loginForm)
     console.log(this.loginForm)
      if(data){
         setTimeout(()=>{
          this.showCapctha=false

          this.$router.push({ path: this.redirect || "/" });
      },500)

      this.loading = false;
      }else{
        this.showCapctha=false
        this.wrong = true
        this.msg='账号或密码错误，请输入正确的账号密码'
        this.loading = false;
      }

      
    },
    onFail() {
      this.msg = "验证失败";
    },
    onRefresh() {
      this.msg = "";
    },
  },
};
</script>

<style lang="scss">
/* 修复input 背景不协调 和光标变色 */
/* Detail see https://github.com/PanJiaChen/vue-element-admin/pull/927 */

$bg: #283443;
$light_gray: #fff;
$cursor: #fff;

@supports (-webkit-mask: none) and (not (cater-color: $cursor)) {
  .login-container .el-input input {
    color: $cursor;
  }
}

/* reset element-ui css */
.login-container {
  .el-input {
    display: inline-block;
    height: 47px;
    width: 85%;

    input {
      background: transparent;
      border: 0px;
      -webkit-appearance: none;
      border-radius: 0px;
      padding: 12px 5px 12px 15px;
      color: $light_gray;
      height: 47px;
      caret-color: $cursor;

      &:-webkit-autofill {
        box-shadow: 0 0 0px 1000px $bg inset !important;
        -webkit-text-fill-color: $cursor !important;
      }
    }
  }

  .el-form-item {
    border: 1px solid rgba(255, 255, 255, 0.1);
    background: rgba(0, 0, 0, 0.1);
    border-radius: 5px;
    color: #454545;
  }
}
</style>

<style lang="scss" scoped>
$bg: #2d3a4b;
$dark_gray: #889aa4;
$light_gray: #eee;

.login-container {
  min-height: 100%;
  width: 100%;
  background-color: $bg;
  overflow: hidden;
  position: relative;

  .login-form {
    position: relative;
    width: 520px;
    max-width: 100%;
    padding: 160px 35px 0;
    margin: 0 auto;
    overflow: hidden;
  }

  .tips{
    font-size: 14px;
    color: #fff;
    margin-bottom: 10px;

    span {
      &:first-of-type {
        margin-right: 16px;
      }
    }
  }
  .tip-wrong {
    color:#F56C6C;
    display: block;
    font-size: 14px;
    margin-bottom: 10px;
    text-align: right;

  }
  .svg-container {
    padding: 6px 5px 6px 15px;
    color: $dark_gray;
    vertical-align: middle;
    width: 30px;
    display: inline-block;
  }

  .title-container {
    position: relative;

    .title {
      font-size: 26px;
      color: $light_gray;
      margin: 0px auto 40px auto;
      text-align: center;
      font-weight: bold;
    }
  }
  .slide-verify-container{
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    position:absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%,-50%);
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .slide-verify-close{
      position: absolute;
      top: 0;
      right: 10px;
    }
    .slide-verify-mes{
      margin-top: 20px;
      font: 500;
      color: #eee;
    }

  }
  .show-pwd {
    position: absolute;
    right: 10px;
    top: 7px;
    font-size: 16px;
    color: $dark_gray;
    cursor: pointer;
    user-select: none;
  }
}
</style>
