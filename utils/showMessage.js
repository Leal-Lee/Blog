import Vue from 'vue'
import styles from './showMssage.module.less'
import comp from '../client/src/components/Icon.vue'

/**
 * 
 * @param {*} comp  组件
 * @param {*} iconType  
 * @returns 
 */

function getDom(comp,iconType){
  var app=new Vue({
          render: h => h(comp,{ props:{
            iconType,
          } }),
      }).$mount()
      return app.$el
  }

// 创建弹窗
function createDom(msg,iconType,mgsType){
  const DIV=  document.createElement('div')
  const bgColor= styles[ `message-${mgsType}` ]//类型样式名
  DIV.className = `${styles.message} ${bgColor}`
  DIV.innerHTML = `${getDom(comp,iconType).outerHTML} <span>${msg}</span>`
  DIV.style = styles
  return DIV
}


/**
 * 
 * @param {*} content 消息
 * @param {*} type  消息类型 info  error  success  warn
 * @param {*} iconType 图标类型
 * @param {*} duration 多久消失
 * @param {*} container 图标在哪个容器中显示
 */
 export default  function showMessage(options={}){
  const content = options.content || "";
  const type = options.type || "info";
  const duration = options.duration || 2000;
  const container = options.container || document.body;
  const iconType =options.iconType || 'vip'
   const DIV = createDom(content,iconType,type)
  // 容器的position是否改动过
  if (options.container) {
    if (getComputedStyle(container).position === "static") {
      container.style.position = "relative";
    }
  }
  container.appendChild(DIV);
  // 浏览器强行渲染
  DIV.clientHeight; // 导致reflow

  // 回归到正常位置
  DIV.style.opacity = 1;
  DIV.style.transform = `translate(-50%, -50%)`;

  // 等一段时间，消失
  setTimeout(() => {
    DIV.style.opacity = 0;
    DIV.style.transform = `translate(-50%, -50%) translateY(-25px)`;
    DIV.addEventListener(
      "transitionend",
      function() {
        DIV.remove();
        // 运行回调函数
        options.callback && options.callback();
      },
      { once: true }
    );
  }, duration);
}


