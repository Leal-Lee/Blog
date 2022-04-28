<template>
  <div class="blog-toc-container">
    <RightList :list=" withTocList" @changId="handleIdChange" />
  </div>
</template>

<script>
import RightList from "@/components/RightList.vue";
import debounce from '../../../../../utils/debounce.js'
export default {
  name: "BlogBlogtoc",
  props: {
    list: {
      type: Array,
      required: true,
    },
  },

  components: { RightList },
  data() {
    return {
      activeAnchor:''
    };
  },

  computed: {

    withTocList() {
      const getToc = (toc = [])=> {
        return toc.map( it=> ({
            isSelect:it.anchor  == this.activeAnchor,
            ...it,
            children :getToc(it.children)
        }));
        
      };

      return getToc(this.list);
    },
    doms(){
      const doms=[]
      function getDom(list){
          list.forEach(el => {
            doms.push(document.getElementById(el.anchor))
         if(el.children){
           getDom(el.children)
         }
       });
      }
      getDom(this.list)
       return doms
    }
  },

  mounted(){
   
    this.$bus.$on('mainscroll',debounce(this.setSelect,50) )
  },

  destroyed(){
     this.$bus.$off('mainscroll',debounce(this.setSelect,50))
  },
  methods: {
    handleIdChange(item) {
     location.hash = item.anchor;
    console.log(item.anchor)
    },

    setSelect(dom){
           if(!dom){
        return
      }
      this.activeAnchor=''
      this.doms.forEach(it=>{
      const top = it.getBoundingClientRect().top
      
       if(top >=0&&top<=200 ){
         this.activeAnchor = it.id
         return
       }else if(top > 200){
        return
       }else{
         this.activeAnchor=it.id
       }
      })
    }

  },
};
</script>

<style lang="less" scoped>
.blog-toc-container {
  width: 250px;
  height: 100%;
  position: relative;
  flex: 0 0 auto;
}
</style>