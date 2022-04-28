<template>
  <ul class="contact-container" >
    <li>
      <a  :href='`tencent://message/?Menu=yes&uin=${data.qq}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`'  >
        <Icon iconType="QQ" />
        <span>{{data.qq}}</span>
      </a>
    </li>

        <li>
      <a  :href='`tencent://message/?Menu=yes&uin=${data.weixin}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`'  >
        <Icon iconType="chart" />
        <span>{{data.weixin}}</span>
      </a>
      
      <div class="pop">
        <img :src="data.weixinQrCode" alt />
      </div>
    </li>
        <li>
      <a  href='https://mail.qq.com/'  >
        <Icon iconType="email" />
        <span>{{data.mail}}</span>
      </a>


    </li>
        <li>
      <a  :href='`tencent://message/?Menu=yes&uin=${QQ}&Service=300&sigT=45a1e5847943b64c6ff3990f8a9e644d2b31356cb0b4ac6b24663a3c8dd0f8aa12a595b1714f9d45`'  >
        <Icon iconType="QQ" />
        <span>{{QQ}}</span>
      </a>

    </li>

  </ul>
</template>

<script>
import Icon from "@/components/Icon.vue";
import { mapState } from 'vuex'
export default {
  name: "BlogContact",
  components: {
    Icon,
  },
  data() {
    return {
        QQ:27304938,
      weixin: require("../../assets/img/weixin.jpg"),
    };
  },
computed:mapState('setting',['data']),
  mounted() {},

  methods: {},
};
</script>

<style lang="less" scoped>
@import "~@/assets/style/common.less";
.contact-container {
  @height: 30px;
  padding: 20px;

    width: 100%;
  li {
    height: @height;
    line-height: @height;
   
    margin: 10px 0;
    position: relative;
          &:hover{
          .pop{
          transform: scaleY(1);
      }
      }

    a {
      .flex(flex-start);
      vertical-align: middle;
      text-align: center;
      .icon-container {
        font-size: 25px;
        margin-right: 10px;
      }
      span {
        font-size: 16px;
        color: @gray;
      }

    }

    .pop {
      transform: scaleY(0);
      transform-origin: center bottom;
      transition: 0.3s;
      position: absolute;
      bottom: @height;
      left: 0;
      background: white;
      border-radius: 5px;
          &::after{
          content: '';
          display: block;
          width: 0;
          height: 0;
          border-top: 10px white solid;
          border-left: 10px transparent solid;
          border-bottom: 10px transparent solid;
          border-right: 10px transparent solid;
          position: absolute;
          bottom: -20px;
          left: 50%;
          transform: translatex(-50%);
          color: transparent;
      }
      img {
        width: 150px;
        height: 150px;
      }

    }
    
  }
}
</style>