import{d as F,g as v,h as x,b as c,m as C,l as n,o as B,k as t,a as o,e as m,x as i,y as k,z as w}from"./index.a3eb97d4.js";import{c as V,d as h}from"./user.3f55bc11.js";import{C as A,_ as p,P as y}from"./CenterContainer.e44f1bf8.js";import{_}from"./TextEditbox.vue_vue_type_script_setup_true_lang.2345fd5a.js";import"./_plugin-vue_export-helper.cdc0426e.js";const E=o("div",{class:"text-center font-semibold text-xl mb-6"},"\u7528\u6237\u767B\u5F55",-1),L={class:"my-4"},D=o("span",null,"\u8D26\u53F7\uFF1A",-1),b={class:"my-4"},N=o("span",null,"\u5BC6\u7801\uFF1A",-1),P={class:"button-group mt-6 flex justify-center"},j=F({__name:"Login",setup(R){const a=v(),u=x(),s=c(""),r=c("");async function f(){if(s.value=="")return u.warning("\u8D26\u53F7\u4E0D\u53EF\u4E3A\u7A7A"),0;if(r.value=="")return u.warning("\u5BC6\u7801\u4E0D\u53EF\u4E3A\u7A7A"),0;a.networkLoading=!0;const e=await V(s.value,r.value);e.code==0?(u.clear(),u.success("\u767B\u5F55\u6210\u529F"),a.login=!0,a.userId=s.value,a.userName=e.msg,i.set("login","1",{expires:7}),i.set("userid",s.value,{expires:7}),i.set("username",e.msg,{expires:7}),i.set("token",h(30),{expires:7}),k.push("/")):(e.code=2)?u.warning(e.msg):(e.code=3)&&u.error(e.msg),a.networkLoading=!1}return(e,l)=>{const g=w("RouterLink");return B(),C(A,null,{default:n(()=>[t(y,null,{default:n(()=>[E,o("div",L,[D,t(_,{type:"text",modelValue:s.value,"onUpdate:modelValue":l[0]||(l[0]=d=>s.value=d),"place-holder":"\u8BF7\u8F93\u5165\u8D26\u53F7"},null,8,["modelValue"])]),o("div",b,[N,t(_,{type:"password",modelValue:r.value,"onUpdate:modelValue":l[1]||(l[1]=d=>r.value=d),"place-holder":"\u8BF7\u8F93\u5165\u5BC6\u7801"},null,8,["modelValue"])]),o("div",P,[t(p,{onClick:f},{default:n(()=>[m("\u767B\u5F55")]),_:1}),t(g,{to:"/register"},{default:n(()=>[t(p,null,{default:n(()=>[m("\u524D\u5F80\u6CE8\u518C>")]),_:1})]),_:1})])]),_:1})]),_:1})}}});export{j as default};
