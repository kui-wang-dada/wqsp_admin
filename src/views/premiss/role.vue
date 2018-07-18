<template>
  <div>
    <div class="app-container calendar-list-container">
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
            <el-button type="primary" size="mini" icon="el-icon-edit" @click="handleUpdate(scope.row)">
              {{$t('premiss.table.edit')}}
            </el-button>
            <el-button size="mini" type="danger" @click="handleDelete(scope.row)">
              {{$t('premiss.table.delete')}}
            </el-button>
          </template>
        </el-table-column>
      </el-table>

      <div class="pagination-container">
        <el-pagination background @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page.sync="listQuery.page" :page-sizes="[10,20,30, 50]" :page-size="listQuery.limit" layout="total, sizes, prev, pager, next, jumper" :total="total">
        </el-pagination>
      </div>
      <el-dialog :title="删除" :visible.sync="deleteDialogVisible">
        <div>确定删除该项？</div>
        <div slot="footer" class="dialog-footer">
          <el-button @click="deleteDialogVisible = false">{{$t('table.cancel')}}</el-button>
          <el-button type="primary" @click="deleteData">确定</el-button>
        </div>
      </el-dialog>
      <el-dialog :title="textMap[dialogStatus]" :visible.sync="dialogFormVisible">
        <el-form :rules="rules" ref="dataForm" :model="temp" label-position="left" label-width="110px" style='width: 400px; margin-left:50px;'>
          <el-form-item label="名称" prop="name">
            <el-input v-model="temp.name" placeholder="名称"></el-input>
          </el-form-item>
          <el-form-item label="上级目录" prop="descript">
            <el-input v-model="temp.descript" placeholder="说明"></el-input>
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
/* eslint-disable */
import {
  fetchList,
  fetchPv,
  deleteArticle,
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

export default {
  name: "complexTable",
  directives: {
    waves
  },
  data() {
    return {
      tableKey: 0,
      list: [],
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
      temp: {
        pageIndex: 2,
        type: "create",
        name: "",
        descript: ""
      },
      dialogFormVisible: false,
      deleteDialogVisible: false,
      dialogStatus: "",
      textMap: {
        update: "编辑权限管理",
        create: "新增"
      },
      rules: {
        name: [{ required: true, message: "这是必填项", trigger: "blur" }]
      }
    };
  },
  created() {
    this.getList();
  },
  methods: {
    getback: function(val) {
      this.addDialog = val;
    },
    getList() {
      this.listLoading = true;
      fetchList(this.listQuery)
        .then(response => {
          this.list = response.data.data;
          this.total = response.data.total;
          this.listLoading = false;
        })
        .catch(err => {
          console.log(err);
          console.log(432);
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
    add() {
      this.temp = { pageIndex: 2, type: "create", name: "", descript: "" };
      this.dialogStatus = "create";
      this.dialogFormVisible = true;
    },
    handleUpdate(row) {
      this.temp = Object.assign({}, this.temp, row); // copy obj
      this.temp.type = "update";
      this.dialogStatus = "update";
      this.dialogFormVisible = true;
    },
    updateData() {
      this.$refs["dataForm"].validate(valid => {
        if (valid) {
          if (this.dialogStatus == "update") {
            let tempData = Object.assign({}, this.temp);
            updateArticle(tempData).then(() => {
              for (const v of this.list) {
                if (v.id === this.temp.id) {
                  const index = this.list.indexOf(v);
                  this.list.splice(index, 1, this.temp);
                  break;
                }
              }
            });
          } else if (this.dialogStatus == "create") {
            let tempData = Object.assign({}, this.list[0], this.temp);
            updateArticle(tempData).then(() => {
              this.list.push(tempData);
            });
          }
          this.dialogFormVisible = false;
          this.$notify({
            title: "成功",
            message: "更新成功",
            type: "success",
            duration: 2000
          });
        }
      });
    },

    handleDelete(row) {
      this.temp = Object.assign({}, this.temp, row); // copy obj
      this.deleteDialogVisible = true;
    },
    deleteData() {
      const tempData = Object.assign({}, this.temp);
      deleteArticle(tempData).then(() => {
        for (const v of this.list) {
          if (v.id === tempData.id) {
            const index = this.list.indexOf(v);
            this.list.splice(index, 1);
            break;
          }
        }
      });
      this.deleteDialogVisible = false;
      this.$notify({
        title: "成功",
        message: "删除成功",
        type: "success",
        duration: 2000
      });
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
