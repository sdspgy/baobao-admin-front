<template>
    <div style="background-color:#282b30;">
        <div id="RSsevenCar"></div>
        <div id="counterEcharts"></div>
        <div id="dauEcharts"></div>
        <div id="installEcharts"></div>
        <div id="gameinfoEcharts"></div>
        <div id="economyEcharts"></div>
    </div>
</template>

<script>
    import {
        queryRealReport
    } from '@/api/index';

    export default {
        name: "real",
        data() {
            return {
                carChart: {},
                carOption: {},

                counterChart: {},
                counterRealDate: ["-"],
                counterRealData: [0],

                dauChart: {},
                dauRealDate: ["-"],
                dauRealData: [0],

                installChart: {},
                installRealDate: ["-"],
                installRealData: [0],

                gameinfoChart: {},
                gameinfoRealDate: ["-"],
                gameinfoRealData: [0],

                economyChart: {},
                economyRealDate: ["-"],
                economyRealData: [0]
            }
        },
        methods: {
            init() {
                setInterval(() => {
                    this.queryReal()
                }, 5000);
            },
            queryReal() {
                let timeSection = this.realTimeUtil(new Date)
                let params = {
                    timeSection: timeSection,
                    gameid: (this.getStore('gameid')).toString()
                }

                if (this.counterRealDate.length > 50) {
                    this.counterRealDate.shift()
                }
                this.counterRealDate.push(timeSection.substring(11, 19))

                if (this.dauRealDate.length > 50) {
                    this.dauRealDate.shift()
                }
                this.dauRealDate.push(timeSection.substring(11, 19))

                if (this.installRealDate.length > 50) {
                    this.installRealDate.shift()
                }
                this.installRealDate.push(timeSection.substring(11, 19))

                if (this.gameinfoRealDate.length > 50) {
                    this.gameinfoRealDate.shift()
                }
                this.gameinfoRealDate.push(timeSection.substring(11, 19))

                if (this.economyRealDate.length > 50) {
                    this.economyRealDate.shift()
                }
                this.economyRealDate.push(timeSection.substring(11, 19))

                queryRealReport(params).then(res => {
                    if (res.success) {
                        if (this.counterRealData.length > 50) {
                            this.counterRealData.shift()
                        }
                        if (res.metricNumCOUNTER) {
                            this.counterRealData.push(res.metricNumCOUNTER)
                        } else {
                            this.counterRealData.push(0)
                        }
                        this.counterChart.setOption({
                            xAxis: {
                                data: this.counterRealDate
                            },
                            series: [{
                                name: 'counter',
                                data: this.counterRealData
                            }]
                        });

                        if (this.dauRealData.length > 50) {
                            this.dauRealData.shift()
                        }
                        if (res.metricNumDAU) {
                            this.dauRealData.push(res.metricNumDAU)
                        } else {
                            this.dauRealData.push(0)
                        }
                        this.dauChart.setOption({
                            xAxis: {
                                data: this.dauRealDate
                            },
                            series: [{
                                name: '活跃',
                                data: this.dauRealData
                            }]
                        });

                        if (this.installRealData.length > 50) {
                            this.installRealData.shift()
                        }
                        if (res.metricNumINSTALL) {
                            this.installRealData.push(res.metricNumINSTALL)
                        } else {
                            this.installRealData.push(0)
                        }
                        this.installChart.setOption({
                            xAxis: {
                                data: this.installRealDate
                            },
                            series: [{
                                name: '安装',
                                data: this.installRealData
                            }]
                        });

                        if (this.gameinfoRealData.length > 50) {
                            this.gameinfoRealData.shift()
                        }
                        if (res.metricNumGAMEINFO) {
                            this.gameinfoRealData.push(res.metricNumGAMEINFO)
                        } else {
                            this.gameinfoRealData.push(0)
                        }
                        this.gameinfoChart.setOption({
                            xAxis: {
                                data: this.gameinfoRealDate
                            },
                            series: [{
                                name: 'gameinfo',
                                data: this.gameinfoRealData
                            }]
                        });

                        if (this.economyRealData.length > 50) {
                            this.economyRealData.shift()
                        }
                        if (res.metricNumECONOMY) {
                            this.economyRealData.push(res.metricNumECONOMY)
                        } else {
                            this.economyRealData.push(0)
                        }
                        this.economyChart.setOption({
                            xAxis: {
                                data: this.economyRealDate
                            },
                            series: [{
                                name: 'economy',
                                data: this.economyRealData
                            }]
                        });

                        this.carOption.series[0].data[0].value = [...this.counterRealData].pop().toFixed(0)
                        this.carOption.series[1].data[0].value = [...this.economyRealData].pop().toFixed(0)
                        this.carChart.setOption(
                            this.carOption
                        )


                    }
                })

            },
            initRealEchart() {
                this.car();
                this.counter();
                this.dau();
                this.install();
                this.gameinfo();
                this.economy();
            },
            car() {
                this.carChart = this.$echarts.init(document.getElementById('RSsevenCar'));
                this.carOption = {
                    backgroundColor: '',
                    tooltip: {
                        formatter: '{c} {b}'
                    },
                    toolbox: {
                        show: true,
                        feature: {
                            mark: {show: true},
                            // restore: {show: true},
                            // saveAsImage: {show: true}
                        }
                    },
                    series: [
                        {
                            name: '',
                            type: 'gauge',
                            center: ['50%', '40%'],
                            min: 0,
                            max: 100,
                            splitNumber: 10,
                            radius: '70%',
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[0.4, 'lime'], [0.6, '#1e90ff'], [1, '#ff4500']],
                                    width: 3,
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            axisLabel: {            // 坐标轴小标记
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 15,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 25,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    width: 3,
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            pointer: {           // 分隔线
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 5
                            },
                            title: {
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    fontSize: 20,
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            detail: {
                                backgroundColor: 'rgba(30,144,255,0.8)',
                                borderWidth: 1,
                                borderColor: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 5,
                                offsetCenter: [0, '50%'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    color: '#fff'
                                }
                            },
                            data: [{value: 0, name: 'counter'}]
                        },
                        {
                            name: '',
                            type: 'gauge',
                            center: ['30%', '40%'],    // 默认全局居中
                            radius: '70%',
                            min: 0,
                            max: 10,
                            endAngle: 45,
                            splitNumber: 10,
                            axisLine: {            // 坐标轴线
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: [[0.3, 'lime'], [0.6, '#1e90ff'], [1, '#ff4500']],
                                    width: 2,
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            axisLabel: {            // 坐标轴小标记
                                fontWeight: 'bolder',
                                color: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 10
                            },
                            axisTick: {            // 坐标轴小标记
                                length: 12,        // 属性length控制线长
                                lineStyle: {       // 属性lineStyle控制线条样式
                                    color: 'auto',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            splitLine: {           // 分隔线
                                length: 20,         // 属性length控制线长
                                lineStyle: {       // 属性lineStyle（详见lineStyle）控制线条样式
                                    width: 3,
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            pointer: {
                                width: 5,
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 5
                            },
                            title: {
                                offsetCenter: [0, '-30%'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    fontStyle: 'italic',
                                    color: '#fff',
                                    shadowColor: '#fff', //默认透明
                                    shadowBlur: 10
                                }
                            },
                            detail: {
                                //backgroundColor: 'rgba(30,144,255,0.8)',
                                // borderWidth: 1,
                                borderColor: '#fff',
                                shadowColor: '#fff', //默认透明
                                shadowBlur: 5,
                                width: 80,
                                height: 30,
                                offsetCenter: [25, '20%'],       // x, y，单位px
                                textStyle: {       // 其余属性默认使用全局文本样式，详见TEXTSTYLE
                                    fontWeight: 'bolder',
                                    color: '#fff'
                                }
                            },
                            data: [{value: 0, name: 'economy'}]
                        },
                    ]
                };
                this.carChart.setOption(this.carOption);
            },
            counter() {
                this.counterChart = this.$echarts.init(document.getElementById('counterEcharts'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: '',
                    color: '#675bba',
                    title: {
                        // text: 'counter',
                        subtext: 'counter',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        areaStyle: {},
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                }
                this.counterChart.setOption(option);
            },
            dau() {
                this.dauChart = this.$echarts.init(document.getElementById('dauEcharts'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: '',
                    color: '#B2DFEE',
                    title: {
                        // text: 'dau',
                        subtext: '活跃',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        areaStyle: {},
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                }
                this.dauChart.setOption(option);
            },
            install() {
                this.installChart = this.$echarts.init(document.getElementById('installEcharts'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: '',
                    color: '#4169E1',
                    title: {
                        // text: '安装',
                        subtext: '安装',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        areaStyle: {},
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                }
                this.installChart.setOption(option);
            },
            gameinfo() {
                this.gameinfoChart = this.$echarts.init(document.getElementById('gameinfoEcharts'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: '',
                    color: '#90EE90',
                    title: {
                        // text: 'gameinfo',
                        subtext: 'gameinfo',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        areaStyle: {},
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                }
                this.gameinfoChart.setOption(option);
            },
            economy() {
                this.economyChart = this.$echarts.init(document.getElementById('economyEcharts'));
                // 指定图表的配置项和数据
                var option = {
                    backgroundColor: '',
                    color: '#CD5C5C',
                    title: {
                        // text: 'economy',
                        subtext: 'economy',
                        left: 'center'
                    },
                    xAxis: {
                        type: 'category',
                        boundaryGap: false,
                        data: [],
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    yAxis: {
                        type: 'value',
                        splitLine: {
                            show: false
                        },
                        axisLine: {
                            onZero: false,
                            lineStyle: {
                                color: '#AAAAAA'
                            }
                        },
                    },
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            label: {
                                backgroundColor: '#6a7985'
                            }
                        }
                    },
                    series: [{
                        data: [],
                        type: 'line',
                        areaStyle: {},
                        smooth: true,
                        label: {
                            normal: {
                                show: true,
                                position: 'top'
                            }
                        },
                    }]
                }
                this.economyChart.setOption(option);
            },
            realTimeUtil(time) {
                //前5秒的时间
                let dt1 = new Date(time.getTime() - (time.getSeconds() % 5) * 1000);
                let format1 = (this.dateFormat("YYYY-mm-dd HH:MM:SS", dt1))
                let dt2 = new Date(time.getTime() - (time.getSeconds() % 5) * 1000 - 5000);
                let format2 = (this.dateFormat("YYYY-mm-dd HH:MM:SS", dt2))

                return format2 + '_' + format1;
            },
            dateFormat(fmt, date) {
                let ret;
                const opt = {
                    "Y+": date.getFullYear().toString(),        // 年
                    "m+": (date.getMonth() + 1).toString(),     // 月
                    "d+": date.getDate().toString(),            // 日
                    "H+": date.getHours().toString(),           // 时
                    "M+": date.getMinutes().toString(),         // 分
                    "S+": date.getSeconds().toString()          // 秒
                    // 有其他格式化字符需求可以继续添加，必须转化成字符串
                };
                for (let k in opt) {
                    ret = new RegExp("(" + k + ")").exec(fmt);
                    if (ret) {
                        fmt = fmt.replace(ret[1], (ret[1].length == 1) ? (opt[k]) : (opt[k].padStart(ret[1].length, "0")))
                    }
                    ;
                }
                ;
                return fmt;
            },
        },
        mounted() {
            this.init();
            this.initRealEchart()
        }
    }
</script>

<style scoped>
    #RSsevenCar {
        width: 100%;
        height: 300px;
        margin-top: 10px;
    }

    #counterEcharts {
        width: 95%;
        height: 300px;
        margin-top: 10px;
    }

    #dauEcharts {
        width: 95%;
        height: 300px;
        margin-top: 10px;
    }

    #installEcharts {
        width: 95%;
        height: 300px;
        margin-top: 10px;
    }

    #gameinfoEcharts {
        width: 95%;
        height: 300px;
        margin-top: 10px;
    }

    #economyEcharts {
        width: 95%;
        height: 300px;
        margin-top: 10px;
    }

</style>
