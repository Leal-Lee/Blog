let routerTitle=''
let siteTitle=''


function setTitle(){
    if( siteTitle && routerTitle){
        document.title='loading...'
    }
    let combinationTitle=`${routerTitle}-${siteTitle}`
    document.title=combinationTitle
 
 

}
export  function setRouterTitle(title){
    routerTitle=title
    setTitle()
    
}
export  function setSiteTitle(title){

    siteTitle=title
    setTitle()


}