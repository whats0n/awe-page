(()=>{"use strict";function t(t,e){(null==e||e>t.length)&&(e=t.length);for(var n=0,i=new Array(e);n<e;n++)i[n]=t[n];return i}function e(t,e){if(!(t instanceof e))throw new TypeError("Cannot call a class as a function")}function n(t,e){for(var n=0;n<e.length;n++){var i=e[n];i.enumerable=i.enumerable||!1,i.configurable=!0,"value"in i&&(i.writable=!0),Object.defineProperty(t,i.key,i)}}function i(t,e,n){return e in t?Object.defineProperty(t,e,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[e]=n,t}var o=function t(n,o){var s=this;e(this,t),i(this,"bus",void 0),i(this,"container",void 0),i(this,"isEnabled",!0),i(this,"wheelDetails",{lock:0,timer:null,deltas:[null,null,null,null,null,null,null,null,null]}),i(this,"touchDetails",{start:0}),i(this,"initListeners",(function(){"ontouchstart"in window||navigator.msMaxTouchPoints>0||navigator.maxTouchPoints?s.container.addEventListener("touchstart",s.onTouchStart):s.container.addEventListener("wheel",s.onWheel)})),i(this,"destroy",(function(){"ontouchstart"in window?(s.container.removeEventListener("touchstart",s.onTouchStart),s.container.removeEventListener("touchend",s.onTouchEnd)):s.container.removeEventListener("wheel",s.onWheel)})),i(this,"disable",(function(){s.isEnabled=!1})),i(this,"enable",(function(){s.isEnabled=!0})),i(this,"hasPeek",(function(){var t=s.wheelDetails,e=t.deltas;return t.lock>0?(s.wheelDetails.lock--,!1):null!==e[0]&&e[0]<e[4]&&e[1]<=e[4]&&e[2]<=e[4]&&e[3]<=e[4]&&e[5]<=e[4]&&e[6]<=e[4]&&e[7]<=e[4]&&e[8]<e[4]})),i(this,"getScrollable",(function(t){for(var e=t;e;){var n=window.getComputedStyle(e);if(e.clientHeight<e.scrollHeight&&[n.overflow,n.overflowY].some((function(t){return["auto","scroll"].includes(t)})))return e;e=e.parentElement}return null})),i(this,"checkScrollAvailability",(function(t){return t?{prev:t.scrollTop<=0,next:t.scrollTop+t.clientHeight>=t.scrollHeight}:{prev:!0,next:!0}})),i(this,"move",(function(t,e){var n=s.getScrollable(t),i=s.checkScrollAvailability(n);s.isEnabled&&i[e]&&(s.bus.emit("scroll:start"),s.bus.emit("move:".concat(e)))})),i(this,"onWheel",(function(t){var e=t,n=-3*e.deltaY,i=e.deltaY>0?"next":"prev";s.hasPeek()&&s.move(e.target,i),s.wheelDetails.deltas.shift(),s.wheelDetails.deltas.push(Math.abs(n)),clearTimeout(s.wheelDetails.timer),s.wheelDetails.timer=setTimeout((function(){s.bus.emit("scroll:end")}),200)})),i(this,"onTouchStart",(function(t){var e=t;e.touches.length>1||(s.touchDetails.start=e.touches[0].clientY,s.container.addEventListener("touchend",s.onTouchEnd))})),i(this,"onTouchEnd",(function(t){s.container.removeEventListener("touchend",s.onTouchEnd);var e=t;if(!(e.changedTouches.length>1)){var n=e.changedTouches[0];if(!(Math.abs(n.clientY-s.touchDetails.start)<70)){var i=s.touchDetails.start>n.clientY?"next":"prev";s.move(e.target,i),s.touchDetails.start=0}}})),this.bus=o,this.container=n,this.initListeners()};const s=function t(){var n=this;e(this,t),i(this,"events",new Map),i(this,"on",(function(t,e){return n.events.has(t)||n.events.set(t,new Set),n.events.get(t).add(e),function(){n.off(t,e)}})),i(this,"off",(function(t,e){var i;null===(i=n.events.get(t))||void 0===i||i.delete(e)})),i(this,"emit",(function(t,e){var i;null===(i=n.events.get(t))||void 0===i||i.forEach((function(t){return t(e)}))}))};var r=new(function(){function r(n){var a,l,c,u=this;e(this,r),i(this,"options",void 0),i(this,"defaultOptions",{containerSelector:".bp-container",sectionSelector:".bp-section",speed:700}),i(this,"index",0),i(this,"prevIndex",null),i(this,"limit",0),i(this,"$refs",void 0),i(this,"$styles",{}),i(this,"bus",void 0),i(this,"scroller",void 0),i(this,"initOptions",(function(t){u.options=Object.assign({},u.defaultOptions,t)})),i(this,"initDOM",(function(){var e,n=document.querySelector(u.options.containerSelector);u.$refs={container:n,sections:(e=n.querySelectorAll(u.options.sectionSelector),function(e){if(Array.isArray(e))return t(e)}(e)||function(t){if("undefined"!=typeof Symbol&&null!=t[Symbol.iterator]||null!=t["@@iterator"])return Array.from(t)}(e)||function(e,n){if(e){if("string"==typeof e)return t(e,n);var i=Object.prototype.toString.call(e).slice(8,-1);return"Object"===i&&e.constructor&&(i=e.constructor.name),"Map"===i||"Set"===i?Array.from(e):"Arguments"===i||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(i)?t(e,n):void 0}}(e)||function(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}())},u.$refs.container.classList.add("bp-container"),u.$refs.sections.forEach((function(t){return t.classList.add("bp-section")})),u.limit=u.$refs.sections.length,"number"==typeof u.options.initialIndex&&u.options.initialIndex>0&&u.options.initialIndex<u.limit&&(u.index=u.options.initialIndex,u.setTransform(),window.getComputedStyle(u.$refs.container).height)})),i(this,"initStyles",(function(){var t=document.createElement("style"),e=document.createElement("style");u.$styles.common=t,u.$styles.section=e,u.setCommonStyle(),u.setSectionStyle(),document.head.appendChild(t),document.head.appendChild(e)})),i(this,"initListeners",(function(){u.bus.on("move:prev",u.onPrev),u.bus.on("move:next",u.onNext),u.$refs.container.addEventListener("transitionend",u.onAnimationEnd),window.addEventListener("resize",u.onResize)})),i(this,"destroy",(function(){u.scroller.destroy(),window.removeEventListener("resize",u.onResize),document.head.removeChild(u.$styles.common),document.head.removeChild(u.$styles.section)})),i(this,"animate",(function(t){u.prevIndex=u.index,u.index=t,u.bus.emit("animation:start",u.animationEvent),u.scroller.disable(),u.setTransform()})),i(this,"setTransform",(function(){var t=u.index/u.limit*100;u.$refs.container.setAttribute("style","transform: translateY(".concat(-t,"%)"))})),i(this,"setCommonStyle",(function(){u.$styles.common.innerHTML="\n      body {\n        position: fixed;\n        top: 0;\n        left: 0;\n        right: 0;\n        bottom: 0;\n        overflow: hidden;\n        background: black;\n      }\n\n      .bp-container {\n        position: relative;\n        transform: translateY(0);\n        transition: transform ".concat(u.options.speed,"ms;\n      }\n    ")})),i(this,"setSectionStyle",(function(){u.$styles.section.innerHTML="\n      .bp-section {\n        width: 100vw;\n        height: ".concat(window.innerHeight,"px;\n        overflow: auto;\n      }\n    ")})),i(this,"onResize",(function(){u.setSectionStyle()})),i(this,"onAnimationEnd",(function(t){var e=t;t.target===u.$refs.container&&"transform"===e.propertyName&&(u.scroller.enable(),u.bus.emit("animation:end",u.animationEvent))})),i(this,"onPrev",(function(){u.index<=0||u.animate(u.index-1)})),i(this,"onNext",(function(){u.index>=u.limit-1||u.animate(u.index+1)})),this.initOptions(n),this.initDOM(),this.initStyles(),this.bus=new s,this.scroller=new o(this.$refs.container,this.bus),this.onResize=(a=this.onResize,l=100,c=null,function(){clearTimeout(c);for(var t=arguments.length,e=new Array(t),n=0;n<t;n++)e[n]=arguments[n];c=setTimeout.apply(void 0,[a,l].concat(e))}),this.initListeners(),"function"==typeof this.options.onLoad&&this.options.onLoad(this.animationEvent)}var a,l;return a=r,(l=[{key:"animationEvent",get:function(){return{prev:this.prevIndex,current:this.index}}}])&&n(a.prototype,l),r}())({containerSelector:".js-sections",sectionSelector:".js-section",speed:1e3,onLoad:function(t){return console.log("render",t)}});r.bus.on("animation:start",(function(t){console.log("start",t)})),r.bus.on("animation:end",(function(t){console.log("end",t)})),window.bp=r,console.log(r)})();