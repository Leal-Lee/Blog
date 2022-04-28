export default function debounce(fn,duration){
 let timer=null
    return (...arg)=>{
        clearTimeout(timer)
         timer = setTimeout(()=>{
            fn(...arg)
        },duration)
    }

}