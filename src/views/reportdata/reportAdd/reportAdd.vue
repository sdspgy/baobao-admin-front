<template>
    <div style="background-color:#fff;">
        <!--        <div style="position: absolute;background-color:#fff;border-radius: 10px 10px 10px 10px;width: 30%;height: 450px;line-height: 50px">-->
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
                <RadioGroup v-model="searchForm.day" type="button" @on-change="dayEvent()">>
                    <Radio style="margin: 10px 10px" label="0">今天</Radio>
                    <Radio style="margin: 10px 10px" label="1">昨天</Radio>
                    <Radio style="margin: 10px 10px" label="7">7天</Radio>
                    <Radio style="margin: 10px 10px" label="30">30天</Radio>
                </RadioGroup>
                <DatePicker v-model="timeSection" :options="options" confirm @on-ok="timeSectionEvent()"
                            type="daterange" show-week-numbers
                            placement="bottom-end" placeholder="选择起始日期"
                            style="margin-left:20px;width: 200px"></DatePicker>
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
            <vTitleHead :inputName="installChart"></vTitleHead>
            <div style="background-color:#fff;border-radius: 0 0 10px 10px" id="surveyOneLine"></div>
        </div>

        <div style="margin-top: 20px">
            <vTitleHead :inputName="installTable"></vTitleHead>
            <Row>
                <Table height="405" :loading="loadingAdd" border :columns="columnspro" :data="data" sortable="custom"
                       ref="table"></Table>
            </Row>
        </div>

        <div v-if="showcc" style="margin-top: 20px">
            <vTitleHead :inputName="installTables"></vTitleHead>
            <Row>
                <Table height="405" highlight-row border :columns="columnscc" :data="sharePayResultTypesCC"
                       ref="table"></Table>
            </Row>
        </div>

    </div>
</template>

<script>
    import {queryAllPayReq} from '@/api/index';
    import vTitleHead from '../../game/template/TitleHead';

    export default {
        name: 'pay',
        components: {vTitleHead},
        comments: {},
        data() {
            return {
                loadingAdd: true,
                isShow: true,
                installTable: '新增数据',
                installTables: '新增数据(Android/iOS)',
                installChart: '新增趋势',
                columnspro: [],
                columns: [
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
                        title: '小时',
                        key: 'dayOfHour',
                        width: 100,
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
                        width: 100,
                        align: 'center',
                        checkAccess: [4]
                        // sortable: true
                    },
                    {
                        title: '服',
                        key: 'clientid',
                        width: 100,
                        align: 'center',
                        checkAccess: [1]
                        // sortable: true
                    },
                    {
                        title: '注册数',
                        key: 'installNum',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '新付费率（%）',
                        key: 'payInstallRate',
                        align: 'center',
                        width: 130
                    },
                    {
                        title: '新付费ARPU',
                        key: 'payInstallARPU',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '新付费ARPPU',
                        key: 'payInstallARPPU',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '新付费人数',
                        key: 'payInstallCount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '新付费总额',
                        key: 'payInstallAmount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '新付费次数',
                        key: 'payInstallTimes',
                        // align: 'center',
                        // width: 100
                    },
                    // {
                    // 	title: '创建时间',
                    // 	key: 'createTime',
                    // 	sortable: true,
                    // 	sortType: 'desc',
                    // 	width: 150
                    // },
                ],
                columnscc: [
                    {
                        title: '日期(星期)',
                        key: 'ds',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '操作系统',
                        key: 'os',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '注册数',
                        key: 'installNum',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '新付费率（%）',
                        key: 'payInstallRate',
                        align: 'center',
                        width: 130
                    },
                    {
                        title: '新付费ARPU',
                        key: 'payInstallARPU',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '新付费ARPPU',
                        key: 'payInstallARPPU',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '新付费人数',
                        key: 'payInstallCount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '新付费总额',
                        key: 'payInstallAmount',
                        align: 'center',
                        width: 100
                    },
                    {
                        title: '新付费次数',
                        key: 'payInstallTimes',
                        // width: 150
                        // sortable: true
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
                sharePayResultTypesCC: [],
                creatives: [],
                clients: [],
                clientmap: [],
                creativemap: [],
                surveyOneLine: {},
                datas: [],
                key: 'all',
                showcreative: false,
                showclient: false,
                showcc: true,
                timeSection: [],
                startTime: 0,
                overTime: 0,
                options: {
                    disabledDate(date) {
                        return date && date.valueOf() >= Date.now() - 86400000;
                    }
                },
            };
        },
        methods: {
            dayEvent() {
                this.timeSection = [];
                this.startTime = 0;
                this.overTime = 0;
                this.searchForm.overTime = 0;
                this.init()
            },
            timeSectionEvent() {
                let nowTime = new Date()
                this.overTime = 0;
                this.startTime = 0;
                if (nowTime - this.timeSection[0] > 0) {
                    this.startTime = parseInt((nowTime - this.timeSection[0]) / (24 * 60 * 60 * 1000))
                }
                if (nowTime - this.timeSection[1] > 0) {
                    this.overTime = parseInt((nowTime - this.timeSection[1]) / (24 * 60 * 60 * 1000))
                }
                this.queryAllServer()
            },
            init() {
                this.loadingAdd = true;
                if (this.getStore('parentId') == 0) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
                this.queryAllServer();
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
                if (this.startTime !== 0) {
                    this.searchForm.day = this.startTime
                }
                if (this.overTime !== 0) {
                    this.searchForm.overTime = this.overTime
                }
                queryAllPayReq(this.searchForm).then(res => {
                    this.loadingAdd = false;
                    if (res.success) {
                        this.sharePayResultTypesCC = res.sharePayResultTypesCC;
                        this.creatives = res.creatives;
                        this.clients = res.clients;
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

                        this.data = this.tableDataProcess(res.msg, creativeMap, clientMap);
                        this.sharePayResultTypesCC = this.tableDataProcess(res.sharePayResultTypesCC, creativeMap, clientMap);

                        let datac = [];
                        this.data.forEach(item => {
                            datac.push(item.installNum);
                        });
                        this.datas = this.f2DI(datac, this.searchForm.day, this.data, 0);
                        this.surveyOneLine.changeData(this.datas);

                    }
                });
            },
            showclients(val) {
                if (this.key == 'all') {
                    this.showcreative = false;
                    this.showclient = false;
                    this.showcc = true;
                    delete this.searchForm.creative;
                    this.searchForm.clientid = '';
                    this.init()
                } else if (this.key == 'creative') {
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
            },
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
            },
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
            },
            surveyOneLineChart() {
                /*---------------------单折线图-------------------*/
                this.surveyOneLine = new G2.Chart({
                    container: 'surveyOneLine',
                    forceFit: true,
                    height: 300
                });
                this.surveyOneLine.source(this.datas, {});
                this.surveyOneLine.scale('value', {
                    min: 0,
                    alias: '人数',
                });
                this.surveyOneLine.scale('time', {
                    // range: [0, 1]
                    tickCount: 9,
                });
                this.surveyOneLine.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                // 坐标轴文本旋转
                this.surveyOneLine.axis('time', {
                    label: {
                        rotate: -Math.PI / 4,
                        textAlign: 'end',
                        textBaseline: 'middle'
                    }
                });
                this.surveyOneLine.line().position('time*value').shape('smooth');
                this.surveyOneLine.point().position('time*value')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    })
                    .color('l(0) 0:#1E90FF 0.5:#1E90FF 1:#1E90FF');
                this.surveyOneLine.area().position('time*value').shape('smooth');
                this.surveyOneLine.render();
                // return this.surveyOneLine;
            },
            f2DI: function (data, date, listData, type) {
                let datas = [];
                if (date == 0 || date == 1) {
                    listData.forEach(info => {
                        let item = new Object();
                        if (type == 0) {
                            item.value = info.dauNum;
                        } else {
                            item.value = info.installNum;
                        }
                        item.time = info.dayOfHour + '时';
                        datas.push(item);
                    });
                } else {
                    listData.forEach((item, index) => {
                        let info = new Object();
                        info.time = (item.ds).substr(5, 5);
                        info.value = item.installNum;
                        datas.push(info);
                    });
                }
                if (date != "1") {
                    //该方法会改变原来的数组，而不会创建新的数组
                    datas.reverse();
                }
                return datas;
            },
            getTime: function (index) {
                let myDate = new Date();
                myDate.setTime(myDate.getTime() - 24 * 60 * 60 * 1000 * (index + 1));
                let dateTime = (myDate.getMonth() + 1) + "-" + myDate.getDate();
                return dateTime;
            },
            tableDataProcess(data, creativeMap, clientMap) {
                if (data) {
                    data.forEach((item) => {
                        item.ds = this.weekFunction(item.ds);
                        item.client = clientMap.get(String(item.clientid)) === undefined ? item.client : clientMap.get(String(item.clientid));
                        item.creative = creativeMap.get(item.creative) === undefined ? item.creative : creativeMap.get(item.creative);
                        item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2);
                        item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
                        item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
                        item.payInstallAmount = item.payInstallAmount / this.getStore("currencyRate");

                    })
                }
                return data;
            },
        },
        mounted() {
            this.init();
            this.surveyOneLineChart();
        }
    }
</script>

<style scoped>
    .refresh:hover {
        cursor: pointer
    }
</style>
