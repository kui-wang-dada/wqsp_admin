<template>
  <div>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('premiss.filter.title_4')" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
          {{$t('premiss.filter.search')}}
        </el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="add">
          {{$t('premiss.filter.add')}}
        </el-button>
      </div>

      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border stripe fit highlight-current-row style="width: 100%">
        <el-table-column type="selection" width="55" align="center">
        </el-table-column>
        <el-table-column align="center" :label="$t('premiss.table.name')" width="150px">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="150px" align="center" :label="$t('premiss.table.code')">
          <template slot-scope="scope">
            <span>{{scope.row.code}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="260" align="center" :label="$t('premiss.table.descript')">
          <template slot-scope="scope">
            <span>{{scope.row.descript}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" :label="$t('premiss.table.value')">
          <template slot-scope="scope">
            <span>{{scope.row.value}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('premiss.table.actions')" min-width="180" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="add">{{$t('premiss.table.edit')}}
            </el-button>
            <el-button size="mini" type="danger" icon="el-icon-delete" @click="handleModifyStatus(scope.row,'deleted')">
              {{$t('premiss.table.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
    </div>
    <add-dialog :addContent="addContent" ref="addDialog"></add-dialog>
  </div>

</template>

<script>
import { fetchList } from "@/api/article"
import waves from "@/directive/waves" // 水波纹指令

import addDialog from "@/components/Dialog/addDialog"

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
]

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name
  return acc
}, {})

var datas = require("../../mock/falseData/1_systemAdmin/datadict")
export default {
  name: "complexTable",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: datas.data,
      total: 20,
      listLoading: false,
      listQuery: {
        pageIndex: 4,
        page: 1,
        limit: 20,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      addDialog: true,
      addContent: {
        title: "新增数据字典信息",
        width: "50%",
        type: 0,
        content: [
          { type: 0, label: "名称", placehold: "名称" },
          { type: 0, label: "代码", placehold: "代码" },
          { type: 0, label: "描述", placehold: "描述" },
          { type: 0, label: "值域", placehold: "值域" },
          { type: 0, label: "排序", placehold: "排序" }
        ]
      }
    }
  },
  // created() {
  //   this.getList()
  // },
  methods: {
    add: function() {
      this.$refs.addDialog.add()
    },
    getback: function(val) {
      this.addDialog = val
    },
    getList() {
      this.listLoading = true
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data
        this.total = response.data.total
        this.listLoading = false
      })
    },
    handleFilter() {
      this.listQuery.page = 1
      this.getList()
    },
    handleSizeChange(val) {
      this.listQuery.limit = val
      this.getList()
    },
    handleCurrentChange(val) {
      this.listQuery.page = val
      this.getList()
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      })
      row.status = status
    },
    reload() {
      this.addDialog = true
    }
  },
  components: {
    addDialog
  },
  watch: {
    $route: "reload"
  }
}
</script>
