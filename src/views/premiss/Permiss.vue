<template>
  <div>
    <div class="app-container calendar-list-container">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('premiss.filter.title_1')" v-model="listQuery.title">
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
        <el-table-column align="center" :label="$t('premiss.table.name')" width="180px">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180px" align="center" :label="$t('premiss.table.sort')">
          <template slot-scope="scope">
            <span>{{scope.row.sort}}</span>
          </template>
        </el-table-column>
        <el-table-column width="180" align="center" :label="$t('premiss.table.parentName')">
          <template slot-scope="scope">
            <span>{{scope.row.parentName}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('premiss.table.actions')" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">
              {{$t('premiss.table.edit')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>

      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="110px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="名称" prop="title">
            <el-input v-model="temp.name" placeholder="搜索板块"></el-input>
          </el-form-item>
          <el-form-item label="上级目录" prop="title">
            <el-input placeholder="搜索板块" disabled></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="title">
            <el-input v-model="temp.sort" placeholder="搜索板块"></el-input>
          </el-form-item>
          <el-form-item label="访问白名单" prop="title">
            <el-input v-model="temp.whitename" placeholder="搜索板块"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import { fetchList, updateArticle, deleteArticle } from "@/api/article"
import waves from "@/directive/waves" // 水波纹指令

// var datas = require("../../mock/falseData/1_systemAdmin/permiss")
export default {
  name: "complexTable",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: [],
      total: 10,
      listLoading: false,
      listQuery: {
        pageIndex: 1,
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      temp: {
        pageIndex: 1,
        type: "create",
        sort: 0,
        name: "",
        whitename: ""
      },
      dialogFormVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑权限管理",
        create: "新增"
      },
      rules: {
        type: [
          { required: true, message: "type is required", trigger: "change" }
        ],
        timestamp: [
          {
            type: "date",
            required: true,
            message: "timestamp is required",
            trigger: "change"
          }
        ],
        name: [{ required: true, message: "这是必填项", trigger: "blur" }]
      }
    }
  },
  created() {
    this.$nextTick(function() {
      this.getList()
    })
  },
  methods: {
    getList() {
      this.listLoading = true
      fetchList(this.listQuery)
        .then(response => {
          this.list = response.data.data
          console.log(response.data)
          this.total = response.data.total
          this.listLoading = false
        })
        .catch(err => {
          console.log(err)
          console.log(432)
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
    add() {
      this.temp = {
        pageIndex: 1,
        type: "create",
        sort: 0,
        name: "",
        whitename: ""
      }
      this.dialogStatus = "create"
      this.dialogFormVisible = true
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, this.temp, row) // copy obj
      this.temp.type = "update"
      this.dialogStatus = "update"
      this.dialogFormVisible = true
      this.$nextTick(() => {
        this.$refs["dataForm"].clearValidate()
      })
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          const tempData = Object.assign({}, this.temp)
          updateArticle(tempData).then(() => {
            for (const v of this.list) {
              if (v.id === this.temp.id) {
                const index = this.list.indexOf(v)
                this.list.splice(index, 1, this.temp)
                break;
              }
            }
            this.dialogFormVisible = false
            this.$notify({
              title: "成功",
              message: "更新成功",
              type: "success",
              duration: 2000
            })
          })
        }
      })
    },
    handleDelete(row) {
      const tempData = Object.assign({}, this.temp, row)
      deleteArticle(tempData).then(() => {
        for (const v of this.list) {
          if (v.id === row.id) {
            const index = this.list.indexOf(v)
            this.list.splice(index, 1)
            break;
          }
        }
      })
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      })
      const index = this.list.indexOf(row)
      this.list.splice(index, 1)
    }
  }
}
</script>
