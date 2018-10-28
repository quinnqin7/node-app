<template>
  <div class="app-container">
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="Loading"
      border
      fit
      highlight-current-row>
      <el-table-column align="center" label="ID" width="95">
        <template slot-scope="scope">
          {{ scope.$index }}
        </template>
      </el-table-column>
      <el-table-column label="Name" width="110" align="center">
        <template slot-scope="scope">
          {{ scope.row.name }}
        </template>
      </el-table-column>
      <el-table-column label="Tel" width="110" align="center">
        <template slot-scope="scope">
          <span>{{ scope.row.tel }}</span>
        </template>
      </el-table-column>
      <el-table-column label="gender" width="110" align="center">
        <template slot-scope="scope" >
          {{ msg = scope.row.gender==='1'?'nv':'nan' }}
        </template>
      </el-table-column>
        <el-table-column label="date" width="110" align="center">
            <template slot-scope="scope" >
                {{ msg = scope.row.gender==='1'?'nv':'nan' }}
            </template>
        </el-table-column>
      <el-table-column class-name="status-col" label="" width="110" align="center">
        <template slot-scope="scope">
            <el-button >DETAIL</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import { getPatients } from '@/api/enterprise'

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
      listLoading: false,
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData() {
      this.listLoading = true
        getPatients().then(response => {
        this.list = response.data
        this.listLoading = false
      })
    }
  }
}
</script>
