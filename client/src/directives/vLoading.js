import loading from '@/assets/img/loading.gif'
import styles from './loading.moudle.less'
function getImg(el){ 
  return  el.querySelector('img[data-loading=loading]')
}
function createImg(){
    const IMG=  document.createElement('img')
    IMG.src=loading
    IMG.className='loading'
    IMG.style=styles.loading
    IMG.dataset.loading='loading'
    return IMG
}
export default  function (el, binding) {
    const curImg=getImg(el)
    if(binding.value){
        if(!curImg){
         const IMG= createImg()
        
            el.appendChild(IMG)
        }
    }else{
        if(curImg){
            curImg.remove()
        }
        
    }



  }