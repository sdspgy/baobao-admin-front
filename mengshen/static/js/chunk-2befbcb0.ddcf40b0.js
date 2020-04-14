(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-2befbcb0","chunk-8d965cd6"],{"0729":function(t,e,a){},"16a8":function(t,e,a){"use strict";var i=a("7e18"),n=a.n(i);n.a},"3ac2":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"titleHead"},[t._v(t._s(t.inputName))])},n=[],s={name:"TitleHead",props:{inputName:String,required:!0},components:{},data:function(){return{}},mounted:function(){},methods:{}},r=s,l=(a("16a8"),a("2877")),o=Object(l["a"])(r,i,n,!1,null,"111682f2",null);e["default"]=o.exports},"53a9":function(t,e,a){"use strict";a.r(e);var i=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticStyle:{"background-color":"#fff"}},[a("div",{attrs:{slot:"content"},slot:"content"},[a("div",{directives:[{name:"show",rawName:"v-show",value:t.isShow,expression:"isShow"}]},[a("RadioGroup",{attrs:{type:"button"},on:{"on-change":function(e){return t.init()}},model:{value:t.isDevice,callback:function(e){t.isDevice=e},expression:"isDevice"}},[a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"用户"}}),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"设备"}})],1)],1),a("div",[a("RadioGroup",{attrs:{type:"button"},on:{"on-change":function(e){return t.init()}},model:{value:t.phone,callback:function(e){t.phone=e},expression:"phone"}},[a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"ALL"}},[a("span",[t._v("ALL")])]),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"ANDROID"}},[a("span",[t._v("ANDROID")])]),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"IOS"}},[a("span",[t._v("IOS")])])],1)],1),a("div",[a("RadioGroup",{attrs:{type:"button"},on:{"on-change":function(e){return t.init()}},model:{value:t.data,callback:function(e){t.data=e},expression:"data"}},[t._v(">\n                "),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"今天",border:""}}),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"昨天"}}),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"7日"}}),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"30日"}})],1)],1)]),a("div",[a("Row",{staticStyle:{"margin-bottom":"20px","padding-bottom":"10px","border-bottom":"2px solid #EEE8CD"},attrs:{type:"flex",justify:"space-between"}},[a("Col",{staticStyle:{height:"200px","background-color":"#fff","border-radius":"10px 10px 10px 10px",border:"1px solid #ebebeb"},attrs:{xs:0,sm:10,md:10,lg:5}},[a("vTitleHead",{staticStyle:{"font-size":"16px","font-weight":"500"},attrs:{inputName:t.dau}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.nodata,expression:"nodata"}],staticStyle:{height:"130px","line-height":"30px","list-style-type":"none","margin-left":"40px","margin-top":"10px","font-size":"14px","font-family":"Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif"}},[a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("人    数：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[0].value))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("iOS：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[0].payARPU))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("Android：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(" "+t._s(t.realtimeStatis[0].payRate))])])])],1),a("Col",{staticStyle:{height:"200px","background-color":"#fff","border-radius":"10px 10px 10px 10px",border:"1px solid #ebebeb"},attrs:{xs:0,sm:10,md:10,lg:5}},[a("vTitleHead",{staticStyle:{"font-size":"16px","font-weight":"500"},attrs:{inputName:t.install}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.nodata,expression:"nodata"}],staticStyle:{height:"130px","line-height":"30px","list-style-type":"none","margin-left":"40px","margin-top":"10px","font-size":"14px"}},[a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("人    数：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[1].value))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("iOS：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[1].payRate))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("Android：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[1].payARPU))])])])],1),a("Col",{staticStyle:{height:"200px","background-color":"#fff","border-radius":"10px 10px 10px 10px",border:"1px solid #ebebeb"},attrs:{xs:0,sm:10,md:10,lg:5}},[a("vTitleHead",{staticStyle:{"font-size":"16px","font-weight":"500"},attrs:{inputName:t.pay}}),a("div",{directives:[{name:"show",rawName:"v-show",value:t.nodata,expression:"nodata"}],staticStyle:{height:"130px","line-height":"25px","list-style-type":"none","margin-left":"40px","margin-top":"10px","font-size":"14px"}},[a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("总    额：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[2].value))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("付 费 率：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[2].payRate))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("ARPU：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[2].payARPU))])]),a("li",{staticStyle:{display:"inline-flex"}},[a("p",{staticStyle:{width:"100px","text-align":"right"}},[t._v("ARPPU：")]),a("p",{staticStyle:{width:"100px","text-align":"left"}},[t._v(t._s(t.realtimeStatis[2].payARPPU))])])])],1),a("Col",{staticStyle:{height:"200px","background-color":"#fff","border-radius":"10px 10px 10px 10px",border:"1px solid #ebebeb"},attrs:{xs:0,sm:10,md:10,lg:5}},[a("vTitleHead",{staticStyle:{"font-size":"16px","font-weight":"500"},attrs:{inputName:t.retention}}),a("div",{staticStyle:{height:"130px","line-height":"30px","list-style-type":"none","margin-left":"40px","margin-top":"10px","font-size":"14px"}},[a("li",[t._v("                           1日      2日      3日")]),a("li",[t._v(t._s(t.retentionDataList[0].ds)+":  "),a("span",{class:parseFloat(t.retentionDataList[0].oneRetentionPercentage)>30?"isRed":""},[t._v(t._s(t.retentionDataList[0].oneRetentionPercentage))])]),a("li",[t._v(t._s(t.retentionDataList[1].ds)+":  "),a("span",{class:parseFloat(t.retentionDataList[1].oneRetentionPercentage)>30?"isRed":""},[t._v(t._s(t.retentionDataList[1].oneRetentionPercentage))]),t._v("\n                         \n                         "),a("span",{class:parseFloat(t.retentionDataList[1].twoRetentionPercentage)>30?"isRed":""},[t._v(t._s(t.retentionDataList[1].twoRetentionPercentage))])]),a("li",[t._v(t._s(t.retentionDataList[2].ds)+":  "),a("span",{class:parseFloat(t.retentionDataList[2].oneRetentionPercentage)>30?"isRed":""},[t._v(t._s(t.retentionDataList[2].oneRetentionPercentage))]),t._v(" \n                        "),a("span",{class:parseFloat(t.retentionDataList[2].twoRetentionPercentage)>30?"isRed":""},[t._v(t._s(t.retentionDataList[2].twoRetentionPercentage)+"\n                    ")]),t._v(" "),a("span",{class:parseFloat(t.retentionDataList[2].threeRetentionPercentage)>30?"isRed":""},[t._v(t._s(t.retentionDataList[2].threeRetentionPercentage))])])])],1)],1)],1),a("div",{staticClass:"reportChartLeft",staticStyle:{width:"45%",height:"300px"}},[a("div",{staticStyle:{position:"absolute",top:"0px",left:"5%","z-index":"999"}},[a("RadioGroup",{attrs:{type:"button"},on:{"on-change":function(e){return t.init()}},model:{value:t.dauOrInstall,callback:function(e){t.dauOrInstall=e},expression:"dauOrInstall"}},[a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"活跃"}}),a("Radio",{staticStyle:{margin:"10px 10px"},attrs:{label:"新增"}})],1)],1),a("vTitleHead",{attrs:{inputName:t.names}}),a("div",{staticStyle:{"background-color":"#fff","border-radius":"0 0 10px 10px"},attrs:{id:"surveyOneLine"}})],1),a("div",{staticClass:"chartBord"},[a("vTitleHead",{attrs:{inputName:t.systemName}})],1),t._m(0),a("div",{staticStyle:{"margin-top":"15px"}},[a("vTitleHead",{attrs:{inputName:t.name}}),a("Row",[a("Table",{ref:"table",attrs:{height:"405","disabled-hover":!1,"highlight-row":"",border:"",columns:t.columns,data:t.listData}})],1)],1),a("div",{staticClass:"menyLine"},[a("vTitleHead",{attrs:{inputName:t.payChart}}),a("div",{staticStyle:{"background-color":"#fff","border-radius":"0 0 10px 10px"},attrs:{id:"surveyManyLine"}})],1),a("div",{staticClass:"bottomTable"},[a("vTitleHead",{attrs:{inputName:t.retenTable}}),a("Row",[a("Table",{ref:"table",attrs:{height:"440","highlight-row":"",border:"",columns:t.retentionTable,data:t.retentionDataList}})],1)],1)])},n=[function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"roundChart"},[a("div",{attrs:{id:"davChart"}}),a("div",{staticStyle:{width:"50px",color:"#40a9ff",position:"absolute",left:"100px",top:"5px"}},[t._v("活跃")]),a("div",{staticStyle:{width:"50px",color:"#40a9ff",position:"absolute",left:"500px",top:"5px"}},[t._v("新增")]),a("div",{staticStyle:{"margin-left":"-100px"},attrs:{id:"installChart"}})])}],s=a("365c"),r=a("3ac2");function l(t,e,a){return e in t?Object.defineProperty(t,e,{value:a,enumerable:!0,configurable:!0,writable:!0}):t[e]=a,t}var o={"今天":0,"昨天":1,"7日":7,"30日":30},c={ALL:0,ANDROID:1,IOS:2},d={name:"reportData",components:{vTitleHead:r["default"]},data:function(){var t;return t={nodata:!0,tableTrue:!0,value1:"1",isShowCondition:!1,name:"概况数据",systemName:"操作系统百分比(活跃/新增)",dau:"活跃",install:"新增",pay:"付费(元)",retention:"留存(%)",payChart:"付费数据",retenTable:"留存数据(%)",isShow:!0,isDevice:"用户",phone:"ALL",data:"7日",dauOrInstall:"活跃",listData:[],payList:[],retentionDataList:[],datas:[],isccc:99,realtimeStatis:[{value:"",payRate:"",payARPU:"",payARPPU:""},{value:"",payRate:"",payARPU:"",payARPPU:""},{value:"",payRate:"",payARPU:"",payARPPU:""}]},l(t,"retentionDataList",[{ds:"",oneRetentionPercentage:""},{ds:"",oneRetentionPercentage:"",twoRetentionPercentage:""},{ds:"",oneRetentionPercentage:"",twoRetentionPercentage:"",threeRetentionPercentage:""}]),l(t,"handelPayCount",[]),l(t,"finalTable",[]),l(t,"columnsHeadrReal",[{title:"日期（星期）",key:"ds",width:120,fixed:"left"},{title:"～时",key:"dayOfHour",align:"center",width:80,fixed:"left"}]),l(t,"columnsHeadr",[{title:"日期（星期）",key:"ds",width:120,align:"center",fixed:"left"}]),l(t,"columnsOver",[{title:"注册数",key:"installNum",align:"center",width:80},{title:"活跃数",key:"dauNum",align:"center",width:80},{title:"付费人数",key:"payCount",align:"center",width:100},{title:"付费总额",key:"payAmount",align:"center",width:100},{title:"付费率（%）",key:"payRate",align:"center",width:120},{title:"ARPU",key:"ARPU",align:"center",width:80},{title:"ARPPU",key:"ARPPU",align:"center",width:80},{title:"注册付费率（%）",key:"payInstallRate",align:"center",width:140},{title:"注册付费人数",key:"payInstallCount",align:"center",width:120},{title:"注册付费总额",key:"payInstallAmount",align:"center",width:120},{title:"注册付费ARPU",key:"payInstallARPU",align:"center",width:150},{title:"注册付费ARPPU",key:"payInstallARPPU",align:"center",width:150},{title:"付费次数",key:"payTimes",align:"center",width:120},{title:"注册付费次数",key:"payInstallTimes",align:"center",width:120}]),l(t,"columns",[]),l(t,"retentionTable",[{title:"日期（星期）",key:"ds",align:"center",width:120,fixed:"left"},{title:"安装数",key:"installNum",align:"center",width:80,fixed:"left"},{title:"1日",key:"oneRetentionPercentage",align:"center",width:80},{title:"2日",key:"twoRetentionPercentage",align:"center",width:80},{title:"3日",key:"threeRetentionPercentage",align:"center",width:80},{title:"4日",key:"fourRetentionPercentage",align:"center",width:80},{title:"5日",key:"fiveRetentionPercentage",align:"center",width:80},{title:"6日",key:"sixRetentionPercentage",align:"center",width:80},{title:"7日",key:"sevenRetentionPercentage",align:"center",width:80},{title:"8日",key:"eightRetentionPercentage",align:"center",width:80},{title:"9日",key:"nineRetentionPercentage",align:"center",width:80},{title:"10日",key:"tenRetentionPercentage",align:"center",width:80},{title:"11日",key:"elevenRetentionPercentage",align:"center",width:80},{title:"12日",key:"twelveRetentionPercentage",align:"center",width:80},{title:"13日",key:"thirteenRetentionPercentage",align:"center",width:80},{title:"14日",key:"fourteenRetentionPercentage",align:"center",width:80},{title:"15日",key:"fifteenRetentionPercentage",align:"center",width:80},{title:"16日",key:"sixteenRetentionPercentage",align:"center",width:80},{title:"17日",key:"seventeenRetentionPercentage",align:"center",width:80},{title:"18日",key:"eighteenRetentionPercentage",align:"center",width:80},{title:"19日",key:"nineteenRetentionPercentage",align:"center",width:80},{title:"20日",key:"twentyteenRetentionPercentage",align:"center",width:80},{title:"21日",key:"twentyOneteenRetentionPercentage",align:"center",width:80},{title:"22日",key:"twentyTwoRetentionPercentage",align:"center",width:80},{title:"23日",key:"twentyThreeRetentionPercentage",align:"center",width:80},{title:"24日",key:"twentyFourRetentionPercentage",align:"center",width:80},{title:"25日",key:"twentyFiveRetentionPercentage",align:"center",width:80},{title:"26日",key:"twentySixRetentionPercentage",align:"center",width:80},{title:"27日",key:"twentySevenRetentionPercentage",align:"center",width:80},{title:"28日",key:"twentyEightRetentionPercentage",align:"center",width:80},{title:"29日",key:"twentyNineRetentionPercentage",align:"center",width:80},{title:"30日",key:"thirtyRetentionPercentage",align:"center",width:80}]),l(t,"surveyOneLine",{}),l(t,"surveyManyLine",{}),l(t,"davChart",{}),l(t,"chartData",[]),l(t,"map_pieChartD",{}),l(t,"map_pieChartI",{}),t},methods:{enter:function(){this.isShowCondition=!0},leave:function(){this.isShowCondition=!1},init:function(){"7日"==this.data?(this.dau="周活跃",this.install="周新增",this.pay="周付费(元)"):"30日"==this.data?(this.dau="月活跃",this.install="月新增",this.pay="月付费(元)"):(this.dau="活跃",this.install="新增",this.pay="付费(元)"),0==this.getStore("parentId")?this.isShow=!0:this.isShow=!1,this.initTable(),this.queryDaily()},surveyManyLineChart:function(){this.surveyManyLine=new G2.Chart({container:"surveyManyLine",forceFit:!0,height:295}),this.surveyManyLine.source(this.handelPayCount,{}),this.surveyManyLine.scale("value",{min:0,alias:"人数"}),this.surveyManyLine.scale("time",{tickCount:10}),this.surveyManyLine.tooltip({crosshairs:{type:"line"}}),this.surveyManyLine.axis("time",{label:{rotate:-Math.PI/2.5,textAlign:"end",textBaseline:"middle"}}),this.surveyManyLine.axis("time",{label:{formatter:function(t){return t}}}),this.surveyManyLine.legend({position:"bottom",align:"center",itemWidth:null}),this.surveyManyLine.line().position("time*value").color("type").shape("smooth"),this.surveyManyLine.point().position("time*value").color("type").size(4).shape("circle").style({stroke:"#fff",lineWidth:1}),this.surveyManyLine.render()},surveyOneLineChart:function(){this.surveyOneLine=new G2.Chart({container:"surveyOneLine",forceFit:!0,height:295}),this.surveyOneLine.source(this.datas,{}),this.surveyOneLine.scale("value",{min:0,alias:"人数"}),this.surveyOneLine.scale("time",{tickCount:10}),this.surveyOneLine.tooltip({crosshairs:{type:"line"}}),this.surveyOneLine.axis("time",{label:{rotate:-Math.PI/2.5,textAlign:"end",textBaseline:"middle"}}),this.surveyOneLine.point().position("time*value").size(4).shape("circle").style({stroke:"#fff",lineWidth:1}).color("l(0) 0:#1E90FF 0.5:#1E90FF 1:#1E90FF"),this.surveyOneLine.area().position("time*value").shape("smooth"),this.surveyOneLine.render()},roundChart:function(){var t=this;this.davChart=new G2.Chart({container:"davChart",height:250}),this.davChart.source(this.chartData,{}),this.davChart.coord("theta",{radius:.75}),this.davChart.tooltip({showTitle:!1}),this.davChart.intervalStack().position("dauNum").color("os").label("dauNum",{formatter:function(e,a){return t.map_pieChartD[a.point.os]+("unknown"==a.point.os?"":"|"+a.point.os)}}).tooltip("os*dauNum",(function(t,e){return{name:t,value:e}})).style({lineWidth:1,stroke:"#fff"}),this.davChart.render(),this.installChart=new G2.Chart({container:"installChart",height:250}),this.installChart.source(this.chartData,{}),this.installChart.coord("theta",{radius:.75}),this.installChart.tooltip({showTitle:!1}),this.installChart.intervalStack().position("installNum").color("os").label("installNum",{formatter:function(e,a){return t.map_pieChartI[a.point.os]+("unknown"==a.point.os?"":"|"+a.point.os)}}).tooltip("os*installNum",(function(t,e){return{name:t,value:e}})).style({lineWidth:1,stroke:"#fff"}),this.installChart.render()},initTable:function(){1==o[this.data]||0==o[this.data]?this.columns=this.columnsHeadrReal.concat(this.columnsOver):this.columns=this.columnsHeadr.concat(this.columnsOver);var t=[],e=new Object;e.type="selection",e.width=60,e.align="center",e.fixed="left";var a=new Object;a.type="index",a.width=60,a.align="center",a.fixed="left";var i=new Object;i.title="日期（星期）",i.key="ds",i.width=150,i.fixed="left",t.push(e),t.push(a),t.push(i)},queryDaily:function(){var t=this,e={gameid:parseInt(this.getStore("gameid")),deviceType:parseInt("用户"===this.isDevice?0:1),osType:c[this.phone],data:parseInt(o[this.data]),hxType:parseInt("活跃"===this.dauOrInstall?0:1)};Object(s["Pb"])(e).then((function(e){if(e.success){var a=[];e.androidIosProportions.length>0?(a=t.androidIosProportions(e.androidIosProportions),t.nodata=!0):t.nodata=!1,t.listData=t.tableDataProcess(e.shareDailyResultTypes,a),t.payList=e.payList,t.retentionDataList=t.saturday(e.shareRetentionList),t.datas=t.f2DI(e.dauNumOrInstallNumList,o[t.data].toString(),t.listData,parseInt("活跃"===t.dauOrInstall?0:1)),t.handelPayCount=t.makeCavas(t.listData,o[t.data]),t.chartData=t.makePieChart(e.androidIosProportions),t.surveyOneLine.changeData(t.datas),t.surveyManyLine.changeData(t.handelPayCount),t.davChart.changeData(t.chartData),t.installChart.changeData(t.chartData),"7日"==t.data&&(t.realtimeStatis[0].value=e.weekStats.wdu,t.realtimeStatis[1].value=e.weekStats.wnu),"30日"==t.data&&(t.realtimeStatis[0].value=e.monthStats.mdu,t.realtimeStatis[1].value=e.monthStats.mnu)}}))},makePieChart:function(t){var e=0,a=0;t.forEach((function(t){e+=t.dauNum,a+=t.installNum}));var i={},n={};return t.map((function(t){i[t.os]=(t.dauNum/e*100).toFixed(2)+"%",n[t.os]=(t.installNum/a*100).toFixed(2)+"%"})),this.map_pieChartD=i,this.map_pieChartI=n,t},androidIosProportions:function(t){if(t){var e=0,a=0,i=0,n=0,s=0,r=0,l=[];return t.forEach((function(t){e+=t.dauNum,a+=t.installNum,"android"==t.os&&(i+=t.dauNum,n+=t.installNum),"iOS"==t.os&&(s+=t.dauNum,r+=t.installNum)})),l.push((i/e*100).toFixed(2)+"%"),l.push((s/e*100).toFixed(2)+"%"),l.push((n/a*100).toFixed(2)+"%"),l.push((r/a*100).toFixed(2)+"%"),l}},tableDataProcess:function(t,e){var a=this;if(t.length>0){var i=0,n=0,s=0,r=0;if(t.forEach((function(t){i+=t.dauNum,n+=t.installNum,s+=t.payAmount,r+=t.payCount,t.ds=a.weekFunction(t.ds),t.payAmount=t.payAmount/a.getStore("currencyRate"),t.payRate=0==t.dauNum?0:(100*t.payCount/t.dauNum).toFixed(2),t.ARPU=0==t.dauNum?0:(t.payAmount/t.dauNum).toFixed(2),t.ARPPU=0==t.payCount?0:(t.payAmount/t.payCount).toFixed(2),t.payInstallAmount=t.payInstallAmount/a.getStore("currencyRate"),t.payInstallRate=0==t.installNum?0:(100*t.payInstallCount/t.installNum).toFixed(2),t.payInstallARPU=0==t.installNum?0:(t.payInstallAmount/t.installNum).toFixed(2),t.payInstallARPPU=0==t.payInstallCount?0:(t.payInstallAmount/t.payInstallCount).toFixed(2)})),e.length>0){var l=[],o=new Object;o.title="活跃",o.value=i,o.payRate=e[0],o.payARPU=e[1];var c=new Object;c.title="新增",c.payRate=e[2],c.payARPU=e[3],c.value=n;var d=new Object;d.title="付费",d.value=s/this.getStore("currencyRate"),d.payRate=0==i?0:(100*r/i).toFixed(2)+"%",d.payARPU=0==i?0:(s/this.getStore("currencyRate")/i).toFixed(2),d.payARPPU=0==r?0:(s/this.getStore("currencyRate")/r).toFixed(2),l.push(o),l.push(c),l.push(d),this.realtimeStatis=l}else{var p=[],u=new Object;u.title="活跃",u.value="",u.payRate="",u.payARPU="";var h=new Object;h.title="新增",h.payRate="",h.payARPU="",h.value="";var y=new Object;y.title="付费",y.value="",y.payRate="",y.payARPU="",y.payARPPU="",p.push(u),p.push(h),p.push(y),this.realtimeStatis=p}}else{var g=[],v=new Object;v.title="活跃",v.value="",v.payRate="",v.payARPU="";var m=new Object;m.title="新增",m.payRate="",m.payARPU="",m.value="";var f=new Object;f.title="付费",f.value="",f.payRate="",f.payARPU="",f.payARPPU="",realtimeArray.push(v),realtimeArray.push(m),realtimeArray.push(f),this.realtimeStatis=g}return t},saturday:function(t){if(t)return t.forEach((function(t,e){var a=new Date(t.ds),i=a.getDay(),n=7-i,s=[];switch(n){case 7:s=["oneRetentionPercentage","eightRetentionPercentage","fifteenRetentionPercentage"],t.ds=t.ds+"(七)";break;case 1:s=["sevenRetentionPercentage","fourteenRetentionPercentage"],t.ds=t.ds+"(六)";break;case 2:s=["sixRetentionPercentage","thirteenRetentionPercentage"],t.ds=t.ds+"(五)";break;case 3:s=["fiveRetentionPercentage","twelveRetentionPercentage"],t.ds=t.ds+"(四)";break;case 4:s=["fourRetentionPercentage","elevenRetentionPercentage"],t.ds=t.ds+"(三)";break;case 5:s=["threeRetentionPercentage","tenRetentionPercentage"],t.ds=t.ds+"(二)";break;case 6:s=["twoRetentionPercentage","nineRetentionPercentage"],t.ds=t.ds+"(一)";break;default:}t.special=s,t.oneSpecial=s[0],t.twoSpecial=s[1]})),t},f2DI:function(t,e,a,i){var n=this,s=[];return 0==e||1==e?a.forEach((function(t){var e=new Object;e.value=0==i?t.dauNum:t.installNum,e.time=t.dayOfHour+"时",s.push(e)})):t.forEach((function(t,e){var a=new Object;a.time=n.getTime(e),a.value=t,s.push(a)})),"7"!=e&&"30"!=e&&"0"!=e||s.reverse(),s},getTime:function(t){var e=new Date;e.setTime(e.getTime()-864e5*(t+1));var a=e.getMonth()+1+"-"+e.getDate();return a},weekFunction:function(t){var e=new Date(t),a=e.getDay(),i=7-a;switch(i){case 7:t+="(七)";break;case 1:t+="(六)";break;case 2:t+="(五)";break;case 3:t+="(四)";break;case 4:t+="(三)";break;case 5:t+="(二)";break;case 6:t+="(一)";break;default:}return t},makeCavas:function(t,e){if(t){0==e&&t.sort((function(t,e){return e.dayOfHour-t.dayOfHour}));var a=[];return t.forEach((function(t,i){var n=new Object;n.time=7!=e&&30!=e?t.dayOfHour+"时":t.ds.substr(5,5),n.value=t.payCount,n.type="付费人数",a.push(n);var s=new Object;s.time=7!=e&&30!=e?t.dayOfHour+"时":t.ds.substr(5,5),s.value=t.payAmount,s.type="付费金额",a.push(s);var r=new Object;r.time=7!=e&&30!=e?t.dayOfHour+"时":t.ds.substr(5,5),r.value=t.payTimes,r.type="付费次数",a.push(r);var l=new Object;l.time=7!=e&&30!=e?t.dayOfHour+"时":t.ds.substr(5,5),l.value=t.payInstallCount,l.type="安装付费人数",a.push(l);var o=new Object;o.time=7!=e&&30!=e?t.dayOfHour+"时":t.ds.substr(5,5),o.value=t.payInstallAmount,o.type="安装付费金额",a.push(o);var c=new Object;c.time=7!=e&&30!=e?t.dayOfHour+"时":t.ds.substr(5,5),c.value=t.payInstallTimes,c.type="安装付费次数",a.push(c)})),7!=e&&30!=e&&0!=e||a.reverse(),a}}},mounted:function(){this.surveyOneLineChart(),this.surveyManyLineChart(),this.roundChart(),this.init()}},p=d,u=(a("c491"),a("2877")),h=Object(u["a"])(p,i,n,!1,null,"4bd69a6d",null);e["default"]=h.exports},"7e18":function(t,e,a){},c491:function(t,e,a){"use strict";var i=a("0729"),n=a.n(i);n.a}}]);