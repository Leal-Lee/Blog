// 使用混合配置时，必须传入一个fetchData方法
// async fetchData(){
//     return await getbanners();
//   },
export default function mixins(defaultDatas)  {
    return {
        data() {
            return {
              isLoading:true,
              datas:defaultDatas,
    
            };
          },
          async created() {
            this.datas = await this.fetchData();
            this.isLoading=false
          },
    }
}