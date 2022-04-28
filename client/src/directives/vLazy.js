import lazy from '@/assets/img/lazy.gif'
import debounce from '../../../utils/debounce'
import eventBus  from '@/eventBus'
eventBus.$on('mainscroll',debounce(handleScroll,50))
// 需要处哪些些图片
let imgs = []  
const clientHeight=document.body.clientHeight

function setImgs(imgs){

    imgs.forEach(it => {
        setImg(it)
    });


}

function setImg(imgObject){
    if(imgs.length==0){
        return
    }
 const  rect= imgObject.domImg.getBoundingClientRect()
    if(rect.top < clientHeight - 50 && rect.top >-rect.height){
        const img = new Image()
        img.onload=function(){
            imgObject.domImg.src=imgObject.src
        }
        img.src = imgObject.src
        imgs=imgs.filter(i=>i.domImg!==imgObject.domImg)
        console.log(imgs)
    }
}

function handleScroll(){
    setImgs(imgs)
}
export default  {
    inserted(el,binding){
        el.src=lazy
        const img={
            domImg:el,
            src:binding.value
        }
        imgs.push(img)
        // console.log(imgs)
        setImg(img)
    },
    unbind(el){
      imgs = imgs.filter(img=>img.domImg!==el)
    }
}