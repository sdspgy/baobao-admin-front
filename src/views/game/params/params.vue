<template>
    <div class="params">
        <!--<Button @click="handleSearch" type="primary" icon="ios-search">搜索</Button>-->
        <Button style="margin: 10px 10px;" @click="addParams" type="primary" icon="md-add"
                v-show="this.$route.meta.permTypes.includes('add')">新增参数
        </Button>
        <Row>
            <Table :loading="loading" border :columns="columns" :data="paramsList" sortable="custom"
                   ref="table"></Table>
        </Row>

        <Modal title="操作参数" v-model="paramsModalVisible" :mask-closable="false" :width="500">
            <Form ref="paramsForm" :model="paramsForm" :label-width="80" :rules="paramsFormValidate">

                <FormItem label="参数名" prop="paramName"
                          :rules="{required: true, message: 'can not be empty', trigger: 'blur'}"
                          :error="errorparamName"><Input
                        v-model="paramsForm.paramName"/></FormItem>
                <FormItem label="参数英文" prop="paramEnName"
                          :rules="{required: true, message: 'can not be empty', trigger: 'blur'}"
                          :error="errorparamEnName"><Input
                        v-model="paramsForm.paramEnName"/></FormItem>
                <FormItem label="参数类型" prop="type">
                    <Select v-model="paramsForm.type" style="width:200px">
                        <Option value='0'>文本</Option>
                        <Option value='1'>时间</Option>
                    </Select>
                </FormItem>
            </Form>
            <div slot="footer">
                <Button type="text" @click="cancelParams">取消</Button>
                <Button type="primary" :loading="submitLoading" @click="submitParams">提交</Button>
            </div>
        </Modal>
    </div>
</template>

<script>
    import {queryAllParams, addParam, updateParam, deleteParam} from '@/api/index';

    export default {
        name: "params",
        comments: {},
        data() {
            return {
                columns: [
                    {
                        type: 'index',
                        width: 60,
                        align: 'center',
                        fixed: 'left'
                    }, {
                        title: '参数ID',
                        key: 'id',
                        width: 80
                    },
                    {
                        title: '参数名',
                        key: 'paramName',
                        width: 150
                    }, {
                        title: '参数显示名',
                        key: 'paramEnName',
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
                paramsList: [],
                paramsModalVisible: false,
                submitLoading: false,
                paramsForm: {
                    id: '',
                    type: '0',
                    paramName: '',
                    paramEnName: ''
                },
                addOrUpdate: 0
            };
        },
        mounted() {
            this.init()
        },
        methods: {
            init() {
                this.queryAllParams()
            },
            queryAllParams() {
                queryAllParams().then(res => {
                    if (res.success) {
                        this.paramsList = res.params
                    }
                })
            },
            addParams() {
                this.paramsModalVisible = true;
                this.$refs.paramsForm.resetFields();
                this.addOrUpdate = 0
            },
            edit(v) {
                this.paramsModalVisible = true;
                this.$refs.paramsForm.resetFields();
                this.addOrUpdate = 1;
                // 转换null为""
                for (let attr in v) {
                    if (v[attr] == null) {
                        v[attr] = '';
                    }
                }
                let str = JSON.stringify(v);
                let data = JSON.parse(str);
                this.paramsForm = data;
            },
            remove(v) {
                let id = v.id;
                let params = {
                    id: id
                }
                deleteParam(params).then(res => {
                    if (res.success) {
                        this.queryAllParams();
                    }
                })
            },
            cancelParams() {
                this.paramsModalVisible = false
            },
            submitParams() {
                this.paramsModalVisible = false;
                let params = this.paramsForm;
                if (this.addOrUpdate === 0) {
                    addParam(params).then(res => {
                        if (res.success) {
                            this.queryAllParams();
                        }
                    })
                }
                if (this.addOrUpdate === 1) {
                    updateParam(params).then(res => {
                        if (res.success) {
                            this.queryAllParams();
                        }
                    })
                }
            }
        }
    }
</script>

<style scoped>

</style>
