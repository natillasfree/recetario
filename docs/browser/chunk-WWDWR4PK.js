import{c as T}from"./chunk-WFQUEC43.js";import{a as E}from"./chunk-2RUFMMNV.js";import"./chunk-VUG7N5NL.js";import{$a as $,Ga as c,La as y,Qa as b,Ua as x,Wa as C,Xa as h,Ya as r,Za as o,_ as p,_a as v,ab as w,ba as u,bb as g,gb as d,ib as H,ja as f,ka as _,lb as S}from"./chunk-ITW336Y2.js";import{a as l,b as m}from"./chunk-7A67K276.js";var F=(i,e)=>e.name;function j(i,e){i&1&&(r(0,"div",0),v(1,"div",3),o())}function D(i,e){i&1&&(r(0,"div",1)(1,"div",4)(2,"strong",5),d(3,"Error:"),o(),d(4," $state().error "),o()())}function I(i,e){if(i&1){let t=$();r(0,"li",7),w("click",function(){let a=f(t).$implicit,s=g(2);return _(s.listRecipes(a.name))}),d(1),o()}if(i&2){let t=e.$implicit;c(),H(" ",t.name," ")}}function N(i,e){if(i&1&&(r(0,"ul",2),C(1,I,2,1,"li",6,F),o()),i&2){let t=g();c(),h(t.$state().data)}}var k=class i{api=p(E);router=p(T);$state=y({type:"nationality",loading:!1,error:!1,data:[]});set type(e){this.$state.update(n=>m(l({},n),{loading:!0,type:e}));let t;switch(e){case"category":t=this.api.getCategories();break;default:t=this.api.getNationalities()}t.subscribe(n=>{this.$state.update(a=>m(l({},a),{loading:!1,error:!1,data:n.map(s=>e=="category"?{name:s.strCategory}:{name:s.strArea})}))},n=>{console.log(n),this.$state.update(a=>m(l({},a),{loading:!1,error:n,data:[]}))})}listRecipes(e){this.router.navigate(["recipes",this.$state().type,e])}static \u0275fac=function(t){return new(t||i)};static \u0275cmp=u({type:i,selectors:[["app-home"]],inputs:{type:"type"},standalone:!0,features:[S],decls:3,vars:1,consts:[[1,"flex","items-center","justify-center","min-h-screen","bg-gray-50","bg-opacity-80"],[1,"flex","items-center","justify-center","min-h-screen","bg-gray-50"],[1,"max-w-md","mx-auto","bg-white","rounded-lg","shadow-md","divide-y","divide-gray-200"],[1,"w-16","h-16","border-4","border-gray-300","border-t-blue-500","rounded-full","animate-spin"],[1,"bg-red-100","border","border-red-400","text-red-700","px-6","py-4","rounded-lg","shadow-md","max-w-lg"],[1,"font-semibold"],[1,"px-6","py-4","cursor-pointer","hover:bg-gray-100","transition-colors"],[1,"px-6","py-4","cursor-pointer","hover:bg-gray-100","transition-colors",3,"click"]],template:function(t,n){t&1&&b(0,j,2,0,"div",0)(1,D,5,0,"div",1)(2,N,3,0,"ul",2),t&2&&x(n.$state().loading?0:n.$state().error?1:2)}})};export{k as HomeComponent};