<template>
  <div class="about-container">
    <el-form :model="form" ref="form" :rules="rules" class="editBlog-from">
      <!-- 网站标题 -->
      <el-form-item label="网站标题" label-width="150px" prop="siteTitle">
        <el-input
          v-model="form.siteTitle"
          placeholder="请输入网站标题"
          :disabled="isEidt"
         
        ></el-input>
      </el-form-item>
      <!-- github主页 -->
      <el-form-item label="github主页" label-width="150px" prop="github">
        <el-input v-model="form.github" placeholder="请输入github主页" :disabled="isEidt"></el-input>
      </el-form-item>
      <!-- qq -->
      <el-form-item label="qq" label-width="150px" prop="qq">
        <el-input v-model="form.qq" placeholder="请输入qq号" :disabled="isEidt"></el-input>
      </el-form-item>

      <!-- weixin -->
      <el-form-item label="微信" label-width="150px" prop="weixin">
        <el-input v-model="form.weixin" placeholder="请输入微信号" :disabled="isEidt"></el-input>
      </el-form-item>
      <!-- mail -->
      <el-form-item label="邮箱" label-width="150px" prop="mail">
        <el-input v-model="form.mail" placeholder="请输入邮箱" :disabled="isEidt"></el-input>
      </el-form-item>

      <el-form-item label="icp备案" label-width="150px" prop="icp">
        <el-input v-model="form.icp" placeholder="请输入icp" :disabled="isEidt"></el-input>
      </el-form-item>

      <el-form-item label="githubName" label-width="150px" prop="githubName">
        <el-input v-model="form.githubName" placeholder="请输入github名称" :disabled="isEidt"></el-input>
      </el-form-item>

      <el-form-item label="设置头像" label-width="150px">
        <Upload name="thumb" v-model="form.avatar" :showSubTitle="false" v-if="!isEidt" />
        <el-image
          style="width: 100px; height: 100px"
          :src="form.avatar"
          :preview-src-list="avatars"
        ></el-image>
      </el-form-item>

      <el-form-item label="设置QQ二维码" label-width="150px">
        <Upload name="thumb" v-model="form.qqQrCode" :showSubTitle="false" v-if="!isEidt" />
                <el-image
          style="width: 100px; height: 100px"
          :src="form.qqQrCode"
          :preview-src-list="qqQrCodes"
        ></el-image>
      </el-form-item>

      <el-form-item label="设置微信二维码" label-width="150px">
        <Upload name="thumb" v-model="form.weixinQrCode" :showSubTitle="false" v-if="!isEidt" />
                <el-image
          style="width: 100px; height: 100px"
          :src="form.weixinQrCode"
          :preview-src-list="weixinQrCodes"
        ></el-image>
      </el-form-item>
      <el-form-item label="设置图标" label-width="150px">
        <Upload name="thumb" v-model="form.favicon" :showSubTitle="false" v-if="!isEidt" />
                <el-image
          style="width: 100px; height: 100px"
          :src="form.favicon"
          :preview-src-list="favicons"
        ></el-image>
      </el-form-item>
      <el-form-item>
        <el-button type="danger" @click="setHandle('form')" round>{{isEidt?'编辑':'完成'}}</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import { setSetting, getSetting } from "@/api/setting.js";
import Upload from "@/components/upload";
export default {
  name: "Set",
  components: {
    Upload,
  },

  data() {
    return {
      settingInfo:{},
      avatars: [],
      qqQrCodes:[],
       weixinQrCodes:[],
        favicons:[],
      isEidt: true,
      form: {
        avatar: "", // 博主照片
        siteTitle: "", // 网站标题
        github: "", // 博主github主页
        qq: "", // 博主 qq
        qqQrCode: "", // 博主qq二维码
        weixin: "", // 博主微信号
        weixinQrCode: "", // 博主微信二维码
        mail: "", // 博主邮箱
        icp: "", // 网站备案号
        githubName: "", // 博主github名称
        favicon: "", // 网站图标
      },
      rules: {
        // avatar: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        siteTitle: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
        github: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        qq: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        // qqQrCode: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        weixin: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        // weixinQrCode: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        mail: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        icp: [{ required: true, message: "内容不能为空", trigger: "blur" }],
        githubName: [
          { required: true, message: "内容不能为空", trigger: "blur" },
        ],
        // favicon: [{ required: true, message: "内容不能为空", trigger: "blur" }],
      },
    };
  },

  created() {
    this.fetchData();
  },

  methods: {
    setHandle(formName) {
      this.$refs[formName].validate(async (valid) => {
        if (valid) {
          this.isEidt = !this.isEidt;
          if (this.isEidt) {
            const updateInfo={}
         for(let key in this.form){
          if(this.form[key]!=this.settingInfo[key]){
            updateInfo[key]=this.form[key]
          }
         }
         console.log(updateInfo)
            await setSetting(updateInfo);

            this.$message.success("编辑成功");
            this.fetchData();
          }
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },

    async fetchData() {
      this.settingInfo= await getSetting();
      this.settingInfo.avatar=process.env.VUE_APP_SERVERPATH + this.settingInfo.avatar
      this.settingInfo.qqQrCode=process.env.VUE_APP_SERVERPATH + this.settingInfo.qqQrCode
      this.settingInfo.weixinQrCode=process.env.VUE_APP_SERVERPATH + this.settingInfo.weixinQrCode
      this.settingInfo.favicon=process.env.VUE_APP_SERVERPATH + this.settingInfo.favicon
      this.form = {...this.settingInfo};

      this.avatars = [this.form.avatar];
      this.qqQrCodes = [this.form.qqQrCode];
      this.weixinQrCodes = [this.form.weixinQrCode];
      this.favicons = [this.form.favicon];

    },

  },
};
</script>

<style lang="scss" scoped>
.about-container {
  .el-input {
    width: 80%;
  }

  .upload-container {
    width: 200px;
    height: 140px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
}
</style>