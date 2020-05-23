<template>
	<div style="background-color:#fff;">
		<RadioGroup style="margin-left: 10px" type="button" v-model="type" @on-change="init()">
			<Radio label="0" style="margin: 10px 10px"><span>安装</span></Radio>
			<Radio label="1" style="margin: 10px 10px"><span>活跃</span></Radio>
		</RadioGroup>
		<!--时间-->
		<div>
			<RadioGroup  style="margin-left: 10px" v-model="data" type="button" @on-change="dayEvent()">
				<Radio style="margin: 10px 10px" label="1">昨天</Radio>
				<Radio style="margin: 10px 10px" label="7">7日</Radio>
				<Radio style="margin: 10px 10px" label="30">30日</Radio>
			</RadioGroup>
			<DatePicker v-model="timeSection" :options="options" confirm @on-ok="timeSectionEvent()"
						type="daterange" show-week-numbers
						placement="bottom-end" placeholder="选择起始日期"
						style="margin-left:100px;width: 200px"></DatePicker>
		</div>
		<div class="deviceG2"><div id="deviceG2"></div></div>
	</div>
</template>

<script>
import { queryDevice } from '@/api/index';
import { weekChange } from '@/libs/changeWeek';

export default {
	name: 'reportDevice',
	data() {
		return {
			type: '0',
			chartDevice: [],
			G2Device: {},
			data: "7",
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
			this.init()
		},
		init() {
			this.queryDevices();
		},
		queryDevices() {
			let params = {
				gameid: parseInt(this.getStore('gameid')),
				type: parseInt(this.type),
				data: parseInt(this.data)
			};
			if (this.startTime !== 0) {
				params.data = this.startTime
				this.data = this.startTime
			}
			if (this.overTime !== 0) {
				params.overTime = this.overTime
			}
			queryDevice(params).then(e => {
				if (e.success) {
					let devices = e.deviceDis;
					let dailyInstallNum = e.shareDailyResultTypes[0].installNum,
						dailyDauNum = e.shareDailyResultTypes[0].dauNum;
					let chartDevice = [];
					let i = devices.length > 30 ? 30 : devices.length;
					if (this.type == '0') {
						for (; i > 0; i--) {
							let deviceObj = new Object();
							deviceObj.name = devices[i].device;
							deviceObj.value = devices[i].deviceInstallNumbers;
							deviceObj.precentage = dailyInstallNum == 0 ? 0 : (devices[i].deviceInstallNumbers / dailyInstallNum).toFixed(2);
							chartDevice.push(deviceObj);
						}
					} else {
						for (; i > 0; i--) {
							let deviceObj = new Object();
							deviceObj.name = devices[i].device;
							deviceObj.value = devices[i].deviceDauNumbers;
							deviceObj.precentage = dailyDauNum == 0 ? 0 : (devices[i].deviceDauNumbers / dailyDauNum).toFixed(2);
							chartDevice.push(deviceObj);
						}
					}
					this.chartDevice = chartDevice.sort(this.compares);
					this.G2Device.changeData(this.chartDevice);
				}
			});
		},
		compares(obj1, obj2) {
			var val1 = obj1.value;
			var val2 = obj2.value;
			if (val1 < val2) {
				return 1;
			} else if (val1 > val2) {
				return -1;
			} else {
				return 0;
			}
		},
		defaultG2() {
			this.G2Device = new G2.Chart({
				container: 'deviceG2',
				forceFit: true,
				width: 800,
				height: 400
			});
			this.G2Device.source(this.chartDevice, {});
			// this.G2Device.coord();
			// 坐标轴文本旋转
			this.G2Device.axis('name', {
				label: {
					rotate: Math.PI / 0.3,
					textAlign: 'end',
					textBaseline: 'middle'
				}
			});
			this.G2Device.tooltip({
			    // showCrosshairs: true, //纵坐标线
			    showItemMarker: false, //去小原点
			    onShow: function onShow(ev) {
			        const items = ev.items;
			        items[0].name = null;
			        items[0].name = items[0].title;
			        items[0].value = '' + items[0].value + ';' + items[0].origin.precentage + '%';
			    },
			    offsetX: -30
			});
			this.G2Device.interval()
				.position('name*value')
				.label('value', {
					offset: 10,
					style: {
						fill: '#595959',
						fontSize: 12
					}
				});
			this.G2Device.scale('value', {
				alias: '数量'
			});
			// 柱状图添加文本
			// this.chartDevice.forEach(function (obj) {
			//     this.G2Device.guide().text({
			//         position: [obj.name, obj.value],
			//         content: obj.value,
			//         style: {
			//             textAlign: 'center',
			//             textBaseline: 'bottom'
			//         },
			//         offsetY: 5,
			//         offsetX: 7,
			//     });
			// });
			this.G2Device.render();
		}
	},
	mounted() {
		this.defaultG2();
		this.init();
	}
};
</script>

<style scoped>
.deviceG2 {
	padding: 0px 0px 0px 50px;
	border-radius: 10px 10px 10px 10px;
	background-color: #fff;
	width: 80%;
	margin: 10px 10px;
}
</style>
