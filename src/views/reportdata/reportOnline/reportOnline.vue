<template>
    <div style="background-color:#fff;height: 1000px">
        <!--时间-->
        <div>
            <RadioGroup v-model="data" type="button" @on-change="init()">
                <Radio style="margin: 10px 10px" label="1">昨天</Radio>
                <Radio style="margin: 10px 10px" label="7">7日</Radio>
                <Radio style="margin: 10px 10px" label="30">30日</Radio>
            </RadioGroup>
        </div>
        <Row style="margin-top: 20px">
            <Table :loading="loadingOnline" height="435" highlight-row @on-row-click="clickOnlineTable" border :columns="columns" :data="tableV"
                   ref="table"></Table>
        </Row>
        <!--        <div style="background-color:#fff;border-radius: 10px 10px 10px 10px"-->
        <!--             id="onlineG2"></div>-->
    </div>
</template>

<script>
    import {queryOnline, queryDaily} from '@/api/index';
    import {weekChange} from '@/libs/changeWeek';

    export default {
        name: "reportOnline",
        data() {
            return {
                loadingOnline:true,
                defaultData: {
                    yestoday: 1,
                    week: 7,
                    month: 30
                },
                data: "7",
                columns: [
                    {
                        title: '日期（星期）',
                        key: 'ds',
                        width: 150,
                        fixed: 'left',
                        align: 'center'
                    }, {
                        title: '0-1分钟',
                        width: 150,
                        align: 'center',
                        children: [
                            {
                                title: '人数',
                                key: '01durationNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '留存用户数',
                                key: '01durationRetentionNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '新增率（%）',
                                key: '01installPeople',
                                align: 'center',
                                width: 130
                            }, {
                                title: '留存率（%）',
                                key: '01installRention',
                                align: 'center',
                                width: 130
                            }
                        ]
                    }, {
                        title: '1-5分钟',
                        width: 150,
                        align: 'center',
                        children: [
                            {
                                title: '人数',
                                key: '15durationNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '留存用户数',
                                key: '15durationRetentionNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '新增率（%）',
                                key: '15installPeople',
                                align: 'center',
                                width: 130
                            }, {
                                title: '留存率（%）',
                                key: '15installRention',
                                align: 'center',
                                width: 130
                            }
                        ]
                    }, {
                        title: '5-10分钟',
                        width: 150,
                        align: 'center',
                        children: [
                            {
                                title: '人数',
                                key: '510durationNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '留存用户数',
                                key: '510durationRetentionNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '新增率（%）',
                                key: '510installPeople',
                                align: 'center',
                                width: 130
                            }, {
                                title: '留存率（%）',
                                key: '510installRention',
                                align: 'center',
                                width: 130
                            }
                        ]
                    },
                    {
                        title: '10-20分钟',
                        width: 150,
                        align: 'center',
                        children: [
                            {
                                title: '人数',
                                key: '1020durationNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '留存用户数',
                                key: '1020durationRetentionNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '新增率（%）',
                                key: '1020installPeople',
                                align: 'center',
                                width: 130
                            }, {
                                title: '留存率（%）',
                                key: '1020installRention',
                                align: 'center',
                                width: 130
                            }
                        ]
                    },
                    {
                        title: '20-30分钟',
                        width: 150,
                        align: 'center',
                        children: [
                            {
                                title: '人数',
                                key: '2030durationNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '留存用户数',
                                key: '2030durationRetentionNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '新增率（%）',
                                key: '2030installPeople',
                                align: 'center',
                                width: 130
                            }, {
                                title: '留存率（%）',
                                key: '2030installRention',
                                align: 'center',
                                width: 130
                            }
                        ]
                    }, {
                        title: '大于30分钟',
                        width: 150,
                        align: 'center',
                        children: [
                            {
                                title: '人数',
                                key: '30durationNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '留存用户数',
                                key: '30durationRetentionNumbers',
                                align: 'center',
                                width: 100
                            }, {
                                title: '新增率（%）',
                                key: '30installPeople',
                                align: 'center',
                                width: 130
                            }, {
                                title: '留存率（%）',
                                key: '30installRention',
                                align: 'center',
                                width: 130
                            }
                        ]
                    },
                ],
                tableV: [],
                charts: [],
                pyaGroupChart: {},
                shareDailyResultTypes: []
            }
        },
        methods: {
            init() {
                this.loadingOnline = true;
                this.queryOnline();

            },
            queryOnline() {

                let paramss = {
                    gameid: parseInt(this.getStore('gameid')),
                    deviceType: 0,
                    osType: 0,
                    data: parseInt(this.data),
                    hxType: 0,
                }
                queryDaily(paramss).then(e => {
                    this.loadingOnline = false;
                    if (e.success) {
                        let install = new Map   ();
                        this.shareDailyResultTypes = (e.shareDailyResultTypes).forEach(item => {
                            // item.ds = weekChange(item.ds)
                            install.set(item.ds, item.installNum)
                        })
                        let params = {
                            gameid: parseInt(this.getStore('gameid')),
                            date: parseInt(this.data)
                        }
                        queryOnline(params).then(e => {
                            if (e.success) {
                                let onlines = e.onlineDurationDistributions;
                                let tables = [];
                                for (let info in onlines) {
                                    let tablesObject = new Object();
                                    onlines[info].forEach(item => {
                                        tablesObject.ds = weekChange(item.installDs);
                                        if (item.duration == '0-1分钟') {
                                            tablesObject['01durationNumbers'] = item.durationNumbers;
                                            tablesObject['01durationRetentionNumbers'] = item.durationRetentionNumbers;
                                            tablesObject['01installPeople'] = install.get(item.installDs) == '' ? '' : (item.durationNumbers / install.get(item.installDs) * 100).toFixed(2);
                                            tablesObject['01installRention'] = install.get(item.installDs) == '' ? '' : (item.durationRetentionNumbers / install.get(item.installDs) * 100).toFixed(2);
                                        } else if (item.duration == '1-5分钟') {
                                            tablesObject['15durationNumbers'] = item.durationNumbers;
                                            tablesObject['15durationRetentionNumbers'] = item.durationRetentionNumbers;
                                            tablesObject['15installPeople'] = install.get(item.installDs) == '' ? '' : (item.durationNumbers / install.get(item.installDs) * 100).toFixed(2);
                                            tablesObject['15installRention'] = install.get(item.installDs) == '' ? '' : (item.durationRetentionNumbers / install.get(item.installDs) * 100).toFixed(2);
                                        } else if (item.duration == '5-10分钟') {
                                            tablesObject['510durationNumbers'] = item.durationNumbers;
                                            tablesObject['510durationRetentionNumbers'] = item.durationRetentionNumbers;
                                            tablesObject['510installPeople'] = install.get(item.installDs) == '' ? '' : (item.durationNumbers / install.get(item.installDs) * 100).toFixed(2);
                                            tablesObject['510installRention'] = install.get(item.installDs) == '' ? '' : (item.durationRetentionNumbers / install.get(item.installDs) * 100).toFixed(2);
                                        } else if (item.duration == '10-20分钟') {
                                            tablesObject['1020durationNumbers'] = item.durationNumbers;
                                            tablesObject['1020durationRetentionNumbers'] = item.durationRetentionNumbers;
                                            tablesObject['1020installPeople'] = install.get(item.installDs) == '' ? '' : (item.durationNumbers / install.get(item.installDs) * 100).toFixed(2);
                                            tablesObject['1020installRention'] = install.get(item.installDs) == '' ? '' : (item.durationRetentionNumbers / install.get(item.installDs) * 100).toFixed(2);
                                        } else if (item.duration == '20-30分钟') {
                                            tablesObject['2030durationNumbers'] = item.durationNumbers;
                                            tablesObject['2030durationRetentionNumbers'] = item.durationRetentionNumbers;
                                            tablesObject['2030installPeople'] = install.get(item.installDs) == '' ? '' : (item.durationNumbers / install.get(item.installDs) * 100).toFixed(2);
                                            tablesObject['2030installRention'] = install.get(item.installDs) == '' ? '' : (item.durationRetentionNumbers / install.get(item.installDs) * 100).toFixed(2);
                                        } else if (item.duration == '大于30分钟')
                                        {
                                            tablesObject['30durationNumbers'] = item.durationNumbers;
                                            tablesObject['30durationRetentionNumbers'] = item.durationRetentionNumbers;
                                            tablesObject['30installPeople'] = install.get(item.installDs) == '' ? '' : (item.durationNumbers / install.get(item.installDs) * 100).toFixed(2);
                                            tablesObject['30installRention'] = install.get(item.installDs) == '' ? '' : (item.durationRetentionNumbers / install.get(item.installDs) * 100).toFixed(2);
                                        }
                                    })
                                    tables.push(tablesObject)
                                }
                                tables.sort(this.compare);
                                // let firstData = [];
                                // onlines.forEach(item => {
                                //     item.ds = weekChange(item.ds);
                                //     item.installPeople = (item.durationNumbers / install.get(item.ds) * 100).toFixed(2) + '%';
                                //     item.installRention = (item.durationRetentionNumbers / install.get(item.ds) * 100).toFixed(2) + '%';
                                //     //取出最近一天的
                                //     if (item.ds == onlines[0].ds) {
                                //         firstData.push(item);
                                //     }
                                // })
                                // //处理分组柱状图数据
                                // let charts = [];
                                // firstData.forEach(item => {
                                //     let peoplesObj = new Object();
                                //     peoplesObj.name = '人数';
                                //     peoplesObj.duration = item.duration;
                                //     peoplesObj.value = item.durationNumbers;
                                //     let dauNumObj = new Object();
                                //     dauNumObj.name = '留存用户数';
                                //     dauNumObj.duration = item.duration;
                                //     dauNumObj.value = item.durationRetentionNumbers;
                                //     charts.push(peoplesObj);
                                //     charts.push(dauNumObj);
                                // })
                                // this.charts = charts;
                                this.tableV = tables;
                                // this.pyaGroupChart.changeData(this.charts);
                            }
                        })
                    }
                })


            },
            // clickOnlineTable(data) {
            //     let firstData = [];
            //     this.tableV.forEach(item => {
            //         if (item.ds == data.ds) {
            //             firstData.push(item);
            //         }
            //         }
            //     })
            //     let charts = [];
            //     firstData.forEach(item => {
            //         let peoplesObj = new Object();
            //         peoplesObj.name = '人数';
            //         peoplesObj.duration = item.duration;
            //         peoplesObj.value = item.durationNumbers;
            //         let dauNumObj = new Object();
            //         dauNumObj.name = '留存用户数';
            //         dauNumObj.duration = item.duration;
            //         dauNumObj.value = item.durationRetentionNumbers;
            //         charts.push(peoplesObj);
            //         charts.push(dauNumObj);
            //     })
            //     this.charts = charts;
            //     this.pyaGroupChart.changeData(this.charts);
            // },
            // G2Online() {
            //     // 分组柱状图
            //     this.pyaGroupChart = new G2.Chart({
            //         container: 'onlineG2',
            //         forceFit: true,
            //         height: 350
            //     });
            //     this.pyaGroupChart.source(this.charts);
            //     this.pyaGroupChart.interval().position('duration*value').color('name')
            //         .adjust([{
            //             type: 'dodge',
            //             marginRatio: 1 / 32
            //         }]);
            //     this.pyaGroupChart.render();
            // },
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
            },
        },
        mounted() {
            // this.G2Online();
            this.init();
        }
        ,
    }
</script>

<style scoped>

</style>
