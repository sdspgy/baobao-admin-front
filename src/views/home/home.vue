<style lang="less">
    @import "./home.less";
    @import "../../styles/common.less";

    .isGame {
        border: 1px solid sandybrown;
    }

    .gameItem:hover {
        cursor: pointer //鼠标悬浮变
    }
</style>

<template>
    <div>
        <div>
            <Row :gutter="10">
                <Col :md="24" :lg="8">
                    <Row class-name="home-page-row1" :gutter="10">
                        <Col :md="12" :lg="24" :style="{marginBottom: '10px'}">
                            <Card>
                                <Row type="flex" class="user-infor">
                                    <Col span="8">
                                        <Row class-name="made-child-con-middle" type="flex" align="middle"><img
                                                class="avator-img" :src="avatarPath"/>
                                        </Row>
                                    </Col>
                                    <Col span="16" style="padding-left:6px;">
                                        <Row class-name="made-child-con-middle" type="flex" align="middle">
                                            <div>
                                                <b class="card-user-infor-name">{{ username }}</b>
                                                <p>数据分析后台管理系统 欢迎您的使用</p>
                                            </div>
                                        </Row>
                                    </Col>
                                </Row>


                            </Card>
                        </Col>
                    </Row>
                </Col>
            </Row>
        </div>
        <div>
            <h1>点击左侧菜单查看详情</h1>
        </div>

        <!--        <div style="position: absolute;top: -50px;left: 30px;z-index: 9999">{{gamesForm.name}}</div>-->

        <div style="display: flex">
            <div class="gameItem" v-for="(item,index) in games"
                 style="width: 100px;height: 100px;background-color:#fff;padding-top:30px;margin-top: 30px;margin-left:50px;text-align: center;border-radius: 10px 10px 10px 10px;color: #40a9ff;font-style: normal;font-size: 16px;font-weight: bolder;"
                 :class="gamesForm.gameid == item.gameid || index == 0 ? 'isGame' : ''" @click="changeGame(item.gameid)">
                <p>{{item.gamename}}</p>
            </div>
        </div>

    </div>
</template>

<script>
    import Cookies from "js-cookie";
    import "gitalk/dist/gitalk.css";
    import {queryTableConsoleGames} from '@/api/index';
    import {router} from '@/router/index';

    export default {
        name: "home",
        components: {},
        data() {
            return {
                username: "",
                games: [],
                gamesForm: {
                    gameid: 0,
                    name: ''
                }
            };
        },
        computed: {
            avatarPath() {
                return localStorage.avatorImgPath;
            }
        },
        methods: {
            init() {
                let userInfo = JSON.parse(Cookies.get("userInfo"));
                this.username = userInfo.username;
                this.queryAllGames()
            },
            queryAllGames() {
                queryTableConsoleGames().then(res => {
                    if (res.success) {
                        this.games = res.result;
                        if (this.games.length <= 0) {
                            this.$Notice.open({
                                title: '⚠️',
                                desc: '请联系管理员分配游戏！请勿有其它操作！1秒后自动退出管理台！'
                            });
                            // alert("请联系管理员分配游戏！请勿有其它操作！1秒后自动退出管理台！")
                            var that = this;
                            window.setTimeout(function () {
                                that.$store.commit("logout", that);
                                that.$store.commit("clearOpenedSubmenu");
                                that.setStore("accessToken", "");
                                // 强制刷新页面 重新加载router
                                location.reload();
                            }, 1500)
                        }else {
                                this.setStore("gameid",  this.games[0].gameid);
                                this.gamesForm.name =  this.games[0].gamename;
								this.gamesForm.gameid =  this.games[0].gamename;
                                this.setStore("currencyRate",  this.games[0].currencyrate);
                                this.setStore("parentId",  this.games[0].parentid);
                                this.$emit('sendMsg',  this.games[0].gamename);
                                this.setStore("gamename",this.games[0],gameName)

                        }
                    }
                });
            },

            changeGame(info) {
                let gameid = info;
                this.gamesForm.gameid = gameid;
                this.setStore("gameid", gameid);
                this.games.forEach(item => {
                    if (item.gameid === gameid) {
                        this.gamesForm.name = item.gamename;
                        this.setStore("currencyRate", item.currencyrate);
                        this.setStore("parentId", item.parentid);
                        this.setStore("gamename", item.gamename);

                    }
                })
                this.$emit('sendMsg', this.gamesForm.name)
                this.$store.commit("clearAllTags");
                var that = this;
                    that.$router.push({
                        name: 'reportdata',
						})
            },
            getGameInfo() {
                return this.gamesForm.name
            }
        },
        mounted() {
            this.init();
        }
    };
</script>
