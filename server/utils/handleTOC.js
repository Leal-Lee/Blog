var toc = require('markdown-toc');
 

const d= toc(`# 一级标题
# 一级标题
## 二级标题
### 三级标题
#### 四级标题
##### 五级标题
###### 六级标题
###### 六级标题`).json;
console.log(d)



