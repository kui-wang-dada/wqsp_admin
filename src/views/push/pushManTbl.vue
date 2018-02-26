<template>
  <div class="app-container calendar-list-container">
    <div class="filter-container">
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入姓名" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入人员编号" v-model="listQuery.title">
      </el-input>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="请输入手机号" v-model="listQuery.title">
      </el-input>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" label="状态" :value="item.key">
        </el-option>
      </el-select>
      <el-select @change='handleFilter' style="width: 140px" class="filter-item" v-model="listQuery.sort">
        <el-option v-for="item in sortOptions" :key="item.key" label="渠道类型" :value="item.key">
        </el-option>
      </el-select>
      <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" placeholder="所属区域" v-model="listQuery.title">
      </el-input>
      <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">{{$t('table.search')}}</el-button>
      <el-button class="filter-item" style="margin-left: 10px;" @click="handleCreate" type="primary" icon="el-icon-plus">{{$t('table.add')}}</el-button>
    </div>
    
    <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border fit highlight-current-row
              style="width: 100%">
      <el-table-column type="selection" width="55" align="center">
			</el-table-column>
			<el-table-column prop="provinceName" label="省" width="85" align="center">
			</el-table-column>
			<el-table-column prop="cityName" label="市" width="85" align="center">
			</el-table-column>
			<el-table-column prop="areaName" label="区" width="100" align="center">
			</el-table-column>
			<el-table-column prop="areaId" label="编号" width="100" align="center">
			</el-table-column>
			<el-table-column prop="pushManName" label="姓名" width="100" align="center">
			</el-table-column>
			<el-table-column prop="pushManPhone" label="手机号" width="130" align="center">
			</el-table-column>
			<el-table-column prop="channelType" label="渠道类型" width="120" :formatter="formatchan" align="center">
			</el-table-column>
			<el-table-column prop="createUser" label="创建人" width="110" align="center">
			</el-table-column>
			<el-table-column prop="createDate" label="创建时间" width="180" :formatter="formattime" align="center">
			</el-table-column>
			<el-table-column prop="updateUser" label="更改人" width="110" align="center">
			</el-table-column>
			<el-table-column prop="updateDate" label="更改时间" width="180" :formatter="formattimet" align="center">
			</el-table-column>
			<el-table-column label="操作" width="210" fixed="right" align="center">
				<template slot-scope="scope">
					<el-button size="small" @click="handleUpdate(scope.$index, scope.row)">修改</el-button>
          <el-button size="small" @click="handleUpdate(scope.$index, scope.row)">禁用</el-button>
					<el-button type="danger" size="small" @click="handleDelete(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
    </el-table>
    
    <div class="pagination-container">
      <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page"
                     :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
      </el-pagination>
    </div>
    
    <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
      <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="100px" style='width: 550px; margin-left:50px;'>
        <el-form-item label="选择地区">
          <el-select size="small" style="width: 100px" v-model="selectProv" placeholder="请选择省份" v-on:change="getProv($event)">
            <el-option v-for="item in provs" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select size="small" style="width: 100px"  v-model="selectCity" placeholder="请选择城市" v-on:change="getCity($event)">
            <el-option v-for="item in citys" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
          <el-select size="small" style="width: 100px"  v-model="selectCountry" placeholder="请选择县区" v-on:change="getCountry($event)">
            <el-option v-for="item in countrys" :key="item.label" :label="item.label" :value="item.value"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="渠道类型">
          <el-select class="filter-item" v-model="temp.status" placeholder="请选择类型">
            <el-option v-for="item in  statusOptions" :key="item" :label="item" :value="item"></el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="编号">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="姓名">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
        <el-form-item label="手机号">
          <el-input v-model="temp.title"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">{{$t('table.cancel')}}</el-button>
        <el-button v-if="dialogStatus=='create'" type="primary" @click="createData">{{$t('table.confirm')}}</el-button>
        <el-button v-else type="primary" @click="updateData">{{$t('table.confirm')}}</el-button>
      </div>
    </el-dialog>
  
  </div>
</template>

<script>
  import { fetchList, fetchPv, createArticle, updateArticle } from '@/api/article'
  import waves from '@/directive/waves' // 水波纹指令
  import { parseTime } from '@/utils'
  
  const calendarTypeOptions = [
    { key: 'CN', display_name: 'China' },
    { key: 'US', display_name: 'USA' },
    { key: 'JP', display_name: 'Japan' },
    { key: 'EU', display_name: 'Eurozone' }
  ]
  
  // arr to obj ,such as { CN : "China", US : "USA" }
  const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
    acc[cur.key] = cur.display_name
    return acc
  }, {})
  
  var tbl=require("../../mock/falseData/push_13/tbl");

  export default {
    name: 'complexTable',
    directives: {
      waves
    },
    data() {
      return {
        provs:[{label:"北京市",value:"北京市"},
              {label:"福建省",value:"福建省"},
              ] ,
        citys: [],
        countrys: [],
        selectProv: '',
        selectCity: '',
        selectCountry: '',

        tableKey: 0,
        list: tbl.data,
        total: null,
        listLoading: false,
        listQuery: {
          page: 1,
          limit: 20,
          importance: undefined,
          title: undefined,
          type: undefined,
          sort: '+id'
        },
        importanceOptions: [1, 2, 3],
        calendarTypeOptions,
        sortOptions: [{ label: 'ID Ascending', key: '+id' }, { label: 'ID Descending', key: '-id' }],
        statusOptions: ['流通', '特通'],
        showReviewer: false,
        temp: {
          id: undefined,
          importance: 1,
          remark: '',
          timestamp: new Date(),
          title: '',
          type: '',
          status: '流通'
        },
        dialogFormVisible: false,
        dialogStatus: '',
        textMap: {
          update: '编辑地推人员',
          create: '修改地推人员'
        },
        dialogPvVisible: false,
        pvData: [],
        rules: {
          type: [{ required: true, message: 'type is required', trigger: 'change' }],
          timestamp: [{ type: 'date', required: true, message: 'timestamp is required', trigger: 'change' }],
          title: [{ required: true, message: 'title is required', trigger: 'blur' }]
        },
        downloadLoading: false
      }
    },
    filters: {
      statusFilter(status) {
        const statusMap = {
          published: 'success',
          draft: 'info',
          deleted: 'danger'
        }
        return statusMap[status]
      },
      typeFilter(type) {
        return calendarTypeKeyValue[type]
      }
    },
    // created() {
    //   this.getList()
    // },
    methods: {
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
      handleModifyStatus(row, status) {
        this.$message({
          message: '操作成功',
          type: 'success'
        })
        row.status = status
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
      handleDelete(row) {
        this.$notify({
          title: '成功',
          message: '删除成功',
          type: 'success',
          duration: 2000
        })
        const index = this.list.indexOf(row)
        this.list.splice(index, 1)
      },
      handleFetchPv(pv) {
        fetchPv(pv).then(response => {
          this.pvData = response.data.pvData
          this.dialogPvVisible = true
        })
      },
      handleDownload() {
        this.downloadLoading = true
        import('@/vendor/Export2Excel').then(excel => {
          const tHeader = ['timestamp', 'title', 'type', 'importance', 'status']
          const filterVal = ['timestamp', 'title', 'type', 'importance', 'status']
          const data = this.formatJson(filterVal, this.list)
          excel.export_json_to_excel(tHeader, data, 'table-list')
          this.downloadLoading = false
        })
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      getProv: function (prov) {
        let tempCity=[];              
        this.citys=[];
        this.selectCity='';               
        let allCity=[{
            prov: "北京市",
            label: "北京市"
        },{
            prov: "福建省",
            label: "福州市"
        }, {
            prov: "福建省",
            label: "厦门市"
        }, {
            prov: "福建省",
            label: "莆田市"
        }, {
            prov: "福建省",
            label: "三明市"
        }, {
            prov: "福建省",
            label: "泉州市"
        }, {
            prov: "福建省",
            label: "漳州市"
        }, {
            prov: "福建省",
            label: "南平市"
        }, {
            prov: "福建省",
            label: "龙岩市"
        }, {
            prov: "福建省",
            label: "宁德市"
        }];
        for (var val of allCity){
            if (prov == val.prov){
                console.log(val);
                tempCity.push({label: val.label, value: val.label})
            }
        }
        this.citys = tempCity;
    },
    getCity: function (city) {
        let tempCountry=[];              
        this.countrys=[];
        this.selectCountry='';               
        let allCountry=[{
            city: "北京市",
            label: "朝阳区"
        },{
          city: "福州市",
          label: "鼓楼区",
        }, {           
            city: "福州市",
            label: "龙海区",
        }, {           
            city: "福州市",
            label: "龙泰区",
        },{ 
            city: "福州市",
            label: "东山区",
        }, {
            city: "福州市",
            label: "平和区",
        },];
        for (var val of allCountry){
            if (city == val.city){
                console.log(val);
                tempCountry.push({label: val.label, value: val.label})
            }
        }
        this.countrys = tempCountry;
    },
    getCountry: function (country) {
        console.log(country);
        console.log(this.selectCountry)
    },
    }
  }
</script>
