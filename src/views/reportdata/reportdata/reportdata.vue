<template>
    <div style="background-color: #fff;">
        <div slot="content">
            <div v-show="isShow">
                <RadioGroup v-model="isDevice" type="button" @on-change="init()">
                    <Radio style="margin: 10px 10px" label="用户"></Radio>
                    <Radio style="margin: 10px 10px" label="设备"></Radio>
                </RadioGroup>
            </div>
            <div style="float: right;" class="refresh">
                <Icon size="30" color="#4876FF" type="ios-ionic-outline" @click="init()"/>
                <span>刷新</span></div>
            <div>
                <RadioGroup v-model="phone" type="button" @on-change="init()">
                    <Radio style="margin: 10px 10px" label="ALL">
                        <!--                        <Icon type="logo-windows"></Icon>-->
                        <span>ALL</span>
                    </Radio>
                    <Radio style="margin: 10px 10px" label="ANDROID">
                        <!--                        <Icon type="logo-android"></Icon>-->
                        <span>ANDROID</span>
                    </Radio>
                    <Radio style="margin: 10px 10px" label="IOS">
                        <!--                        <Icon type="logo-apple"></Icon>-->
                        <span>IOS</span>
                    </Radio>
                </RadioGroup>
            </div>
            <div>
                <RadioGroup v-model="data" type="button" @on-change="init()">>
                    <Radio style="margin: 10px 10px" label="今天" border></Radio>
                    <Radio style="margin: 10px 10px" label="昨天"></Radio>
                    <Radio style="margin: 10px 10px" label="7日"></Radio>
                    <Radio style="margin: 10px 10px" label="30日"></Radio>
                </RadioGroup>
                <!--<Date-picker v-model="timeSection" @on-ok="timeSectionEvent()" type="datetimerange"-->
                <!--placeholder="选择日期和时间"-->
                <!--style="width: 300px"></Date-picker>-->
            </div>
        </div>

        <div>
            <Row type="flex" justify="space-between"
                 style="margin-bottom: 20px;padding-bottom:10px;border-bottom: 2px solid #EEE8CD">
                <Col v-show="notoday" :xs="0" :sm="5" :md="5" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;" :inputName="yesterDayDau"></vTitleHead>
                    <div v-show='nodata' style="height: 130px;line-height: 30px;
            list-style-type:none;margin-top: 10px;margin-left:30px;font-size: 10px;font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif">
                        <li style="display: inline-flex"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            人数</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>iOS</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>
                            Android</p></li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">昨日：</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[0].value}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[0].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[0].payARPU}}</p>
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">周：</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[0].value}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[0].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[0].payARPU}}</p>
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">月：</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[0].value}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[0].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[0].payARPU}}</p>
                        </li>
                    </div>
                </Col>
                <Col v-show="notoday" :xs="0" :sm="5" :md="5" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;" :inputName="weekInstall"></vTitleHead>
                    <div v-show='nodata' style="height: 130px;line-height: 30px;
            list-style-type:none;margin-top: 10px;margin-left:30px;font-size: 10px;font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif">
                        <li style="display: inline-flex"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            人数</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>iOS</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>
                            Android</p></li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">昨日：</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[1].value}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[1].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[1].payARPU}}</p>
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">周：</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[1].value}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[1].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[1].payARPU}}</p>
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">月：</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[1].value}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[1].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[1].payARPU}}</p>
                        </li>
                    </div>
                </Col>
                <Col v-show="notoday" :xs="0" :sm="5" :md="5" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;" :inputName="weekPay"></vTitleHead>
                    <div v-show='nodata' style="height: 130px;line-height: 30px;
            list-style-type:none;margin-top: 10px;font-size: 10px;font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif">
                        <li style="display: inline-flex"><p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                            人数</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>付费率</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>
                            ARPU</p>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<p>ARPPU</p></li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">昨日：</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[2].value}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[2].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[2].payARPU}}</p>
                            <p style="width: 50px; text-align: left">{{yesterdayPercentage[2].payARPPU}}</p>
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">周：</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[2].value}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[2].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[2].payARPU}}</p>
                            <p style="width: 50px; text-align: left">{{weekPercentage[2].payARPPU}}</p>
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">月：</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[2].value}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[2].payRate}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[2].payARPU}}</p>
                            <p style="width: 50px; text-align: left">{{monthPercentage[2].payARPPU}}</p>
                        </li>
                    </div>
                </Col>
                <Col v-show='today' :xs="5" :sm="5" :md="5" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;" :inputName="dau"></vTitleHead>
                    <div v-show='nodata' style="height: 130px;line-height: 30px;
            list-style-type:none;margin-left:70px;margin-top: 10px;font-size: 10px;font-family: Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,Microsoft YaHei,Arial,sans-serif">
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">人数：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[0].value}}</p>
                            <!--<p style="width: 30px; text-align: left">{{yesterdayPercentage[0].value}}</p>-->
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">iOS：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[0].payRate}}</p>
                            <!--<p style="width: 100px; text-align: left">{{yesterdayPercentage[0].payRate}}</p>-->
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">Android：</p>
                            <p style="width: 150px; text-align: left"> {{realtimeStatis[0].payARPU}}</p>
                            <!--<p style="width: 100px; text-align: left"> {{yesterdayPercentage[0].payARPU}}</p>-->
                        </li>
                    </div>
                </Col>
                <Col v-show='today' :xs="5" :sm="5" :md="5" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;"
                                :inputName="install"></vTitleHead>
                    <div v-show='nodata' style="height: 130px;line-height: 30px;margin-left:70px;
            list-style-type:none;margin-top: 10px;font-size: 10px">
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">人数：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[1].value}}</p>
                            <!--<p style="width: 100px; text-align: left">{{yesterdayPercentage[1].value}}</p>-->
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">iOS：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[1].payRate}}</p>
                            <!--<p style="width: 100px; text-align: left">{{yesterdayPercentage[1].payRate}}</p>-->
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">Android：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[1].payARPU}}</p>
                            <!--<p style="width: 100px; text-align: left">{{yesterdayPercentage[1].payARPU}}</p>-->
                        </li>
                    </div>
                </Col>
                <Col v-show='today' :xs="5" :sm="5" :md="5" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;" :inputName="pay"></vTitleHead>
                    <div v-show='nodata' style="height: 130px; line-height: 25px;margin-left:70px;
            list-style-type:none;margin-top: 10px;font-size: 10px">
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">总额：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[2].value}}</p>
                            <!--<p style="width: 60px; text-align: left">{{yesterdayPercentage[2].value}}</p>-->
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">付费率：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[2].payRate}}</p>
                            <!--<p style="width: 60px; text-align: left">{{yesterdayPercentage[2].payRate}}</p>-->
                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">ARPU：</p>
                            <p style="width: 50px; text-align: left">{{realtimeStatis[2].payARPU}}</p>
                            <!--<p style="width: 60px; text-align: left">{{yesterdayPercentage[2].payARPU}}</p>-->

                        </li>
                        <li style="display: inline-flex"><p style="width: 60px;text-align: right">ARPPU：</p>
                            <p style="width: 150px; text-align: left">{{realtimeStatis[2].payARPPU}}</p>
                            <!--<p style="width: 60px; text-align: left">{{yesterdayPercentage[2].payARPPU}}</p>-->
                        </li>
                    </div>
                </Col>
                <Col :xs="0" :sm="10" :md="10" :lg="5"
                     style="height: 200px;background-color:#fff; border-radius: 10px 10px 10px 10px;border: 1px solid #ebebeb">
                    <vTitleHead style="font-size: 16px;font-weight: 500;"
                                :inputName="retention"></vTitleHead>
                    <div style="height: 130px; line-height: 30px;
            list-style-type:none;margin-left: 40px;margin-top: 10px;font-size: 10px">
                        <li>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;1日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;2日&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;3日</li>
                        <li style="display: inline-flex">{{retentionDataList[0].ds}}: &nbsp;<p
                                style="width: 50px; text-align: left"
                                :class="parseFloat(retentionDataList[0].oneRetentionPercentage) > 30 ? 'isRed' : ''">
                            {{retentionDataList[0].oneRetentionPercentage}}</p>
                        </li>
                        <li style="display: inline-flex">{{retentionDataList[1].ds}}: &nbsp;<p
                                style="width: 50px; text-align: left"
                                :class="parseFloat(retentionDataList[1].oneRetentionPercentage) > 30 ? 'isRed' : ''">
                            {{retentionDataList[1].oneRetentionPercentage}}</p>
                            <p style="width: 50px; text-align: left"
                               :class="parseFloat(retentionDataList[1].twoRetentionPercentage) > 30 ? 'isRed' : ''">
                                {{retentionDataList[1].twoRetentionPercentage}}</p>
                        </li>
                        <li style="display: inline-flex">{{retentionDataList[2].ds}}: &nbsp;<p
                                style="width: 50px; text-align: left"
                                :class="parseFloat(retentionDataList[2].oneRetentionPercentage) > 30 ? 'isRed' : ''">
                            {{retentionDataList[2].oneRetentionPercentage}}</p>
                            <p style="width: 50px; text-align: left"
                               :class="parseFloat(retentionDataList[2].twoRetentionPercentage) > 30 ? 'isRed' : ''">
                                {{retentionDataList[2].twoRetentionPercentage}}
                            </p>
                            <p style="width: 50px; text-align: left"
                               :class="parseFloat(retentionDataList[2].threeRetentionPercentage) > 30 ? 'isRed' : ''">
                                {{retentionDataList[2].threeRetentionPercentage}}</p>
                        </li>
                    </div>
                </Col>
            </Row>
        </div>
        <!--        <div @mouseleave="leave()" style="width: 45px" class="conditionHead">-->
        <!--            <div style="width: 45px;height: 35px;" class="smillPeople"-->
        <!--                 @mouseenter="enter"></div>-->
        <!--            <div v-show="isShowCondition"-->
        <!--                 style="width: 250px;height: 120px;background-color:#EAEAEA;z-index: 999;opacity: 0.9;border-radius: 10px 10px 10px 10px;">-->

        <!--            </div>-->
        <!--        </div>-->

        <div style="width:45%;height: 300px" class="reportChartLeft">
            <div style="position: absolute;top: 0px;left: 5%;z-index: 999">
                <RadioGroup v-model="dauOrInstall" type="button" @on-change="init()">
                    <Radio style="margin: 10px 10px" label="活跃"></Radio>
                    <Radio style="margin: 10px 10px" label="新增"></Radio>
                </RadioGroup>
            </div>
            <vTitleHead :inputName="names"></vTitleHead>
            <div style="background-color:#fff; border-radius: 0 0 10px 10px" id="surveyOneLine"></div>
        </div>
        <div class="chartBord">
            <vTitleHead :inputName="systemName"></vTitleHead>
        </div>
        <div class="roundChart">
            <div id="davChart"></div>
            <div style="width: 50px;color: #40a9ff;position: absolute;left: 100px;top:5px">活跃</div>
            <div style="width: 50px;color: #40a9ff;position: absolute;left:500px;top:5px">新增</div>
            <div style="margin-left: -100px" id="installChart"></div>
        </div>
        <div style="margin-top: 15px">
            <vTitleHead :inputName="name"></vTitleHead>
            <Row>
                <Table height="405" :disabled-hover="false" highlight-row border :columns="columns" :data="listData"
                       ref="table"></Table>
            </Row>
        </div>

        <div class="menyLine">
            <vTitleHead :inputName="payChart"></vTitleHead>
            <div v-show="isPayshow">
                <RadioGroup v-model="isPayType" type="button" @on-change="init()">
                    <Radio style="margin: 10px 10px" label="0">次数</Radio>
                    <Radio style="margin: 10px 10px" label="1">金额</Radio>
                    <Radio style="margin: 10px 10px" label="2">人数</Radio>
                </RadioGroup>
            </div>
            <div style="background-color:#fff; border-radius: 0 0 10px 10px" id="surveyManyLine"></div>
        </div>

        <div class="bottomTable">
            <vTitleHead :inputName="retenTable"></vTitleHead>
            <Row>
                <Table height="440" highlight-row border :row-class-name="rowClassName" :columns="retentionTable"
                       :data="retentionDataListTable"
                       ref="table"></Table>
            </Row>
        </div>
    </div>
</template>

<script>
    import {queryDaily} from '@/api/index';
    import vTitleHead from '../../game/template/TitleHead';

    const initData = {
        '今天': 0,
        '昨天': 1,
        '7日': 7,
        '30日': 30
    }
    const initPhone = {
        'ALL': 0,
        'ANDROID': 1,
        'IOS': 2
    }

    export default {
        name: "reportData",
        components: {vTitleHead},
        data() {
            return {
                today: true,
                notoday: true,
                timeSection: [],
                nodata: true,
                tableTrue: true,
                value1: '1',
                isShowCondition: false,
                name: '概况数据',
                systemName: '操作系统百分比(活跃/新增)',
                monthDau: '月活跃',
                weekDau: '周活跃',
                yesterDayDau: '活跃',
                dau: '活跃',
                monthInstall: '月新增',
                weekInstall: '新增',
                yesterDayInstall: '昨日新增',
                install: '新增',
                monthPay: '月付费(元)',
                weekPay: '付费(元)',
                yesterDayPay: '昨日付费(元)',
                pay: '付费(元)',
                retention: '留存(%)',
                payChart: '付费数据',
                retenTable: '留存数据(%)',
                isShow: true,
                isDevice: '用户',
                phone: 'ALL',
                data: '7日',
                dauOrInstall: '活跃',
                listData: [],
                payList: [],
                retentionDataListTable: [],
                datas: [],
                isccc: 99,
                isPayType: "2",
                isPayshow:false,
                tips: [
                    "昨日所在周的活跃",
                    "昨日所在周的新增",
                    "昨日所在周的付费",
                    "昨日所在月的活跃",
                    "昨日所在月的新增",
                    "昨日所在月的付费",
                ],
                realtimeStatis: [{
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }],
                yesterdayPercentage: [{
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }],
                weekPercentage: [{
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }],
                monthPercentage: [{
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }, {
                    value: '',
                    payRate: '',
                    payARPU: '',
                    payARPPU: '',
                }],
                retentionDataList: [{
                    ds: '',
                    oneRetentionPercentage: ''
                }, {
                    ds: '',
                    oneRetentionPercentage: '',
                    twoRetentionPercentage: '',
                }, {
                    ds: '',
                    oneRetentionPercentage: '',
                    twoRetentionPercentage: '',
                    threeRetentionPercentage: ''
                }],
                handelPayCount: [],
                finalTable: [],
                columnsHeadrReal: [
                    {
                        title: '日期（星期）',
                        key: 'ds',
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: '～时',
                        key: 'dayOfHour',
                        align: 'center',
                        width: 80,
                        fixed: 'left'
                    }
                ],
                columnsHeadr: [
                    {
                        title: '日期（星期）',
                        key: 'ds',
                        width: 120,
                        align: 'center',
                        fixed: 'left'
                    }
                ],
                columnsOver: [
                    {
                        title: '注册数',
                        key: 'installNum',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '活跃数',
                        key: 'dauNum',
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
                        title: '注册付费率（%）',
                        key: 'payInstallRate',
                        align: 'center',
                        width: 140
                    },
                    {
                        title: '注册付费人数',
                        key: 'payInstallCount',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '注册付费总额',
                        key: 'payInstallAmount',
                        align: 'center',
                        width: 120
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
                        title: '付费次数',
                        key: 'payTimes',
                        align: 'center',
                        width: 120
                    },
                    {
                        title: '注册付费次数',
                        key: 'payInstallTimes',
                        align: 'center',
                        width: 120
                    }
                ],
                columns: [],
                retentionTable: [
                    // {
                    //     type: 'selection',
                    //     width: 60,
                    //     align: 'center',
                    //     fixed: 'left'
                    // },
                    // {
                    //     type: 'index',
                    //     width: 60,
                    //     align: 'center',
                    //     fixed: 'left'
                    // },
                    {
                        title: '日期（星期）',
                        key: 'ds',
                        align: 'center',
                        width: 120,
                        fixed: 'left'
                    },
                    {
                        title: '安装数',
                        key: 'installNum',
                        align: 'center',
                        width: 80,
                        fixed: 'left'
                    },
                    {
                        title: '1日',
                        key: 'oneRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 0) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE'
                                    }
                                }, params.row.oneRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.oneRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '2日',
                        key: 'twoRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 1) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE',
                                    }
                                }, params.row.twoRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.twoRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '3日',
                        key: 'threeRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 2) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE',
                                    }
                                }, params.row.threeRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.threeRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '4日',
                        key: 'fourRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 3) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE',
                                    }
                                }, params.row.fourRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.fourRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '5日',
                        key: 'fiveRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 4) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE',
                                    }
                                }, params.row.fiveRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.fiveRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '6日',
                        key: 'sixRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 5) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE',
                                    }
                                }, params.row.sixRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.sixRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '7日',
                        key: 'sevenRetentionPercentage',
                        align: 'center',
                        width: 80,
                        render: (h, params) => {
                            if (params.index == 6) {
                                return h('div', {
                                    style: {
                                        color: '#1C86EE',
                                    }
                                }, params.row.sevenRetentionPercentage)
                            } else {
                                return h('div', {}, params.row.sevenRetentionPercentage)
                            }
                        }
                    },
                    {
                        title: '8日',
                        key: 'eightRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '9日',
                        key: 'nineRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '10日',
                        key: 'tenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '11日',
                        key: 'elevenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '12日',
                        key: 'twelveRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '13日',
                        key: 'thirteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '14日',
                        key: 'fourteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '15日',
                        key: 'fifteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '16日',
                        key: 'sixteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '17日',
                        key: 'seventeenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '18日',
                        key: 'eighteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '19日',
                        key: 'nineteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '20日',
                        key: 'twentyteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '21日',
                        key: 'twentyOneteenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '22日',
                        key: 'twentyTwoRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '23日',
                        key: 'twentyThreeRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '24日',
                        key: 'twentyFourRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '25日',
                        key: 'twentyFiveRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '26日',
                        key: 'twentySixRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '27日',
                        key: 'twentySevenRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '28日',
                        key: 'twentyEightRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '29日',
                        key: 'twentyNineRetentionPercentage',
                        align: 'center',
                        width: 80
                    },
                    {
                        title: '30日',
                        key: 'thirtyRetentionPercentage',
                        align: 'center',
                        width: 80
                    }
                ],
                surveyOneLine: {},
                surveyManyLine: {},
                davChart: {},
                chartData: [],
                map_pieChartD: {},
                map_pieChartI: {},
                timeBeginSection: '',
                timeOverSection: '',
            };
        },
        methods: {
            enter() {
                this.isShowCondition = true;
            },
            leave() {
                this.isShowCondition = false;
            },
            init() {
                if (initData[this.data] == 0) {
                    this.isPayshow = true;
                    this.today = true;
                    this.notoday = false;
                } else {
                    this.isPayshow = false;
                    this.today = false;
                    this.notoday = true;
                }
                if (this.data == '7日') {
                    this.dau = '周活跃';
                    this.install = '周新增';
                    this.pay = '周付费(元)'
                } else if (this.data == '30日') {
                    this.dau = '月活跃';
                    this.install = '月新增';
                    this.pay = '月付费(元)'
                } else {
                    this.dau = '活跃';
                    this.install = '新增';
                    this.pay = '付费(元)'
                }
                if (this.getStore('parentId') == 0) {
                    this.isShow = true
                } else {
                    this.isShow = false
                }
                this.initTable();
                this.queryDaily();
            },
            surveyManyLineChart() {
                /*---------------------多折线图-------------------*/
                this.surveyManyLine = new G2.Chart({
                    container: 'surveyManyLine',
                    forceFit: true,
                    height: 295
                });
                this.surveyManyLine.source(this.handelPayCount, {});
                // this.surveyManyLine.scale('value', {
                //     min: 0,
                //     alias: '人数',
                // });
                this.surveyManyLine.scale('time', {
                    tickCount: 10,
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
            },
            surveyOneLineChart() {
                /*---------------------单折线图-------------------*/
                this.surveyOneLine = new G2.Chart({
                    container: 'surveyOneLine',
                    forceFit: true,
                    height: 295
                });
                this.surveyOneLine.source(this.datas, {});
                this.surveyOneLine.scale('value', {
                    min: 0,
                    alias: '人数',
                });
                this.surveyOneLine.scale('time', {
                    // range: [0, 1]
                    tickCount: 10,
                });
                // 坐标轴文本旋转
                this.surveyOneLine.axis('time', {
                    label: {
                        rotate: -Math.PI / 2.5,
                        textAlign: 'end',
                        textBaseline: 'middle'
                    }
                });
                this.surveyOneLine
                    .line()
                    .position('time*value')
                    .color('type')
                    .shape('smooth');
                this.surveyOneLine.point().position('time*value')
                    .size(4)
                    .shape('circle')
                    .color('type')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    })
                // this.surveyOneLine.area().position('time*value');
                this.surveyOneLine.render();
                // return this.surveyOneLine;
            },
            roundChart() {
                this.davChart = new G2.Chart({
                    container: 'davChart',
                    // forceFit: true,
                    height: 250,
                    // width: 400,
                })
                ;
                this.davChart.source(this.chartData, {});
                this.davChart.coord('theta', {
                    radius: 0.75
                });
                this.davChart.tooltip({
                    showTitle: false,
                    // itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
                this.davChart.intervalStack()
                    .position('dauNum')
                    .color('os')
                    .label('dauNum', {
                        formatter: (val, item) => {
                            return this.map_pieChartD[item.point.os] + (item.point.os == 'unknown' ? '' : '|' + item.point.os);
                        }
                    })
                    .tooltip('os*dauNum', (os, dauNum) => {
                        return {
                            name: os,
                            // value: dauNum
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.davChart.render();

                this.installChart = new G2.Chart({
                    container: 'installChart',
                    // forceFit: true,
                    height: 250,
                    // width: 400,
                })
                ;
                this.installChart.source(this.chartData, {});
                this.installChart.coord('theta', {
                    radius: 0.75
                });
                this.installChart.tooltip({
                    showTitle: false,
                    // itemTpl: '<li><span style="background-color:{color};" class="g2-tooltip-marker"></span>{name}: {value}</li>'
                });
                this.installChart.intervalStack()
                    .position('installNum')
                    .color('os')
                    .label('installNum', {
                        formatter: (val, item) => {
                            return this.map_pieChartI[item.point.os] + (item.point.os == 'unknown' ? '' : '|' + item.point.os);
                        }
                    })
                    .tooltip('os*installNum', (os, dauNum) => {
                        return {
                            name: os,
                            // value: dauNum
                        };
                    })
                    .style({
                        lineWidth: 1,
                        stroke: '#fff'
                    });
                this.installChart.render();
            },
            showTips(info) {
                let index = info;
                this.$Message.info(this.tips[info]);
            },
            initTable() {
                if (initData[this.data] == 1 || initData[this.data] == 0) {
                    this.columns = this.columnsHeadrReal.concat(this.columnsOver);
                } else {
                    this.columns = this.columnsHeadr.concat(this.columnsOver);
                }

                let tables = [];
                let selection = new Object();
                selection.type = 'selection';
                selection.width = 60;
                selection.align = 'center';
                selection.fixed = 'left';
                let index = new Object();
                index.type = 'index';
                index.width = 60;
                index.align = 'center';
                index.fixed = 'left';
                let title = new Object();
                title.title = '日期（星期）';
                title.key = 'ds';
                title.width = 150;
                title.fixed = 'left';
                // let days = [];
                // for (let i = 1; i <= 30; i++) {
                //     let dayObj = new Object();
                //     dayObj.title = i + '日';
                //     dayObj.key = [i + 'day'];
                //     dayObj.width = 150;
                //     days.push(dayObj);
                // }
                tables.push(selection);
                tables.push(index);
                tables.push(title);
                // let finalTable = tables.concat(days);
                // this.finalTable = finalTable;
            },
            timeUtil(time) {
                return time.getFullYear() + "-" + ((time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1)) + "-" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
            },
            timeSectionEvent() {
                this.timeBeginSection = this.timeUtil(this.timeSection[0]);
                this.timeOverSection = this.timeUtil(this.timeSection[1]);
                this.queryDaily()
            },
            queryDaily() {
                let params = {
                    gameid: parseInt(this.getStore('gameid')),
                    deviceType: parseInt(this.isDevice === '用户' ? 0 : 1),
                    osType: initPhone[this.phone],
                    data: parseInt(initData[this.data]),
                    hxType: parseInt(this.dauOrInstall === '活跃' ? 0 : 1),
                    timeOverSection: this.timeOverSection,
                    timeBeginSection: this.timeBeginSection
                }
                queryDaily(params).then(e => {
                    if (e.success) {
                        let percentage = []
                        if (e.androidIosProportions.length > 0) {
                            percentage = this.androidIosProportions(e.androidIosProportions);
                            this.nodata = true;
                        } else {
                            this.nodata = false;
                        }
                        //单独处理昨天
                        let yesterdayPercentage = [];
                        if (e.yesterdayAndroidIosProportions.length > 0) {
                            yesterdayPercentage = this.androidIosProportions(e.yesterdayAndroidIosProportions);
                            this.yesTableDataProcess(e.yesterdayShareDaily, yesterdayPercentage, initData[this.data])
                        }
                        //周
                        let weekPercentage = [];
                        if (e.weekAndroidIosProportions.length > 0) {
                            weekPercentage = this.androidIosProportions(e.weekAndroidIosProportions);
                            this.weekTableDataProcess(e.weekShareDaily, weekPercentage, initData[this.data])
                        }
                        //月
                        let monthPercentage = [];
                        if (e.monthAndroidIosProportions.length > 0) {
                            monthPercentage = this.androidIosProportions(e.monthAndroidIosProportions);
                            this.monthTableDataProcess(e.monthShareDaily, monthPercentage, initData[this.data])
                        }
                        this.listData = this.tableDataProcess(e.shareDailyResultTypes, percentage, initData[this.data]);
                        if (e.payList.length > 0) {
                            this.payList = e.payList;
                        }
                        if (e.shareRetentionList.length > 0) {
                            this.retentionDataListTable = this.saturday(e.shareRetentionList);
                        }
                        this.datas = this.f2DI(e.dauNumOrInstallNumList, initData[this.data].toString(), this.listData, e.yesterdayShareDaily, parseInt(this.dauOrInstall === '活跃' ? 0 : 1));
                        this.handelPayCount = this.makeCavas(this.listData, initData[this.data], e.yesterdayShareDaily,this.isPayType);
                        this.chartData = this.makePieChart(e.androidIosProportions);
                        this.surveyOneLine.changeData(this.datas);
                        this.surveyManyLine.changeData(this.handelPayCount);
                        this.davChart.changeData(this.chartData);
                        this.installChart.changeData(this.chartData);
                        if (this.data != '今天') {
                            this.weekPercentage[0].value = e.weekStats.wdu
                            this.weekPercentage[1].value = e.weekStats.wnu
                        }
                        if (this.data != '今天') {
                            this.monthPercentage[0].value = e.monthStats.mdu
                            this.monthPercentage[1].value = e.monthStats.mnu
                        }
                        if (e.shareRetentionList.length > 0) {
                            this.retentionDataList[0].ds = this.retentionDataListTable[0].ds;
                            this.retentionDataList[0].oneRetentionPercentage = this.retentionDataListTable[0].oneRetentionPercentage;
                            if (e.shareRetentionList.length >= 1) {
                                this.retentionDataList[1].ds = this.retentionDataListTable[1].ds;
                                this.retentionDataList[1].oneRetentionPercentage = this.retentionDataListTable[1].oneRetentionPercentage;
                                this.retentionDataList[1].twoRetentionPercentage = this.retentionDataListTable[1].twoRetentionPercentage;
                            }
                            if (e.shareRetentionList.length >= 2) {
                                this.retentionDataList[2].ds = this.retentionDataListTable[2].ds;
                                this.retentionDataList[2].oneRetentionPercentage = this.retentionDataListTable[2].oneRetentionPercentage;
                                this.retentionDataList[2].twoRetentionPercentage = this.retentionDataListTable[2].twoRetentionPercentage;
                                this.retentionDataList[2].threeRetentionPercentage = this.retentionDataListTable[2].threeRetentionPercentage;
                            }
                        }
                    }
                });
            },
            monthTableDataProcess: function (data, info, date) {
                if (data.length > 0) {
                    let activeNum = 0,
                        newIntall = 0,
                        payTotal = 0,
                        payCount = 0;

                    data.forEach((item) => {
                        activeNum += item.dauNum;
                        newIntall += item.installNum;
                        payTotal += item.payAmount;
                        payCount += item.payCount;
                    });
                    if (info.length > 0) {
                        let realtimeArray = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = activeNum;
                        realtimeObject1.payRate = info[1];
                        realtimeObject1.payARPU = info[0];
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = info[3];
                        realtimeObject2.payARPU = info[2];
                        realtimeObject2.value = newIntall;
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = payTotal / this.getStore("currencyRate");
                        realtimeObject3.payRate = (activeNum == 0 ? 0 : (payCount * 100 / activeNum).toFixed(2) + '%');
                        realtimeObject3.payARPU = (activeNum == 0 ? 0 : (payTotal / this.getStore("currencyRate") / activeNum).toFixed(2));
                        realtimeObject3.payARPPU = (payCount == 0 ? 0 : (payTotal / this.getStore("currencyRate") / payCount).toFixed(2));

                        realtimeArray.push(realtimeObject1);
                        realtimeArray.push(realtimeObject2);
                        realtimeArray.push(realtimeObject3);
                        this.monthPercentage = realtimeArray;
                    } else {
                        let realtimeArrayss = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = '';
                        realtimeObject1.payRate = '';
                        realtimeObject1.payARPU = '';
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = '';
                        realtimeObject2.payARPU = '';
                        realtimeObject2.value = '';
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = '';
                        realtimeObject3.payRate = '';
                        realtimeObject3.payARPU = '';
                        realtimeObject3.payARPPU = '';

                        realtimeArrayss.push(realtimeObject1);
                        realtimeArrayss.push(realtimeObject2);
                        realtimeArrayss.push(realtimeObject3);
                        this.monthPercentage = realtimeArrayss;
                    }
                } else {
                    let realtimeArrays = [];
                    let realtimeObject1 = new Object();
                    realtimeObject1.title = '活跃';
                    realtimeObject1.value = '';
                    realtimeObject1.payRate = '';
                    realtimeObject1.payARPU = '';
                    let realtimeObject2 = new Object();
                    realtimeObject2.title = '新增';
                    realtimeObject2.payRate = '';
                    realtimeObject2.payARPU = '';
                    realtimeObject2.value = '';
                    let realtimeObject3 = new Object();
                    realtimeObject3.title = '付费';

                    realtimeObject3.value = '';
                    realtimeObject3.payRate = '';
                    realtimeObject3.payARPU = '';
                    realtimeObject3.payARPPU = '';

                    realtimeArray.push(realtimeObject1);
                    realtimeArray.push(realtimeObject2);
                    realtimeArray.push(realtimeObject3);
                    this.monthPercentage = realtimeArrays;
                }
            },
            weekTableDataProcess: function (data, info, date) {
                if (data.length > 0) {
                    let activeNum = 0,
                        newIntall = 0,
                        payTotal = 0,
                        payCount = 0;

                    data.forEach((item) => {
                        activeNum += item.dauNum;
                        newIntall += item.installNum;
                        payTotal += item.payAmount;
                        payCount += item.payCount;
                    });
                    if (info.length > 0) {
                        let realtimeArray = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = activeNum;
                        realtimeObject1.payRate = info[1];
                        realtimeObject1.payARPU = info[0];
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = info[3];
                        realtimeObject2.payARPU = info[2];
                        realtimeObject2.value = newIntall;
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = payTotal / this.getStore("currencyRate");
                        realtimeObject3.payRate = (activeNum == 0 ? 0 : (payCount * 100 / activeNum).toFixed(2) + '%');
                        realtimeObject3.payARPU = (activeNum == 0 ? 0 : (payTotal / this.getStore("currencyRate") / activeNum).toFixed(2));
                        realtimeObject3.payARPPU = (payCount == 0 ? 0 : (payTotal / this.getStore("currencyRate") / payCount).toFixed(2));

                        realtimeArray.push(realtimeObject1);
                        realtimeArray.push(realtimeObject2);
                        realtimeArray.push(realtimeObject3);
                        this.weekPercentage = realtimeArray;
                    } else {
                        let realtimeArrayss = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = '';
                        realtimeObject1.payRate = '';
                        realtimeObject1.payARPU = '';
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = '';
                        realtimeObject2.payARPU = '';
                        realtimeObject2.value = '';
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = '';
                        realtimeObject3.payRate = '';
                        realtimeObject3.payARPU = '';
                        realtimeObject3.payARPPU = '';

                        realtimeArrayss.push(realtimeObject1);
                        realtimeArrayss.push(realtimeObject2);
                        realtimeArrayss.push(realtimeObject3);
                        this.weekPercentage = realtimeArrayss;
                    }
                } else {
                    let realtimeArrays = [];
                    let realtimeObject1 = new Object();
                    realtimeObject1.title = '活跃';
                    realtimeObject1.value = '';
                    realtimeObject1.payRate = '';
                    realtimeObject1.payARPU = '';
                    let realtimeObject2 = new Object();
                    realtimeObject2.title = '新增';
                    realtimeObject2.payRate = '';
                    realtimeObject2.payARPU = '';
                    realtimeObject2.value = '';
                    let realtimeObject3 = new Object();
                    realtimeObject3.title = '付费';

                    realtimeObject3.value = '';
                    realtimeObject3.payRate = '';
                    realtimeObject3.payARPU = '';
                    realtimeObject3.payARPPU = '';

                    realtimeArray.push(realtimeObject1);
                    realtimeArray.push(realtimeObject2);
                    realtimeArray.push(realtimeObject3);
                    this.weekPercentage = realtimeArrays;
                }
            },
            yesTableDataProcess: function (data, info, date) {
                if (data.length > 0) {
                    let activeNum = 0,
                        newIntall = 0,
                        payTotal = 0,
                        payCount = 0;

                    data.forEach((item) => {
                        activeNum += item.dauNum;
                        newIntall += item.installNum;
                        payTotal += item.payAmount;
                        payCount += item.payCount;

                        // item.ds = this.weekFunction(item.ds);
                        // item.payAmount = item.payAmount / this.getStore("currencyRate");
                        // item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2);
                        // item.ARPU = item.dauNum == 0 ? 0 : (item.payAmount / item.dauNum).toFixed(2);
                        // item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
                        // item.payInstallAmount = item.payInstallAmount / this.getStore("currencyRate");
                        // item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2);
                        // item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
                        // item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
                    });
                    if (info.length > 0) {
                        let realtimeArray = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = activeNum;
                        realtimeObject1.payRate = info[1];
                        realtimeObject1.payARPU = info[0];
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = info[3];
                        realtimeObject2.payARPU = info[2];
                        realtimeObject2.value = newIntall;
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = payTotal / this.getStore("currencyRate");
                        realtimeObject3.payRate = (activeNum == 0 ? 0 : (payCount * 100 / activeNum).toFixed(2) + '%');
                        realtimeObject3.payARPU = (activeNum == 0 ? 0 : (payTotal / this.getStore("currencyRate") / activeNum).toFixed(2));
                        realtimeObject3.payARPPU = (payCount == 0 ? 0 : (payTotal / this.getStore("currencyRate") / payCount).toFixed(2));

                        realtimeArray.push(realtimeObject1);
                        realtimeArray.push(realtimeObject2);
                        realtimeArray.push(realtimeObject3);
                        this.yesterdayPercentage = realtimeArray;
                    } else {
                        let realtimeArrayss = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = '';
                        realtimeObject1.payRate = '';
                        realtimeObject1.payARPU = '';
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = '';
                        realtimeObject2.payARPU = '';
                        realtimeObject2.value = '';
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = '';
                        realtimeObject3.payRate = '';
                        realtimeObject3.payARPU = '';
                        realtimeObject3.payARPPU = '';

                        realtimeArrayss.push(realtimeObject1);
                        realtimeArrayss.push(realtimeObject2);
                        realtimeArrayss.push(realtimeObject3);
                        this.yesterdayPercentage = realtimeArrayss;
                    }
                } else {
                    let realtimeArrays = [];
                    let realtimeObject1 = new Object();
                    realtimeObject1.title = '活跃';
                    realtimeObject1.value = '';
                    realtimeObject1.payRate = '';
                    realtimeObject1.payARPU = '';
                    let realtimeObject2 = new Object();
                    realtimeObject2.title = '新增';
                    realtimeObject2.payRate = '';
                    realtimeObject2.payARPU = '';
                    realtimeObject2.value = '';
                    let realtimeObject3 = new Object();
                    realtimeObject3.title = '付费';

                    realtimeObject3.value = '';
                    realtimeObject3.payRate = '';
                    realtimeObject3.payARPU = '';
                    realtimeObject3.payARPPU = '';

                    realtimeArray.push(realtimeObject1);
                    realtimeArray.push(realtimeObject2);
                    realtimeArray.push(realtimeObject3);
                    this.yesterdayPercentage = realtimeArrays;
                }
            },
            makePieChart: function (info) {
                let dauNumTotal = 0,
                    installNumTotal = 0;
                info.forEach(item => {
                    dauNumTotal += item.dauNum;
                    installNumTotal += item.installNum;
                })
                var map_pieChartD = {},
                    map_pieChartI = {};
                info.map(function (obj) {
                    map_pieChartD[obj.os] = (obj.dauNum / dauNumTotal * 100).toFixed(2) + '%';
                    map_pieChartI[obj.os] = (obj.installNum / installNumTotal * 100).toFixed(2) + '%';
                })
                this.map_pieChartD = map_pieChartD;
                this.map_pieChartI = map_pieChartI;
                return info;
            },
            androidIosProportions: (data) => {
                if (data) {
                    let dauNumSum = 0,
                        installNumSum = 0,
                        androidDauNum = 0,
                        androidInstallNum = 0,
                        iosDauNum = 0,
                        iosInstallNum = 0,
                        info = [];
                    data.forEach((item) => {
                        dauNumSum += item.dauNum;
                        installNumSum += item.installNum;
                        if (item.os == 'android' || item.os == 'Android') {
                            androidDauNum += item.dauNum;
                            androidInstallNum += item.installNum;
                        }
                        if (item.os == 'iOS') {
                            iosDauNum += item.dauNum;
                            iosInstallNum += item.installNum;
                        }
                    })
                    info.push(((androidDauNum / dauNumSum * 100).toFixed(2)) + '%');
                    info.push(((iosDauNum / dauNumSum * 100).toFixed(2)) + '%');
                    info.push(((androidInstallNum / installNumSum * 100).toFixed(2)) + '%');
                    info.push(((iosInstallNum / installNumSum * 100).toFixed(2)) + '%');
                    return info;
                }
            },
            tableDataProcess: function (data, info, date) {
                if (data.length > 0) {
                    let activeNum = 0,
                        newIntall = 0,
                        payTotal = 0,
                        payCount = 0;

                    data.forEach((item) => {
                        activeNum += item.dauNum;
                        newIntall += item.installNum;
                        payTotal += item.payAmount;
                        payCount += item.payCount;

                        item.ds = this.weekFunction(item.ds);
                        item.payAmount = item.payAmount / this.getStore("currencyRate");
                        item.payRate = item.dauNum == 0 ? 0 : (item.payCount * 100 / item.dauNum).toFixed(2);
                        item.ARPU = item.dauNum == 0 ? 0 : (item.payAmount / item.dauNum).toFixed(2);
                        item.ARPPU = item.payCount == 0 ? 0 : (item.payAmount / item.payCount).toFixed(2);
                        item.payInstallAmount = item.payInstallAmount / this.getStore("currencyRate");
                        item.payInstallRate = item.installNum == 0 ? 0 : (item.payInstallCount * 100 / item.installNum).toFixed(2);
                        item.payInstallARPU = item.installNum == 0 ? 0 : (item.payInstallAmount / item.installNum).toFixed(2);
                        item.payInstallARPPU = item.payInstallCount == 0 ? 0 : (item.payInstallAmount / item.payInstallCount).toFixed(2);
                    });
                    if (info.length > 0) {
                        let realtimeArray = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = activeNum;
                        realtimeObject1.payRate = info[1];
                        realtimeObject1.payARPU = info[0];
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = info[3];
                        realtimeObject2.payARPU = info[2];
                        realtimeObject2.value = newIntall;
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = payTotal / this.getStore("currencyRate");
                        realtimeObject3.payRate = (activeNum == 0 ? 0 : (payCount * 100 / activeNum).toFixed(2) + '%');
                        realtimeObject3.payARPU = (activeNum == 0 ? 0 : (payTotal / this.getStore("currencyRate") / activeNum).toFixed(2));
                        realtimeObject3.payARPPU = (payCount == 0 ? 0 : (payTotal / this.getStore("currencyRate") / payCount).toFixed(2));

                        realtimeArray.push(realtimeObject1);
                        realtimeArray.push(realtimeObject2);
                        realtimeArray.push(realtimeObject3);
                        this.realtimeStatis = realtimeArray;
                    } else {
                        let realtimeArrayss = [];
                        let realtimeObject1 = new Object();
                        realtimeObject1.title = '活跃';
                        realtimeObject1.value = '';
                        realtimeObject1.payRate = '';
                        realtimeObject1.payARPU = '';
                        let realtimeObject2 = new Object();
                        realtimeObject2.title = '新增';
                        realtimeObject2.payRate = '';
                        realtimeObject2.payARPU = '';
                        realtimeObject2.value = '';
                        let realtimeObject3 = new Object();
                        realtimeObject3.title = '付费';

                        realtimeObject3.value = '';
                        realtimeObject3.payRate = '';
                        realtimeObject3.payARPU = '';
                        realtimeObject3.payARPPU = '';

                        realtimeArrayss.push(realtimeObject1);
                        realtimeArrayss.push(realtimeObject2);
                        realtimeArrayss.push(realtimeObject3);
                        this.realtimeStatis = realtimeArrayss;
                    }
                } else {
                    let realtimeArrays = [];
                    let realtimeObject1 = new Object();
                    realtimeObject1.title = '活跃';
                    realtimeObject1.value = '';
                    realtimeObject1.payRate = '';
                    realtimeObject1.payARPU = '';
                    let realtimeObject2 = new Object();
                    realtimeObject2.title = '新增';
                    realtimeObject2.payRate = '';
                    realtimeObject2.payARPU = '';
                    realtimeObject2.value = '';
                    let realtimeObject3 = new Object();
                    realtimeObject3.title = '付费';

                    realtimeObject3.value = '';
                    realtimeObject3.payRate = '';
                    realtimeObject3.payARPU = '';
                    realtimeObject3.payARPPU = '';

                    realtimeArray.push(realtimeObject1);
                    realtimeArray.push(realtimeObject2);
                    realtimeArray.push(realtimeObject3);
                    this.realtimeStatis = realtimeArrays;
                }
                return data;
            },
            saturday: function (data) {
                if (data) {
                    data.forEach((item, index) => {
                        if (index === 0) {
                            item.cellClassName = {ds: 'demo-table-info-cell-age',}
                        }
                        if (index === 1) {
                            item.cellClassName = {ds: 'demo-table-info-cell-age',}
                        }
                        let week = new Date(item.ds);
                        let dateweek = week.getDay();
                        let i = 7 - dateweek;
                        let saturdays = [];
                        switch (i) {
                            case 7:
                                saturdays = ['oneRetentionPercentage', 'eightRetentionPercentage', 'fifteenRetentionPercentage'];
                                item.ds = item.ds + "(七)";
                                break
                            case 1:
                                saturdays = ['sevenRetentionPercentage', 'fourteenRetentionPercentage'];
                                item.ds = item.ds + "(六)";
                                break
                            case 2:
                                saturdays = ['sixRetentionPercentage', 'thirteenRetentionPercentage'];
                                item.ds = item.ds + "(五)";
                                break
                            case 3:
                                saturdays = ['fiveRetentionPercentage', 'twelveRetentionPercentage'];
                                item.ds = item.ds + "(四)";
                                break
                            case 4:
                                saturdays = ['fourRetentionPercentage', 'elevenRetentionPercentage'];
                                item.ds = item.ds + "(三)";
                                break
                            case 5:
                                saturdays = ['threeRetentionPercentage', 'tenRetentionPercentage'];
                                item.ds = item.ds + "(二)";
                                break
                            case 6:
                                saturdays = ['twoRetentionPercentage', 'nineRetentionPercentage'];
                                item.ds = item.ds + "(一)";
                                break
                            default:
                        }
                        ;
                        item.special = saturdays;
                        item.oneSpecial = saturdays[0];
                        item.twoSpecial = saturdays[1];
                    })
                    return data;
                }
            },
            compare: function (obj1, obj2) {
                var val1 = obj1.dayOfHour;
                var val2 = obj2.dayOfHour;
                if (val1 < val2) {
                    return -1;
                } else if (val1 > val2) {
                    return 1;
                } else {
                    return 0;
                }
            },
            f2DI: function (data, date, listData, shareDailyResultTypess, type) {
                let datas = [];
                if (date == 0) {
                    shareDailyResultTypess.forEach(info => {
                        let item = new Object();
                        if (type == 0) {
                            item.value = info.dauNum;
                        } else {
                            item.value = info.installNum;
                        }
                        item.time = info.dayOfHour + '时';
                        item.type = '昨日';
                        datas.push(item);
                    });
                }
                if (date == 0 || date == 1) {
                    listData.sort(this.compare)
                    listData.forEach(info => {
                        let item = new Object();
                        if (type == 0) {
                            item.value = info.dauNum;
                        } else {
                            item.value = info.installNum;
                        }
                        item.time = info.dayOfHour + '时';
                        if (date == 0) {
                            item.type = '今日'
                        }
                        if (date == 1) {
                            item.type = '昨日'
                        }
                        datas.push(item);
                    });
                } else {
                    data.forEach((item, index) => {
                        let info = new Object();
                        info.time = this.getTime(index);
                        info.value = item;
                        if (date == 7) {
                            info.type = '7日'
                        }
                        if (date == 30) {
                            info.type = '30日'
                        }
                        datas.push(info);
                    });
                }
                if (date == "7" || date == "30") {
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
            makeCavas: (data, date, yesterdayShareDaily,isPayType) => {
                if (data) {
                    if (date == 0) {
                        data.sort(function (a, b) {
                            return b.dayOfHour - a.dayOfHour;
                        });
                    }
                    let handelPayCount = [];
                    let yeshandelPayCount = [];
                    if (date == 0) {
                        data.forEach((item, index) => {
                            let infopayCount = new Object();
                            infopayCount.time = item.dayOfHour + '时';
                            if (parseInt(isPayType) == 0) {
                                infopayCount.value = item.payTimes;
                            } else if (parseInt(isPayType)  == 1) {
                                infopayCount.value = item.payAmount;
                            } else {
                                infopayCount.value = item.payCount;
                            }
                            infopayCount.type = '今天';
                            handelPayCount.push(infopayCount);
                        })
                        yesterdayShareDaily.forEach((item, index) => {
                            let infopayCount = new Object();
                            infopayCount.time = item.dayOfHour + '时';
                            if (parseInt(isPayType) == 0) {
                                infopayCount.value = item.payTimes;
                            } else if (parseInt(isPayType)  == 1) {
                                infopayCount.value = item.payAmount;
                            } else {
                                infopayCount.value = item.payCount;
                            }
                            infopayCount.type = '昨天';
                            yeshandelPayCount.push(infopayCount);
                        })
                        yeshandelPayCount.reverse();
                        handelPayCount = handelPayCount.concat(yeshandelPayCount)
                    } else {
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
                            // let infopayInstallCount = new Object();
                            // if (date != 7 && date != 30) {
                            //     infopayInstallCount.time = item.dayOfHour + '时';
                            // } else {
                            //     infopayInstallCount.time = (item.ds).substr(5, 5);
                            // }
                            // infopayInstallCount.value = item.payInstallCount;
                            // infopayInstallCount.type = '安装付费人数';
                            // handelPayCount.push(infopayInstallCount);
                            // let infopayInstallAmount = new Object();
                            // if (date != 7 && date != 30) {
                            //     infopayInstallAmount.time = item.dayOfHour + '时';
                            // } else {
                            //     infopayInstallAmount.time = (item.ds).substr(5, 5);
                            // }
                            // infopayInstallAmount.value = item.payInstallAmount;
                            // infopayInstallAmount.type = '安装付费金额';
                            // handelPayCount.push(infopayInstallAmount);
                            // let infoPayInstallTimes = new Object();
                            // if (date != 7 && date != 30) {
                            //     infoPayInstallTimes.time = item.dayOfHour + '时';
                            // } else {
                            //     infoPayInstallTimes.time = (item.ds).substr(5, 5);
                            // }
                            // infoPayInstallTimes.value = item.payInstallTimes;
                            // infoPayInstallTimes.type = '安装付费次数';
                            // handelPayCount.push(infoPayInstallTimes);
                        });
                    }
                    if (date == 7 || date == 30 || date == 0) {
                        handelPayCount.reverse();
                    }
                    return handelPayCount;
                }
            },
            rowClassName(row, index) {
                if (index === 1) {
                    return 'demo-table-info-cell-age';
                }
            }
        }
        ,
        mounted() {
            this.surveyOneLineChart();
            this.surveyManyLineChart();
            this.roundChart();
            this.init();
        }
    }
</script>

<style scoped>
    .reportChartLeft {
        position: absolute;
    }

    .chartBord {
        width: 52%;
        position: relative;
        left: 47%;
    }

    .roundChart {
        width: 52%;
        height: 300px;
        position: relative;
        left: 47%;
        display: flex;
        padding-top: 50px;
        justify-content: space-around;
        background-color: #fff;
        border-radius: 0 0 10px 10px;
    }

    .menyLine {
        margin-top: 15px;
        /*position: absolute;*/
        /*width: 47%;*/
        height: 330px;
    }

    .bottomTable {
        margin-top: 15px;
        /*position: relative;*/
        /*left: 50%;*/
        /*width: 50%;*/
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

    .isRed {
        color: #00FF00
    }

    .refresh:hover {
        cursor: pointer
    }

    .ivu-table .demo-table-info-cell-oneRetentionPercentage {
        background-color: #ff6600;
        color: #00FF00;
    }
</style>
