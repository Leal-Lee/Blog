<template>
  <div class="editBlog-container">
    
    <el-form :model="form" ref="form" :rules="rules" class="editBlog-from">
      <!-- 标题 -->
      <el-form-item label="文章标题" label-width="100px" prop="title">
        <el-input v-model="form.title" placeholder="请输入内容" maxlength="20" show-word-limit></el-input>
      </el-form-item>
      <!-- 描述 -->
      <el-form-item label="文章描述" label-width="100px" prop="description">
        <el-input v-model="form.description" placeholder="请输入内容" maxlength="100" show-word-limit></el-input>
      </el-form-item>

      <!-- 分类 -->
      <el-form-item label="文章分类" label-width="100px" prop="categoryId">
        <el-input class="category" v-model="category" placeholder="请输入内容" @blur="getCategory" ref="category"></el-input>
        <el-select v-model="category" @change="handleChange " >
          <el-option  :value="item" v-for="item ,i in categorys" :key="i"></el-option>
        </el-select>
      </el-form-item>
      <!-- 图片 -->
      <el-form-item label="设置图片" label-width="100px">
        <Upload name="thumb" v-model="form.thumb" :showSubTitle="false" />
      </el-form-item>

      <!-- 编辑 -->
      <el-form-item label="文章编辑" label-width="100px">
        <Editor
          height="1000px"
          :initialValue="form.markdownContent"
          :options="editorOptions"
          @blur="onEditorBlur"
          ref="toastuiEditor"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="warning" round @click="saveDraft('form')" v-if="!$route.params.blogId">保存草稿</el-button>
        <el-button type="danger" @click="publishBlog('form')" round>{{typeof $route.params.blogId == 'undefined'? "添加文章":"修改文章"}}</el-button>
        <el-button type="warning" round @click="dialogVisible=true">预览</el-button>
      </el-form-item>
    </el-form>

<el-dialog
  title="预览"
  :visible.sync="dialogVisible"
   :fullscreen='true'
  :before-close="handleClose"
  center
  >
  
  <Viewer
  :options="viewerOptions"
   height='937px'
   :initialValue="form.markdownContent"
  />
  
  <span slot="footer" class="dialog-footer">
    <el-button type="primary" @click="dialogVisible = false">关闭</el-button>
  </span>
</el-dialog>

  </div>
</template>

<script>
import "@toast-ui/editor/dist/toastui-editor.css";
import '@toast-ui/editor/dist/toastui-editor-viewer.css';
import { Editor,Viewer } from "@toast-ui/vue-editor";
import "@toast-ui/editor/dist/i18n/zh-cn";
import Upload from "@/components/upload";

import { editBlog ,getOneBlog,putBlog} from "@/api/blog.js";
import { getBlogType, addBlogType } from "@/api/blogType.js";

import "@toast-ui/chart/dist/toastui-chart.css";
import chart from "@toast-ui/editor-plugin-chart";
import "prismjs/themes/prism.css";
import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight";
import "tui-color-picker/dist/tui-color-picker.css";
import "@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css";
import colorSyntax from "@toast-ui/editor-plugin-color-syntax";
import "@toast-ui/editor-plugin-table-merged-cell/dist/toastui-editor-plugin-table-merged-cell.css";
import tableMergedCell from "@toast-ui/editor-plugin-table-merged-cell";
import uml from "@toast-ui/editor-plugin-uml";
export default {
  name: "EditBlog",

  data() {
    return {
      dialogVisible:false,
      centerDialogVisible: false,
      viewerOptions:{
        // language: "zh-CN",
        plugins: [
          chart,
          codeSyntaxHighlight,
          tableMergedCell,
          uml,
        ],
      },
      editorOptions: {
        language: "zh-CN",
        plugins: [
          chart,
          codeSyntaxHighlight,
          colorSyntax,
          tableMergedCell,
          uml,
        ],
        placeholder: "请编辑内容",
      },
      blog:{},
      category: "",
      categorys: [],
      blogType: [],
      form: {
        isDraft:false,
        title: "",
        description: "",
        thumb: "",
        createDate: "",
        categoryId: "",
        htmlContent: "",
        markdownContent: "",
      },

      rules: {
        title: [
          { required: true, message: "文章标题不能为空", trigger: "blur" },
        ],
        description: [
          { required: true, message: "文章描述不能为空", trigger: "blur" },
        ],
        categoryId: [
          { required: true, message: "文章分类不能为空", trigger: "blur" },
        ]

      },
    };
  },
  components: {
    Editor,
    Upload,
    Viewer
  },
  async mounted() {

    if(this.$route.params.blogId){
     const blog= await getOneBlog(this.$route.params.blogId)
     this.form={
        isDraft:blog.isDraft,
        title: blog.title,
        description: blog.description,
        thumb:blog.thumb,
        createDate: blog.createDate,
        categoryId: blog.category.id,
        htmlContent: blog.htmlContent,
        markdownContent: '',
     }
     this.$refs.toastuiEditor.invoke("setHTML",blog.htmlContent)
     this.category=blog.category.name
    
    }

    this.blogType = await getBlogType();
    this.blogType.forEach((it) => {
      this.categorys.push(it.name);
    });
  },


  methods: {

    handleChange(){
      this.$refs.category.focus()

    },
    saveDraft(formName){
       this.form.isDraft=true
       this.publishBlog(formName)
    },

    publishBlog(formName) {

     this.$refs[formName].validate(async (valid) => {
        if (valid) {
          // 验证通过
         
          // 创建时间
          this.form.createDate = Date.now();
           
          if (this.form.markdownContent.length==0||this.category.trim().length==0) {
            this.$message.error("文章或者分类内容不能为空");
            
            return
          }
            
          if (!this.categorys.includes(this.category) && !this.category == "") {
            this.categorys.push(this.category);
            // 添加分类
            const result = await addBlogType({
              name: this.category,
              order: 1,
            });
            this.form.categoryId = result.id;
          }
         
        // 如果有id，则修改文章，添加文章就不执行了
        if(this.$route.params.blogId){
          // 如果draft是ture，则是草稿箱里面的，修改后发布文章
          if(this.form.isDraft){
            this.form.isDraft=false
          }
          await putBlog(this.$route.params.blogId,this.form);
          this.$router.push("/blog/blogList");
          return
        }

        // 添加文章
        if(this.form.isDraft==false){
          await editBlog(this.form);
         this.$router.push("/blog/blogList");
        }else{
        //草稿箱
        
        await editBlog(this.form);
        this.$router.push("/blog/blogDraft")

      }



        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },


      handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },



  async getCategory(){

            const type = this.blogType.find((item) => {
              return item.name == this.category;
            });
            if (type) {
              this.form.categoryId = type.id;
              return
            }
            this.form.categoryId=-1
        
   },
    onEditorBlur() {
      this.form.htmlContent = this.getHTML();
      this.form.markdownContent = this.getMarkdown();
      
    },
    getHTML() {
      let html = this.$refs.toastuiEditor.invoke("getHTML");
      return html;
    },
    getMarkdown() {
      let md = this.$refs.toastuiEditor.invoke("getMarkdown");
      return md;
    },
  },
};
</script>
<style lang="scss" >
.editBlog-container {
  
  .viewer{
  width: 1000px;
  height: 1000px;
  position: fixed;
  background: red;

}
  .el-form-item {
    .el-form-item__content {
      .category {
        width: 200px;
        input {
          border-right: none;
          border-radius: 4px 0 0 4px;
        }
      }
    }

    .el-select {
      width: 40px;
      input {
        border-radius: 0 4px 4px 0;
      }
    }
  }
}
</style>
<style lang="scss" scoped>
.editBlog-container {



  .el-input {
    width: 80%;
  }

  .upload-container {
    width: 300px;
    height: 210px;
    overflow: hidden;
    border-radius: 4px;
    border: 1px solid #dcdfe6;
  }
}
</style>