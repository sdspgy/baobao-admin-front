(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cf678"],{6426:function(e,r,t){"use strict";t.r(r);var a=function(){var e=this,r=e.$createElement,t=e._self._c||r;return t("div",[t("Form",{ref:"searchForm",staticClass:"search-form",attrs:{model:e.searchForm,inline:"","label-width":70}},[t("Form-item",{attrs:{label:"游戏名",prop:"name"}},[t("Input",{staticStyle:{width:"200px"},attrs:{type:"text",clearable:"",placeholder:"请输入游戏名"},model:{value:e.searchForm.name,callback:function(r){e.$set(e.searchForm,"name",r)},expression:"searchForm.name"}})],1)],1),t("Button",{attrs:{type:"primary",icon:"ios-search"},on:{click:e.handleSearch}},[e._v("搜索")]),t("Button",{directives:[{name:"show",rawName:"v-show",value:this.$route.meta.permTypes.includes("add"),expression:"this.$route.meta.permTypes.includes('add')"}],staticStyle:{margin:"10px 10px"},attrs:{type:"primary",icon:"md-add"},on:{click:e.add}},[e._v("添加新游戏\n    ")]),t("Row",[t("Table",{ref:"table",attrs:{loading:e.loading,border:"",columns:e.columns,data:e.data,sortable:"custom"}})],1),t("Row",{staticClass:"page",attrs:{type:"flex",justify:"end"}},[t("Page",{attrs:{current:e.searchForm.pageNumber,total:e.total,"page-size":e.searchForm.pageSize,"page-size-opts":[10,20,50],size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":e.changePage,"on-page-size-change":e.changePageSize}})],1),t("Modal",{attrs:{title:e.modalTitle,"mask-closable":!1,width:500},model:{value:e.serverModalVisible,callback:function(r){e.serverModalVisible=r},expression:"serverModalVisible"}},[t("Form",{ref:"gameForm",attrs:{model:e.gameForm,"label-width":80,rules:e.gameFormValidate}},[e.hide?t("FormItem",{attrs:{label:"id",prop:"parentId",error:e.errorid}},[t("Input",{model:{value:e.gameForm.parentId,callback:function(r){e.$set(e.gameForm,"parentId",r)},expression:"gameForm.parentId"}})],1):e._e(),t("FormItem",{attrs:{label:"游戏id",prop:"gameid",error:e.errorGameid}},[t("Input",{model:{value:e.gameForm.gameid,callback:function(r){e.$set(e.gameForm,"gameid",r)},expression:"gameForm.gameid"}})],1),t("FormItem",{attrs:{label:"游戏名",prop:"name",error:e.errorGameName}},[t("Input",{model:{value:e.gameForm.name,callback:function(r){e.$set(e.gameForm,"name",r)},expression:"gameForm.name"}})],1),t("FormItem",{attrs:{label:"游戏别名",prop:"alias",error:e.errorAlias}},[t("Input",{model:{value:e.gameForm.alias,callback:function(r){e.$set(e.gameForm,"alias",r)},expression:"gameForm.alias"}})],1),t("FormItem",{attrs:{label:"游戏logo，服务器图片地址",prop:"logo",error:e.errorLogo}},[t("Input",{model:{value:e.gameForm.logo,callback:function(r){e.$set(e.gameForm,"logo",r)},expression:"gameForm.logo"}})],1),t("FormItem",{attrs:{label:"月KPI",prop:"monthKpi",error:e.errorMonthKpi}},[t("Input",{model:{value:e.gameForm.monthKpi,callback:function(r){e.$set(e.gameForm,"monthKpi",r)},expression:"gameForm.monthKpi"}})],1),t("FormItem",{attrs:{label:"年KPI",prop:"yearKpi",error:e.errorYearKpi}},[t("Input",{model:{value:e.gameForm.yearKpi,callback:function(r){e.$set(e.gameForm,"yearKpi",r)},expression:"gameForm.yearKpi"}})],1),t("FormItem",{attrs:{label:"当月总收入",prop:"currMonthKpi",error:e.errorCurrMonthKpi}},[t("Input",{model:{value:e.gameForm.currMonthKpi,callback:function(r){e.$set(e.gameForm,"currMonthKpi",r)},expression:"gameForm.currMonthKpi"}})],1),t("FormItem",{attrs:{label:"当年总收入",prop:"currYearKpi",error:e.errorCurrYearKpi}},[t("Input",{model:{value:e.gameForm.currYearKpi,callback:function(r){e.$set(e.gameForm,"currYearKpi",r)},expression:"gameForm.currYearKpi"}})],1),t("FormItem",{attrs:{label:"货币类型",prop:"currency",error:e.errorCurrency}},[t("Input",{model:{value:e.gameForm.currency,callback:function(r){e.$set(e.gameForm,"currency",r)},expression:"gameForm.currency"}})],1),t("FormItem",{attrs:{label:"货币汇率（相较RMB)",prop:"currencyRate",error:e.errorCurrencyRate}},[t("Input",{model:{value:e.gameForm.currencyRate,callback:function(r){e.$set(e.gameForm,"currencyRate",r)},expression:"gameForm.currencyRate"}})],1),t("FormItem",{attrs:{label:"是否开启etl",prop:"stats",error:e.errorSstats}},[t("Input",{model:{value:e.gameForm.stats,callback:function(r){e.$set(e.gameForm,"stats",r)},expression:"gameForm.stats"}})],1),t("FormItem",{attrs:{label:"世界时区",prop:"timeZone",error:e.errorTimeZone}},[t("Input",{model:{value:e.gameForm.timeZone,callback:function(r){e.$set(e.gameForm,"timeZone",r)},expression:"gameForm.timeZone"}})],1),t("FormItem",{attrs:{label:"安装总用户",prop:"install",error:e.errorInstall}},[t("Input",{model:{value:e.gameForm.install,callback:function(r){e.$set(e.gameForm,"install",r)},expression:"gameForm.install"}})],1),t("FormItem",{attrs:{label:"付费总额",prop:"payAmount",error:e.errorPayAmount}},[t("Input",{model:{value:e.gameForm.payAmount,callback:function(r){e.$set(e.gameForm,"payAmount",r)},expression:"gameForm.payAmount"}})],1),t("FormItem",{attrs:{label:"统计几日留存 0 不开启日志统计",prop:"retention"}},[t("Input",{model:{value:e.gameForm.retention,callback:function(r){e.$set(e.gameForm,"retention",r)},expression:"gameForm.retention"}})],1),t("FormItem",{attrs:{label:"上线时间",prop:"onlineDate",error:e.errorOnlineDate}},[t("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"请选择时间日期"},model:{value:e.gameForm.onlineDate,callback:function(r){e.$set(e.gameForm,"onlineDate",r)},expression:"gameForm.onlineDate"}})],1),t("FormItem",{attrs:{label:"etl触发时间",prop:"etlTriggerTime",error:e.EtlTriggerTime}},[t("DatePicker",{staticStyle:{width:"200px"},attrs:{type:"datetime",format:"yyyy-MM-dd HH:mm:ss",placeholder:"请选择时间日期"},model:{value:e.gameForm.etlTriggerTime,callback:function(r){e.$set(e.gameForm,"etlTriggerTime",r)},expression:"gameForm.etlTriggerTime"}})],1),t("FormItem",{attrs:{label:"etl触发id",prop:"etlTriggerId"}},[t("Input",{model:{value:e.gameForm.etlTriggerId,callback:function(r){e.$set(e.gameForm,"etlTriggerId",r)},expression:"gameForm.etlTriggerId"}})],1),t("FormItem",{attrs:{label:"etl当前状态",prop:"etlStatus"}},[t("Input",{model:{value:e.gameForm.etlStatus,callback:function(r){e.$set(e.gameForm,"etlStatus",r)},expression:"gameForm.etlStatus"}})],1),t("FormItem",{attrs:{label:"统计优先级",prop:"etlOrder"}},[t("Input",{model:{value:e.gameForm.etlOrder,callback:function(r){e.$set(e.gameForm,"etlOrder",r)},expression:"gameForm.etlOrder"}})],1)],1),t("div",{attrs:{slot:"footer"},slot:"footer"},[t("Button",{attrs:{type:"text"},on:{click:e.cancelServer}},[e._v("取消")]),t("Button",{attrs:{type:"primary",loading:e.submitLoading},on:{click:e.submitServer}},[e._v("提交")])],1)],1)],1)},o=[],m=t("365c"),i={name:"game",comments:{},data:function(){var e=this;return{columns:[{type:"selection",width:60,align:"center",fixed:"left"},{type:"index",width:60,align:"center",fixed:"left"},{title:"游戏ID",key:"gameid",width:150},{title:"游戏名",key:"name",width:150},{title:"游戏别名",key:"alias",width:150},{title:"游戏logo，服务器图片地址",key:"logo",width:150},{title:"月KPI",key:"monthKpi",width:150},{title:"年KPI",key:"yearKpi",width:150},{title:"当前月总收入",key:"currMonthKpi",width:150},{title:"当年总收入",key:"currYearKpi",width:150},{title:"货币类型",key:"currency",width:150},{title:"货币汇率",key:"currencyRate",width:150},{title:"是否开启etl",key:"stats",width:150},{title:"世界时区",key:"timeZone",width:150},{title:"安装总用户",key:"install",width:150},{title:"付费总额",key:"payAmount",width:150},{title:"统计几日留存",key:"retention",width:150},{title:"上线时间",key:"onlineDate",width:150},{title:"etl触发时间",key:"etlTriggerTime",width:150},{title:"etl触发id",key:"etlTriggerId",width:150},{title:"etl当前状态",key:"etlStatus",width:150},{title:"统计优先级",key:"etlOrder",width:150},{title:"操作",key:"action",width:200,align:"center",render:function(r,t){var a=r("Button",{props:{type:"primary",size:"small",disabled:!e.$route.meta.permTypes.includes("edit")},style:{marginRight:"5px"},on:{click:function(){e.edit(t.row)}}},"编辑"),o=r("Button",{props:{type:"error",size:"small",disabled:!e.$route.meta.permTypes.includes("delete")},on:{click:function(){e.remove(t.row)}}},"删除");return r("div",[a,o])}}],data:[],searchForm:{gameid:"",name:"",pageNumber:1,pageSize:10},total:0,submitLoading:!1,serverModalVisible:!1,gameForm:{parentId:"",gameid:"",name:"",alias:"",logo:"",monthKpi:"",yearKpi:"",currMonthKpi:"",currYearKpi:"",currency:"",currencyRate:"",stats:"",timeZone:"",install:"",payAmount:"",retention:"",onlineDate:new Date,etlTriggerTime:new Date,etlTriggerId:"",etlStatus:"",etlOrder:""},hide:!1,games:[]}},methods:{init:function(){this.queryAllGame()},handleSearch:function(){this.queryAllGame()},queryAllGame:function(){var e=this;Object(m["Mb"])(this.searchForm).then((function(r){r.success&&(e.data=r.result.records,e.games=r.result.records,e.total=r.result.total)}))},changePage:function(e){this.searchForm.pageNumber=e,this.queryAllGame(),this.clearSelectAll()},changePageSize:function(e){this.searchForm.pageSize=e,this.queryAllGame()},clearSelectAll:function(){this.$refs.table.selectAll(!1)},submitServer:function(){var e=this;this.$refs.gameForm.validate((function(r){if(r)if(0==e.modalType){if(""==e.gameForm.parentId||void 0==e.gameForm.parentId)return void(e.errorid="编号id不能为空");if(""==e.gameForm.gameid||void 0==e.gameForm.gameid)return void(e.errorGameid="游戏id不能为空");if(""==e.gameForm.name||void 0==e.gameForm.name)return void(e.errorGameName="游戏名不能为空");if(""==e.gameForm.alias||void 0==e.gameForm.alias)return void(e.errorAlias="游戏别名不能为空");if(""==e.gameForm.logo||void 0==e.gameForm.logo)return void(e.errorLogo="游戏Logo不能为空");if(""==e.gameForm.monthKpi||void 0==e.gameForm.monthKpi)return void(e.errorMonthKpi="游戏月KPI不能为空");if(""==e.gameForm.yearKpi||void 0==e.gameForm.yearKpi)return void(e.errorYearKpi="游戏年KPI不能为空");if(""==e.gameForm.currMonthKpi||void 0==e.gameForm.currMonthKpi)return void(e.errorCurrMonthKpi="游戏当月总收入不能为空");if(""==e.gameForm.currYearKpi||void 0==e.gameForm.currYearKpi)return void(e.errorCurrYearKpi="游戏当年总收入不能为空");if(""==e.gameForm.currency||void 0==e.gameForm.currency)return void(e.errorCurrency="游戏货币类型不能为空");if(""==e.gameForm.currencyRate||void 0==e.gameForm.currencyRate)return void(e.errorCurrencyRate="游戏货币汇率不能为空");if(""==e.gameForm.stats||void 0==e.gameForm.stats)return void(e.errorSstats="游戏是否开启elt状态不能为空");if(""==e.gameForm.timeZone||void 0==e.gameForm.timeZone)return void(e.errorTimeZone="游戏世界时区不能为空");if(""==e.gameForm.install||void 0==e.gameForm.install)return void(e.errorInstall="游戏总安装数不能为空");if(""==e.gameForm.payAmount||void 0==e.gameForm.payAmount)return void(e.errorPayAmount="游戏总付费额不能为空");if(""==e.gameForm.onlineDate||void 0==e.gameForm.onlineDate)return void(e.errorOnlineDate="游戏上线时间不能为空");if(""==e.gameForm.etlTriggerTime||void 0==e.gameForm.etlTriggerTime)return void(e.EtlTriggerTime="游戏elt触发时间不能为空");e.submitLoading=!0,Object(m["f"])({parentId:e.gameForm.parentId,gameid:e.gameForm.gameid,name:e.gameForm.name,alias:e.gameForm.alias,logo:e.gameForm.alias,monthKpi:e.gameForm.monthKpi,yearKpi:e.gameForm.yearKpi,currMonthKpi:e.gameForm.currMonthKpi,currYearKpi:e.gameForm.currYearKpi,currency:e.gameForm.currency,currencyRate:e.gameForm.currencyRate,stats:e.gameForm.stats,timeZone:e.gameForm.timeZone,install:e.gameForm.install,payAmount:e.gameForm.payAmount,retention:e.gameForm.retention,onlineDate:e.gameForm.onlineDate,etlTriggerTime:e.gameForm.etlTriggerTime,etlTriggerId:e.gameForm.etlTriggerId,etlStatus:e.gameForm.etlStatus,etlOrder:e.gameForm.etlOrder}).then((function(r){e.submitLoading=!1,r.success&&(e.$Message.success("操作成功"),e.queryAllGame(),e.serverModalVisible=!1)}))}else e.submitLoading=!0,Object(m["M"])({parentId:e.gameForm.parentId,gameid:e.gameForm.gameid,name:e.gameForm.name,alias:e.gameForm.alias,logo:e.gameForm.alias,monthKpi:e.gameForm.monthKpi,yearKpi:e.gameForm.yearKpi,currMonthKpi:e.gameForm.currMonthKpi,currYearKpi:e.gameForm.currYearKpi,currency:e.gameForm.currency,currencyRate:e.gameForm.currencyRate,stats:e.gameForm.stats,timeZone:e.gameForm.timeZone,install:e.gameForm.install,payAmount:e.gameForm.payAmount,retention:e.gameForm.retention,onlineDate:e.gameForm.onlineDate,etlTriggerTime:e.gameForm.etlTriggerTime,etlTriggerId:e.gameForm.etlTriggerId,etlStatus:e.gameForm.etlStatus,etlOrder:e.gameForm.etlOrder}).then((function(r){e.submitLoading=!1,r.success&&(e.$Message.success("操作成功"),e.queryAllGame(),e.serverModalVisible=!1)}))}))},cancelAdvert:function(){this.serverModalVisible=!1},add:function(){this.modalType=0,this.modalTitle="添加游戏",this.$refs.gameForm.resetFields(),this.serverModalVisible=!0,this.hide=!0},edit:function(e){for(var r in this.modalType=1,this.modalTitle="编辑游戏",this.$refs.gameForm.resetFields(),e)null==e[r]&&(e[r]="");var t=JSON.stringify(e),a=JSON.parse(t);this.gameForm=a,this.serverModalVisible=!0,this.hide=!1},remove:function(e){var r=this;this.$Modal.confirm({title:"确认删除",content:"您确认要删除游戏名为： "+e.name+"?",loading:!0,onOk:function(){Object(m["y"])(e.parentId).then((function(e){r.$Modal.remove(),e.success&&(r.$Message.success("删除成功"),r.queryAllGame())}))}})}},mounted:function(){this.init()}},l=i,n=t("2877"),s=Object(n["a"])(l,a,o,!1,null,"e82f1de0",null);r["default"]=s.exports}}]);