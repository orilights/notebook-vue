import{d as n,_ as o,c as a,a as i,b as r}from"./vendor.9ff92434.js";const u=n("main",{state:()=>({login:!1,networkLoading:!1,userId:"",userName:"",noteList:{0:{tag:[],title:""}},currentNoteId:"0",currentNoteData:[{blkType:"Markdown",blkContent:"\u6570\u636E\u52A0\u8F7D\u4E2D",blkAuthor:"",blkCreateTime:0,blkLastEditTime:0}]})}),s=[{path:"/note",name:"note",component:()=>o(()=>import("./note.06cc99bb.js"),["assets/note.06cc99bb.js","assets/vendor.9ff92434.js","assets/highlight.js.8ad6e740.js","assets/marked.6cb6aba9.js","assets/shared/note/user.3447ce1e.js","assets/crypto-js.f4d81bc8.js","assets/uuid.34856767.js","assets/Note.462bfc60.css"])},{path:"/login",name:"login",component:()=>o(()=>import("./user.496e7bc5.js").then(e=>e.L),["assets/user.496e7bc5.js","assets/vendor.9ff92434.js","assets/shared/note/user.3447ce1e.js","assets/crypto-js.f4d81bc8.js","assets/shared/page404/user.39a0202c.js"])},{path:"/register",name:"register",component:()=>o(()=>import("./user.496e7bc5.js").then(e=>e.R),["assets/user.496e7bc5.js","assets/vendor.9ff92434.js","assets/shared/note/user.3447ce1e.js","assets/crypto-js.f4d81bc8.js","assets/shared/page404/user.39a0202c.js"])},{path:"/edit/name",name:"edit-name",component:()=>o(()=>import("./user.496e7bc5.js").then(e=>e.E),["assets/user.496e7bc5.js","assets/vendor.9ff92434.js","assets/shared/note/user.3447ce1e.js","assets/crypto-js.f4d81bc8.js","assets/shared/page404/user.39a0202c.js"])},{path:"/edit/password",name:"edit-password",component:()=>o(()=>import("./user.496e7bc5.js").then(e=>e.a),["assets/user.496e7bc5.js","assets/vendor.9ff92434.js","assets/shared/note/user.3447ce1e.js","assets/crypto-js.f4d81bc8.js","assets/shared/page404/user.39a0202c.js"])},{path:"/404",name:"404",component:()=>o(()=>import("./page404.962fdd8b.js"),["assets/page404.962fdd8b.js","assets/shared/page404/user.39a0202c.js","assets/vendor.9ff92434.js"])},{path:"/",redirect:"/note"},{path:"/:pathMatch(.*)*",redirect:"/404"}],_=a({history:i(),routes:s});_.beforeEach((e,p)=>{const t=u();if(t.login||r.get("login")=="1"&&(t.login=!0,t.userId=r.get("userid")||"\u83B7\u53D6\u6635\u79F0\u5931\u8D25",t.userName=r.get("username")||"\u83B7\u53D6\u6635\u79F0\u5931\u8D25"),(e.path=="/login"||e.path=="/register")&&t.login)return"/home";if(e.path!="/login"&&e.path!="/404"&&e.path!="/register"&&!t.login)return"/login"});export{_ as r,u};
