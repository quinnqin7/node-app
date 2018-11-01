<template>
    <div class="app-container">
        <!--<el-table-->
            <!--v-loading="listLoading"-->
            <!--:data="list"-->
            <!--element-loading-text="Loading"-->
            <!--border-->
            <!--fit-->
            <!--highlight-current-row>-->
            <!--<el-table-column align="center" label="ID" width="95">-->
                <!--<template slot-scope="scope">-->
                    <!--{{ scope.$index }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Title">-->
                <!--<template slot-scope="scope">-->
                    <!--{{ scope.row.title }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Author" width="110" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--<span>{{ scope.row.author }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column label="Pageviews" width="110" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--{{ scope.row.pageviews }}-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column class-name="status-col" label="Status" width="110" align="center">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag :type="scope.row.status | statusFilter">{{ scope.row.status }}</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            <!--<el-table-column align="center" prop="created_at" label="Display_time" width="200">-->
                <!--<template slot-scope="scope">-->
                    <!--<i class="el-icon-time"/>-->
                    <!--<span>{{ scope.row.display_time }}</span>-->
                <!--</template>-->
            <!--</el-table-column>-->
        <!--</el-table>-->


        <el-table
            :data="tableData5"
            style="width: 100%">
            <el-table-column type="expand">
                <template slot-scope="props">
                    <el-form label-position="left" inline class="demo-table-expand">
                        <el-form-item label="商品名称">
                            <span>{{ props.row.name }}</span>
                        </el-form-item>
                        <el-form-item label="所属店铺">
                            <span>{{ props.row.shop }}</span>
                        </el-form-item>
                        <el-form-item label="商品 ID">
                            <span>{{ props.row.id }}</span>
                        </el-form-item>
                        <el-form-item label="店铺 ID">
                            <span>{{ props.row.shopId }}</span>
                        </el-form-item>
                        <el-form-item label="商品分类">
                            <span>{{ props.row.category }}</span>
                        </el-form-item>
                        <el-form-item label="店铺地址">
                            <span>{{ props.row.address }}</span>
                        </el-form-item>
                        <el-form-item label="商品描述">
                            <span>{{ props.row.desc }}</span>
                        </el-form-item>
                    </el-form>
                </template>
            </el-table-column>
            <el-table-column
                :label="$t('table.startTime')"
                prop="startTime">
            </el-table-column>
            <el-table-column
                :label="$t('table.endTime')"
                prop="endTime">
            </el-table-column>
            <el-table-column
                :label="$t('table.isAppointmant')"
                prop="enterpriseId">
            </el-table-column>
        </el-table>
    </div>
</template>

<script>
    //import { getList } from '@/api/enterprise'

    export default {
        filters: {
            statusFilter(status) {
                const statusMap = {
                    published: 'success',
                    draft: 'gray',
                    deleted: 'danger'
                }
                return statusMap[status]
            }
        },
        data() {
            return {
                list: null,
                listLoading: false
            }
        },
        created() {
            //this.fetchData()
        },
        methods: {
            fetchData() {
                this.listLoading = true
                getList(this.listQuery).then(response => {
                    this.list = response.data.items
                    this.listLoading = false
                })
            }
        }
    }
</script>
