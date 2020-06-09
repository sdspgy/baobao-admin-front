<template>
    <div class="masterplate">
        <Button style="margin: 10px 10px;" @click="addMasterplate" type="primary" icon="md-add"
                v-show="this.$route.meta.permTypes.includes('add')">新增模版
        </Button>
        <Row>
            <Table :loading="loading" border :columns="columns" :data="templateList" sortable="custom"
                   ref="table"></Table>
        </Row>

        <Modal title="操作模版" v-model="masterplateModalVisible" :mask-closable="false" :width="800">
            <Form ref="masterplateForm" :model="masterplateForm" :label-width="80" :rules="masterplateFormValidate">

                <FormItem label="模版名" prop="describes"
                          :rules="{required: true, message: 'can not be empty', trigger: 'blur'}"
                          :error="errordescribes"><Input
                        v-model="masterplateForm.describes"/></FormItem>
                <FormItem label="模版sql" prop="templateSql"
                          :rules="{required: true, message: 'can not be empty', trigger: 'blur'}"
                          :error="errortemplateSql"><Input type="textarea" :autosize="{minRows: 2,maxRows: 5}"
                                                           v-model="masterplateForm.templateSql"/></FormItem>
                <FormItem label="模版类型" prop="types"
                          :rules="{required: true, message: 'can not be empty', trigger: 'blur'}">
                    <Input
                            v-model="masterplateForm.types"/></FormItem>
                <FormItem label="参数选择" prop="params">
                    <Select v-model="masterplateForm.params" multiple>
                        <Option v-for="item in paramsList" :value="item.id" :key="item.id" :label="item.paramName">
                            <span style="margin-right:10px;">{{ item.paramName }}</span>
                            <span style="color:#ccc;">{{ item.paramEnName }}</span>
                        </Option>
                    </Select>
                </FormItem>
                <FormItem
                        v-for="(item, index) in masterplateForm.items"
                        :key="index"
                        :label="'内容 ' + item.index"
                        :prop="'items.' + index + '.value'"
                        :rules="{required: true, message: 'Item ' + item.index +' can not be empty', trigger: 'blur'}">
                    <Row>
                        <Col span="18">
                            <Input type="text" v-model="item.value" placeholder="字段名"></Input>
                        </Col>
                        <Col span="18">
                            <Input type="text" v-model="item.eNvalue" placeholder="字段中文名"></Input>
                        </Col>
                        <Col span="4" offset="1">
                            <Button @click="handleRemove(index)">Delete</Button>
                        </Col>
                    </Row>
                </FormItem>
                <FormItem>
                    <Row>
                        <Col span="12">
                            <Button type="dashed" long @click="handleAdd" icon="md-add">Add</Button>
                        </Col>
                    </Row>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelMasterplate">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitMasterplate">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {queryAllTemplate, insertTemplate, updateTemplate, deleteTemplate, queryAllParams} from '@/api/index';

    export default {
        name: "masterplate",
        data() {
            return {
                templateList: [],
                paramsList: [],
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    },
                    {
                        title: '模版ID',
                        key: 'templateId',
                        width: 80
                    },
                    {
                        title: '模版名',
                        key: 'describes',
                        width: 150
                    },
                    {
                        title: '类型',
                        key: 'types',
                        width: 150
                    },
                    {
                        title: '模版sql',
                        key: 'templateSql',
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
                                params.row.templateSql
                            )
                        }
                    }, {
                        title: '创建时间',
                        key: 'createTime',
                        width: 150
                    }, {
                        title: '操作',
                        key: 'action',
                        width: 200,
                        align: 'center',
                        render: (h, params) => {
                            let editButton = h(
                                'Button',
                                {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: !this.$route.meta.permTypes.includes('edit')
                                    },
                                    style: {marginRight: '5px'},
                                    on: {
                                        click: () => {
                                            this.edit(params.row);
                                        }
                                    }
                                },
                                '编辑'
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
                            return h('div', [editButton, deleteButton]);
                        }
                    }
                ],
                masterplateModalVisible: false,
                masterplateForm: {
                    templateId: '',
                    describes: '',
                    templateSql: '',
                    types: '',
                    params: [],
                    content: '',
                    items: [
                        {
                            value: '',
                            eNvalue: '',
                            index: 1
                        }
                    ]
                },
                index: 1,
                addOrUpdate: 0
            }
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.queryAllTemplate();
                this.queryAllParams()
            },
            queryAllParams() {
                queryAllParams().then(res => {
                    if (res.success) {
                        this.paramsList = res.params
                    }
                })
            },
            queryAllTemplate() {
                queryAllTemplate().then(res => {
                    if (res.success) {
                        this.templateList = res.templateList
                    }
                })
            },
            addMasterplate() {
                this.masterplateModalVisible = true;
                this.addOrUpdate = 0;
                this.$refs.masterplateForm.resetFields();
                this.masterplateForm.items = [
                    {
                        value: '',
                        eNvalue: '',
                        index: 1
                    }
                ]
            },
            edit(v) {
                this.masterplateModalVisible = true;
                this.addOrUpdate = 1;
                this.$refs.masterplateForm.resetFields();
                this.masterplateForm.items = [
                    {
                        value: '',
                        eNvalue: '',
                        index: 1
                    }
                ]
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = '';
                    }
                }
                this.masterplateForm.templateId = v.templateId;
                this.masterplateForm.describes = v.describes;
                this.masterplateForm.templateSql = v.templateSql;
                this.masterplateForm.types = v.types;
                let params = v.params.split(',');
                for (let item in params) {
                    params[item] = parseInt(params[item])
                }
                this.masterplateForm.params = params;
                let contents = v.content.split(';')
                contents.pop();
                for (let item in contents) {
                    this.index++;
                    let content = contents[item].split(',');
                    this.masterplateForm.items.push({
                        value: content[0],
                        eNvalue: content[1],
                        index: this.index
                    })
                }
                this.masterplateForm.items.shift();
            },
            remove(v) {
                let id = v.templateId;
                let params = {
                    id: id
                }
                deleteTemplate(params).then(res => {
                    if (res.success) {
                        this.queryAllTemplate()
                    }

                })
            },
            handleAdd() {
                this.index++;
                this.masterplateForm.items.push({
                    value: '',
                    eNvalue: '',
                    index: this.index,
                });
            },
            handleRemove(index) {
                this.masterplateForm.items.splice(index, 1);
            },
            cancelMasterplate() {
                this.masterplateModalVisible = false
            },
            submitMasterplate() {
                this.masterplateModalVisible = false
                let params = this.masterplateForm;
                let contents = params.items;
                let content = '';
                for (let item in contents) {
                    content += contents[item].value.replace(/\s+/g, "") + ',' + contents[item].eNvalue.replace(/\s+/g, "") + ';'
                }
                params.content = content;
                params.params = params.params.toString();
                if (this.addOrUpdate === 0) {
                    insertTemplate(params).then(res => {
                        if (res.success) {
                            this.queryAllTemplate();
                        }
                    })
                }
                if (this.addOrUpdate === 1) {
                    updateTemplate(params).then(res => {
                        if (res.success) {
                            this.queryAllTemplate();
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
