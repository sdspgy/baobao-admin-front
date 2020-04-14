(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2d0cfec0"],{"667a":function(t,e,i){"use strict";i.r(e);var o=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",[i("div",{staticStyle:{"margin-top":"15px"}},[i("Input",{staticStyle:{"max-width":"500px"},attrs:{placeholder:"请输入内容"},model:{value:t.search.content,callback:function(e){t.$set(t.search,"content",e)},expression:"search.content"}},[i("Select",{staticStyle:{width:"200px"},attrs:{slot:"prepend",placeholder:"请选择"},slot:"prepend",model:{value:t.search.select,callback:function(e){t.$set(t.search,"select",e)},expression:"search.select"}},[i("Option",{attrs:{label:"id查询",value:"1"}}),i("Option",{attrs:{label:"openid查询",value:"2"}}),i("Option",{attrs:{label:"昵称查询暂未实现",value:"3"}})],1),i("Button",{attrs:{slot:"append"},on:{click:function(e){return t.searchUser()}},slot:"append"},[t._v("搜索用户")])],1)],1),i("Row",[i("Table",{ref:"table",attrs:{columns:t.columns,data:t.users}})],1),i("Modal",{attrs:{title:"修改数据","mask-closable":!1,width:"50%"},model:{value:t.dialogFormVisible,callback:function(e){t.dialogFormVisible=e},expression:"dialogFormVisible"}},[i("Form",{attrs:{model:t.form,"label-width":120}},[i("FormItem",{attrs:{label:"玩家id"}},[i("Input",{attrs:{autocomplete:"off",disabled:!0},model:{value:t.form.userId,callback:function(e){t.$set(t.form,"userId",e)},expression:"form.userId"}})],1),i("FormItem",{attrs:{label:"添加钻石"}},[i("Input",{attrs:{autocomplete:"off"},model:{value:t.form.diamond,callback:function(e){t.$set(t.form,"diamond",e)},expression:"form.diamond"}})],1),i("FormItem",{attrs:{label:"添加金币"}},[i("Input",{attrs:{autocomplete:"off"},model:{value:t.form.gold,callback:function(e){t.$set(t.form,"gold",e)},expression:"form.gold"}})],1),i("FormItem",{attrs:{label:"更新等级"}},[i("Input",{attrs:{autocomplete:"off"},model:{value:t.form.level,callback:function(e){t.$set(t.form,"level",e)},expression:"form.level"}})],1),i("FormItem",{attrs:{label:"添加经验"}},[i("Input",{attrs:{autocomplete:"off"},model:{value:t.form.exp,callback:function(e){t.$set(t.form,"exp",e)},expression:"form.exp"}})],1),i("FormItem",{attrs:{label:"添加道具（id1,num1;id2,num2）"}},[i("Input",{attrs:{autocomplete:"off"},model:{value:t.form.items,callback:function(e){t.$set(t.form,"items",e)},expression:"form.items"}})],1),i("FormItem",{attrs:{label:"扩建等级 如果想扩满填-1"}},[i("Input",{attrs:{autocomplete:"off"},model:{value:t.form.extendLevel,callback:function(e){t.$set(t.form,"extendLevel",e)},expression:"form.extendLevel"}})],1)],1),i("Button",{attrs:{loading:t.updateUserLoading},on:{click:function(e){return t.oneKeyAdd(1)}}},[t._v("一键添加道具")]),i("Button",{attrs:{loading:t.updateUserLoading},on:{click:function(e){return t.oneKeyAdd(2)}}},[t._v("一键添加家具")]),i("Button",{attrs:{loading:t.updateUserLoading},on:{click:function(e){return t.oneKeyAdd(3)}}},[t._v("一键添加员工")]),i("Button",{attrs:{loading:t.updateUserLoading},on:{click:function(e){return t.oneKeyAdd(4)}}},[t._v("一键添加货物")]),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.skipNewGuide()}}},[t._v("跳过新手")]),i("Button",{on:{click:function(e){return t.hideDialog()}}},[t._v("取 消")]),i("Button",{attrs:{type:"primary",loading:t.updateUserLoading},on:{click:function(e){return t.updateUser()}}},[t._v("确 定")])],1)],1),i("Modal",{attrs:{title:"查看背包道具和货物","mask-closable":!1,width:"50%"},model:{value:t.dialogFormVisible2,callback:function(e){t.dialogFormVisible2=e},expression:"dialogFormVisible2"}},[i("h2",[t._v("道具列表")]),i("Table",{ref:"table",attrs:{columns:t.columnsWithBag,data:t.bagItems}}),i("h2",[t._v("货物列表")]),i("Table",{ref:"table",attrs:{columns:t.columnsWithBag,data:t.bagGoods}}),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog2()}}},[t._v("取 消")])],1)],1),i("Modal",{attrs:{title:this.vipInfo.id,"mask-closable":!1,width:"50%"},model:{value:t.dialogFormVisible9,callback:function(e){t.dialogFormVisible9=e},expression:"dialogFormVisible9"}},[t.vipInfo.expireDate?i("div",[t._v("过期时间："+t._s(t.Time2DefaultFormat(t.vipInfo.expireDate)))]):i("div",[t._v("该玩家不是VIP")]),i("div",[t._v("是否领过首次奖励："+t._s(t.vipInfo.firstDraw))]),i("div",[t._v("是否今日抽奖："+t._s(t.vipInfo.todayDraw))]),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog9()}}},[t._v("取 消")])],1)]),i("Modal",{attrs:{title:"股票管理","mask-closable":!1,width:"50%"},model:{value:t.dialogFormVisible4,callback:function(e){t.dialogFormVisible4=e},expression:"dialogFormVisible4"}},[i("h2",[t._v("股票管理")]),i("Table",{ref:"table",attrs:{columns:t.columnsWithStock,data:t.stocks}}),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog4()}}},[t._v("取 消")]),i("Button",{attrs:{type:"primary"},on:{click:function(e){return t.updateStock()}}},[t._v("确 定")])],1)],1),i("Modal",{attrs:{title:"员工上岗信息","mask-closable":!1,width:"675"},model:{value:t.dialogFormVisible5,callback:function(e){t.dialogFormVisible5=e},expression:"dialogFormVisible5"}},[t._l(t.posts,(function(e,o){return i("Row",{key:o},[i("h2",[t._v("店铺"+t._s(e.id))]),i("Table",{ref:"table",refInFor:!0,attrs:{columns:t.columnsWithPosts,data:e.positions}}),i("br")],1)})),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog5()}}},[t._v("取 消")])],1)],2),i("Modal",{attrs:{title:"所有员工信息","mask-closable":!1,width:"800"},model:{value:t.dialogFormVisible6,callback:function(e){t.dialogFormVisible6=e},expression:"dialogFormVisible6"}},[i("Table",{ref:"table",attrs:{columns:t.columnsWithAllStaff,data:t.allStaff}}),i("Row",{staticClass:"page",attrs:{type:"flex",justify:"end"}},[i("Page",{attrs:{current:t.staffCurrentpage,total:t.staffTotal,"page-size":t.staffPagesize,"page-size-opts":[10,20,50],size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.handleStaffCurrentChange,"on-page-size-change":t.handleStaffSizeChange}})],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog6()}}},[t._v("取 消")])],1)],1),i("Modal",{attrs:{title:"员工详情","mask-closable":!1,width:"675"},model:{value:t.dialogFormVisible7,callback:function(e){t.dialogFormVisible7=e},expression:"dialogFormVisible7"}},[i("h2",[t._v("玩家"+t._s(t.form.userId)+"的员工")]),i("div",[i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 员工ID")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.staffId))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 模板ID")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.xmlId)+"-"+t._s(t.currStaffTemplate.name))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 是否unique")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.unique))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 员工特长")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.advantages))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 员工特质")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.special))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 好感度")]),i("Col",{attrs:{span:"16"}},[t._v("阶段："+t._s(t.currStaff.favorStage)+"等级："+t._s(t.currStaff.favorLevel)+"经验："+t._s(t.currStaff.favorExp))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 解锁表情")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.unlockFaces))])],1),i("Row",[i("Col",{attrs:{span:"8"}},[t._v(" 解锁动作")]),i("Col",{attrs:{span:"16"}},[t._v(t._s(t.currStaff.unlockActions))])],1)],1),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog7()}}},[t._v("取 消")])],1)]),i("Modal",{attrs:{title:"店铺信息","mask-closable":!1,width:"1000"},model:{value:t.dialogFormVisible8,callback:function(e){t.dialogFormVisible8=e},expression:"dialogFormVisible8"}},[t._l(t.markets,(function(e,o){return i("Button",{key:o,staticStyle:{margin:"4px"},attrs:{disabled:t.isMarketShow(o)},on:{click:function(e){return t.showMarket(o)}}},[t._v("店铺"+t._s(o+1)+"\n        ")])})),t._l(t.markets,(function(e,o){return i("Row",{key:o},[i("Row",{directives:[{name:"show",rawName:"v-show",value:t.isMarketShow(o),expression:"isMarketShow(i)"}]},[i("h2",[t._v(t._s(e.name)+" -- 店铺等级："+t._s(e.exFrequency)+" -- 招牌等级："+t._s(e.signboardLevel)+" --\n                    店铺人气值："+t._s(e.popularity)+" -- 当前店铺"+t._s(o+1))]),i("br"),i("h3",[t._v("墙纸:"+t._s(e.wallPaper)+" -- "+t._s(t.decoShopFilter(e.wallPaper))+" --\n                    人气值："+t._s(t.decoShop2Popularity(e.wallPaper)))]),i("br"),i("h3",[t._v("货架和地面装饰")]),i("Table",{ref:"table",refInFor:!0,attrs:{columns:t.columnsWithShelves,data:e.shelves}}),i("h3",[t._v("墙上装饰")]),i("Table",{ref:"table",refInFor:!0,attrs:{columns:t.columnsWithWallDeco,data:e.wallDeco}}),i("h3",[t._v("地板")]),t.isOpenFloors?t._e():i("Button",{on:{click:function(e){return t.openFloors()}}},[t._v("查看地板")]),t.isOpenFloors?i("Button",{on:{click:function(e){return t.closeFloors()}}},[t._v("关闭地板")]):t._e(),i("Table",{directives:[{name:"show",rawName:"v-show",value:t.isOpenFloors,expression:"isOpenFloors"}],ref:"table",refInFor:!0,attrs:{columns:t.columnsWithFloors,data:t.floorsMap2Array(e.floors)}}),i("br")],1)],1)})),i("div",{staticClass:"dialog-footer",attrs:{slot:"footer"},slot:"footer"},[i("Button",{on:{click:function(e){return t.hideDialog8()}}},[t._v("取 消")])],1)],2),i("Row",{staticClass:"page",attrs:{type:"flex",justify:"end"}},[i("Page",{attrs:{current:t.currentpage,total:t.total,"page-size":t.pagesize,"page-size-opts":[10,20,50],size:"small","show-total":"","show-elevator":"","show-sizer":""},on:{"on-change":t.handleCurrentChange,"on-page-size-change":t.handleSizeChange}})],1)],1)},a=[],n=i("365c"),r=i("c276"),s=i("a30d"),l={name:"allUsers",components:{BreadcrumbNav:s["default"]},mounted:function(){this.getUsers(),this.getItemList()},data:function(){var t=this;return{columns:[{type:"index",width:60,align:"center"},{title:"id",key:"id",width:100,align:"center",render:function(t,e){return t("div",e.row.user.id)}},{title:"openid",key:"openid",width:100,align:"center",render:function(t,e){return t("div",e.row.user.openid)}},{title:"accessToken",key:"accessToken",width:200,align:"center"},{title:"昵称",key:"nickName",width:100,align:"center",render:function(t,e){return t("div",e.row.user.nickName)}},{title:"金币",key:"gold",width:100,align:"center",render:function(t,e){return t("div",e.row.user.gold)}},{title:"钻石",key:"diamond",width:100,align:"center",render:function(t,e){return t("div",e.row.user.diamond)}},{title:"等级",key:"level",width:100,align:"center",render:function(t,e){return t("div",e.row.user.level)}},{title:"头像",key:"avatar",width:100,align:"center",render:function(t,e){return t("Avatar",{props:{src:e.row.user.avatar}})}},{title:"创建时间",key:"createTime",width:100,align:"center",render:function(t,e){return t("div",r["a"].Time2DefaultFormat(e.row.user.createTime))}},{title:"修改数据",key:"action",width:100,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog(i.row.user.id)}}},"修改数据")])}},{title:"vip",key:"action",width:100,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog9(i.row.user.id,i.row.vip)}}},"vip信息")])}},{title:"股票管理",key:"action",width:100,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog4(i.row.user.id)}}},"股票管理")])}},{title:"查看背包",key:"action",width:100,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog2(i.row.user.id)}}},"查看背包")])}},{title:"员工",key:"action",width:200,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog5(i.row.user.id)}}},"上岗员工"),e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog6(i.row.user.id)}}},"所有员工")])}},{title:"店铺信息",key:"action",width:100,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog8(i.row.user.id)}}},"查看店铺")])}}],columnsWithBag:[{type:"index",width:60,align:"center"},{title:"xmlId",key:"xmlId",width:100,align:"center"},{title:"数量",key:"num",width:100,align:"center"},{title:"名字",key:"name",width:180,align:"center"}],columnsWithStock:[{type:"index",width:60,align:"center"},{title:"角色ID",key:"stockId",width:100,align:"center"},{title:"数量",key:"num",width:100,align:"center"}],columnsWithPosts:[{title:"岗位",key:"positionId",width:100,align:"center",render:function(t,e){var i="";switch(e.row.positionId){case 0:i="收银员";break;case 1:i="售货员";break;case 2:i="招揽员";break;case 3:i="理货员";break;default:i="未知"}return t("div",i)}},{title:"是否有新岗位",key:"hasNewPos",width:120,align:"center"},{title:"岗位总分",key:"sumScore",width:120,align:"center"},{title:"岗位员工ID(点击员工查看员工详情)",key:"staffIds",width:300,align:"center",render:function(e,i){var o=[];return i.row.staffIds.forEach((function(i){i>0&&o.push(e("Button",{props:{size:"small"},style:{marginRight:"5px"},on:{click:function(){t.openDialog7(i)}}},i))})),e("div",o)}}],columnsWithAllStaff:[{type:"index",width:60,align:"center"},{title:"xmlId",key:"xmlId",width:100,align:"center"},{title:"staffId",key:"staffId",width:60,align:"center"},{title:"isNew",key:"isNew",width:80,align:"center"},{title:"等级",key:"level",width:60,align:"center"},{title:"unique",key:"unique",width:60,align:"center"},{title:"灵巧",key:"patience",width:60,align:"center"},{title:"智慧",key:"intelligence",width:60,align:"center"},{title:"亲和",key:"glamour",width:60,align:"center"},{title:"体力",key:"power",width:60,align:"center"},{title:"操作",key:"action",width:100,align:"center",render:function(e,i){return e("div",[e("Button",{props:{type:"primary",size:"small"},on:{click:function(){t.openDialog7(i.row.staffId)}}},"员工详情")])}}],columnsWithShelves:[{type:"index",width:60,align:"center"},{title:"id",key:"id",width:100,align:"center"},{title:"x坐标",key:"x",width:80,align:"center"},{title:"y坐标",key:"y",width:80,align:"center"},{title:"xmlId",key:"xmlId",width:100,align:"center"},{title:"名称",width:120,align:"center",render:function(e,i){return e("div",t.decoShopFilter(i.row.xmlId))}},{title:"人气值",width:80,align:"center",render:function(e,i){return e("div",t.decoShop2Popularity(i.row.xmlId))}},{title:"旋转",key:"reversal",width:80,align:"center"},{title:"金币收益",key:"goldIncome",width:100,align:"center"},{title:"开始时间",key:"startTime",width:100,align:"center",render:function(t,e){return t("div",e.row.startTime?r["a"].Time2DefaultFormat(e.row.startTime):"")}},{title:"sumExp",key:"sumExp",width:100,align:"center"},{title:"售卖货物",key:"warehouseProductStr",width:60,align:"center"}],columnsWithWallDeco:[{type:"index",width:60,align:"center"},{title:"id",key:"id",width:100,align:"center"},{title:"x坐标",key:"x",width:80,align:"center"},{title:"y坐标",key:"y",width:80,align:"center"},{title:"xmlId",key:"xmlId",width:100,align:"center"},{title:"名称",width:120,align:"center",render:function(e,i){return e("div",t.decoShopFilter(i.row.xmlId))}},{title:"人气值",width:80,align:"center",render:function(e,i){return e("div",t.decoShop2Popularity(i.row.xmlId))}},{title:"旋转",key:"reversal",width:100,align:"center"}],isOpenFloors:!1,columnsWithFloors:[{type:"index",width:60,align:"center"},{title:"id",key:"id",width:100,align:"center"},{title:"x坐标",width:80,align:"center",render:function(t,e){return t("div",Math.floor(e.row.id/1e3))}},{title:"y坐标",width:80,align:"center",render:function(t,e){return t("div",e.row.id%1e3)}},{title:"xmlId",key:"xmlId",width:100,align:"center"},{title:"名称",width:120,align:"center",render:function(e,i){return e("div",t.decoShopFilter(i.row.xmlId))}},{title:"人气值",width:80,align:"center",render:function(e,i){return e("div",t.decoShop2Popularity(i.row.xmlId))}}],posts:[],allStaff:[],users:[],vipInfo:{},markets:[],currMarket:0,loading:!0,updateUserLoading:!1,pagesize:10,currentpage:1,total:0,staffPagesize:10,staffCurrentpage:1,staffTotal:0,form:{userId:"",diamond:"",gold:"",level:"",exp:"",extendLevel:"",items:"",rechargeNum:"",pid:"",deltaNum:""},dialogFormVisible:!1,dialogFormVisible2:!1,dialogFormVisible3:!1,dialogFormVisible4:!1,dialogFormVisible5:!1,dialogFormVisible6:!1,dialogFormVisible7:!1,dialogFormVisible8:!1,dialogFormVisible9:!1,formLabelWidth:"120px",currStaff:{},currStaffTemplate:{},bagItems:[],bagGoods:[],stocks:[],search:{content:"",select:"1"},itemData:{itemList:{},decoShopList:{},staffList:{},goodList:{}}}},methods:{getUsers:function(){var t=this;Object(n["fb"])({per_page:this.pagesize,cur_page:this.currentpage}).then((function(e){200===e.status&&(console.log(e.data.users),t.users=e.data.users,t.total=e.data.total,t.loading=!1)}))},handleSizeChange:function(t){this.pagesize=t,this.getUsers()},handleCurrentChange:function(t){this.currentpage=t,this.getUsers()},handleStaffSizeChange:function(t){this.staffPagesize=t,this.getAllStaffInfo()},handleStaffCurrentChange:function(t){this.staffCurrentpage=t,this.getAllStaffInfo()},openDialog:function(t){this.form={userId:t,diamond:"",gold:"",level:"",exp:"",items:"",extendLevel:""},this.dialogFormVisible=!0},hideDialog:function(){this.updateUserLoading=!1,this.dialogFormVisible=!1},openDialog2:function(t){var e=this;this.bagItems=[],this.bagGoods=[],Object(n["gb"])({userId:t}).then((function(t){200===t.status&&(e.bagItems=t.data.bagItems,e.bagGoods=t.data.bagGoods)})),this.dialogFormVisible2=!0},hideDialog2:function(){this.dialogFormVisible2=!1},updateUser:function(){var t=this;if(this.updateUserLoading)return this.$Message.error("点击过快"),void(this.updateUserLoading=!1);this.updateUserLoading=!0,Object(n["tc"])(this.form).then((function(e){200===e.status?t.$Message.success("修改成功"):t.$Message.error(e.data),t.hideDialog(),t.getUsers()}))},skipNewGuide:function(){var t=this;Object(n["nc"])({userId:this.form.userId}).then((function(e){200===e.status&&t.$Message.success("修改成功"),t.hideDialog()}))},searchUser:function(){var t=this;Object(n["ic"])({type:this.search.select,content:this.search.content}).then((function(e){200===e.status&&(t.users=e.data.users,t.total=e.data.total,t.loading=!1)}))},openDialog3:function(t){this.form={userId:t,diamond:"",gold:"",level:"",exp:"",items:"",rechargeNum:""},this.dialogFormVisible3=!0},hideDialog3:function(){this.dialogFormVisible3=!1},recharge:function(){var t=this;Object(n["ec"])({userId:this.form.userId,num:this.form.rechargeNum}).then((function(e){200===e.status&&t.$Message.success("充值成功")})),this.dialogFormVisible3=!1},openDialog4:function(t){var e=this;this.form={userId:t,pid:"",deltaNum:""},Object(n["Zb"])({userId:t}).then((function(t){200===t.status?(e.stocks=t.data.stocks,e.dialogFormVisible4=!0):e.$Message.error("没找到玩家")})),this.dialogFormVisible4=!0},hideDialog4:function(){this.dialogFormVisible4=!1},updateStock:function(){var t=this;Object(n["rc"])(this.form).then((function(e){200===e.status&&(t.stocks=e.data.stocks,t.$Message.info("修改成功"))}))},openDialog5:function(t){var e=this;this.form.userId=t,Object(n["Ab"])({userId:t}).then((function(t){200===t.status&&(e.posts=t.data.posts)})),this.dialogFormVisible5=!0},hideDialog5:function(){this.dialogFormVisible5=!1},openDialog6:function(t){this.form.userId=t,this.getAllStaffInfo(),this.dialogFormVisible6=!0},getAllStaffInfo:function(){var t=this;Object(n["db"])({userId:this.form.userId,per_page:this.staffPagesize,cur_page:this.staffCurrentpage}).then((function(e){200===e.status&&(t.allStaff=e.data.allStaff,t.staffTotal=e.data.total)}))},hideDialog6:function(){this.dialogFormVisible6=!1},openDialog7:function(t){this.getStaffInfo(t),this.dialogFormVisible7=!0},hideDialog7:function(){this.dialogFormVisible7=!1},getStaffInfo:function(t){var e=this;Object(n["zb"])({userId:this.form.userId,staffId:t}).then((function(t){200===t.status&&(e.currStaff=t.data.staff,e.currStaffTemplate={},e.itemData.staffList.forEach((function(t){t.id==e.currStaff.xmlId&&(e.currStaffTemplate=t)})))}))},oneKeyAdd:function(t){var e=[],i=[19,20,21,22,23,30];switch(t){case 1:e=this.itemData.itemList.filter((function(t){return t.stacking&&t.stacking>999})).filter((function(t){return i.findIndex((function(e){return e===t.type}))<0})).map((function(t){return"".concat(t.id,",100")}));break;case 2:e=this.itemData.decoShopList.filter((function(t){return t.stacking&&t.stacking>999})).map((function(t){return"".concat(t.id,",100")}));break;case 3:e=this.itemData.staffList.map((function(t){return"".concat(t.id,",1")}));break;case 4:e=this.itemData.goodList.map((function(t){return"".concat(t.id,",100")}))}this.form.items=e.join(";"),this.updateUser()},getItemList:function(){var t=this;Object(n["nb"])().then((function(e){200===e.status&&(t.itemData.decoShopList=e.data.decoShopList,t.itemData.itemList=e.data.itemList,t.itemData.staffList=e.data.staffList,t.itemData.goodList=e.data.goodList)}))},openVip:function(t){var e=this;Object(n["Ib"])({userId:t,day:30}).then((function(t){200!==t.status&&"hh"!=t||e.$Message.info("修改成功")}))},openDialog8:function(t){this.form.userId=t,this.getMarkets(),this.dialogFormVisible8=!0},hideDialog8:function(){this.dialogFormVisible8=!1},openFloors:function(){this.isOpenFloors=!0},closeFloors:function(){this.isOpenFloors=!1},openDialog9:function(t,e){this.vipInfo={},this.vipInfo=e,this.vipInfo.id=t+"",this.dialogFormVisible9=!0},hideDialog9:function(){this.dialogFormVisible9=!1},getMarkets:function(){var t=this;Object(n["rb"])({userId:this.form.userId}).then((function(e){200===e.status&&(t.markets=e.data.markets)}))},showMarket:function(t){this.isOpenFloors=!1,this.currMarket=t},isMarketShow:function(t){return this.currMarket===t},decoShopFilter:function(t){var e="没找到";return this.itemData.decoShopList.forEach((function(i){i.id==t&&(e=i.name)})),e},decoShop2Popularity:function(t){var e="0";return this.itemData.decoShopList.forEach((function(i){i.id==t&&(e=i.popularity)})),e},floorsMap2Array:function(t){var e=[];for(var i in t)e.push({id:i,xmlId:t[i]});return e},Time2DefaultFormat:function(t){return r["a"].Time2DefaultFormat(t)}}},c=l,d=i("2877"),u=Object(d["a"])(c,o,a,!1,null,"54065b9c",null);e["default"]=u.exports}}]);