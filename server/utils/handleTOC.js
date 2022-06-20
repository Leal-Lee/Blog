var toc = require('markdown-toc');


// const d = toc(`
// #### 四级标题
// # 一级标题
// ## 二级标题
// ## 二级标题
// ## 二级标题
// ### 三级标题
// #### 四级标题

// # 一级标题
// ## 二级标题
// ### 三级标题
// #### 四级标题

// #  一级标题
// ### 三级标题
// # 二级标题
// `).json;

function transform (arr){
    return arr.map(item=>{
 
        return {
            name:item.content,
            anchor:item.slug,
            lvl:item.lvl,
            children: []
        }
    })
}





function getToc(mdToc) {
    let minLv = 6
    const result = []
    mdToc.forEach(item => {
        if (item.lvl < minLv) {
            minLv = item.lvl //得到H标题数字最小的
        }
    })
    mdToc.forEach(item => {
        if (item.lvl > minLv && result[result.length - 1]) {
            //    填充 children     
            result[result.length - 1].children.push(item)
            return
        }
        delete item.lvl
        result.push(item)
       
    });

    result.forEach(it=>{  
        if(it.children.length==0){
            delete it.children
        }
        if(it.children){
        const children= getToc(it.children)
        it.children=children

        }

    })


    return result
}

// const data = getToc(mdToc)
// console.dir( data)








module.exports.handleToc = (mdContent) => {

    const mdToc = toc(mdContent).json
    const formatToc=  transform( mdToc)
    const data = getToc(formatToc)

    return JSON.stringify(data)
}