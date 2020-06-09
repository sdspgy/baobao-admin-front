<template>
    <div class="task">
        <Button style="margin: 10px 10px;" @click="selectTemplate" type="primary" icon="md-add"
                v-show="this.$route.meta.permTypes.includes('add')">选择模版
        </Button>
        <Row>
            <Table :loading="loading" border :columns="columns" :data="taskList" sortable="custom"
                   ref="table"></Table>
        </Row>

        <Modal title="选择模版" v-model="selectTaskModalVisible" :mask-closable="false" :width="500">
            <RadioGroup v-model="types" @on-change="typeEvent">
                <Radio v-for="(item,index) in templateListGroup" :key="index" :label="item[0].types"></Radio>
            </RadioGroup>
            <Divider/>
            <RadioGroup v-model="template" @on-change="openInsertTask">
                <Radio v-for="(item,index) in likeTypeTemplate" :key="index"
                       :label="item">{{item.describes}}
                </Radio>
            </RadioGroup>
            <Divider/>
            <Form v-if="taskFormShow" ref="taskForm" :model="taskForm" :label-width="80" :rules="taskFormValidate">
                <FormItem label="任务名" prop="describes"
                          :rules="{required: true, message: 'can not be empty', trigger: 'blur'}"
                          :error="errordescribes"><Input
                        v-model="taskForm.describes"/></FormItem>
                <FormItem v-for="(item,index) in textParams" :key="index" :label="item.paramName" prop="value"><Input
                        v-model="textParams[index].value"/></FormItem>

                <FormItem v-for="(item,index) in timeParams" :key="index" :label="item.paramName" prop="value">
                    <Col span="12">
                        <DatePicker v-model="timeParams[index].value" format="yyyy-MM-dd" type="date"
                                    :placeholder="'Select' + item.paramName"
                                    style="width: 200px"></DatePicker>
                    </Col>
                </FormItem>

            </Form>

            <div slot="footer">
                <Button type="text" @click="cancelSelectTemplate">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="insertTask">创建任务</Button>
            </div>
        </Modal>

        <Modal title="创建任务" v-model="insertTaskModalVisible" :mask-closable="false" :width="500">

            <div slot="footer">
                <Button type="text" @click="cancelTask">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="insertTask">创建任务</Button>
            </div>
        </Modal>

        <Row style="margin-top: 50px;margin-bottom: 50px;">
            <Button v-if="taskResult.length > 0 ? true :false" type="primary" size="large" @click="exportData">
                <Icon type="ios-download-outline"></Icon>
                导出
            </Button>
            <br>
            <Table :loading="loading" height="500" border :columns="columnsResult" :data="taskResult" sortable="custom"
                   ref="tables"></Table>
        </Row>
    </div>
</template>

<script>
    import {
        queryAllTask,
        queryTemplateResult,
        insertTask,
        deleteTask,
        queryParamsByIds,
        queryAllTemplateGroup,
        customReport
    } from '@/api/index';

    export default {
        name: "task",
        comments: {},
        data() {
            return {
                taskList: [],
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '任务ID',
                        key: 'taskId',
                        width: 80
                    },
                    {
                        title: '任务名',
                        key: 'describes',
                        width: 150
                    },
                    {
                        title: '任务sql',
                        key: 'taskSql',
                        render: (h, params) => {
                            return h('span', {
                                    style:
                                        {
                                            diaplay: 'inline - block',
                                            width: '100 %',
                                            overflow: 'hidde',
                                            textOverflow: ' ellipsis',
                                            whiteSpace: 'nowrap'
                                        }
                                },
                                params.row.taskSql
                            )
                        }
                    },
                    {
                        title: '状态',
                        key: 'state',
                        width: 150,
                        render: (h, params) => {
                            if (params.row.state == 0) {
                                return h('span', {
                                        style: {
                                            color: '#6495ED'
                                        },
                                    },
                                    '执行中...'
                                )
                            }
                            if (params.row.state == 1) {
                                return h('span', {
                                    style: {
                                        color: '#00CD00'
                                    },
                                }, '完成')
                            }
                            if (params.row.state == 2) {
                                return h('span', {
                                    style: {
                                        color: '#FF7D41'
                                    },
                                }, '错误')
                            }
                            if (params.row.state == 3) {
                                return h('span', {
                                        style: {
                                            color: '#6495ED'
                                        },
                                    },
                                    '待执行'
                                )
                            }
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
                        width: 150
                    },
                    {
                        title: '开始执行时间',
                        key: 'startTime',
                        width: 150
                    },
                    {
                        title: '结束时间',
                        key: 'finishTime',
                        width: 150
                    },
                    {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            let execute = h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: !this.$route.meta.permTypes.includes('search')
                                    },
                                    style: {marginRight: '5px'},
                                    on: {
                                        click: () => {
                                            this.execute(params.row);
                                        }
                                    }
                                },
                                '执行'
                            );
                            let queryResult = h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: ((params.row.state != 1 || (!this.$route.meta.permTypes.includes('edit')) ? true : false))
                                    },
                                    style: {marginRight: '5px'},
                                    on: {
                                        click: () => {
                                            this.queryResult(params.row);
                                        }
                                    }
                                },
                                '展示结果'
                            );
                            let deleteButton = h(
                                'Button',
                                {
                                    props: {
                                        type: 'error',
                                        size: 'small',
                                        disabled: !this.$route.meta.permTypes.includes('delete')
                                    },
                                    on: {
                                        click: () => {
                                            this.remove(params.row);
                                        }
                                    }
                                },
                                '删除'
                            );
                            return h('div', [execute, queryResult, deleteButton
                            ])
                                ;
                        }
                    }
                ],
                selectTaskModalVisible: false,
                insertTaskModalVisible: false,
                templateListGroup: {},
                types: '',
                template: {},
                likeTypeTemplate: [],

                textParams: [],
                timeParams: [],
                taskForm: {
                    describes: '',
                },
                columnsResult: [],
                taskResult: [],
                taskFormShow: false,
                downloadCvsName: ''
            }
        },
        mounted() {
            this.init();
        },
        methods: {
            init() {
                this.queryAllTemplateGroup();
                this.queryAllTask();
            },
            queryAllTemplateGroup() {
                queryAllTemplateGroup().then(res => {
                    if (res.success) {
                        this.templateListGroup = res.templateListGroup;
                    }
                })
            },
            queryAllTask() {
                queryAllTask().then(res => {
                    if (res.success) {
                        this.taskList = res.taskList
                    }
                })
            },
            typeEvent() {
                this.likeTypeTemplate = this.templateListGroup[this.types];
                this.taskForm.describes = '';
                this.timeParams = [];
                this.textParams = [];
                this.template = {}
            },
            selectTemplate() {
                this.types = '';
                this.template = {};
                this.likeTypeTemplate = [];

                this.taskForm.describes = '';
                this.timeParams = [];
                this.textParams = [];
                this.taskFormShow = false;
                this.selectTaskModalVisible = true
            },
            cancelSelectTemplate() {
                this.selectTaskModalVisible = false
            },
            openInsertTask() {
                this.taskForm.describes = '';
                this.timeParams = [];
                this.textParams = [];

                let params = {
                    ids: this.template.params.split(',')
                };
                queryParamsByIds(params).then(res => {
                    if (res.success) {
                        if (res.params) {
                            let params = res.params;
                            for (let item in params) {
                                if (params[item].type === 1) {
                                    this.timeParams.push(params[item])
                                }
                                if (params[item].type === 0) {
                                    this.textParams.push(params[item])
                                }
                                this.taskFormShow = true
                            }
                        }
                    }
                })
            },
            cancelTask() {
                this.insertTaskModalVisible = false;
            },
            insertTask() {
                if (!this.types) {
                    this.$Message.info('请选择类型');
                    return
                }
                if (JSON.stringify(this.template) == '{}') {
                    this.$Message.info('请选择模版');
                    return
                }
                // this.selectTaskModalVisible = false;
                let param = '';
                for (let item in this.textParams) {
                    param += this.textParams[item].paramEnName + ',' + this.textParams[item].value + ';'
                }
                for (let item in this.timeParams) {
                    param += this.timeParams[item].paramEnName + ',' + this.dateFormat(this.timeParams[item].value) + ';'
                }
                let paramInsertTask = {
                    describes: this.taskForm.describes,
                    templateId: this.template.templateId,
                    content:this.template.content,
                    param: param,
                }
                insertTask(paramInsertTask).then(res => {
                    if (res.success) {
                        this.queryAllTask()
                    }
                })
                this.selectTaskModalVisible = false
            },
            execute(v) {
                let params = {
                    taskId: v.taskId,
                    sql: v.taskSql
                }
                customReport(params).then(res => {
                    if (res.msg) {
                        this.$Message.info('正在运行');
                    } else if (res.result) {

                    } else {
                        this.$Message.info('内部错误');
                    }
                })
            },
            queryResult(v) {
                this.columnsResult = [];
                this.taskResult = [];
                this.downloadCvsName = v.describes;
                let headTitle = v.content;
                let items = headTitle.split(';');
                items.pop();
                let columnsResults = [];
                for(let i in items){
                    let strings = items[i].split(',');
                    let objectItem = new Object();
                    objectItem.title = strings[1];
                    objectItem.key = strings[0];
                    objectItem.width = 120;
                    columnsResults.push(objectItem);
                }
                this.columnsResult = columnsResults;
                let params = {
                    taskId: v.taskId,
                    sql: v.taskSql
                }
                customReport(params).then(res => {
                    if (res.msg) {
                        this.$Message.info('正在运行');
                    } else if (res.result) {
                        let result = res.result;
                        this.taskResult = result;
                    } else {
                        this.$Message.info('内部错误');
                    }
                })
            },
            remove(v) {
                let id = v.taskId;
                let params = {
                    id: id
                }
                deleteTask(params).then(res => {
                    if (res.success) {
                        this.queryAllTask()
                    }
                })
            },
            exportData() {
                this.$refs.tables.exportCsv({
                    filename: this.downloadCvsName
                });
            },
            dateFormat(date) {
                let fmt = "YYYY-mm-dd";
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
            }
        }
    }
</script>

<style lang="less" scoped>
    .params {
        margin: 0 0;
        padding: 0 0;
    }
</style>
