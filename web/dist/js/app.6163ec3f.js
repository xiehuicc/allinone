(function(e){function t(t){for(var n,a,s=t[0],i=t[1],u=t[2],p=0,d=[];p<s.length;p++)a=s[p],Object.prototype.hasOwnProperty.call(r,a)&&r[a]&&d.push(r[a][0]),r[a]=0;for(n in i)Object.prototype.hasOwnProperty.call(i,n)&&(e[n]=i[n]);c&&c(t);while(d.length)d.shift()();return o.push.apply(o,u||[]),l()}function l(){for(var e,t=0;t<o.length;t++){for(var l=o[t],n=!0,s=1;s<l.length;s++){var i=l[s];0!==r[i]&&(n=!1)}n&&(o.splice(t--,1),e=a(a.s=l[0]))}return e}var n={},r={app:0},o=[];function a(t){if(n[t])return n[t].exports;var l=n[t]={i:t,l:!1,exports:{}};return e[t].call(l.exports,l,l.exports,a),l.l=!0,l.exports}a.m=e,a.c=n,a.d=function(e,t,l){a.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:l})},a.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},a.t=function(e,t){if(1&t&&(e=a(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var l=Object.create(null);if(a.r(l),Object.defineProperty(l,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var n in e)a.d(l,n,function(t){return e[t]}.bind(null,n));return l},a.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return a.d(t,"a",t),t},a.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},a.p="/";var s=window["webpackJsonp"]=window["webpackJsonp"]||[],i=s.push.bind(s);s.push=t,s=s.slice();for(var u=0;u<s.length;u++)t(s[u]);var c=i;o.push([0,"chunk-vendors"]),l()})({0:function(e,t,l){e.exports=l("56d7")},"034f":function(e,t,l){"use strict";l("85ec")},"27f5":function(e,t,l){},"56d7":function(e,t,l){"use strict";l.r(t);l("e260"),l("e6cf"),l("cca6"),l("a79d");var n=l("2b0e"),r=l("8c4f"),o=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"login"},[l("div",{staticClass:"loginbox"},[l("div",{staticClass:"container"},[l("el-form",{ref:"ruleForm",staticClass:"demo-ruleForm",attrs:{model:e.ruleForm,"status-icon":"",rules:e.rules}},[l("el-form-item",{attrs:{prop:"user"}},[l("el-input",{attrs:{placeholder:"请输入账号","prefix-icon":"el-icon-user"},model:{value:e.ruleForm.user,callback:function(t){e.$set(e.ruleForm,"user",t)},expression:"ruleForm.user"}})],1),l("el-form-item",{attrs:{prop:"pass"}},[l("el-input",{attrs:{placeholder:"请输入密码",type:"password","prefix-icon":"el-icon-lock",autocomplete:"off"},model:{value:e.ruleForm.pass,callback:function(t){e.$set(e.ruleForm,"pass",t)},expression:"ruleForm.pass"}})],1),l("el-form-item",[l("el-button",{attrs:{type:"primary"},on:{click:function(t){return e.submitForm("ruleForm")}}},[e._v("登陆")])],1)],1)],1)])])},a=[],s=(l("d3b7"),l("25f0"),l("bc3a")),i=l.n(s),u={data:function(){var e=this,t=function(t,l,n){""===l?n(new Error("请输入密码")):(""!==e.ruleForm.checkPass&&e.$refs.ruleForm.validateField("checkPass"),n())};return{ruleForm:{user:"admin",pass:"111111"},rules:{user:[{required:!0,message:"请输入用户名",trigger:"blur"},{min:3,max:15,message:"长度在3到5个字符",trigger:"blur"}],pass:[{validator:t,trigger:"blur"}]}}},methods:{submitForm:function(e){var t=this;this.$refs[e].validate((function(e){if(!e)return console.log("error submit!!"),!1;i()({method:"get",url:"people/findOne?delete=false"}).then((function(e){console.log("222222222222",e),200==e.data.code&&t.$router.push({path:"/sideBar"})})).catch((function(e){console.log(e.toString())}))}))}}},c=u,p=(l("57fe"),l("2877")),d=Object(p["a"])(c,o,a,!1,null,"655a765a",null),f=d.exports,m=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"main"},[l("div",{staticClass:"left",staticStyle:{"{width":"(!isCollapse?'200px':'auto')}"}},[l("h3",[e._v("公寓管理系统")]),l("el-menu",{staticClass:"el-menu-vertical-demo",attrs:{"default-active":"2","background-color":"#0DADA4","text-color":"#fff","active-text-color":"#ffd04b",collapse:e.isCollapse,router:""},on:{open:e.handleOpen,close:e.handleClose}},[l("el-submenu",{attrs:{index:"1"}},[l("template",{slot:"title"},[l("i",{staticClass:"el-icon-user"}),l("span",[e._v("人员管理")])]),l("el-menu-item-group",[l("el-menu-item",{attrs:{index:"/tenant"}},[e._v("租户管理")]),l("el-menu-item",{attrs:{index:"/visitor"}},[e._v("访客管理")]),l("el-menu-item",{attrs:{index:"/employee"}},[e._v("员工管理")]),l("el-menu-item",{attrs:{index:"1-4"}},[e._v("选项4")])],1)],2),l("el-submenu",{attrs:{index:"2"}},[l("template",{slot:"title"},[l("i",{staticClass:"el-icon-menu"}),l("span",[e._v("客房管理")])]),l("el-menu-item-group",[l("el-menu-item",{attrs:{index:"/roomMessage"}},[e._v("客房信息管理")]),l("el-menu-item",{attrs:{index:"/roomConfigs"}},[e._v("客房配置管理")])],1)],2),l("el-submenu",{attrs:{index:"3"}},[l("template",{slot:"title"},[l("i",{staticClass:"el-icon-document"}),l("span",[e._v("权限管理")])]),l("el-menu-item-group",[l("el-menu-item",{attrs:{index:"3-1"}},[e._v("选项1")]),l("el-menu-item",{attrs:{index:"3-2"}},[e._v("选项2")])],1)],2),l("el-menu-item",{attrs:{index:"4"}},[l("i",{staticClass:"el-icon-setting"}),l("span",{attrs:{slot:"title"},slot:"title"},[e._v("导航四")])])],1),l("div",{staticClass:"collapse"},[l("i",{class:e.isCollapse?"el-icon-s-unfold":"el-icon-s-fold",on:{click:e.handleFold}})])],1),l("div",{staticClass:"right"},[l("div",{staticClass:"top"}),l("router-view")],1)])},b=[],h={name:"sideBar",data:function(){return{isCollapse:!1}},methods:{handleOpen:function(e,t){console.log(e,t)},handleClose:function(e,t){console.log(e,t)},handleFold:function(){this.isCollapse=!this.isCollapse},handleTenant:function(){}}},v=h,_=(l("e449"),Object(p["a"])(v,m,b,!1,null,"67a3166a",null)),g=_.exports,x=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{staticClass:"table el-table__body-wrapper is-scrolling-left"},[l("el-table",{staticStyle:{},attrs:{data:e.tableData,border:""}},[l("el-table-column",{attrs:{type:"selection",width:"55"}}),l("el-table-column",{attrs:{prop:"date",label:"入住日期",width:"150"}}),l("el-table-column",{attrs:{prop:"name",label:"姓名",width:"120"}}),l("el-table-column",{attrs:{prop:"picture",label:"照片",width:"120"}}),l("el-table-column",{attrs:{prop:"sex",label:"性别",width:"120"}}),l("el-table-column",{attrs:{prop:"age",label:"年龄",width:"120"}}),l("el-table-column",{attrs:{prop:"job",label:"职业",width:"120"}}),l("el-table-column",{attrs:{prop:"room",label:"房间号",width:"120"}}),l("el-table-column",{attrs:{prop:"tenancy",label:"租期",width:"120"}}),l("el-table-column",{attrs:{prop:"endtime",label:"到期时间",width:"120"}}),l("el-table-column",{attrs:{fixed:"right",label:"操作",width:"100"},scopedSlots:e._u([{key:"default",fn:function(t){return[l("el-button",{attrs:{type:"text",size:"small"},on:{click:function(l){return e.handleClick(t.row)}}},[e._v("查看")]),l("el-button",{attrs:{type:"text",size:"small"}},[e._v("编辑")])]}}])})],1)],1)},y=[],w={data:function(){return{tableData:[{date:"2020-02-20",name:"小木"}]}},methods:{handleClick:function(e){console.log(e)}}},C=w,O=(l("b6e1"),Object(p["a"])(C,x,y,!1,null,null,null)),j=O.exports,F=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._v(" 访客信息管理 ")])},k=[],$={},E=$,P=Object(p["a"])(E,F,k,!1,null,null,null),S=P.exports,M=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._v("员工管理")])},D=[],T={},A=T,B=Object(p["a"])(A,M,D,!1,null,null,null),z=B.exports,J=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._v("客房信息管理")])},q=[],L={},R=L,U=Object(p["a"])(R,J,q,!1,null,null,null),G=U.exports,H=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",[e._v("客房配置")])},I=[],K={},N=K,Q=Object(p["a"])(N,H,I,!1,null,null,null),V=Q.exports;n["default"].use(r["a"]);var W=new r["a"]({routes:[{path:"/",component:f},{path:"/sideBar",name:"home",component:g,children:[{path:"/tenant",component:j},{path:"/visitor",component:S},{path:"/employee",component:z},{path:"/roomMessage",component:G},{path:"/roomConfigs",component:V}]}]}),X=l("5c96"),Y=l.n(X);l("0fae");n["default"].use(Y.a);var Z=function(){var e=this,t=e.$createElement,l=e._self._c||t;return l("div",{attrs:{id:"app"}},[l("router-view")],1)},ee=[],te={name:"App",components:{}},le=te,ne=(l("034f"),Object(p["a"])(le,Z,ee,!1,null,null,null)),re=ne.exports;n["default"].prototype.$axios=i.a,i.a.defaults.baseURL="http://47.103.142.69:3000/allinone/",n["default"].config.productionTip=!1,new n["default"]({router:W,render:function(e){return e(re)}}).$mount("#app")},"57fe":function(e,t,l){"use strict";l("27f5")},"7fb2":function(e,t,l){},"830a":function(e,t,l){},"85ec":function(e,t,l){},b6e1:function(e,t,l){"use strict";l("830a")},e449:function(e,t,l){"use strict";l("7fb2")}});
//# sourceMappingURL=app.6163ec3f.js.map