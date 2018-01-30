<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0px;">
			<el-form :inline="true" :model="filters" label-width="100px" size="medium">
				<el-form-item label="id" >
					<el-input v-model="filters.id" placeholder="id"></el-input>
				</el-form-item>
				<el-form-item label="供应商名称">
					<el-input v-model="filters.name" placeholder="供应商名称"></el-input>
				</el-form-item>
				<el-form-item label="联系电话">
					<el-input v-model="filters.name" placeholder="联系电话"></el-input>
				</el-form-item>
				<el-form-item label="采购类型">
					<el-select v-model="filters.value1" placeholder="请选择">
						<el-option
								v-for="item in filters.options1"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="支付方式">
					<el-select v-model="filters.value2" placeholder="请选择">
						<el-option
								v-for="item in filters.options2"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="状态">
					<el-select v-model="filters.value3" placeholder="请选择">
						<el-option
								v-for="item in filters.options3"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" @click="handleAdd">新增</el-button>
				</el-form-item>
			</el-form>
		</el-col>

		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" border stripe align="center" style="width: 100%;">
			<el-table-column type="selection" min-width="45" align="center">
			</el-table-column>
			<el-table-column prop="id" label="供应商编码" min-width="80" align="center">
			</el-table-column>
			<el-table-column prop="supplierName" label="供应商名称" min-width="110"  align="center" >
			</el-table-column>
			<el-table-column prop="phone" label="联系电话" min-width="130"  align="center">
			</el-table-column>
			<el-table-column prop="linkMan" label="联系人" min-width="80"  align="center">
			</el-table-column>
			<el-table-column prop="createUser" label="创建人"  min-width="80"align="center" >
			</el-table-column>
			<el-table-column prop="createDateStr" label="创建时间" min-width="150"  align="center">
			</el-table-column>
			<el-table-column prop="auditUser" label="最后修改人" min-width="90"  align="center">
			</el-table-column>
			<el-table-column prop="auditDateStr" label="最后修改时间" min-width="150"  align="center">
			</el-table-column>
			<el-table-column prop="buyType" label="采购类型" :formatter="buyType" min-width="100"  align="center">
			</el-table-column>
			<el-table-column prop="payType" label="支付类型" :formatter="payType"  min-width="80"  align="center">
			</el-table-column>
			<el-table-column prop="status" label="状态" :formatter="dataType"  min-width="70"  align="center">
			</el-table-column>
			
			<el-table-column label="操作" min-width="180" align="center">
				<template slot-scope="scope">
					<el-button size="small" icon="edit" type="primary" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
					<el-button type="danger" icon="delete" size="small" @click="handleDel(scope.$index, scope.row)">删除</el-button>
				</template>
			</el-table-column>
		</el-table>

		<!--工具条-->
		<el-col :span="24" class="toolbar">
			<el-button type="danger" @click="batchRemove" :disabled="this.sels.length===0">批量删除</el-button>
			<el-pagination layout="prev, pager, next" @current-change="handleCurrentChange" :page-size="20" :total="total" style="float:right;">
			</el-pagination>
		</el-col>

		<!--编辑界面-->
		<el-dialog title="编辑" v-model="editFormVisible" :close-on-click-modal="false">
			<el-form :model="editForm" label-width="80px" :rules="editFormRules" ref="editForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="editForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="editForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="editForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="editForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="editForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="editFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="editSubmit" :loading="editLoading">提交</el-button>
			</div>
		</el-dialog>

		<!--新增界面-->
		<el-dialog title="新增" v-model="addFormVisible" :close-on-click-modal="false">
			<el-form :model="addForm" label-width="80px" :rules="addFormRules" ref="addForm">
				<el-form-item label="姓名" prop="name">
					<el-input v-model="addForm.name" auto-complete="off"></el-input>
				</el-form-item>
				<el-form-item label="性别">
					<el-radio-group v-model="addForm.sex">
						<el-radio class="radio" :label="1">男</el-radio>
						<el-radio class="radio" :label="0">女</el-radio>
					</el-radio-group>
				</el-form-item>
				<el-form-item label="年龄">
					<el-input-number v-model="addForm.age" :min="0" :max="200"></el-input-number>
				</el-form-item>
				<el-form-item label="生日">
					<el-date-picker type="date" placeholder="选择日期" v-model="addForm.birth"></el-date-picker>
				</el-form-item>
				<el-form-item label="地址">
					<el-input type="textarea" v-model="addForm.addr"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click.native="addFormVisible = false">取消</el-button>
				<el-button type="primary" @click.native="addSubmit" :loading="addLoading">提交</el-button>
			</div>
		</el-dialog>
	</section>
</template>

<script>
	import util from '../../common/js/util'
	//import NProgress from 'nprogress'
	import { getUserListPage, removeUser, batchRemoveUser, editUser, addUser } from '../../api/api';

	var supplier = require("../../mock/falseData/3_supplier/supplier")
	export default {
		data() {
			return {
				filters: {
					name: '',
					value1:'',
					options1: [
						{
							value: "选项1",
							label: "统一采购"
						},
						{
							value: "选项2",
							label: "地方采购"
						}
					],
					value2:'',
					options2: [
						{
							value: "选项1",
							label: "周结"
						},
						{
							value: "选项2",
							label: "月结"
						},
						{
							value: "选项3",
							label: "批结"
						},
						{
							value: "选项4",
							label: "到付"
						}
					],
					value3:'',
					options3: [
						{
							value: "选项1",
							label: "禁用"
						},
						{
							value: "选项2",
							label: "启用"
						}
					],
				},
				users: supplier.data,
				total: 0,
				page: 1,
				listLoading: false,
				sels: [],//列表选中列

				editFormVisible: false,//编辑界面是否显示
				editLoading: false,
				editFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//编辑界面数据
				editForm: {
					id: 0,
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				},

				addFormVisible: false,//新增界面是否显示
				addLoading: false,
				addFormRules: {
					name: [
						{ required: true, message: '请输入姓名', trigger: 'blur' }
					]
				},
				//新增界面数据
				addForm: {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				}

			}
		},
		methods: {
			//性别显示转换
			buyType: function (row, column) {
				return row.buyType == 0 ? '统一采购' : row.buyType == 1 ? '地方采购' : '未知';
			},
			payType: function (row, column) {
				return row.payType == 0 ? '周结' : row.payType == 2 ? '批结' : '未知';
			},
			status: function (row, column) {
				return row.status == 1 ? '启用' : '禁用';
			},
			handleCurrentChange(val) {
				this.page = val;
				this.getUsers();
			},
			//获取用户列表
			getUsers() {
				let para = {
					page: this.page,
					name: this.filters.name
				};
				this.listLoading = true;
				//NProgress.start();
				getUserListPage(para).then((res) => {
					this.total = res.data.total;
					this.users = res.data.users;
					this.listLoading = false;
					//NProgress.done();
				});
			},
			//删除
			handleDel: function (index, row) {
				this.$confirm('确认删除该记录吗?', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { id: row.id };
					removeUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			},
			//显示编辑界面
			handleEdit: function (index, row) {
				this.editFormVisible = true;
				this.editForm = Object.assign({}, row);
			},
			//显示新增界面
			handleAdd: function () {
				this.addFormVisible = true;
				this.addForm = {
					name: '',
					sex: -1,
					age: 0,
					birth: '',
					addr: ''
				};
			},
			//编辑
			editSubmit: function () {
				this.$refs.editForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.editLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.editForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							editUser(para).then((res) => {
								this.editLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['editForm'].resetFields();
								this.editFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			//新增
			addSubmit: function () {
				this.$refs.addForm.validate((valid) => {
					if (valid) {
						this.$confirm('确认提交吗？', '提示', {}).then(() => {
							this.addLoading = true;
							//NProgress.start();
							let para = Object.assign({}, this.addForm);
							para.birth = (!para.birth || para.birth == '') ? '' : util.formatDate.format(new Date(para.birth), 'yyyy-MM-dd');
							addUser(para).then((res) => {
								this.addLoading = false;
								//NProgress.done();
								this.$message({
									message: '提交成功',
									type: 'success'
								});
								this.$refs['addForm'].resetFields();
								this.addFormVisible = false;
								this.getUsers();
							});
						});
					}
				});
			},
			selsChange: function (sels) {
				this.sels = sels;
			},
			//批量删除
			batchRemove: function () {
				var ids = this.sels.map(item => item.id).toString();
				this.$confirm('确认删除选中记录吗？', '提示', {
					type: 'warning'
				}).then(() => {
					this.listLoading = true;
					//NProgress.start();
					let para = { ids: ids };
					batchRemoveUser(para).then((res) => {
						this.listLoading = false;
						//NProgress.done();
						this.$message({
							message: '删除成功',
							type: 'success'
						});
						this.getUsers();
					});
				}).catch(() => {

				});
			}
		}
	}

</script>

<style scoped>

</style>