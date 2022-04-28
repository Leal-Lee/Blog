export default function(refValue){
    return {
  mounted() {
 
    this.$bus.$on("setmainscroll",this.handlSetmainscroll);
    this.$refs[refValue].addEventListener("scroll", this.handleScoll)
  },


  beforeDestroy() {
    this.$bus.$emit("mainscroll");
    this.$bus.$off("setmainscroll",this.handlSetmainscroll);
    window.removeEventListener("scroll", this.handleScoll)

  },
  methods:{
    handleScoll() {
        this.$bus.$emit("mainscroll",this.$refs[refValue]);
      },
  
   handlSetmainscroll(scrollTop){
        this.$refs[refValue].scrollTop = scrollTop
          }
  }
    }
}