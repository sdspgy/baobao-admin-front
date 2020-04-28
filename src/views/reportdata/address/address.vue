<template>
    <div>
        <h3>活跃地区分布：</h3>
        <!--为echarts准备一个dom容器-->
        <div id="myEcharts"></div>
    </div>
</template>

<script>
    import {queryIpAddress} from '@/api/index';
    import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
    export default {
        name: "address",
        data() {
            return {
                dauIpAddress: []
            }
        },
        methods: {
            init() {
                let param = {
                    gameid: parseInt(this.getStore('gameid'))
                }
                queryIpAddress(param).then(res => {
                    if (res.success) {
                        this.dauIpAddress = this.compute(res.datas);
                        console.log(this.dauIpAddress)
                        //初始化echarts实例
                        var myChart = this.$echarts.init(document.getElementById('myEcharts'));
                        // 指定图表的配置项和数据
                        var option = {
                            title: {
                                text: '活跃地图分布图',
                                left: 'center'
                            },
                            tooltip: {
                                trigger: 'item'
                            },
                            legend: {
                                orient: 'vertical',
                                left: 'left',
                                data: ['活跃地图分布图']
                            },
                            visualMap: {
                                type: 'piecewise',
                                pieces: [
                                    {min: 2000, max: 1000000, label: '大于等于2000人', color: '#FF6347'},
                                    {min: 500, max: 1999, label: '500-1999人', color: '#FF7256'},
                                    {min: 100, max: 499, label: '100-499人', color: '#FF8247'},
                                    {min: 10, max: 99, label: '10-99人', color: '#FF8C69'},
                                    {min: 1, max: 9, label: '1-9人', color: '#FFAEB9'},
                                ],
                                color: ['#FFAEB9', '#FF8C69', '#FF8247', '#FF7256', '#FF6347']
                            },
                            toolbox: {
                                show: true,
                                orient: 'vertical',
                                left: 'right',
                                top: 'center',
                                feature: {
                                    mark: {show: true},
                                    dataView: {show: true, readOnly: false},
                                    restore: {show: true},
                                    saveAsImage: {show: true}
                                }
                            },
                            roamController: {
                                show: true,
                                left: 'right',
                                mapTypeControl: {
                                    'china': true
                                }
                            },
                            series: [
                                {
                                    name: '人数',
                                    type: 'map',
                                    mapType: 'china',
                                    roam: false,
                                    label: {
                                        show: true,
                                        color: 'rgb(249, 249, 249)'
                                    },
                                    data: this.dauIpAddress
                                }
                            ]
                        };
                        //使用指定的配置项和数据显示图表
                        myChart.setOption(option);
                    }
                });
            },
            compute(datas) {
                let data = datas.map(info => {
                    return {
                        name: (info.province).replace("省", ""),
                        value: info.provinceNum
                    }
                })
                return data
            },
        },
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    #myEcharts {
        width: 100%;
        height: 600px;
        margin: 10px auto;
    }
</style>
