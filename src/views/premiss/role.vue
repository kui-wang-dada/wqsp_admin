<template>
  <div>
    <div class="app-container calendar-list-container" v-show="addDialog">
      <div class="filter-container">
        <el-input @keyup.enter.native="handleFilter" style="width: 200px;" class="filter-item" :placeholder="$t('premiss.filter.title_2')" v-model="listQuery.title">
        </el-input>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="handleFilter">
          {{$t('premiss.filter.search')}}
        </el-button>
        <el-button class="filter-item" type="primary" v-waves icon="el-icon-search" @click="add">
          {{$t('premiss.filter.add')}}
        </el-button>
      </div>

      <el-table :key='tableKey' :data="list" v-loading="listLoading" element-loading-text="给我一点时间" border stripe fit highlight-current-row style="width: 100%">
        <el-table-column type="selection" min-width="55" align="center">
        </el-table-column>
        <el-table-column align="center" :label="$t('premiss.table.name')" min-width="180px">
          <template slot-scope="scope">
            <span>{{scope.row.name}}</span>
          </template>
        </el-table-column>
        <el-table-column min-width="180px" align="center" :label="$t('premiss.table.descript')">
          <template slot-scope="scope">
            <span>{{scope.row.descript}}</span>
          </template>
        </el-table-column>
        <el-table-column align="center" :label="$t('premiss.table.actions')" min-width="230" class-name="small-padding fixed-width">
          <template slot-scope="scope">
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="add">
              {{$t('premiss.table.edit')}}
            </el-button>
            <el-button size="mini" type="danger" @click="handleModifyStatus(scope.row,'deleted')">
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
/* eslint-disable */
import {
  fetchList,
  fetchPv,
  createArticle,
  updateArticle
} from "@/api/article";
import waves from "@/directive/waves"; // 水波纹指令
import { parseTime } from "@/utils";
import addDialog from "@/components/Dialog/addDialog";

const calendarTypeOptions = [
  { key: "CN", display_name: "China" },
  { key: "US", display_name: "USA" },
  { key: "JP", display_name: "Japan" },
  { key: "EU", display_name: "Eurozone" }
];

// arr to obj ,such as { CN : "China", US : "USA" }
const calendarTypeKeyValue = calendarTypeOptions.reduce((acc, cur) => {
  acc[cur.key] = cur.display_name;
  return acc;
}, {});

var datas = require("../../mock/falseData/1_systemAdmin/role");
export default {
  name: "complexTable",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: datas.data,
      total: null,
      listLoading: false,
      listQuery: {
        pageIndex: 2,
        page: 1,
        limit: 10,
        importance: undefined,
        title: undefined,
        type: undefined,
        sort: "+id"
      },
      addDialog: true,
      addContent: {
        title: "新增用户信息",
        width: "50%",
        type: 0,
        content: [
          { type: 0, label: "姓名", placehold: "姓名" },
          { type: 0, label: "账号", placehold: "账号" },
          {
            type: 2,
            label: "角色",
            placehold: "请选择角色",
            select: "",
            options: ["系统管理员", "录入员", "审核员", "测试员", "123"]
          },
          { type: 0, label: "联系电话", placehold: "联系电话" },
          { type: 0, label: "邮箱", placehold: "邮箱" },
          {
            type: 1,
            label: "用户类型",
            placehold: "普通用户",
            select: "",
            options: ["普通用户", "商户用户"]
          },
          {
            type: 2,
            label: "运营区",
            placehold: "请选择运营区",
            select: "",
            options: ["厦门市", "宁德区"]
          }
        ]
      }
    };
  },
  // created() {
  //   this.getList()
  // },
  methods: {
    add: function() {
      this.dialogadd = true;
      this.$refs.addDialog.add();
    },
    getback: function(val) {
      this.addDialog = val;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery).then(response => {
        this.list = response.data.data;
        this.total = response.data.total;
        this.listLoading = false;
      });
    },
    handleFilter() {
      this.listQuery.page = 1;
      this.getList();
    },
    handleSizeChange(val) {
      this.listQuery.limit = val;
      this.getList();
    },
    handleCurrentChange(val) {
      this.listQuery.page = val;
      this.getList();
    },
    handleModifyStatus(row, status) {
      this.$message({
        message: "操作成功",
        type: "success"
      });
      row.status = status;
    },
    reload() {
      this.addDialog = true;
    }
  },
  components: {
    addDialog
  },
  watch: {
    $route: "reload"
  }
};
</script>
