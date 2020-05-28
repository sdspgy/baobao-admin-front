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
            <RadioGroup v-model="template">
                <Radio v-for="(item,index) in likeTypeTemplate" :key="index"
                       :label="item">{{item.describes}}
                </Radio>
            </RadioGroup>
            <div slot="footer">
                <Button type="text" @click="cancelSelectTemplate">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="openInsertTask">打开模版</Button>
            </div>
        </Modal>

        <Modal title="创建任务" v-model="insertTaskModalVisible" :mask-closable="false" :width="500">
            <Form ref="taskForm" :model="taskForm" :label-width="80" :rules="taskFormValidate">
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
                <Button type="text" @click="cancelTask">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="insertTask">创建任务</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {
        queryAllTask,
        queryTemplateResult,
        insertTask,
        deleteTask,
        queryParamsByIds,
        queryAllTemplateGroup
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
                        width: 150
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
                        }
                    },
                    {
                        title: '创建时间',
                        key: 'createTime',
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
                            return h('div', [queryResult, deleteButton]);
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
                }
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
            },
            selectTemplate() {
                this.types = '';
                this.template = {};
                this.likeTypeTemplate = [];
                this.selectTaskModalVisible = true
            },
            cancelSelectTemplate() {
                this.selectTaskModalVisible = false
            },
            openInsertTask() {
                if (!this.types) {
                    this.$Message.info('请选择类型');
                    return
                }
                if (JSON.stringify(this.template) == '{}') {
                    this.$Message.info('请选择模版');
                    return
                }
                this.selectTaskModalVisible = false;
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
                            }
                        }
                    }
                })
                this.insertTaskModalVisible = true;
            },
            cancelTask() {
                this.insertTaskModalVisible = false;
            },
            insertTask() {
                this.insertTaskModalVisible = false;
                let param = '';
                for (let item in this.textParams) {
                    param += this.textParams[item].paramEnName + ',' + this.textParams[item].value + ';'
                }
                for (let item in this.timeParams) {
                    param += this.timeParams[item].paramEnName + ',' + this.dateFormat(this.timeParams[item].value) + ';'
                }
                let params = {
                    describes: this.taskForm.describes,
                    templateId: this.template.templateId,
                    param: param,
                }
                insertTask(params).then(res => {
                    if (res.success) {
                        this.queryAllTask()
                    }
                })

            },
            queryResult(v) {

            },
            remove(v) {
                debugger
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
