<template>
	<section>
		<!--工具条-->
		<el-col :span="24" class="toolbar" style="padding-bottom: 0;">
			<el-form :inline="true" :model="filters" size="small">
				<el-form-item>
					<el-input v-model="filters.name" placeholder="一级分类" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="二级分类" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="品牌" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商品名称" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商品编号" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="WMS商品编码" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="商品类型" size="small"></el-input>
				</el-form-item>
				<el-form-item>
					<el-input v-model="filters.name" placeholder="编码" size="small"></el-input>
				</el-form-item>
			</el-form>
		</el-col>
		<el-col :span="24" class="toolbar" style="padding-bottom: 0;">
			<el-form :inline="true" :model="filters" size="small">
				<el-form-item>
					<el-select v-model="filters.value1" placeholder="运营区" size="small">
						<el-option
								v-for="item in filters.options1"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.value1" placeholder="请输入货主名称" size="small">
						<el-option
								v-for="item in filters.options1"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.value1" placeholder="正常品上架状态" size="small">
						<el-option
								v-for="item in filters.options1"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.value1" placeholder="换盖品上架状态" size="small">
						<el-option
								v-for="item in filters.options1"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-select v-model="filters.value1" placeholder="积分品上架状态" size="small">
						<el-option
								v-for="item in filters.options1"
								:label="item.label"
								:value="item.value">
						</el-option>
					</el-select>
				</el-form-item>
				<el-form-item>
					<el-button type="primary" v-on:click="getUsers">查询</el-button>
				</el-form-item>
				<el-form-item>
					<el-button type="primary">导出</el-button>
				</el-form-item>
			</el-form>
		</el-col>
		<!--列表-->
		<el-table :data="users" highlight-current-row v-loading="listLoading" @selection-change="selsChange" border stripe fit size="small" style="width: 100%;">
			<el-table-column prop="id" label="编码" min-width="120">
			</el-table-column>
			<el-table-column prop="wmsGoodsNo" label="WMS商品编码" min-width="120">
			</el-table-column>
			<el-table-column prop="goodsId" label="商品编码" min-width="120" >
			</el-table-column>
			<el-table-column prop="goodsName" label="商品名称" min-width="120" >
			</el-table-column>
			<el-table-column prop="oaName" label="运营区" min-width="120" >
			</el-table-column>
			<el-table-column prop="merchantName" label="商户" min-width="120" >
			</el-table-column>
			<el-table-column prop="serviceProvider" label="服务商" min-width="120" >
			</el-table-column>
			<el-table-column prop="typeName" label="商品类型" min-width="120" >
			</el-table-column>
			<el-table-column prop="oneClassify" label="一级分类" min-width="120" >
			</el-table-column>
			<el-table-column prop="twoClassify" label="二级分类" min-width="120" >
			</el-table-column>
			<el-table-column prop="brankName" label="品牌" min-width="120" >
			</el-table-column>
			<el-table-column prop="goodsUnit" label="基本单位" min-width="120" >
			</el-table-column>
			<el-table-column prop="stock" label="库存" min-width="120" >
			</el-table-column>
			<el-table-column prop="price" label="售价" min-width="120" >
			</el-table-column>
			<el-table-column prop="sales" label="总销量" min-width="120" >
			</el-table-column>
			<el-table-column prop="conversionCoefficient" label="转换基数" min-width="120" >
			</el-table-column>
			<el-table-column prop="issyn" label="是否自动同步" min-width="120" >
			</el-table-column>
			<el-table-column prop="normalShelves" label="正常品上架状态" min-width="120" >
			</el-table-column>
			<el-table-column prop="swapCapShelves" label="换盖品上架状态" min-width="120" >
			</el-table-column>
			<el-table-column prop="integralShelves" label="积分品上架状态" min-width="120" >
			</el-table-column>
			<el-table-column prop="normalUptime" label="正常品上架时间" min-width="120" >
			</el-table-column>
			<el-table-column prop="normalDowntime" label="正常品下架时间" min-width="120" >
			</el-table-column>
			<el-table-column prop="swapUptime" label="换盖品上架时间" min-width="120" >
			</el-table-column>
			<el-table-column prop="swapDowntime" label="换盖品下架时间" min-width="120" >
			</el-table-column>
			<el-table-column prop="integralUptime" label="积分品上架时间" min-width="120" >
			</el-table-column>
			<el-table-column prop="intergralDowntime" label="积分品下架时间" min-width="120" >
			</el-table-column>
			<el-table-column label="操作" min-width="180" align="center">
				<template slot-scope="scope">
					<el-button size="small" icon="circle-check" type="primary"
					           @click="handleEdit(scope.$index, scope.row)">详情
					</el-button>
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

	var datas= require("../../mock/falseData/6_operate/4_salesArea")

	export default {
		data() {
			return {
				filters: {
					name: ''
				},
				users: datas.data,
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
			formatSex: function (row, column) {
				return row.sex == 1 ? '男' : row.sex == 0 ? '女' : '未知';
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
		},
		
	}

</script>

<style scoped>

</style>