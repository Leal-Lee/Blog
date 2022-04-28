const path = require('path');
const isDev = process.env.NODE_ENV ==='development' ? true:false 
module.exports = {
    entry: './server/index.js',//入口
    mode:isDev?'development':'production', //判断环境变量
    output: {    //输出文件
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
        clean: true,
      },
    target:'node',
    node:false,
    module:{
      rules:[{
      test:/\.less$/i,
      use:['style-loader','css-loader','less-loader']
    },
    {
      test:/\.css$/i,
      use:['style-loader','css-loader']
    },
  ]}
      
  };


  