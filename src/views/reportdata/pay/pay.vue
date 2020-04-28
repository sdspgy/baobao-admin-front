<template>
    <div style="background-color:#fff;">
        <div>
            <div v-show="isShow">
                <RadioGroup v-model="searchForm.source" type="button" @on-change="init()">
                    <Radio style="margin: 10px 10px" label="0">用户</Radio>
                    <Radio style="margin: 10px 10px" label="1">设备</Radio>
                </RadioGroup>
            </div>
            <div style="float: right;" class="refresh">
                <Icon size="30" color="#4876FF" type="ios-ionic-outline" @click="init()"/>
                <span>刷新</span></div>
            <div>
                <RadioGroup v-model="searchForm.os" type="button" @on-change="init()">
                    <Radio style="margin: 10px 10px" label="0">
                        <span>ALL</span>
                    </Radio>
                    <Radio style="margin: 10px 10px" label="1">
                        <span>ANDROID</span>
                    </Radio>
                    <Radio style="margin: 10px 10px" label="2">
                        <span>IOS</span>
                    </Radio>
                    <Radio style="margin: 10px 10px" label="-1">
                        <span>NONE</span>
                    </Radio>
                </RadioGroup>
            </div>
            <div>
                <RadioGroup v-model="searchForm.day" type="button" @on-change="init()">>
                    <Radio style="margin: 10px 10px" label="0">今天</Radio>
                    <Radio style="margin: 10px 10px" label="1">昨天</Radio>
                    <Radio style="margin: 10px 10px" label="7">7天</Radio>
                    <Radio style="margin: 10px 10px" label="30">30天</Radio>
                </RadioGroup>
            </div>
            <div>
                <RadioGroup v-model="key" type="button" @on-change="showclients(key)">>
                    <Radio style="margin: 10px 10px" label="all">概况</Radio>
                    <Radio style="margin: 10px 10px" label="creative">渠道</Radio>
                    <Radio style="margin: 10px 10px" label="client">分服</Radio>
                </RadioGroup>
            </div>
            <Form ref="searchForm" :model="searchForm" inline :label-width="70" class="search-form">
                <Form-item label="" prop="creative" v-if="showcreative">
                    <Select @on-change="init()" v-model="searchForm.creative" style="width:200px">
                        <Option v-for="item in creativemap" :value="item.key" :key="item.key">{{ item.name}}</Option>
                    </Select>
                </Form-item>
                <Form-item label="" prop="client" v-if="showclient">
                    <Select @on-change="init()" v-model="searchForm.clientid" style="width:200px">
                        <Option v-for="item in clientmap" :value="item.key" :key="item.key">{{ item.name }}</Option>
                    </Select>
                </Form-item>
            </Form>
        </div>

        <div>
            <!--        <div style="width: 65%;position: relative;left: 35%">-->
            <vTitleHead :inputName="payLine"></vTitleHead>
            <div style="background-color:#fff;border-radius: 0 0 10px 10px" id="surveyManyLine"></div>
        </div>

        <div style="margin-top: 20px">
            <vTitleHead :inputName="payTable"></vTitleHead>
            <Row>
                <Table :loading="loadPay" height="420"  border :columns="columnspro" :data="data" sortable="custom"
                       ref="table"></Table>
                <!-- <Table :columns="exportColumns" :data="exportData" ref="exportTable" style="display:none"></Table> -->
            </Row>
        </div>

        <div v-show="payRenDayTitlessShow" style="margin-top: 20px">
            <vTitleHead :inputName="payRenDayTitless"></vTitleHead>
            <Row>
                <Table height="420" :loading="loading" border :columns="payRenDayTitles" :data="retentionTitlestable"
                       sortable="custom"
                       ref="table"></Table>
                <!-- <Table :columns="exportColumns" :data="exportData" ref="exportTable" style="display:none"></Table> -->
            </Row>
        </div>

        <div v-if="showcc" style="margin-top: 20px">
            <vTitleHead :inputName="payTableAI"></vTitleHead>
            <Row>
                <Table height="420" highlight-row border :columns="columnscc" :data="sharePayResultTypesCC"
                       ref="table"></Table>
            </Row>
        </div>

    </div>
</template>

<script>
    import {queryAllPayReq, queryPayRegisteredRevenuePercentage} from '@/api/index';
    import vTitleHead from '../../game/template/TitleHead';
    import {weekChange} from '@/libs/changeWeek';

    export default {
        name: 'pay',
        components: {vTitleHead},
        comments: {},
        data() {
            return {
                payRenDayTitles:
                    [
                        {
                            title: '日期（星期）',
                            key: 'ds',
                            width: 120,
                            align: 'center'
                        },
                        {
                            title: '注册数',
                            key: 'dr',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '1日',
                            key: '0day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '2日',
                            key: '1day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '3日',
                            key: '2day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '4日',
                            key: '3day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '5日',
                            key: '4day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '6日',
                            key: '5day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '7日',
                            key: '6day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '8日',
                            key: '7day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '9日',
                            key: '8day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '10日',
                            key: '9day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '11日',
                            key: '10day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '12日',
                            key: '11day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '13日',
                            key: '12day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '14日',
                            key: '13day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '15日',
                            key: '14day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '16日',
                            key: '15day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '17日',
                            key: '16day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '18日',
                            key: '17day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '19日',
                            key: '18day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '20日',
                            key: '19day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '21日',
                            key: '20day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '22日',
                            key: '21day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '23日',
                            key: '22day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '24日',
                            key: '23day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '25日',
                            key: '24day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '26日',
                            key: '25day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '27日',
                            key: '26day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '28日',
                            key: '27day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '29日',
                            key: '28day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '30日',
                            key: '29day',
                            width: 80,
                            align: 'center'
                        }
                    ],
                loadPay:true,
                isShow: true,
                payLine: '付费趋势',
                payTable: '付费详情(元)',
                payRenDayTitless: '注收比',
                payRenDayTitlessShow: true,
                payTableAI: '付费详情(Android/iOS)',
                columnspro: [],
                columns: [
                    // {
                    // 	type: 'expand',
                    // 	width: 50,
                    // 	fixed: 'left',
                    // 	render: (h, params) => {
                    // 		return h(expandRow, {
                    // 			props: {
                    // 				row: params.row
                    // 			}
                    // 		});
                    // 	}
                    // },
                    // {
                    //     type: 'index',
                    //     width: 60,
                    //     align: 'center',
                    //     fixed: 'left'
                    // },
                    {
                        title: '日期(星期)',
                        key: 'ds',
                        width: 150,
                        align: 'center'
                        // sortable: true
                    },
                    {
                        title: '操作系统',
                        key: 'os',
                        width: 100,
                        align: 'center',
                        checkAccess: [2]
                        // sortable: true,
                        // fixed: 'left'
                    },
                    {
                        title: '小时',
                        key: 'dayOfHour',
                        width: 80,
                        align: 'center',
                        checkAccess: [3]
                        //   render:(h,params)=>{
                        //       return h('div', { style: {
                        //               display:(params.row.dayOfHour==0)?"none":"inline-block",
                        //               color: '#FF7D41'
                        //       }
                        //       },params.row.dayOfHour);
                        // },
                        // sortable: true
                    },
                    {
                        title: '渠道',
                        key: 'creative',
                        width: 80,
                        align: 'center',
                        checkAccess: [4]
                        // sortable: true
                    },
                    {
                        title: '服',
                        key: 'client',
                        checkAccess: [1],
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '活跃数',
                        key: 'dauNum',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '注册数',
                        key: 'installNum',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '付费率（%）',
                        key: 'payRate',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: 'ARPU',
                        key: 'ARPU',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: 'ARPPU',
                        key: 'ARPPU',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '付费人数',
                        key: 'payCount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '付费总额',
                        key: 'payAmount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '注册付费率（%）',
                        key: 'payInstallRate',
                        align: 'center',
                        width: 140
                    },
                    {
                        title: '注册付费ARPU',
                        key: 'payInstallARPU',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '注册付费ARPPU',
                        key: 'payInstallARPPU',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '注册付费人数',
                        key: 'payInstallCount',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '注册付费金额',
                        key: 'payInstallAmount',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '注册付费次数',
                        key: 'payInstallTimes',
                        // width: 100,
                        // align: 'center'
                    },
                ],
                columnscc: [
                    // {
                    //     type: 'index',
                    //     width: 60,
                    //     align: 'center',
                    //     fixed: 'left'
                    // },
                    {
                        title: '日期(星期)',
                        key: 'ds',
                        align: 'center',
                        width: 150
                        // sortable: true
                    },
                    {
                        title: '操作系统',
                        key: 'os',
                        width: 100,
                        align: 'center',
                        checkAccess: [2]
                        // sortable: true,
                        // fixed: 'left'
                    },
                    {
                        title: '活跃数',
                        key: 'dauNum',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '注册数',
                        key: 'installNum',
                        width: 80,
                        align: 'center'
                    },
                    {
                        title: '付费率（%）',
                        key: 'payRate',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: 'ARPU',
                        key: 'ARPU',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: 'ARPPU',
                        key: 'ARPPU',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '付费人数',
                        key: 'payCount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '付费总额',
                        key: 'payAmount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '注册付费率（%）',
                        key: 'payInstallRate',
                        align: 'center',
                        width: 140
                    },
                    {
                        title: '注册付费ARPU',
                        key: 'payInstallARPU',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '注册付费ARPPU',
                        key: 'payInstallARPPU',
                        align: 'center',
                        width: 150
                    },
                    {
                        title: '注册付费人数',
                        key: 'payInstallCount',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '注册付费金额',
                        key: 'payInstallAmount',
                        width: 120,
                        align: 'center'
                    },
                    {
                        title: '注册付费次数',
                        key: 'payInstallTimes',
                        // width: 100,
                        // align: 'center'
                    },
                ],
                data: [],
                searchForm: {
                    source: '0',
                    creativeid: '',
                    clientid: '',
                    gameid: parseInt(this.getStore('gameid')),
                    day: '7',
                    os: '0',
                    page: 1
                },
                total: 0,
                games: [],
                retentionTitlestable: [],
                sharePayResultTypesCC: [],
                creatives: [],
                clients: [],
                clientmap: [],
                creativemap: [],
                surveyManyLine: {},
                handelPayCount: [],
                key: 'all',
                showcreative: false,
                showclient: false,
                showcc: true,
            };
        },
        methods: {
            init() {
                this.loadPay = true;
                if (this.getStore('parentId') == 0) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
                this.queryAllServer();
                if (this.key != "all") {
                    this.payRenDayTitlessShow = false
                } else {
                    this.payRenDayTitlessShow = true
                }
            },
            handleSearch() {
                this.queryAllServer();
            },
            queryAllServer() {
                this.columnspro = JSON.parse(JSON.stringify(this.columns));
                if (this.searchForm.day != 0 && this.searchForm.day != 1) {
                    this.handleColumns(3)
                }
                if (this.searchForm.os == 0 && this.searchForm.clientid == '' && this.searchForm.creative == null) {
                    this.handleColumns(2)
                }
                if (this.searchForm.clientid == '') {
                    this.handleColumns(1)
                }
                if (this.searchForm.creative == null) {
                    this.handleColumns(4)
                }
                queryAllPayReq(this.searchForm).then(res => {
                    this.loadPay = false;
                    if (res.success) {
                        this.data = res.msg;
                        debugger
                        this.sharePayResultTypesCC = res.sharePayResultTypesCC;
                        this.creatives = res.creatives;
                        this.clients = res.clients;
                        this.surveyManyLine.changeData(this.handelPayCount);
                        //
                        this.creativemap = (res.creatives).map(item => ({
                            key: item.creativeid,
                            name: item.creativeName,
                        }));
                        let allObject = new Object();
                        allObject.key = '0';
                        allObject.name = '全渠道';
                        this.creativemap.unshift(allObject);
                        let creativeMap = new Map();
                        this.creativemap.forEach((item, index) => {
                            creativeMap.set(item.key, item.name)
                        })
                        //
                        this.clientmap = (res.clients).map(item => ({
                            key: item.serverid,
                            name: item.serverName,
                        }));
                        let allObject2 = new Object();
                        allObject2.key = '-1'
                        allObject2.name = '所有服'
                        this.clientmap.unshift(allObject2);
                        let clientMap = new Map();
                        this.clientmap.forEach((item, indx) => {
                            clientMap.set(item.key, item.name)
                        })

                        this.tableDataProcess(this.data, creativeMap, clientMap);
                        this.tableDataProcess(this.sharePayResultTypesCC, creativeMap, clientMap);

                        this.handelPayCount = this.makeCavas(this.data, this.searchForm.day);
                        this.surveyManyLine.changeData(this.handelPayCount);
                    }
                });
                let deteday = {
                    gameid: this.searchForm.gameid,
                    day: this.searchForm.day,
                    os: this.searchForm.os,
                }
                queryPayRegisteredRevenuePercentage(deteday).then(res => {
                    // this.loading = false;
                    if (res.success) {
                        let a = this.tableDataProcessa(res.msg);
                        let b = this.tableDataProcessb(res.msgOS);
                        if (this.searchForm.os == "0") {
                            this.retentionTitlestable = a
                        } else {
                            this.retentionTitlestable = b
                        }
                    }
                });

            },
            tableDataProcessa: function (data) {
                if (data) {
                    let aArray = [];
                    for (let key in data) {
                        let aObj = {};
                        aObj.ds = weekChange(data[key][0].ds);
                        for (let i = 0; i <= 29; i++) {
                            aObj[i + 'day'] = 0;
                        }
                        data[key].forEach(item => {
                            aObj.dr = item.dr;
                            for (let i = item.date; i <= item.day; i++) {
                                aObj[i + 'day'] = item.income;
                            }
                        })
                        aArray.push(aObj)
                    }
                    data = aArray
                }
                return data;
            },
            tableDataProcessb: function (data) {
                if (data) {
                    let bArray = [];
                    for (let key in data) {
                        let bObj = {};
                        bObj.ds = weekChange(data[key][0].ds);
                        for (let i = 0; i <= 29; i++) {
                            bObj[i + 'day'] = 0;
                        }
                        data[key].forEach(item => {
                            bObj.dr = item.dr;
                            bObj.os = item.os;
                            for (let i = item.date; i <= item.day; i++) {
                                bObj[i + 'day'] = item.income;
                            }
                        })
                        bArray.push(bObj)
                    }
                    data = bArray
                }
                return data;
            },
            showclients(val) {
                if (val == 'all') {
                    this.showcreative = false;
                    this.showclient = false;
                    this.showcc = true;
                    delete this.searchForm.creative;
                    this.searchForm.clientid = '';
                    this.init()
                } else if (val == 'creative') {
                    this.showcreative = true;
                    this.showclient = false;
                    this.showcc = false;
                    this.searchForm.creative = '0';
                    this.searchForm.clientid = '';
                    this.init()
                } else {
                    this.showcreative = false;
                    this.showclient = true;
                    this.showcc = false;
                    delete this.searchForm.creative;
                    this.searchForm.clientid = '-1';
                    this.init()
                }
            }
            ,
            handleColumns(access) {
                this.columnspro.map((item, index) => {
                    let checkAccess = item.checkAccess
                    if (checkAccess) {
                        if (checkAccess - Number(access) == 0) {
                            this.columnspro.splice(index, 1)
                        } else {
                            console.log(index)
                        }
                    }
                })
            }
            ,
            weekFunction: function (ds) {
                let week = new Date(ds);
                let dateweek = week.getDay();
                let i = 7 - dateweek;
                switch (i) {
                    case 7:
                        ds = ds + "(七)";
                        break
                    case 1:
                        ds = ds + "(六)";
                        break
                    case 2:
                        ds = ds + "(五)";
                        break
                    case 3:
                        ds = ds + "(四)";
                        break
                    case 4:
                        ds = ds + "(三)";
                        break
                    case 5:
                        ds = ds + "(二)";
                        break
                    case 6:
                        ds = ds + "(一)";
                        break
                    default:
                }
                return ds;
            }
            ,
            surveyManyLineChart() {
                /*---------------------多折线图-------------------*/
                this.surveyManyLine = new G2.Chart({
                    container: 'surveyManyLine',
                    forceFit: true,
                    height: 300
                });
                this.surveyManyLine.source(this.handelPayCount, {});
                this.surveyManyLine.scale('value', {
                    min: 0,
                    alias: '人数',
                });
                this.surveyManyLine.scale('time', {
                    tickCount: 9,
                });
                this.surveyManyLine.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                // 坐标轴文本旋转
                this.surveyManyLine.axis('time', {
                    label: {
                        rotate: -Math.PI / 2.5,
                        textAlign: 'end',
                        textBaseline: 'middle'
                    }
                });
                this.surveyManyLine.axis('time', {
                    label: {
                        formatter: val => {
                            return val;
                        }
                    }
                });
                //设置图列居中显示
                this.surveyManyLine.legend({
                    position: 'bottom', //图列位置
                    align: 'center', //图例的对齐方式
                    itemWidth: null
                });
                this.surveyManyLine
                    .line()
                    .position('time*value')
                    .color('type')
                    .shape('smooth');
                this.surveyManyLine
                    .point()
                    .position('time*value')
                    .color('type')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    });
                this.surveyManyLine.render();
            }
            ,
            makeCavas: (data, date) => {
                if (data) {
                    if (date == 0) {
                        data.sort(function (a, b) {
                            return b.dayOfHour - a.dayOfHour;
                        });
                    }
                    let handelPayCount = [];
                    data.forEach((item, index) => {
                        let infopayCount = new Object();
                        if (date != 7 && date != 30) {
                            infopayCount.time = item.dayOfHour + '时';
                        } else {
                            infopayCount.time = (item.ds).substr(5, 5);
                        }
                        infopayCount.value = item.payCount;
                        infopayCount.type = '付费人数';
                        handelPayCount.push(infopayCount);
                        let infopayAmount = new Object();
                        if (date != 7 && date != 30) {
                            infopayAmount.time = item.dayOfHour + '时';
                        } else {
                            infopayAmount.time = (item.ds).substr(5, 5);
                        }
                        infopayAmount.value = item.payAmount;
                        infopayAmount.type = '付费金额';
                        handelPayCount.push(infopayAmount);
                        let infopayTimes = new Object();
                        if (date != 7 && date != 30) {
                            infopayTimes.time = item.dayOfHour + '时';
                        } else {
                            infopayTimes.time = (item.ds).substr(5, 5);
                        }
                        infopayTimes.value = item.payTimes;
                        infopayTimes.type = '付费次数';
                        handelPayCount.push(infopayTimes);
                        let infopayInstallCount = new Object();
                        if (date != 7 && date != 30) {
                            infopayInstallCount.time = item.dayOfHour + '时';
                        } else {
                            infopayInstallCount.time = (item.ds).substr(5, 5);
                        }
                        infopayInstallCount.value = item.payInstallCount;
                        infopayInstallCount.type = '安装付费人数';
                        handelPayCount.push(infopayInstallCount);
                        let infopayInstallAmount = new Object();
                        if (date != 7 && date != 30) {
                            infopayInstallAmount.time = item.dayOfHour + '时';
                        } else {
                            infopayInstallAmount.time = (item.ds).substr(5, 5);
                        }
                        infopayInstallAmount.value = item.payInstallAmount;
                        infopayInstallAmount.type = '安装付费金额';
                        handelPayCount.push(infopayInstallAmount);
                        let infoPayInstallTimes = new Object();
                        if (date != 7 && date != 30) {
                            infoPayInstallTimes.time = item.dayOfHour + '时';
                        } else {
                            infoPayInstallTimes.time = (item.ds).substr(5, 5);
                        }
                        infoPayInstallTimes.value = item.payInstallTimes;
                        infoPayInstallTimes.type = '安装付费次数';
                        handelPayCount.push(infoPayInstallTimes);
                    });
                    if (date == 7 || date == 30 || date == 0) {
                        handelPayCount.reverse();
                    }
                    return handelPayCount;
                }
            },
            tableDataProcess(data, creativeMap, clientMap) {
                if (data) {
                    data.forEach((item) => {
                        item.ds = this.weekFunction(item.ds);
                        item.payAmount = item.payAmount / this.getStore("currencyRate");
                        item.payInstallAmount = item.payInstallAmount / this.getStore("currencyRate");
                        item.client = clientMap.get(String(item.clientid)) === undefined ? item.client : clientMap.get(String(item.clientid));
                        item.creative = creativeMap.get(item.creative) === undefined ? item.creative : creativeMap.get(item.creative);
                        item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2);
                        item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
                        item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2) ;
                        item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
                        item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);


                        // item.payAmount = item.payAmount / this.getStore("currencyRate");
                        // item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2);
                        item.ARPU = item.dauNum == 0 ? 0 : (item.payAmount / item.dauNum).toFixed(2);
                        // item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
                        // item.payInstallAmount = item.payInstallAmount / this.getStore("currencyRate");
                        // item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2);
                        // item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
                        // item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
                    })
                }
                return data;
            }
            ,
        },
        mounted() {
            this.init();
            this.surveyManyLineChart();
        }
    }
    ;
</script>

<style scoped>
    .refresh:hover {
        cursor: pointer
    }
</style>
