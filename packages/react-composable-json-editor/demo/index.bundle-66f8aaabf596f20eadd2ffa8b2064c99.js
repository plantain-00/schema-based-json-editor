(()=>{"use strict";var e,t={5277:(e,t,n)=>{var r=n(655),l=n(4445),a=n(5122),i=n(637),o={outline:0,padding:"0.375rem 0.75rem",fontSize:"1rem",fontWeight:400,fontFamily:"monospace",lineHeight:1.5,color:"#212529",backgroundColor:"#fff",backgroundClip:"padding-box",border:"1px solid #ced4da",appearance:"none",borderRadius:"0.25rem",flex:1,marginBottom:"3px"},p={display:"inline-block",fontWeight:400,lineHeight:1,color:"#212529",textAlign:"center",textDecoration:"none",verticalAlign:"middle",cursor:"pointer",userSelect:"none",backgroundColor:"transparent",border:"1px solid transparent",padding:"0.375rem 0.75rem",fontSize:"1rem",borderRadius:"0.25rem"},m={padding:"10px",border:"1px solid rgba(0,0,0,.125)",borderRadius:"0.25rem",flex:1,marginBottom:"3px"};function u(e){return l.createElement("button",(0,r.pi)({},e,{style:(0,r.pi)((0,r.pi)({},p),e.style)})," ",e.children)}function c(e){return e.inline?l.createElement("div",{style:m},l.createElement("div",null,e.items.map((function(t,n){return l.createElement("div",{key:n,style:{display:"flex",alignItems:"center",marginBottom:"3px"}},l.createElement("div",{style:{paddingRight:"5px",width:"14px"}},n+1),l.createElement("div",{style:{flex:1,display:"flex"}},l.cloneElement(t,{readOnly:e.readOnly})),!e.readOnly&&l.createElement("div",null,l.createElement(u,{onClick:function(){return e.remove(n)}},y),l.createElement(u,{onClick:function(){return e.copy(n)}},v),n>0&&l.createElement(u,{onClick:function(){return e.moveUp(n)}},x),n<e.items.length-1&&l.createElement(u,{onClick:function(){return e.moveDown(n)}},d)))}))),!e.readOnly&&l.createElement(u,{onClick:e.add},E)):l.createElement("div",{style:m},e.items.map((function(t,n){var r,a;return l.createElement(l.Fragment,{key:n},l.createElement("div",{style:{marginBottom:"5px",marginTop:"5px"}},null!==(a=null===(r=e.title)||void 0===r?void 0:r.call(e,n))&&void 0!==a?a:n+1,!e.readOnly&&l.createElement(u,{style:{marginLeft:"5px"},onClick:function(){return e.remove(n)}},y),!e.readOnly&&l.createElement(u,{onClick:function(){return e.copy(n)}},v),!e.readOnly&&n>0&&l.createElement(u,{onClick:function(){return e.moveUp(n)}},x),!e.readOnly&&n<e.items.length-1&&l.createElement(u,{onClick:function(){return e.moveDown(n)}},d)),l.createElement("div",{style:{display:"flex"}},l.cloneElement(t,{readOnly:e.readOnly})))})),!e.readOnly&&l.createElement(u,{onClick:e.add},E))}function s(e){return 0===e.properties.length?null:l.createElement("div",{style:m},l.createElement("table",null,l.createElement("thead",null,l.createElement("tr",null,l.createElement("td",null),Object.entries(e.properties[0]).map((function(e){var t=e[0];return l.createElement("td",{key:t},t)})),!e.readOnly&&l.createElement("td",null))),l.createElement("tbody",null,e.properties.map((function(t,n){return l.createElement("tr",{key:n},l.createElement("td",{style:{paddingRight:"5px"}},n+1),Object.values(t).map((function(t,n){return l.createElement("td",{key:n},l.cloneElement(t,{readOnly:e.readOnly}))})),!e.readOnly&&l.createElement("td",null,l.createElement(u,{onClick:function(){return e.remove(n)}},y),l.createElement(u,{onClick:function(){return e.copy(n)}},v),n>0&&l.createElement(u,{onClick:function(){return e.moveUp(n)}},x),n<e.properties.length-1&&l.createElement(u,{onClick:function(){return e.moveDown(n)}},d)))})))),!e.readOnly&&l.createElement(u,{onClick:e.add},E))}var E=l.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{fill:"currentColor",d:"M480 480V128a32 32 0 0 1 64 0v352h352a32 32 0 1 1 0 64H544v352a32 32 0 1 1-64 0V544H128a32 32 0 0 1 0-64h352z"})),y=l.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{fill:"currentColor",d:"M764.288 214.592 512 466.88 259.712 214.592a31.936 31.936 0 0 0-45.12 45.12L466.752 512 214.528 764.224a31.936 31.936 0 1 0 45.12 45.184L512 557.184l252.288 252.288a31.936 31.936 0 0 0 45.12-45.12L557.12 512.064l252.288-252.352a31.936 31.936 0 1 0-45.12-45.184z"})),x=l.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{fill:"currentColor",d:"M572.235 205.282v600.365a30.118 30.118 0 1 1-60.235 0V205.282L292.382 438.633a28.913 28.913 0 0 1-42.646 0 33.43 33.43 0 0 1 0-45.236l271.058-288.045a28.913 28.913 0 0 1 42.647 0L834.5 393.397a33.43 33.43 0 0 1 0 45.176 28.913 28.913 0 0 1-42.647 0l-219.618-233.23z"})),d=l.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{fill:"currentColor",d:"M544 805.888V168a32 32 0 1 0-64 0v637.888L246.656 557.952a30.72 30.72 0 0 0-45.312 0 35.52 35.52 0 0 0 0 48.064l288 306.048a30.72 30.72 0 0 0 45.312 0l288-306.048a35.52 35.52 0 0 0 0-48 30.72 30.72 0 0 0-45.312 0L544 805.824z"})),v=l.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{fill:"currentColor",d:"M128 320v576h576V320H128zm-32-64h640a32 32 0 0 1 32 32v640a32 32 0 0 1-32 32H96a32 32 0 0 1-32-32V288a32 32 0 0 1 32-32zM960 96v704a32 32 0 0 1-32 32h-96v-64h64V128H384v64h-64V96a32 32 0 0 1 32-32h576a32 32 0 0 1 32 32zM256 672h320v64H256v-64zm0-192h320v64H256v-64z"}));function f(e){return l.createElement("div",{style:e.style},l.createElement("input",{type:"checkbox",disabled:e.readOnly,checked:e.value,onChange:function(t){e.readOnly||e.setValue(t.target.checked)}}))}function g(e){var t=l.useState(!1),n=t[0],r=t[1];return l.createElement(l.Fragment,null,l.createElement(u,{onClick:function(){return r(!0)}},h),n&&l.createElement("div",{style:{position:"fixed",inset:0,background:"rgba(0,0,0,0.5)",display:"flex",justifyContent:"center",alignItems:"center",zIndex:2},onClick:function(){return r(!1)}},l.createElement("div",{style:{width:"600px",display:"flex",background:"white"},onClick:function(e){return e.stopPropagation()}},l.cloneElement(e.children,{readOnly:e.readOnly}))))}var h=l.createElement("svg",{style:{width:"20px",height:"20px"},viewBox:"0 0 1024 1024",xmlns:"http://www.w3.org/2000/svg"},l.createElement("path",{fill:"currentColor",d:"M832 512a32 32 0 1 1 64 0v352a32 32 0 0 1-32 32H160a32 32 0 0 1-32-32V160a32 32 0 0 1 32-32h352a32 32 0 0 1 0 64H192v640h640V512z"}),l.createElement("path",{fill:"currentColor",d:"m469.952 554.24 52.8-7.552L847.104 222.4a32 32 0 1 0-45.248-45.248L477.44 501.44l-7.552 52.8zm422.4-422.4a96 96 0 0 1 0 135.808l-331.84 331.84a32 32 0 0 1-18.112 9.088L436.8 623.68a32 32 0 0 1-36.224-36.224l15.104-105.6a32 32 0 0 1 9.024-18.112l331.904-331.84a96 96 0 0 1 135.744 0z"})),b=n(2902);function O(e){return l.createElement("div",{style:e.style},e.enums.map((function(t,n){var r,a;return l.createElement("label",{key:t,style:{marginRight:"10px"}},l.createElement("input",{type:"checkbox",checked:e.value.includes(t),style:{marginRight:"5px"},disabled:e.readOnly,onChange:function(){if(!e.readOnly){var n=e.value.indexOf(t);e.setValue((0,b.ZP)(e.value,(function(e){n>=0?e.splice(n,1):e.push((0,b.cA)(t))})))}}}),null!==(a=null===(r=e.enumTitles)||void 0===r?void 0:r[n])&&void 0!==a?a:t)})))}function w(e){return e.select?l.createElement("select",{style:(0,r.pi)((0,r.pi)({},o),e.style),disabled:e.readOnly,value:e.value,onChange:function(t){if(!e.readOnly){var n=t.target.value;"number"==typeof e.enums[0]&&(n=+n),e.setValue(n)}}},e.enums.map((function(t,n){var r,a;return l.createElement("option",{key:t,value:t},null!==(a=null===(r=e.enumTitles)||void 0===r?void 0:r[n])&&void 0!==a?a:t)}))):l.createElement("div",{style:e.style},e.enums.map((function(t,n){var r,a;return l.createElement("label",{key:t,style:{marginRight:"10px"}},l.createElement("input",{type:"radio",disabled:e.readOnly,checked:e.value===t,style:{marginRight:"5px"},onChange:function(){e.readOnly||e.setValue(t)}}),null!==(a=null===(r=e.enumTitles)||void 0===r?void 0:r[n])&&void 0!==a?a:t)})))}function k(e){var t,n=l.useState("color"===e.type?V(e.value):e.value.toString()),a=n[0],i=n[1];l.useEffect((function(){i("color"===e.type?V(e.value):e.value.toString())}),[e.value]);var p=function(){var t;e.readOnly||(t="color"===e.type?+("0x"+a.slice(1)):+a,isNaN(t)||t===e.value||e.setValue(t))},m={};return"color"===e.type&&(m={flex:"unset",padding:0}),e.readOnly&&(m.opacity=.5),l.createElement("input",{value:a,type:null!==(t=e.type)&&void 0!==t?t:"number",disabled:e.readOnly,onChange:function(t){e.readOnly||i(t.target.value)},style:(0,r.pi)((0,r.pi)((0,r.pi)({},o),e.style),m),onKeyDown:function(e){"Enter"===e.key&&p(),"Escape"!==e.key&&e.stopPropagation()},onBlur:function(){setTimeout((function(){p()}),0)}})}function V(e,t){var n=e.toString(16),r="";if(void 0!==t){var l=Math.floor(255*t).toString(16);r="0".repeat(2-l.length)+l}return"#"+"0".repeat(6-n.length)+n+r}function C(e){var t=Object.entries(e.properties).map((function(t){var n=t[0],r=t[1];return[n,Array.isArray(r)?r.map((function(t,n){return t?l.cloneElement(t,{key:n,readOnly:e.readOnly}):null})):l.cloneElement(r,{readOnly:e.readOnly})]}));return e.inline?l.createElement("table",{style:m},l.createElement("thead",null),l.createElement("tbody",null,t.map((function(e){var t=e[0],n=e[1];return l.createElement("tr",{key:t},l.createElement("td",{style:{paddingRight:"5px"}},t),l.createElement("td",{style:{display:"flex",flexDirection:"column"}},n))})))):l.createElement("div",{style:m},t.map((function(e){var t=e[0],n=e[1];return l.createElement(l.Fragment,{key:t},l.createElement("div",{style:{marginTop:"5px",marginBottom:"5px"}},t),l.createElement("div",{style:{display:"flex",flexDirection:"column"}},n))})))}function A(e){var t,n=l.useState(e.value),a=n[0],i=n[1];l.useEffect((function(){i(e.value)}),[e.value]);var p,m=function(){e.readOnly||a===e.value||e.setValue(a)},u={};return"color"===e.type&&(u={flex:"unset",padding:0}),e.readOnly&&(u.opacity=.5),e.textarea?l.createElement("textarea",{value:a,disabled:e.readOnly,onChange:function(t){e.readOnly||i(t.target.value)},onKeyDown:function(e){"Escape"!==e.key&&e.stopPropagation()},onBlur:function(){setTimeout((function(){m()}),0)},style:(0,r.pi)((0,r.pi)((0,r.pi)({},o),e.style),u)}):(e.value.startsWith("http")&&(p=l.createElement("img",{src:e.value,style:{display:"block",height:"auto",margin:"6px 0px",maxWidth:"100%"}})),l.createElement(l.Fragment,null,l.createElement("input",{value:a,disabled:e.readOnly,type:null!==(t=e.type)&&void 0!==t?t:"text",onChange:function(t){e.readOnly||i(t.target.value)},onKeyDown:function(e){"Enter"===e.key&&m(),"Escape"!==e.key&&e.stopPropagation()},onBlur:function(){setTimeout((function(){m()}),0)},style:(0,r.pi)((0,r.pi)((0,r.pi)({},o),e.style),u)}),p))}var j=document.querySelector("#container");j&&(0,a.s)(j).render(l.createElement((function(){var e=l.useState(!1),t=e[0],n=e[1],a=function(e){var t=l.useState({stringExample:"a string example",booleanExample:!1,numberExample:123.4,objectExample:{propertyExample1:"",propertyExample2:0},inlineObjectExample:{propertyExample1:"",propertyExample2:0},arrayExample:["item1","item2"],inlineArrayExample:["item1","item2"],optionalExample:void 0,enumExample:"enum 1",colorExample:"#000000",textareaExample:"",imagePreviewExample:"http://image2.sina.com.cn/bj/art/2004-08-02/U91P52T4D51657F160DT20040802125523.jpg",itemTitleExample:[{propertyExample1:"foo",propertyExample2:1},{propertyExample1:"bar",propertyExample2:2}],inlineObjectArrayExample:[{propertyExample1:"foo",propertyExample2:1,propertyExample3:{propertyExample4:2,propertyExample5:""}},{propertyExample1:"bar",propertyExample2:2,propertyExample3:{propertyExample4:3,propertyExample5:""}}],enumTitlesExample:"enum 1",enumArrayExample:["foo"]}),n=t[0],r=t[1];return{value:n,update:function(e){return function(t){r((0,b.ZP)(n,(function(n){e(n,t)})))}},getArrayProps:function(e,t){return function(e,t,n){return{add:function(){return n((function(n){e(n).push(t)}))},remove:function(t){return n((function(n){e(n).splice(t,1)}))},copy:function(t){return n((function(n){var r=e(n);r.splice(t,0,r[t])}))},moveUp:function(t){return n((function(n){var r=e(n);r.splice(t-1,0,r[t]),r.splice(t+1,1)}))},moveDown:function(t){return n((function(n){var r=e(n);r.splice(t+2,0,r[t]),r.splice(t,1)}))}}}(e,t,(function(e){r((0,b.ZP)(n,(function(t){e(t)})))}))}}}(),o=a.value,p=a.update,m=a.getArrayProps,u=i.Z.highlight("json",JSON.stringify(o,null,"  ")).value;return l.createElement("div",{style:{position:"relative"}},l.createElement("a",{href:"https://github.com/plantain-00/schema-based-json-editor/tree/master/packages/react-composable-json-editor/demo/index.tsx",target:"_blank"},"the source code of the demo"),l.createElement(f,{style:{display:"inline"},value:t,setValue:function(e){return n(e)}})," read only",l.createElement("br",null),l.createElement("div",{style:{width:"49%",margin:"10px",position:"absolute",left:"0px"}},l.createElement(C,{properties:{"A string example":l.createElement(A,{value:o.stringExample,setValue:p((function(e,t){return e.stringExample=t}))}),"A boolean example":l.createElement(f,{value:o.booleanExample,setValue:p((function(e,t){return e.booleanExample=t}))}),"A number example":l.createElement(k,{value:o.numberExample,setValue:p((function(e,t){return e.numberExample=t}))}),"A object example":l.createElement(C,{properties:{"Property example 1":l.createElement(A,{value:o.objectExample.propertyExample1,setValue:p((function(e,t){return e.objectExample.propertyExample1=t}))}),"Property example 2":l.createElement(k,{value:o.objectExample.propertyExample2,setValue:p((function(e,t){return e.objectExample.propertyExample2=t}))})}}),"A inline object example":l.createElement(C,{inline:!0,properties:{"Property example 1":l.createElement(A,{value:o.inlineObjectExample.propertyExample1,setValue:p((function(e,t){return e.inlineObjectExample.propertyExample1=t}))}),"Property example 2":l.createElement(k,{value:o.inlineObjectExample.propertyExample2,setValue:p((function(e,t){return e.inlineObjectExample.propertyExample2=t}))})}}),"A array example":l.createElement(c,(0,r.pi)({},m((function(e){return e.arrayExample}),""),{items:o.arrayExample.map((function(e,t){return l.createElement(A,{value:e,setValue:p((function(e,n){return e.arrayExample[t]=n}))})}))})),"A inline array example":l.createElement(c,(0,r.pi)({inline:!0},m((function(e){return e.inlineArrayExample}),""),{items:o.inlineArrayExample.map((function(e,t){return l.createElement(A,{value:e,setValue:p((function(e,n){return e.inlineArrayExample[t]=n}))})}))})),"A optional example":[l.createElement(f,{value:void 0!==o.optionalExample,setValue:p((function(e,t){return e.optionalExample=t?"":void 0}))}),void 0!==o.optionalExample?l.createElement(A,{value:o.optionalExample,setValue:p((function(e,t){return e.optionalExample=t}))}):void 0],"A enum example":l.createElement(w,{value:o.enumExample,enums:["enum 1","enum 2"],setValue:p((function(e,t){return e.enumExample=t}))}),"A enum example 2":l.createElement(w,{select:!0,value:o.enumExample,enums:["enum 1","enum 2"],setValue:p((function(e,t){return e.enumExample=t}))}),"A color example":l.createElement(A,{type:"color",value:o.colorExample,setValue:p((function(e,t){return e.colorExample=t}))}),"A textarea example":l.createElement(A,{textarea:!0,value:o.textareaExample,setValue:p((function(e,t){return e.textareaExample=t}))}),"A image preview example":l.createElement(A,{value:o.imagePreviewExample,setValue:p((function(e,t){return e.imagePreviewExample=t}))}),"A item title example":l.createElement(c,(0,r.pi)({},m((function(e){return e.itemTitleExample}),{propertyExample1:"",propertyExample2:0}),{title:function(e){return o.itemTitleExample[e].propertyExample1},items:o.itemTitleExample.map((function(e,t){return l.createElement(C,{properties:{"Property example 1":l.createElement(A,{value:e.propertyExample1,setValue:p((function(e,n){return e.itemTitleExample[t].propertyExample1=n}))}),"Property example 2":l.createElement(k,{value:e.propertyExample2,setValue:p((function(e,n){return e.itemTitleExample[t].propertyExample2=n}))})}})}))})),"A inline object array example":l.createElement(s,(0,r.pi)({},m((function(e){return e.inlineObjectArrayExample}),{propertyExample1:"",propertyExample2:0,propertyExample3:{propertyExample4:0,propertyExample5:""}}),{properties:o.inlineObjectArrayExample.map((function(e,t){return{"Property example 1":l.createElement(A,{value:e.propertyExample1,setValue:p((function(e,n){return e.inlineObjectArrayExample[t].propertyExample1=n}))}),"Property example 2":l.createElement(k,{value:e.propertyExample2,setValue:p((function(e,n){return e.inlineObjectArrayExample[t].propertyExample2=n}))}),"Property example 3":l.createElement(g,null,l.createElement(C,{inline:!0,properties:{"Property example 3":l.createElement(k,{value:e.propertyExample3.propertyExample4,setValue:p((function(e,n){return e.inlineObjectArrayExample[t].propertyExample3.propertyExample4=n}))}),"Property example 4":l.createElement(A,{value:e.propertyExample3.propertyExample5,setValue:p((function(e,n){return e.inlineObjectArrayExample[t].propertyExample3.propertyExample5=n}))})}}))}}))})),"A enum titles example":l.createElement(w,{enumTitles:["enum title 1","enum title 2"],value:o.enumTitlesExample,enums:["enum 1","enum 2"],setValue:p((function(e,t){return e.enumTitlesExample=t}))}),"A enum array example":l.createElement(O,{enumTitles:["foo title","bar title"],value:o.enumArrayExample,enums:["foo","bar"],setValue:p((function(e,t){return e.enumArrayExample=t}))})},readOnly:t})),l.createElement("div",{style:{margin:"10px",width:"49%",position:"fixed",right:"10px",height:"100%",overflowY:"scroll"}},"Value:",l.createElement("pre",{style:{borderColor:"black",padding:"10px"}},l.createElement("code",{dangerouslySetInnerHTML:{__html:u}}))))}),null))}},n={};function r(e){var l=n[e];if(void 0!==l)return l.exports;var a=n[e]={exports:{}};return t[e](a,a.exports,r),a.exports}r.m=t,e=[],r.O=(t,n,l,a)=>{if(!n){var i=1/0;for(u=0;u<e.length;u++){for(var[n,l,a]=e[u],o=!0,p=0;p<n.length;p++)(!1&a||i>=a)&&Object.keys(r.O).every((e=>r.O[e](n[p])))?n.splice(p--,1):(o=!1,a<i&&(i=a));if(o){e.splice(u--,1);var m=l();void 0!==m&&(t=m)}}return t}a=a||0;for(var u=e.length;u>0&&e[u-1][2]>a;u--)e[u]=e[u-1];e[u]=[n,l,a]},r.d=(e,t)=>{for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=(e,t)=>Object.prototype.hasOwnProperty.call(e,t),(()=>{var e={826:0};r.O.j=t=>0===e[t];var t=(t,n)=>{var l,a,[i,o,p]=n,m=0;if(i.some((t=>0!==e[t]))){for(l in o)r.o(o,l)&&(r.m[l]=o[l]);if(p)var u=p(r)}for(t&&t(n);m<i.length;m++)a=i[m],r.o(e,a)&&e[a]&&e[a][0](),e[i[m]]=0;return r.O(u)},n=self.webpackChunkschema_based_json_editor=self.webpackChunkschema_based_json_editor||[];n.forEach(t.bind(null,0)),n.push=t.bind(null,n.push.bind(n))})();var l=r.O(void 0,[736],(()=>r(5277)));l=r.O(l)})();