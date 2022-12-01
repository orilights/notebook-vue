import{u as A,r as h}from"./common.891604f9.js";import{j as E,o as C,h as b,q as V,k as _,G as D,A as s,z as u,i as o,l as p,b as w,J as y,s as $,u as P,E as N}from"./vendor.346517bc.js";import{d as R,e as U,f as j,i as S}from"./shared/note/user.a0acb1cc.js";import{C as x,_ as F,P as k}from"./shared/page404/user.8d8622b0.js";const O=["value","placeholder"],m=E({__name:"TextEditbox",props:{modelValue:String,placeHolder:String},emits:["update:modelValue"],setup(v,{emit:l}){return(e,t)=>(C(),b("input",{value:v.modelValue,onInput:t[0]||(t[0]=r=>l("update:modelValue",r.target.value)),placeholder:v.placeHolder,class:"border px-1 rounded-md bg-white dark:bg-black"},null,40,O))}}),T=o("div",{class:"text-center font-semibold text-xl mb-6"},"\u7528\u6237\u767B\u5F55",-1),I={class:"my-4"},z=o("span",null,"\u8D26\u53F7\uFF1A",-1),M={class:"my-4"},H=o("span",null,"\u5BC6\u7801\uFF1A",-1),q={class:"button-group mt-6 flex justify-center"},G=E({__name:"Login",setup(v){const l=A(),e=V(),t=_(""),r=_("");async function n(){if(t.value=="")return e.warning("\u8D26\u53F7\u4E0D\u53EF\u4E3A\u7A7A"),0;if(r.value=="")return e.warning("\u5BC6\u7801\u4E0D\u53EF\u4E3A\u7A7A"),0;l.networkLoading=!0;const a=await R(t.value,r.value);a.code==0?(e.clear(),e.success("\u767B\u5F55\u6210\u529F"),l.login=!0,l.userId=t.value,l.userName=a.msg,w.set("login","1",{expires:7}),w.set("userid",t.value,{expires:7}),w.set("username",a.msg,{expires:7}),h.push("/")):(a.code=2)?e.warning(a.msg):(a.code=3)&&e.error(a.msg),l.networkLoading=!1}return(a,d)=>{const i=y("RouterLink");return C(),D(x,null,{default:s(()=>[u(k,null,{default:s(()=>[T,o("div",I,[z,u(m,{type:"text",modelValue:t.value,"onUpdate:modelValue":d[0]||(d[0]=f=>t.value=f),"place-holder":"\u8BF7\u8F93\u5165\u8D26\u53F7"},null,8,["modelValue"])]),o("div",M,[H,u(m,{type:"password",modelValue:r.value,"onUpdate:modelValue":d[1]||(d[1]=f=>r.value=f),"place-holder":"\u8BF7\u8F93\u5165\u5BC6\u7801"},null,8,["modelValue"])]),o("div",q,[u(F,{onClick:n},{default:s(()=>[p("\u767B\u5F55")]),_:1}),u(i,{to:"/register"},{default:s(()=>[u(F,null,{default:s(()=>[p("\u524D\u5F80\u6CE8\u518C>")]),_:1})]),_:1})])]),_:1})]),_:1})}}}),vu=Object.freeze(Object.defineProperty({__proto__:null,default:G},Symbol.toStringTag,{value:"Module"})),J=o("div",{class:"text-center font-semibold text-xl mb-6"},"\u7528\u6237\u6CE8\u518C",-1),K={class:"relative my-4"},Q=o("span",null,"\u8D26\u53F7\uFF1A",-1),W={key:0,class:"absolute left-14 top-6 text-red-600 text-sm m-0"},X={class:"my-4"},Y=o("span",null,"\u6635\u79F0\uFF1A",-1),Z={class:"my-4"},uu=o("span",null,"\u5BC6\u7801\uFF1A",-1),eu={class:"button-group mt-6 flex justify-center"},tu=E({__name:"Register",setup(v){const l=A(),e=V();let t=new RegExp("^[a-z0-9-_]{5,15}$");const r=$(()=>t.test(n.value)||n.value==""),n=_(""),a=_(""),d=_("");function i(){e.info("\u7528\u6237\u540D\u4EC5\u652F\u6301\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u6A2A\u6760\u3001\u4E0B\u5212\u7EBF\u7EC4\u5408\uFF0C\u957F\u5EA65-15\u5B57\u7B26",{timeout:1e4})}async function f(){if(n.value=="")return e.warning("\u8D26\u53F7\u4E0D\u53EF\u4E3A\u7A7A"),0;if(a.value=="")return e.warning("\u6635\u79F0\u4E0D\u53EF\u4E3A\u7A7A"),0;if(d.value=="")return e.warning("\u5BC6\u7801\u4E0D\u53EF\u4E3A\u7A7A"),0;if(!r.value)return e.warning("\u5F53\u524D\u8D26\u53F7\u683C\u5F0F\u975E\u6CD5"),e.info("\u7528\u6237\u540D\u4EC5\u652F\u6301\u5C0F\u5199\u5B57\u6BCD\u3001\u6570\u5B57\u3001\u6A2A\u6760\u3001\u4E0B\u5212\u7EBF\u7EC4\u5408\uFF0C\u957F\u5EA65-15\u5B57\u7B26",{timeout:1e4}),0;l.networkLoading=!0;const c=await U(n.value,a.value,d.value);c.code==0?(e.success(c.msg),h.push("/login")):(c.code=3)&&e.error(c.msg),l.networkLoading=!1}return(c,g)=>{const L=y("RouterLink");return C(),D(x,null,{default:s(()=>[u(k,null,{default:s(()=>[J,o("div",K,[Q,u(m,{type:"text",modelValue:n.value,"onUpdate:modelValue":g[0]||(g[0]=B=>n.value=B),"place-holder":"\u8BF7\u8F93\u5165\u8D26\u53F7",onFocusin:i},null,8,["modelValue"]),P(r)?N("",!0):(C(),b("span",W,"\u5F53\u524D\u8D26\u53F7\u683C\u5F0F\u975E\u6CD5"))]),o("div",X,[Y,u(m,{type:"text",modelValue:a.value,"onUpdate:modelValue":g[1]||(g[1]=B=>a.value=B),"place-holder":"\u8BF7\u8F93\u5165\u6635\u79F0"},null,8,["modelValue"])]),o("div",Z,[uu,u(m,{type:"password",modelValue:d.value,"onUpdate:modelValue":g[2]||(g[2]=B=>d.value=B),"place-holder":"\u8BF7\u8F93\u5165\u5BC6\u7801"},null,8,["modelValue"])]),o("div",eu,[u(L,{to:"/login"},{default:s(()=>[u(F,null,{default:s(()=>[p("<\u8FD4\u56DE\u767B\u5F55")]),_:1})]),_:1}),u(F,{onClick:f},{default:s(()=>[p("\u6CE8\u518C")]),_:1})])]),_:1})]),_:1})}}}),gu=Object.freeze(Object.defineProperty({__proto__:null,default:tu},Symbol.toStringTag,{value:"Module"})),ou={class:"my-4"},lu=o("span",null,"\u65B0\u6635\u79F0\uFF1A",-1),su=E({__name:"EditName",setup(v){const l=A(),e=V(),t=_("");t.value=l.userName;async function r(){if(t.value=="")return e.warning("\u65B0\u6635\u79F0\u4E0D\u53EF\u4E3A\u7A7A"),0;l.networkLoading=!0;const n=await j(l.userId,t.value);n.code==0?(e.success(n.msg),l.userName=t.value,w.set("username",t.value),h.push("/home")):(n.code=3)&&e.error(n.msg),l.networkLoading=!1}return(n,a)=>{const d=y("RouterLink");return C(),D(x,null,{default:s(()=>[u(k,null,{default:s(()=>[o("div",ou,[lu,u(m,{type:"text",modelValue:t.value,"onUpdate:modelValue":a[0]||(a[0]=i=>t.value=i),"place-holder":"\u8BF7\u8F93\u5165\u65B0\u6635\u79F0"},null,8,["modelValue"])]),u(F,{onClick:r},{default:s(()=>[p("\u4FEE\u6539")]),_:1}),u(d,{to:"/home"},{default:s(()=>[u(F,null,{default:s(()=>[p("\u53D6\u6D88")]),_:1})]),_:1})]),_:1})]),_:1})}}}),Cu=Object.freeze(Object.defineProperty({__proto__:null,default:su},Symbol.toStringTag,{value:"Module"})),nu={class:"my-4"},au=o("span",null,"\u65E7\u5BC6\u7801\uFF1A",-1),ru={class:"my-4"},du=o("span",null,"\u65B0\u5BC6\u7801\uFF1A",-1),iu={class:"my-4"},cu=o("span",null,"\u91CD\u590D\u65B0\u5BC6\u7801\uFF1A",-1),_u=E({__name:"EditPassword",setup(v){const l=A(),e=V(),t=_(""),r=_(""),n=_("");async function a(){if(r.value!=n.value||r.value=="")return e.warning("\u4E24\u6B21\u8F93\u5165\u5BC6\u7801\u4E0D\u540C\u6216\u5BC6\u7801\u4E3A\u7A7A\uFF0C\u8BF7\u68C0\u67E5\u8F93\u5165"),0;l.networkLoading=!0;const d=await S(l.userId,t.value,r.value);d.code==0?(e.success(d.msg),h.push("/home")):(d.code=3)&&e.error(d.msg),l.networkLoading=!1}return(d,i)=>{const f=y("RouterLink");return C(),D(x,null,{default:s(()=>[u(k,null,{default:s(()=>[o("div",nu,[au,u(m,{type:"password",modelValue:t.value,"onUpdate:modelValue":i[0]||(i[0]=c=>t.value=c),"place-holder":"\u8BF7\u8F93\u5165\u65E7\u5BC6\u7801"},null,8,["modelValue"])]),o("div",ru,[du,u(m,{type:"password",modelValue:r.value,"onUpdate:modelValue":i[1]||(i[1]=c=>r.value=c),"place-holder":"\u8BF7\u8F93\u5165\u65B0\u5BC6\u7801"},null,8,["modelValue"])]),o("div",iu,[cu,u(m,{type:"password",modelValue:n.value,"onUpdate:modelValue":i[2]||(i[2]=c=>n.value=c),"place-holder":"\u8BF7\u91CD\u590D\u8F93\u5165\u65B0\u5BC6\u7801"},null,8,["modelValue"])]),u(F,{onClick:a},{default:s(()=>[p("\u4FEE\u6539")]),_:1}),u(f,{to:"/home"},{default:s(()=>[u(F,null,{default:s(()=>[p("\u53D6\u6D88")]),_:1})]),_:1})]),_:1})]),_:1})}}}),Bu=Object.freeze(Object.defineProperty({__proto__:null,default:_u},Symbol.toStringTag,{value:"Module"}));export{Cu as E,vu as L,gu as R,Bu as a};