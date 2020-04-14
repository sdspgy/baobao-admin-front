<template>
    <div style="background-color:#fff;">
        <div v-show="isShow">
            <RadioGroup v-model="isDevice" type="button" @on-change="init()">
                <Radio style="margin: 10px 10px" label="0">用户</Radio>
                <Radio style="margin: 10px 10px" label="1">设备</Radio>
            </RadioGroup>
        </div>
        <div>
            <RadioGroup v-model="phone" type="button" @on-change="init()">
                <Radio style="margin: 10px 10px" label="0">
                    <!--                    <Icon type="logo-windows"></Icon>-->
                    <span>ALL</span>
                </Radio>
                <Radio style="margin: 10px 10px" label="1">
                    <!--                    <Icon type="logo-android"></Icon>-->
                    <span>ANDROID</span>
                </Radio>
                <Radio style="margin: 10px 10px" label="2">
                    <!--                    <Icon type="logo-apple"></Icon>-->
                    <span>IOS</span>
                </Radio>
                <Radio style="margin: 10px 10px" label="3">
                    <!--                    <Icon type="ios-bookmark"></Icon>-->
                    <span>NONE</span>
                </Radio>
            </RadioGroup>
        </div>
        <div>
            <RadioGroup v-model="data" type="button" @on-change="init()">
                <Radio style="margin: 10px 10px" label="0">今天</Radio>
                <Radio style="margin: 10px 10px" label="1">昨天</Radio>
                <Radio style="margin: 10px 10px" label="7">7日</Radio>
                <Radio style="margin: 10px 10px" label="30">30日</Radio>
            </RadioGroup>
        </div>
        <div>
            <RadioGroup v-model="creativeOrClient" type="button" @on-change="creativeOrClientChange()">
                <Radio style="margin: 10px 10px" label="2">概况</Radio>
                <Radio style="margin: 10px 10px" label="0">渠道</Radio>
                <Radio style="margin: 10px 10px" label="1">分服</Radio>
            </RadioGroup>
        </div>

        <Form v-show="showCreativeOrClient" ref="from" class="" :model="reportRetentionForm" :label-width="80">
            <FormItem label="" prop="key">
                <Select v-model="reportRetentionForm.index" style="width:200px"
                        @on-change="changeCreativeOrClient()">
                    <Option v-for="item in creativeOrClients" :value="item.key"
                            :key="item.key">{{ item.name }}
                    </Option>
                </Select>
            </FormItem>
        </Form>

        <!--        <div @mouseleave="leave()" style="width: 45px" class="conditionHead">-->
        <!--            <div style="width: 45px;height: 35px;" class="smillPeople"-->
        <!--                 @mouseenter="enter"></div>-->
        <!--            <div v-show="isShowCondition"-->
        <!--                 style="width: 270px;height: 150px;background-color:#EAEAEA;z-index: 999;opacity: 0.9;border-radius: 10px 10px 10px 10px;">-->
        <!--               -->
        <!--            </div>-->
        <!--        </div>-->

        <div style="width:50%;height: 405px;"
             :class="{'isshowLine': isretentionLine}">
            <vTitleHead :inputName="retentionTitle"></vTitleHead>
            <div style="background-color:#fff; border-radius: 0 0 10px 10px" id="reportLine"></div>
        </div>
        <!--        <div style="position: absolute;width: 10px;height: 10px"></div>-->
        <div v-show="isretentionLine" style="width:50%;height: 405px ;position: relative;left: 50%"
             class="reportChaet">
            <vTitleHead :inputName="retentionsTitle"></vTitleHead>
            <div style="background-color:#fff; border-radius: 0 0 10px 10px" id="retentionLine"></div>
        </div>

        <!--        <div style="width:47%;height: 405px" class="retentionTable">-->
        <div style="margin-top: 70px">
            <vTitleHead :inputName="retentionTableTitle"></vTitleHead>
            <Row>
                <Table :loading="loadRetention" height="445" highlight-row @on-row-click="clickRetention"
                       :row-class-name="retentionListClass" border
                       :columns="columns"
                       :data="retentionList" ref="table"></Table>
            </Row>
        </div>

        <!--        <div style="width:50%;height: 405px;margin-top: 100px;position: absolute">-->
        <div>
            <vTitleHead :inputName="installPayRetentionTableTitle"></vTitleHead>
            <Row>
                <Table height="405" highlight-row border :columns="payColumns" :data="payInstallRetenTable"
                       ref="table"></Table>
            </Row>

        </div>
        <!--        <div style="width:47%;height: 405px;position: relative;left: 52%;top:100px">-->
        <div>
            <vTitleHead :inputName="payRetentionTableTitle"></vTitleHead>
            <Row>
                <Table height="405" highlight-row border :columns="payColumns" :data="payRentenTable"
                       ref="table"></Table>
            </Row>
        </div>
    </div>
</template>

<script>
    import {queryRetention, queryPayRetention} from '@/api/index';
    import {weekChange} from '@/libs/changeWeek';
    import vTitleHead from '../../game/template/TitleHead';

    export default {
        name: "reportRetention",
        components: {vTitleHead},
        data() {
            return {
                loadRetention:true,
                isretentionLine: true,
                isShowCondition: false,
                isShow: true,
                defaultIsDeviceDef: {
                    user: 0,
                    device: 1
                },
                defaultPhone: {
                    all: 0,
                    android: 1,
                    ios: 2,
                    none: 3
                },
                defaultData: {
                    today: 0,
                    yestoday: 1,
                    week: 7,
                    month: 30
                },
                defaultCreativeOrClient: {
                    survey: 2,
                    creative: 0,
                    client: 1
                },

                isDevice: "0",
                phone: "0",
                data: "7",
                creativeOrClient: "2",
                isOs: 0,
                indexStatu: 2,
                index: "0",

                reportRetentionForm: {
                    index: "0"
                },
                showCreativeOrClient: true,
                creativeOrClients: [],
                columns: [],
                payColumns: [],
                columnsHeadr: [
                    {
                        title: '日期（星期）',
                        key: 'ds',
                        width: 150,
                        align: 'center',
                        fixed: 'left'
                    }
                ],
                columnsReal: [
                    {
                        title: '～时',
                        key: 'dayOfHour',
                        width: 150,
                        align: 'center',
                        fixed: 'left'
                    }
                ],
                columsOs: [
                    {
                        title: '操作系统',
                        key: 'os',
                        width: 120,
                        align: 'center',
                        fixed: 'left'
                    }
                ],
                columsCreative:
                    [
                        {
                            title: '渠道',
                            key: 'creative',
                            width: 100,
                            align: 'center',
                            fixed: 'left'
                        }
                    ],
                columsClient:
                    [
                        {
                            title: '分服',
                            key: 'client',
                            width: 100,
                            align: 'center',
                            fixed: 'left'
                        }
                    ],
                retentionTable:
                    [
                        {
                            title: '注册数',
                            key: 'installNum',
                            align: 'center',
                            width: 80
                        },
                        {
                            title: '1日',
                            key: 'oneRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '2日',
                            key: 'twoRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '3日',
                            key: 'threeRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '4日',
                            key: 'fourRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '5日',
                            key: 'fiveRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '6日',
                            key: 'sixRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '7日',
                            key: 'sevenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '8日',
                            key: 'eightRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '9日',
                            key: 'nineRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '10日',
                            key: 'tenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '11日',
                            key: 'elevenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '12日',
                            key: 'twelveRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '13日',
                            key: 'thirteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '14日',
                            key: 'fourteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '15日',
                            key: 'fifteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '16日',
                            key: 'sixteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '17日',
                            key: 'seventeenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '18日',
                            key: 'eighteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '19日',
                            key: 'nineteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '20日',
                            key: 'twentyteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '21日',
                            key: 'twentyOneteenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '22日',
                            key: 'twentyTwoRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '23日',
                            key: 'twentyThreeRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '24日',
                            key: 'twentyFourRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '25日',
                            key: 'twentyFiveRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '26日',
                            key: 'twentySixRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '27日',
                            key: 'twentySevenRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '28日',
                            key: 'twentyEightRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '29日',
                            key: 'twentyNineRetentionPercentage',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '30日',
                            key: 'thirtyRetentionPercentage',
                            width: 80,
                            align: 'center'
                        }
                    ],
                payRenDayTitles:
                    [
                        {
                            title: '付费人数',
                            key: 'payCount',
                            width: 100,
                            align: 'center'
                        },
                        {
                            title: '付费率',
                            key: 'pays',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '1日',
                            key: '1day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '2日',
                            key: '2day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '3日',
                            key: '3day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '4日',
                            key: '4day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '5日',
                            key: '5day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '6日',
                            key: '6day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '7日',
                            key: '7day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '8日',
                            key: '8day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '9日',
                            key: '9day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '10日',
                            key: '10day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '11日',
                            key: '11day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '12日',
                            key: '12day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '13日',
                            key: '13day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '14日',
                            key: '14day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '15日',
                            key: '15day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '16日',
                            key: '16day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '17日',
                            key: '17day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '18日',
                            key: '18day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '19日',
                            key: '19day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '20日',
                            key: '20day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '21日',
                            key: '21day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '22日',
                            key: '22day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '23日',
                            key: '23day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '24日',
                            key: '24day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '25日',
                            key: '25day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '26日',
                            key: '26day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '27日',
                            key: '27day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '28日',
                            key: '28day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '29日',
                            key: '29day',
                            width: 80,
                            align: 'center'
                        },
                        {
                            title: '30日',
                            key: '30day',
                            width: 80,
                            align: 'center'
                        }
                    ],
                retentionList:
                    [],
                payRentenTable: [],
                handelRetentionOne:
                    [],
                surveyOneLine: {},
                retentionLine: {},
                arrayCreate:
                    [],
                creatives:
                    [],
                creativeMap:
                    [],
                arrayClient:
                    [],
                clients:
                    [],
                clientMap:
                    [],
                payInstallRetenTable:
                    [],
                retentionTitle: '',
                retentionsTitle: '留存平均值',
                retentionAverage: [],
                installPayRetentionTableTitle: '注册付费留存(%)',
                retentionTableTitle: '留存数据(%)',
                payRetentionTableTitle: '付费留存(%)',
            }
                ;
        },
        methods: {
            enter() {
                this.isShowCondition = true;
            },
            leave() {
                this.isShowCondition = false;
            },
            init() {
                this.loadRetention = true;
                if (this.getStore('parentId') == 0) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }

                // show渠道/服选择器
                if (parseInt(this.creativeOrClient) == this.defaultCreativeOrClient.creative || parseInt(this.creativeOrClient) == this.defaultCreativeOrClient.client) {
                    this.showCreativeOrClient = true;
                } else {
                    this.showCreativeOrClient = false;
                }

                if (this.creativeOrClient == "2") {
                    this.isretentionLine = true
                } else {
                    this.isretentionLine = false
                }

                if (this.phone == this.defaultPhone.none) {
                    this.isOs = 1;
                } else {
                    this.isOs = 0;
                }

                // 处理表头
                let colum = this.columnsHeadr;
                let payColum = [];
                if (this.phone != this.defaultPhone.none && !(this.phone == this.defaultPhone.all && this.creativeOrClient == this.defaultCreativeOrClient.survey)) {
                    colum = colum.concat(this.columsOs);

                }
                if (this.data == this.defaultData.today || this.data == this.defaultData.yestoday) {
                    colum = colum.concat(this.columnsReal);
                }
                this.indexStatu = 2;
                if (this.creativeOrClient == this.defaultCreativeOrClient.client) {
                    colum = colum.concat(this.columsClient);
                    this.indexStatu = 1;
                }
                if (this.creativeOrClient == this.defaultCreativeOrClient.creative) {
                    colum = colum.concat(this.columsCreative);
                    this.indexStatu = 0;
                }
                payColum = colum;
                payColum = payColum.concat(this.payRenDayTitles);
                colum = colum.concat(this.retentionTable);
                this.columns = colum;
                this.payColumns = payColum;

                this.queryRetention();
            },
            queryRetention() {
                let params = {
                    gameid: parseInt(this.getStore('gameid')),
                    deviceType: this.isDevice,
                    osType: this.phone,
                    isOs: this.isOs,
                    data: this.data,
                    ccType: this.indexStatu,
                    ccNum: this.reportRetentionForm.index,
                    page: 1,
                }
                if (this.indexStatu == 1) {
                    params.ccNum = this.reportRetentionForm.index;
                }
                if (this.indexStatu == 0) {
                    params.ccNum = this.reportRetentionForm.index;
                }
                queryRetention(params).then(e => {
                    this.loadRetention = false;
                    if (e.success) {
                        let retentionList = [];
                        retentionList = this.saturday(e.shareRetentionList);
                        //放入Map,creativeid为key
                        let creativeMap = new Map();
                        (e.creatives).forEach((item, index) => {
                            creativeMap.set(item.creativeid, item.creativeName)
                        })

                        let clients = (e.clients).map(item => ({
                            key: item.serverid,
                            name: item.serverName,
                        }));

                        let object = new Object();
                        object.key = '-1';
                        object.name = '所有服';
                        clients.unshift(object);

                        let clientMap = new Map();
                        (clients).forEach((item, index) => {
                            clientMap.set(item.key, item.name)
                        })

                        retentionList.forEach(item => {
                            item.creative = creativeMap.get(item.creative) === undefined ? item.creative : creativeMap.get(item.creative);
                            item.client = clientMap.get(String(item.clientid)) === undefined ? item.client : clientMap.get(String(item.clientid));
                        })
                        let handelRetentionOne = this.makeRetentionOne(retentionList[5]);
                        this.retentionList = retentionList;
                        this.handelRetentionOne = handelRetentionOne;
                        this.retentionTitle = retentionList[5].ds + '留存趋势';
                        this.surveyOneLine.changeData(handelRetentionOne);
                        this.retentionLine.changeData(this.retentionAverage);
                    }
                });

                let payRentenData = {
                    gameid: parseInt(this.getStore('gameid')),
                    date: parseInt(this.data),
                    device: parseInt(this.isDevice) == this.defaultIsDeviceDef.user ? false : true,
                }
                if (this.phone != this.defaultPhone.none) {
                    payRentenData.os = this.phone;
                }
                if (this.indexStatu == this.defaultCreativeOrClient.client) {
                    payRentenData.clientid = this.reportRetentionForm.index;
                    this.creativeOrClients = this.clients;
                }
                if (this.indexStatu == this.defaultCreativeOrClient.creative) {
                    payRentenData.creative = this.reportRetentionForm.index;
                    this.creativeOrClients = this.creatives;
                }
                queryPayRetention(payRentenData).then(e => {
                    if (e.success) {
                        const payReten = e.sharePayRetentionMap;
                        const installPayReten = e.shareInstallPayRetentionMap;
                        /**
                         * 渠道信息
                         * @param creativeMap 替换表格数据
                         * @param creativeNames 替换选择头
                         */
                        let creatives = (e.creatives).map(item => ({
                            key: item.creativeid,
                            name: item.creativeName,
                        }));

                        let clients = (e.clients).map(item => ({
                            key: item.serverid,
                            name: item.serverName,
                        }));

                        let creativeNames = [];
                        creativeNames.push('全渠道');
                        (e.creatives).forEach(item => {
                            creativeNames.push(item.creativeName);
                        });

                        let allObject = new Object();
                        allObject.key = '0';
                        allObject.name = '全渠道';
                        creatives.unshift(allObject);
                        //放入Map,creativeid为key
                        let creativeMap = new Map();
                        creatives.forEach((item, index) => {
                            creativeMap.set(item.key, item.name)
                        })

                        let clientNames = [];
                        clientNames.push('所有服');
                        (e.clients).forEach(item => {
                            clientNames.push(item.serverName);
                        });

                        let object = new Object();
                        object.key = '0';
                        object.name = '所有服';
                        clients.unshift(object);

                        let clientMap = new Map();
                        clients.forEach((item, indx) => {
                            clientMap.set(item.key, item.name)
                        })
                        this.arrayCreate = creativeNames;
                        this.creatives = creatives;
                        this.creativeMap = creativeMap;
                        this.arrayClient = clientNames;
                        this.clients = clients;
                        this.clientMap = clientMap;
                        /**
                         * -----------------安装付费留存-------------
                         */
                        if (installPayReten) {
                            let payInstallRetenArray = [];
                            for (let key in installPayReten) {
                                let payInstallRentenObj = {};
                                payInstallRentenObj.ds = weekChange(installPayReten[key][0].ds);
                                payInstallRentenObj.os = installPayReten[key][0].os;
                                payInstallRentenObj.creative = creativeMap.get(installPayReten[key][0].creative) === undefined ? installPayReten[key][0].creative : creativeMap.get(installPayReten[key][0].creative);
                                payInstallRentenObj.client = clientMap.get(String(installPayReten[key][0].clientid));
                                payInstallRentenObj.payCount = installPayReten[key][0].payInstallCount;
                                payInstallRentenObj.pays = installPayReten[key][0].payCount == 0 ? 0 : (installPayReten[key][0].payInstallCount / installPayReten[key][0].payCount * 100).toFixed(2);
                                for (let i = 1; i <= 30; i++) {
                                    payInstallRentenObj[i + 'day'] = 0;
                                }
                                installPayReten[key].forEach(item => {
                                    payInstallRentenObj[item.dr + 'day'] = item.payInstallCount == 0 ? 0 : (item.retention / item.payInstallCount * 100).toFixed(2);
                                })
                                payInstallRetenArray.push(payInstallRentenObj);
                            }
                            payInstallRetenArray.sort(this.compare);
                            this.payInstallRetenTable = payInstallRetenArray;
                        }
                        /**
                         * -------------付费留存---------------
                         */
                        if (payReten) {
                            let payRetenArray = [];
                            for (let key in payReten) {
                                let payRentenObj = {};
                                payRentenObj.ds = weekChange(payReten[key][0].ds);
                                payRentenObj.os = payReten[key][0].os;
                                payRentenObj.creative = creativeMap.get(payReten[key][0].creative) === undefined ? payReten[key][0].creative : creativeMap.get(payReten[key][0].creative);
                                payRentenObj.client = clientMap.get(String(payReten[key][0].clientid));
                                payRentenObj.payCount = payReten[key][0].payCount;
                                payRentenObj.pays = (payReten[key][0].payCount / payReten[key][0].dauNum * 100).toFixed(2);
                                for (let i = 1; i <= 30; i++) {
                                    payRentenObj[i + 'day'] = 0;
                                }
                                payReten[key].forEach(item => {
                                    payRentenObj[item.dr + 'day'] = item.payCount == 0 ? 0 : (item.retention / item.payCount * 100).toFixed(2);
                                })
                                payRetenArray.push(payRentenObj);
                            }
                            payRetenArray.sort(this.compare);
                            this.payRentenTable = payRetenArray;
                        }
                    }
                })
            },
            creativeOrClientChange() {
                // 还原
                this.reportRetentionForm.index = "0";
                this.init();
            },
            changeCreativeOrClient() {
                this.init();
            },
            clickRetention(data) {
                this.retentionTitle = data.ds + '留存趋势';
                this.surveyOneLine.changeData(this.makeRetentionOne(data));
            }
            ,
            makeRetentionOne: function (data) {
                let handelRetentionOne = [];
                if (data) {
                    let info1 = new Object();
                    info1.time = 1;
                    info1.value = parseFloat(data.oneRetentionPercentage);
                    handelRetentionOne.push(info1);
                    let info2 = new Object();
                    info2.time = 2;
                    info2.value = parseFloat(data.twoRetentionPercentage);
                    handelRetentionOne.push(info2);
                    let info3 = new Object();
                    info3.time = 3;
                    info3.value = parseFloat(data.threeRetentionPercentage);
                    handelRetentionOne.push(info3);
                    let info4 = new Object();
                    info4.time = 4;
                    info4.value = parseFloat(data.fourRetentionPercentage);
                    handelRetentionOne.push(info4);
                    let info5 = new Object();
                    info5.time = 5;
                    info5.value = parseFloat(data.fiveRetentionPercentage);
                    handelRetentionOne.push(info5);
                    let info6 = new Object();
                    info6.time = 6;
                    info6.value = parseFloat(data.sixRetentionPercentage);
                    handelRetentionOne.push(info6);
                    let info7 = new Object();
                    info7.time = 7;
                    info7.value = parseFloat(data.sevenRetentionPercentage);
                    handelRetentionOne.push(info7);
                    let info8 = new Object();
                    info8.time = 8;
                    info8.value = parseFloat(data.eightRetentionPercentage);
                    handelRetentionOne.push(info8);
                    let info9 = new Object();
                    info9.time = 9;
                    info9.value = parseFloat(data.nineRetentionPercentage);
                    handelRetentionOne.push(info9);
                    let info10 = new Object();
                    info10.time = 10;
                    info10.value = parseFloat(data.tenRetentionPercentage);
                    handelRetentionOne.push(info10);
                    let info11 = new Object();
                    info11.time = 11;
                    info11.value = parseFloat(data.elevenRetentionPercentage);
                    handelRetentionOne.push(info11);
                    let info12 = new Object();
                    info12.time = 12;
                    info12.value = parseFloat(data.twelveRetentionPercentage);
                    handelRetentionOne.push(info12);
                    let info13 = new Object();
                    info13.time = 13;
                    info13.value = parseFloat(data.thirteenRetentionPercentage);
                    handelRetentionOne.push(info13);
                    let info14 = new Object();
                    info14.time = 14;
                    info14.value = parseFloat(data.fourteenRetentionPercentage);
                    handelRetentionOne.push(info14);
                    let info15 = new Object();
                    info15.time = 15;
                    info15.value = parseFloat(data.fifteenRetentionPercentage);
                    handelRetentionOne.push(info15);
                }
                return handelRetentionOne;
            }
            ,
            retentionLineChart() {
                this.retentionLine = new G2.Chart({
                    container: 'retentionLine',
                    forceFit: true,
                    height: 400
                });
                this.retentionLine.source(this.retentionAverage);
                this.retentionLine.coord('rect').transpose().scale(1, -1);
                this.retentionLine.intervalSymmetric().position('action*pv')
                    .shape('pyramid')
                    .color('action', ['#0050B3', '#9AFF9A', '#AB82FF', '#53868B', '#D2691E', '#EEA2AD', '#FFFF00'])
                    .label('action*pv', (action, pv) => {
                        return action + ' ' + pv;
                    }, {
                        offset: 35,
                        labelLine: {
                            lineWidth: 1,
                            stroke: 'rgba(0, 0, 0, 0.15)'
                        }
                    });
                this.retentionLine.render();
            },
            reportLineChart() {
                /*---------------------单折线图-------------------*/
                this.surveyOneLine = new G2.Chart({
                    container: 'reportLine',
                    forceFit: true,
                    height: 400
                });
                this.surveyOneLine.source(this.handelRetentionOne, {});
                this.surveyOneLine.scale('value', {
                    min: 0,
                    alias: '留存率',
                });
                this.surveyOneLine.scale('time', {
                    // range: [0, 1]
                    tickCount: 8,
                });
                this.surveyOneLine.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                // 坐标轴文本旋转
                this.surveyOneLine.axis('time', {
                    label: {
                        rotate: -Math.PI / 2.5,
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
            },
            saturday: function (data) {
                if (data) {
                    let retentionAverage = [],
                        oneRetentionPercentageSum = 0,
                        twoRetentionPercentageSum = 0,
                        threeRetentionPercentageSum = 0,
                        fourRetentionPercentageSum = 0,
                        fiveRetentionPercentageSum = 0,
                        sixRetentionPercentageSum = 0,
                        sevenRetentionPercentageSum = 0;
                    data.forEach((item, index) => {
                        /*做留存的平均处理*/
                        oneRetentionPercentageSum += parseInt(item.oneRetentionPercentage);
                        twoRetentionPercentageSum += parseInt(item.twoRetentionPercentage);
                        threeRetentionPercentageSum += parseInt(item.threeRetentionPercentage);
                        fourRetentionPercentageSum += parseInt(item.fourRetentionPercentage);
                        fiveRetentionPercentageSum += parseInt(item.fiveRetentionPercentage);
                        sixRetentionPercentageSum += parseInt(item.sixRetentionPercentage);
                        sevenRetentionPercentageSum += parseInt(item.sevenRetentionPercentage);
                        let week = new Date(item.ds);
                        let dateweek = week.getDay();
                        let i = 7 - dateweek;
                        let saturdays = [];
                        switch (i) {
                            case 7:
                                saturdays = ['oneRetentionPercentage', 'eightRetentionPercentage', 'fifteenRetentionPercentage'];
                                break
                            case 1:
                                saturdays = ['sevenRetentionPercentage', 'fourteenRetentionPercentage'];
                                break
                            case 2:
                                saturdays = ['sixRetentionPercentage', 'thirteenRetentionPercentage'];
                                break
                            case 3:
                                saturdays = ['fiveRetentionPercentage', 'twelveRetentionPercentage'];
                                break
                            case 4:
                                saturdays = ['fourRetentionPercentage', 'elevenRetentionPercentage'];
                                break
                            case 5:
                                saturdays = ['threeRetentionPercentage', 'tenRetentionPercentage'];
                                break
                            case 6:
                                saturdays = ['twoRetentionPercentage', 'nineRetentionPercentage'];
                                break
                            default:
                        }
                        ;
                        item.special = saturdays;
                        item.oneSpecial = saturdays[0];
                        item.twoSpecial = saturdays[1];
                        item.ds = weekChange(item.ds);
                    })
                    if (this.data == "7" || this.data == "30") {
                        let retentionAverageD1 = new Object();
                        retentionAverageD1.action = 'D1';
                        retentionAverageD1.pv = Number((oneRetentionPercentageSum / parseInt(this.data)).toFixed(2));
                        retentionAverage.push(retentionAverageD1);

                        let retentionAverageD2 = new Object();
                        retentionAverageD2.action = 'D2';
                        retentionAverageD2.pv = Number((twoRetentionPercentageSum / (parseInt(this.data) - 1)).toFixed(2));
                        retentionAverage.push(retentionAverageD2);

                        let retentionAverageD3 = new Object();
                        retentionAverageD3.action = 'D3';
                        retentionAverageD3.pv = Number((threeRetentionPercentageSum / (parseInt(this.data) - 2)).toFixed(2));
                        retentionAverage.push(retentionAverageD3);

                        let retentionAverageD4 = new Object();
                        retentionAverageD4.action = 'D4';
                        retentionAverageD4.pv = Number((fourRetentionPercentageSum / (parseInt(this.data) - 3)).toFixed(2));
                        retentionAverage.push(retentionAverageD4);

                        let retentionAverageD5 = new Object();
                        retentionAverageD5.action = 'D5';
                        retentionAverageD5.pv = Number((fiveRetentionPercentageSum / (parseInt(this.data) - 4)).toFixed(2));
                        retentionAverage.push(retentionAverageD5);

                        let retentionAverageD6 = new Object();
                        retentionAverageD6.action = 'D6';
                        retentionAverageD6.pv = Number((sixRetentionPercentageSum / (parseInt(this.data) - 5)).toFixed(2));
                        retentionAverage.push(retentionAverageD6);

                        let retentionAverageD7 = new Object();
                        retentionAverageD7.action = 'D7';
                        retentionAverageD7.pv = Number((sevenRetentionPercentageSum / (parseInt(this.data) - 6)).toFixed(2));
                        retentionAverage.push(retentionAverageD7);
                        this.retentionAverage = retentionAverage;
                    }
                    return data;
                }
            }
            ,
            compare: function (obj1, obj2) {
                var val1 = obj1.ds;
                var val2 = obj2.ds;
                if (val1 < val2) {
                    return 1;
                } else if (val1 > val2) {
                    return -1;
                } else {
                    return 0;
                }
            }
            ,
            retentionListClass(row, index) {

            }
            ,
        },
        mounted() {
            this.reportLineChart();
            this.retentionLineChart();
            this.init();
        }
    }
</script>

<style scoped>
    .ivu-table .demo-table-info-cell-address {
        background-color: #187;
        color: #fff;
    }

    .conditionHead {
        position: fixed;
        left: 35%;
        top: 120px;
        z-index: 999;
    }

    .smillPeople {
        width: 45px;
        height: 35px;
        background-image: url(../../../assets/smillPeople.jpg);
        background-size: 300px 35px;
        animation: walk1 1s steps(7) infinite;
    }

    @keyframes walk1 {
        0% {
            background-position: 0;
        }

        100% {
            background-position: 300px;
        }
    }

    .reportChaet {
        /*position: absolute;*/
    }

    .retentionTable {
        position: relative;
        left: 52%;

    }

    .isshowLine {
        position: absolute;
    }
</style>
