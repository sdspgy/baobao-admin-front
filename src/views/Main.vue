<style lang="less">
    @import "./main.less";

    .games {
        position: relative;
        left: 30%;
        top: -50px;
    }

    .isGame {
        border: 1px solid sandybrown;
        text-align: center;
    }

    .ivu-menu-dark {
        background-color: #fff;
    }
</style>

<template>
    <div class="main" :class="{'main-hide-text': shrink}">
        <div
                class="sidebar-menu-con menu-bar"
                :style="{width: shrink?'60px':'220px', overflow: shrink ? 'visible' : 'auto'}"
        >
            <shrinkable-menu
                    style="background-color:#fff;"
                    :shrink="shrink"
                    @on-change="handleSubmenuChange"
                    :theme="menuTheme"
                    :before-push="beforePush"
                    :open-names="openedSubmenuArr"
                    :menu-list="menuList"
            >
                <div slot="top" class="logo-con">
                    <img v-show="!shrink" src="../assets/logo.png" key="max-logo">
                    <img v-show="shrink" src="../assets/logo-min.png" key="min-logo">
                </div>
            </shrinkable-menu>
        </div>
        <div style="background-color: #fff;" class="main-header-con" :style="{paddingLeft: shrink?'60px':'220px'}">
            <div class="main-header">
                <div class="navicon-con">
                    <Button
                            :style="{transform: 'rotateZ(' + (this.shrink ? '-90' : '0') + 'deg)'}"
                            type="text"
                            @click="toggleClick"
                    >
                        <Icon type="md-menu" size="32"></Icon>
                    </Button>
                </div>
                <div class="header-middle-con">
                    <div class="main-breadcrumb" v-if="navType==4">
                        <breadcrumb-nav :currentPath="currentPath"></breadcrumb-nav>
                    </div>
                    <div class="main-nav-menu" v-if="navType==1||navType==2">
                        <Menu mode="horizontal" :active-name="currNav" @on-select="selectNav">
                            <MenuItem v-for="(item, i) in navList.slice(0, 3)" :key="i" :name="item.name">
                                <Icon :type="item.icon" style="margin-bottom:3px" v-if="navType==1"/>
                                {{item.title}}
                            </MenuItem>
                            <Submenu name="sub" v-if="navList.length>3">
                                <template slot="title">更多</template>
                                <MenuItem
                                        v-for="(item, i) in navList.slice(3, navList.length)"
                                        :key="i"
                                        :name="item.name"
                                >
                                    <Icon :type="item.icon" style="margin-bottom:3px" v-if="navType==1"/>
                                    {{item.title}}
                                </MenuItem>
                            </Submenu>
                        </Menu>
                    </div>
                    <div style="background-color:#fff;" class="main-nav" v-if="navType==3">
                        <Dropdown transfer @on-click="selectNav">
                            <div style="cursor: pointer">
                                {{currNavTitle}}
                                <Icon type="ios-arrow-down"></Icon>
                            </div>
                            <DropdownMenu slot="list">
                                <DropdownItem
                                        style="background-color:#fff;"
                                        v-for="(item, i) in navList"
                                        :key="i"
                                        :name="item.name"
                                        :selected="currNav==item.name"
                                >
                                    <div class="nav-item">
                                        <Icon :type="item.icon" :size="16" style="margin: 0 10px 3px 0"></Icon>
                                        {{item.title}}
                                    </div>
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                </div>

                <!--                <div style="position: absolute;top: 430px;z-index: 999;display: flex">-->
                <!--                    <div v-for="item in games"-->
                <!--                         style="width: 100px;height: 100px;background-color:#fff;margin-top: 10px;margin-left:50px" :class="gamesForm.gameid == item.gameid ? 'isGame' : ''" @click="changeGame(item.gameid)">-->
                <!--                            <p>{{item.name}}</p>-->
                <!--                    </div>-->
                <!--                </div>-->

                <!--                <Form style="position: absolute;top: 430px;z-index: 999" ref="serverForm" class="games" :model="gamesForm" :label-width="80">-->
                <!--                    <FormItem label="游戏名称" prop="gameid">-->
                <!--                        <Select v-model="gamesForm.gameid" style="width:200px"-->
                <!--                                :on-change="changeGame()">-->
                <!--                            <Option v-for="item in games" :value="item.gameid"-->
                <!--                                    :key="item.gameid">{{ item.name }}-->
                <!--                            </Option>-->
                <!--                        </Select>-->
                <!--                    </FormItem>-->
                <!--                </Form>-->

                <div style="background-color:#fff;"
                     :class="{'header-avator-con':navType!=4, 'header-avator-con nav4':navType==4}">
                    <Dropdown @on-click="selectNav" class="options" v-if="navType==4">
                        <Icon type="ios-apps" :size="24" class="language"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem
                                    style="background-color: #fff;"
                                    v-for="(item, i) in navList"
                                    :key="i"
                                    :name="item.name"
                                    :selected="currNav==item.name"
                            >
                                <div>
                                    <Icon :type="item.icon" :size="14" style="margin: 0 10px 2px 0"></Icon>
                                    {{item.title}}
                                </div>
                            </DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <div style="width:200px;height:50px;line-height:60px;position: relative;left: -30%">当前所在游戏：<span
                            style="color: #40a9ff;font-size: 16px">{{gameName}}</span></div>
                    <full-screen v-model="isFullScreen" @on-change="fullscreenChange"></full-screen>
                    <Dropdown @on-click="handleLanDropdown" class="options">
                        <Icon type="md-globe" :size="24" class="language"></Icon>
                        <DropdownMenu slot="list">
                            <DropdownItem name="zh-CN">中文</DropdownItem>
                            <DropdownItem name="en-US">English</DropdownItem>
                        </DropdownMenu>
                    </Dropdown>
                    <!-- <lock-screen></lock-screen> -->
                    <div class="user-dropdown-menu-con">
                        <Row type="flex" justify="end" align="middle" class="user-dropdown-innercon">
                            <Dropdown transfer trigger="hover" @on-click="handleClickUserDropdown">
                                <a href="javascript:void(0)">
                                    <span class="main-user-name">{{ username }}</span>
                                    <Icon type="md-arrow-dropdown"/>
                                    <Avatar :src="avatarPath" style="background: #619fe7;margin-left: 10px;"></Avatar>
                                </a>
                                <DropdownMenu slot="list">
                                    <DropdownItem name="ownSpace">{{ $t('userCenter') }}</DropdownItem>
                                    <DropdownItem name="changePass">{{ $t('changePass') }}</DropdownItem>
                                    <DropdownItem name="loginout" divided>{{ $t('logout') }}</DropdownItem>
                                </DropdownMenu>
                            </Dropdown>
                        </Row>
                    </div>
                </div>
            </div>
            <div class="tags-con">
                <tags-page-opened :pageTagsList="pageTagsList"></tags-page-opened>
            </div>
        </div>

        <div class="single-page-con" :style="{left: shrink?'60px':'220px'}">
            <div class="single-page">
                <keep-alive :include="cachePage">
                    <router-view></router-view>
                </keep-alive>
            </div>
        </div>
        <!-- 全局加载动画 -->
        <circleLoading class="loading-position" v-show="loading"/>
    </div>
</template>

<script>
    import shrinkableMenu from "./main-components/shrinkable-menu/shrinkable-menu.vue";
    import tagsPageOpened from "./main-components/tags-page-opened.vue";
    import breadcrumbNav from "./main-components/breadcrumb-nav.vue";
    import fullScreen from "./main-components/fullscreen.vue";
    import lockScreen from "./main-components/lockscreen/lockscreen.vue";
    import circleLoading from "@/views/my-components/circle-loading.vue";
    import Cookies from "js-cookie";
    import util from "@/libs/util.js";
    import {queryAllGameReq} from '@/api/index';

    export default {
        components: {
            shrinkableMenu,
            tagsPageOpened,
            breadcrumbNav,
            fullScreen,
            lockScreen,
            circleLoading
        },
        data() {
            return {
                // gameName: '',
                shrink: false,
                username: "",
                userId: "",
                isFullScreen: false,
                openedSubmenuArr: this.$store.state.app.openedSubmenuArr,
                firstThreeNav: [],
                lastNav: [],
                navType: 1,
                games: [],
                gamesForm: {
                    gameid: 1
                }
            };
        },
        computed: {
            loading() {
                return this.$store.state.app.loading;
            },
            navList() {
                return this.$store.state.app.navList;
            },
            currNav() {
                return this.$store.state.app.currNav;
            },
            currNavTitle() {
                return this.$store.state.app.currNavTitle;
            },
            menuList() {
                return this.$store.state.app.menuList;
            },
            pageTagsList() {
                return this.$store.state.app.pageOpenedList; // 打开的页面对象
            },
            currentPath() {
                return this.$store.state.app.currentPath; // 当前面包屑数组
            },
            avatarPath() {
                return localStorage.avatorImgPath;
            },
            cachePage() {
                return this.$store.state.app.cachePage;
            },
            lang() {
                return this.$store.state.app.lang;
            },
            menuTheme() {
                return this.$store.state.app.menuTheme;
            },
            mesCount() {
                return this.$store.state.app.messageCount;
            },
            gameName() {
                return this.$store.state.app.gameName;
            }
        },
        stompClient: {
            monitorIntervalTime: 100,
            stompReconnect: true,
            timeout(orgCmd) {
            }
        },
        methods: {
            getInfo(data) {
                this.gameName = data;
            },
            init() {
                // let i = this.$refs.sum.getGameInfo();
                this.$store.commit("keepGameName", this.getStore("gamename"));
                let pathArr = util.setCurrentPath(this, this.$route.name);
                // this.$store.commit("updateMenulist");
                if (pathArr.length >= 2) {
                    this.$store.commit("addOpenSubmenu", pathArr[1].name);
                }
                let userInfo = JSON.parse(Cookies.get("userInfo"));
                this.username = userInfo.username;
                this.userId = userInfo.id;
                this.checkTag(this.$route.name);

                // this.queryAllGames();
            },

            queryAllGames() {
                queryAllGameReq().then(res => {
                    if (res.success) {
                        this.games = res.result.records;
                        this.games.forEach(item => {
                            if (item.gameid === 1) {
                                this.setStore("gameid", 1);
                                this.setStore("currencyRate", item.currencyRate);
                                this.setStore("parentId", item.parentId);
                            }
                        })
                    }
                });
            },

            changeGame(info) {
                let gameid = info;
                this.gamesForm.gameid = gameid;
                this.setStore("gameid", gameid);
                this.games.forEach(item => {
                    if (item.gameid === gameid) {
                        this.setStore("currencyRate", item.currencyRate);
                        this.setStore("parentId", item.parentId);
                    }
                })
            },

            selectNav(name) {
                this.$store.commit("setCurrNav", name);
                this.setStore("currNav", name);
                // 清空所有已打开标签
                // this.$store.commit("clearAllTags");
                this.$router.push({
                    name: "home_index"
                });
                util.initRouter(this);
            },
            toggleClick() {
                this.shrink = !this.shrink;
            },
            handleLanDropdown(name) {
                this.$i18n.locale = name;
                this.$store.commit("switchLang", name);
            },
            handleClickUserDropdown(name) {
                if (name == "ownSpace") {
                    util.openNewPage(this, "ownspace_index");
                    this.$router.push({
                        name: "ownspace_index"
                    });
                } else if (name == "ownSpaceOld") {
                    util.openNewPage(this, "ownspace_old");
                    this.$router.push({
                        name: "ownspace_old"
                    });
                } else if (name == "changePass") {
                    util.openNewPage(this, "change_pass");
                    this.$router.push({
                        name: "change_pass"
                    });
                } else if (name == "loginout") {
                    // 退出登录
                    this.$store.commit("logout", this);
                    this.$store.commit("clearOpenedSubmenu");
                    this.setStore("accessToken", "");
                    // 强制刷新页面 重新加载router
                    location.reload();
                }
            },
            checkTag(name) {
                let openpageHasTag = this.pageTagsList.some(item => {
                    if (item.name == name) {
                        return true;
                    }
                });
                if (!openpageHasTag) {
                    //  解决关闭当前标签后再点击回退按钮会退到当前页时没有标签的问题
                    util.openNewPage(
                        this,
                        name,
                        this.$route.params || {},
                        this.$route.query || {}
                    );
                }
            },
            handleSubmenuChange(val) {
                // console.log(val)
            },
            beforePush(name) {
                // console.log(name)
                return true;
            },
            fullscreenChange(isFullScreen) {
                // console.log(isFullScreen);
            }
        },
        watch: {
            $route(to) {
                this.$store.commit("setCurrentPageName", to.name);
                let pathArr = util.setCurrentPath(this, to.name);
                if (pathArr.length > 2) {
                    this.$store.commit("addOpenSubmenu", pathArr[1].name);
                }
                this.checkTag(to.name);
                localStorage.currentPageName = to.name;
            },
            lang() {
                util.setCurrentPath(this, this.$route.name); // 在切换语言时用于刷新面包屑
            }
        },
        mounted() {
            this.init();
        },
        created() {
            // 显示打开的页面的列表
            this.$store.commit("setOpenedList");
        }
    };
</script>
