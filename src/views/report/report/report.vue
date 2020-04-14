<template>
    <div>
        <div>
            <Select v-model="searchForm.gameid" style="width:200px">
                <Option v-for="item in games" :value="item.gameid" :key="item.gameid">{{ item.gamename }}</Option>
            </Select>
            <Row>
                <Col span="12">
                    <DatePicker v-model="time" type="daterange" format="yyyy-MM-dd" placeholder="选择开始时间"
                                style="width: 200px"></DatePicker>
                </Col>
            </Row>
            <Button @click="download" type="info">下载</Button>
            <!-- 创建图表容器 -->
            <!--        <div id="c1"></div>-->
            <!--        <Button @click="changeAntvData" type="info">Antv</Button>-->
            <!--        <div style="min-height: 500px; justify-content: center;position: relative" id="map"/>-->
        </div>
        <div class="rpcStyle">
            <Select v-model="rpc.gameid" style="width:200px">
                <Option v-for="item in games" :value="item.gameid" :key="item.gameid">{{ item.gamename }}</Option>
            </Select>
            <Row>
                <Col span="12">
                    <DatePicker v-model="date" type="date" placeholder="Select date" style="width: 200px"></DatePicker>
                </Col>
            </Row>
            <Button @click="selectRpc" type="info">查询</Button>
        </div>
    </div>

</template>

<script>
    import {queryAllAdvertReq, queryRpc,queryTableConsoleGames, downloadReportReq, queryIpAddress} from '@/api/index';
    import {Scene, PolygonLayer, LineLayer} from '@antv/l7';
    import {GaodeMap} from '@antv/l7-maps';
    import $ from 'jquery'
    import '../../../../node_modules/echarts/map/js/china.js' // 引入中国地图数据
    export default {
        name: "report",
        data() {
            return {
                games: [],
                searchForm: {
                    gameid: '',
                },
                rpc: {
                    gameid: '',
                },
                time: [],
                date: "",
                data: [
                    {genre: 'Sports', sold: 275},
                    {genre: 'Strategy', sold: 115},
                    {genre: 'Action', sold: 120},
                    {genre: 'Shooter', sold: 350},
                    {genre: 'Other', sold: 150}
                ],
                chart: {},
                dauIpAddress: []
            }
        },
        methods: {
            init() {
                this.getGames();
                // this.antvG2Text();
                this.antvL();
            },
            changeAntvData() {
                const data = [
                    {genre: 'Sports', sold: 105},
                    {genre: 'Strategy', sold: 105},
                    {genre: 'Action', sold: 105},
                    {genre: 'Shooter', sold: 105},
                    {genre: 'Other', sold: 105}
                ]
                this.chart.changeData(data);
            },
            antvG2Text() {
                this.chart = new G2.Chart({
                    container: 'c1', // 指定图表容器 ID
                    width: 600, // 指定图表宽度
                    height: 300 // 指定图表高度
                });
                // Step 2: 载入数据源
                this.chart.source(this.data);
                // Step 3：创建图形语法，绘制柱状图，由 genre 和 sold 两个属性决定图形位置，genre 映射至 x 轴，sold 映射至 y 轴
                this.chart.interval().position('genre*sold').color('genre')
                // Step 4: 渲染图表
                this.chart.render();
            },

            antvL() {
                const scene = new Scene({
                    id: 'map',
                    map: new GaodeMap({
                        pitch: 0,
                        style: 'light',
                        center: [107.042225, 37.66565],
                        zoom: 3.87
                    })
                });
                scene.on('loaded', () => {
                    fetch('https://gw.alipayobjects.com/os/rmsportal/JToMOWvicvJOISZFCkEI.json')
                        .then(res => res.json())
                        .then(data => {
                            debugger
                            const colors = [
                                '#D7F9F0',
                                '#A6E1E0',
                                '#72BED6',
                                '#5B8FF9',
                                '#3474DB',
                                '#005CBE',
                                '#00419F',
                                '#00287E'
                            ];
                            const layer = new PolygonLayer({})
                                .source(data)
                                .color('name', colors)
                                .shape('fill')
                                .active(true)
                                .style({
                                    opacity: 0.9
                                });

                            const layer2 = new LineLayer({
                                zIndex: 2
                            })
                                .source(data)
                                .color('#fff')
                                .size(0.3)
                                .style({
                                    opacity: 1
                                });

                            scene.addLayer(layer);
                            scene.addLayer(layer2);
                        });
                });
            },
            getGames() {
                queryTableConsoleGames().then(res => {
                    if (res.success) {
                        this.games = res.result;
                    }
                });

            },
            selectRpc() {
                this.startRpc()
            },
            startRpc() {
                let param = {
                    gameid: this.rpc.gameid.toString(),
                    ds: this.timeUtil(this.date).toString(),
                    snid: "1"
                }
                queryRpc(param).then(res => {
                    if (res.success) {
                        alert("success")
                    }
                })
            },

            download() {
                let t = this.time;
                if (this.searchForm.gameid == '' || undefined) {
                    alert('请选择游戏');
                    return;
                }
                if (this.time[0] == '') {
                    alert("请输入时间");
                    return;
                }
                let gameid = this.searchForm.gameid,
                    beginData = this.timeUtil(this.time[0]),
                    overData = this.timeUtil(this.time[1]);
                // let url = `https://report.nuojuekeji.com/api/report/generateReport?startDs=${beginData}&endDs=${overData}&gameId=${gameid}`;
                window.location.href = `https://report.nuojuekeji.com/api/report/generateReport?startDs=${beginData}&endDs=${overData}&gameId=${gameid}&snid=1`;
                //
                // let url = 'https://report.nuojuekeji.com/api/report/generateReport?startDs=2019-11-18&endDs=2019-12-16&gameId=8';
                // downloadReportReq(url).then(res => {
                //     debugger
                //     // const blob = new Blob([response.data]);
                //     // const fileName = 'user.xls';
                //     // const linkNode = document.createElement('a');
                //     //
                //     // linkNode.download = fileName; //a标签的download属性规定下载文件的名称
                //     // linkNode.style.display = 'none';
                //     // linkNode.href = URL.createObjectURL(blob); //生成一个Blob URL
                //     // document.body.appendChild(linkNode);
                //     // linkNode.click();  //模拟在按钮上的一次鼠标单击
                //     //
                //     // URL.revokeObjectURL(linkNode.href); // 释放URL 对象
                //     // document.body.removeChild(linkNode);
                //
                // });
            },
            timeUtil(time) {
                return time.getFullYear() + "-" + ((time.getMonth() + 1) < 10 ? "0" + (time.getMonth() + 1) : (time.getMonth() + 1)) + "-" + (time.getDate() < 10 ? "0" + time.getDate() : time.getDate());
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
        }
        ,
        mounted() {
            this.init();
        }
    }
</script>

<style scoped>
    .container {
        width: 900px;
        height: 900px;
    }

    #myEcharts {
        width: 100%;
        height: 600px;
        margin: 10px auto;
    }

    .rpcStyle {
        width: 50%;
        height: 300px;
        position: relative;
        left: 40%;
        top: -100px;
    }
</style>
