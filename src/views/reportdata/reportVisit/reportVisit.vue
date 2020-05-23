<template>
    <div style="background-color:#fff; height: 1000px">
        <!--时间-->
        <div>
            <RadioGroup v-model="data" type="button" @on-change="dayEvent()">
                <Radio style="margin: 10px 10px" label="1">昨天</Radio>
                <Radio style="margin: 10px 10px" label="7">7日</Radio>
                <Radio style="margin: 10px 10px" label="30">30日</Radio>
            </RadioGroup>
            <DatePicker v-model="timeSection" :options="options" confirm @on-ok="timeSectionEvent()"
                        type="daterange" show-week-numbers
                        placement="bottom-end" placeholder="选择起始日期"
                        style="margin-left:100px;width: 200px"></DatePicker>
        </div>

        <Row style="width: 40%;background-color:#fff; margin-top: 50px;position: absolute">
            <Table height="330" highlight-row border :columns="columns" :data="tableV"
                   ref="table"></Table>
        </Row>

        <div style="position: relative;left: 47%;top: 50px;background-color:#fff;border-radius: 10px 10px 10px 10px;width: 40%">
            <!--        类型-->
            <Form ref="from" class="" :model="value_visitType" :label-width="80">
                <FormItem label="" prop="value">
                    <Select v-model="value_visitType.index" style="width:200px"
                            @on-change="changeType()">
                        <Option v-for="item in visitType" :value="item.value"
                                :key="item.value">{{ item.text }}
                        </Option>
                    </Select>
                </FormItem>
            </Form>
            <div id="visitChart"></div>
        </div>
    </div>
</template>

<script>
    import {queryVisit} from '@/api/index';
    import {weekChange} from '@/libs/changeWeek';

    export default {
        name: "reportVisit",
        data() {
            return {
                defaultData: {
                    yestoday: 1,
                    week: 7,
                    month: 30
                },
                data: "7",
                value_visitType: {
                    index: 0
                },
                defaultVisitType: [
                    {
                        name: 'visits',
                        value: 0
                    },
                    {
                        name: 'averageVisits',
                        value: 1,
                    }, {
                        name: 'averageStayTime',
                        value: 2
                    }
                ],
                visitType: [
                    {
                        text: '访问次数',
                        value: 0
                    },
                    {
                        text: '平均访问次数',
                        value: 1
                    },
                    {
                        text: '平均停留时间',
                        value: 2
                    }
                ],
                columns: [
                    {
                        title: '日期（星期）',
                        key: 'ds',
                        width: 150,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '访问次数',
                        key: 'visits',
                        width: 150,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '平均访问次数',
                        key: 'averageVisits',
                        width: 150,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '平均停留时间（S）',
                        key: 'averageStayTime',
                        width: 150,
                        align: 'center',
                        fixed: 'left'
                    },
                ],
                visitG2: {},
                tableV: [],
                charts: [],
                timeSection: [],
                startTime: 0,
                overTime: 0,
                options: {
                    disabledDate(date) {
                        return date && date.valueOf() >= Date.now() - 86400000;
                    }
                },
            }
        },
        methods: {
            dayEvent() {
                this.timeSection = [];
                this.startTime = 0;
                this.overTime = 0;
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
                this.queryVisit()
            },
            init() {
                this.queryVisit();
            },
            queryVisit() {
                const that = this;
                let params = {
                    gameid: parseInt(that.getStore('gameid')),
                    date: parseInt(that.data)
                }
                if (this.startTime !== 0) {
                    params.date = this.startTime
                    this.data = this.startTime
                }
                if (this.overTime !== 0) {
                    params.overTime = this.overTime
                }
                queryVisit(params).then(e => {
                    if (e.success) {
                        let visits = e.visitTrendings;
                        visits.reverse();
                        visits.forEach(item => {
                            item.ds = weekChange(item.ds);
                            item.averageVisits = Number(item.averageVisits).toFixed(2);
                            item.averageStayTime = Number(item.averageStayTime).toFixed(2);
                        })
                        let typeString = '';
                        for (let key in that.visitType) {
                            if (that.defaultVisitType[key].value == that.value_visitType.index.toString()) {
                                typeString = that.defaultVisitType[key].name;
                                break;
                            }
                        }
                        let charts = [];
                        visits.forEach(item => {
                            let chartObject = new Object();
                            chartObject.ds = item.ds.substr(5, 5);
                            chartObject.value = Number(item[typeString]);
                            charts.push(chartObject);
                        })
                        that.tableV = visits;
                        that.charts = charts;
                        that.visitG2.changeData(that.charts);
                    }
                })
            },
            visitG2F() {
                this.visitG2 = new G2.Chart({
                    container: 'visitChart',
                    forceFit: true,
                    height: 270
                });
                this.visitG2.source(this.charts, {});
                this.visitG2.scale('value', {
                    min: 0,
                    // alias: '',
                });
                this.visitG2.scale('ds', {
                    // range: [0, 1]
                    tickCount: 6,
                });
                this.visitG2.tooltip({
                    crosshairs: {
                        type: 'line'
                    }
                });
                // 坐标轴文本旋转
                this.visitG2.axis('ds', {
                    label: {
                        rotate: -Math.PI / 2.5,
                        textAlign: 'end',
                        textBaseline: 'middle'
                    }
                });
                this.visitG2.line().position('ds*value').shape('smooth');
                this.visitG2.point().position('ds*value')
                    .size(4)
                    .shape('circle')
                    .style({
                        stroke: '#fff',
                        lineWidth: 1
                    })
                    .color('l(0) 0:#1E90FF 0.5:#1E90FF 1:#1E90FF');
                this.visitG2.area().position('ds*value').shape('smooth');
                this.visitG2.render();
            },
            changeType() {
                this.init();
            }
        },
        mounted() {
            this.visitG2F();
            this.init();
        }
        ,
    }
</script>

<style scoped>

</style>
