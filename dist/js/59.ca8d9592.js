"use strict";(self["webpackChunkssm_saas"]=self["webpackChunkssm_saas"]||[]).push([[59],{59:function(e,l,a){a.r(l),a.d(l,{default:function(){return _}});a(7658);var s=a(3396),o=a(9242),t=a(4870),n=a(9307),i=a(65),u=a(2483);const r={class:"bg-white w-full sm:w-6/12 md:w-6/12 lg:w-4/12 flex flex-col items-center text-center gap-4 p-4 rounded-v m-auto mt-0"},d=(0,s._)("h3",null,"Let's get Started",-1),c=(0,s._)("h5",null,"create you account using",-1),v={class:"w-10/12 between m-auto"},m=(0,s._)("div",{class:"w-full between"},[(0,s._)("div",{class:"w-full border-[1px]"}),(0,s._)("div",{class:"w-6/12"},"Or"),(0,s._)("div",{class:"w-full border-[1px] rounded-v"})],-1),p={class:"my-4 text-gray-600"},w=(0,s._)("br",null,null,-1),f=(0,s._)("h6",{class:"w-10/12 font-normal text-gray-400"},[(0,s.Uk)("by Creating an Account You are Agreeing to "),(0,s._)("a",{class:"underline decoration-solid"},"Terms"),(0,s.Uk)(", "),(0,s._)("a",{class:"underline decoration-solid"},"Conditions"),(0,s.Uk)(" and, "),(0,s._)("a",{class:"underline decoration-solid"},"Policies"),(0,s.Uk)(" of this Platform")],-1);var g={__name:"signup",setup(e){const l=(0,i.oR)(),a=(0,u.tv)(),g=(0,t.iH)("password"),b=(0,t.iH)(!1),_=(0,t.iH)({email:null,password:null}),x=(0,t.iH)({email:(0,s.Fl)((()=>/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(_.value.email))),password:(0,s.Fl)((()=>/^.{8,100}$/.test(_.value.password)))}),y=(0,t.iH)({email:!0,password:!0}),h=e=>g.value="text"==e?"password":"text",k=async()=>{y.value=x.value;try{y.value.email&&y.value.password&&(b.value=!0,await n.h.post("/api/OTP/send",_.value),l.commit("OTP",{email:_.value.email}),a.push("/verify?OTP=signup"))}catch(e){b.value=!1,console.log(e)}};return(e,l)=>{const a=(0,s.up)("btn-app"),t=(0,s.up)("input-app"),n=(0,s.up)("router-link");return(0,s.wg)(),(0,s.iD)("div",r,[d,c,(0,s._)("div",v,[(0,s.Wm)(a,{text:"goolge",icon:"logos:google-icon",class:"w-5/12"}),(0,s.Wm)(a,{text:"microsoft",icon:"logos:microsoft-icon",class:"w-5/12"})]),m,(0,s._)("form",{onSubmit:l[3]||(l[3]=(0,o.iM)(((...l)=>e.submitForm&&e.submitForm(...l)),["prevent"])),class:"w-full grid gap-4 text-left"},[(0,s.Wm)(t,{value:_.value.email,onUpdate:l[0]||(l[0]=e=>_.value.email=e),label:"email",subText:!y.value.email&&"(enter a valid email)",invalid:!y.value.email&&!x.value.email,type:"email",icon:"fluent:person-mail-24-filled",placeholder:"user@email.com",readonly:b.value},null,8,["value","subText","invalid","readonly"]),(0,s.Wm)(t,{value:_.value.password,onUpdate:l[1]||(l[1]=e=>_.value.password=e),label:"password",subText:!y.value.password&&"(at least 8 characters)",invalid:!y.value.password&&!x.value.password,type:g.value,icon:"fluent:shield-person-20-filled",placeholder:"password123",onBtn:l[2]||(l[2]=e=>h(g.value)),btnIcon:`fluent:eye${"text"==g.value?"-off":""}-16-filled`,readonly:b.value},null,8,["value","subText","invalid","type","btnIcon","readonly"]),(0,s.Wm)(a,{text:"create",onClick:k,icon:"fluent:person-24-filled",loading:b.value,class:"w-5/12 mt-4 mx-auto"},null,8,["loading"])],32),(0,s._)("h5",p,[(0,s.Uk)("if you already have "),w,(0,s.Uk)(" an account, "),(0,s.Wm)(n,{to:"/login",class:"font-semibold underline decoration-solid"},{default:(0,s.w5)((()=>[(0,s.Uk)("Login")])),_:1})]),f])}}};const b=g;var _=b}}]);
//# sourceMappingURL=59.ca8d9592.js.map