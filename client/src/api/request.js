import axios from "axios";
import showMessage from '../../../utils/showMessage.js'
const instance = axios.create();
instance.interceptors.response.use(response => {
    if(response.data.code !== 0){
        showMessage({
            content:response.data.msg,
            iconType:'error'
            
        })
        return null
    }
    return response.data.data;
  },function (error) {
    // 对响应错误做点什么
    console.log('页面不存在')
    return Promise.reject(error);
  })
export default instance