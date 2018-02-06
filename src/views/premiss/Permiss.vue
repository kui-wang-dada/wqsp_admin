<template>
  <div>
    <div v-show="addDialog" class="app-container calendar-list-container">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item"
                  :placeholder="$t('premiss.filter.title_1')" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
          {{$t('premiss.filter.search')}}
        </el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="add">
          {{$t('premiss.filter.add')}}
        </el-button>
      </div>
      
      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border stripe fit
                highlight-current-row
                style="width: 100%">
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
        <el-table-column align="center" :label="$t('premiss.table.actions')" min-width="230"
                         class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">
              {{$t('premiss.table.edit')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>
      
      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange"
                       :current-page.sync="listQuery.page"
                       :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit"
                       layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="110px"
                 style='width: 400px; margin-left:50px;'>
          <el-form-item label="名称" prop="title">
            <el-input v-model="temp.title" placeholder="权限管理"></el-input>
          </el-form-item>
          <el-form-item label="上级目录" prop="title">
            <el-input v-model="temp.title" placeholder="系统管理" disabled></el-input>
          </el-form-item>
          <el-form-item label="排序" prop="title">
            <el-input v-model="temp.title" placeholder="数字越小排序越靠前"></el-input>
          </el-form-item>
          <el-form-item label="访问白名单" prop="title">
            <el-input v-model="temp.title" placeholder="多个用；隔开"></el-input>
          </el-form-item>
        </el-form>
        <div slot="footer" class="dialog-footer">
          <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
          <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}
          </el-button>
          <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
        </div>
      </el-dialog>
    </div>
    <add-form v-show="!addDialog"></add-form>
  </div>


</template>

<script>
  import { fetchList, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import addForm from './add/addform'
  
  var datas = require("../../mock/falseData/1_systemAdmin/permiss")
  
  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        tableKey: 0,
        list: datas.data,
        total: 10,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 10,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: 'published'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑权限管理',
          create: '新增'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: '这是必填项', trigger: 'blur' }]
        },
        downloadLoading: false,
        addDialog: true
      }
    },
    // created() {
    //   this.getList()
    // },
    methods: {
      add: function() {
        this.addDialog = false
      },
      getList() {
        this.listLoading = true
        fetchList(this.listQuery).then(response => {
          this.list = response.data.items
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
      resetTemp() {
        this.temp = {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          status: 'published',
          type: ''
        }
      },
      handleCreate() {
        this.resetTemp()
        this.dialogStatus = 'create'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      createData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            this.temp.id = parseInt(Math.random() * 100) + 1024 // mock a id
            this.temp.author = 'vue-element-admin'
            createArticle(this.temp).then(() => {
              this.list.unshift(this.temp)
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '创建成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      handleUpdate(row) {
        this.temp = Object.assign({}, row) // copy obj
        this.temp.timestamp = new Date(this.temp.timestamp)
        this.dialogStatus = 'update'
        this.dialogFormVisible = true
        this.$nextTick(() => {
          this.$refs['dataForm'].clearValidate()
        })
      },
      updateData() {
        this.$refs['dataForm'].validate((valid) => {
          if (valid) {
            const tempData = Object.assign({}, this.temp)
            tempData.timestamp = +new Date(tempData.timestamp) // change Thu Nov 30 2017 16:41:05 GMT+0800 (CST) to 1512031311464
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v)
                  this.list.splice(index, 1, this.temp)
                  break
                }
              }
              this.dialogFormVisible = false
              this.$notify({
                title: '成功',
                message: '更新成功',
                type: 'success',
                duration: 2000
              })
            })
          }
        })
      },
      reload() {
        this.addDialog = true
      }
    },
    components: {
      addForm
    },
    watch: {
      '$route': 'reload'
    }
  
  }
</script>
